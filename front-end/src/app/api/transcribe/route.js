import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  GetTranscriptionJobCommand,
  StartTranscriptionJobCommand,
  TranscribeClient,
} from "@aws-sdk/client-transcribe";

function getClient() {
  return new TranscribeClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

function createTranscriptionCommand(filename) {
  return new StartTranscriptionJobCommand({
    TranscriptionJobName: filename,
    OutputBucketName: process.env.AWS_BUCKET_NAME,
    OutputKey: `${filename}.transcription`,
    IdentifyLanguage: true,
    Media: {
      MediaFileUri: `s3://${process.env.AWS_BUCKET_NAME}/${filename}`,
    },
  });
}

async function createTranscriptionJob(filename) {
  const transcribeClient = getClient();
  const transcriptionCommand = createTranscriptionCommand(filename);
  return transcribeClient.send(transcriptionCommand);
}

async function getJob(filename) {
  const transcribeClient = getClient();
  let jobStatusResult = null;
  try {
    const transcriptionJobStatusCommand = new GetTranscriptionJobCommand({
      TranscriptionJobName: filename,
    });
    jobStatusResult = await transcribeClient.send(
      transcriptionJobStatusCommand
    );
  } catch (error) {}
  return jobStatusResult;
}

async function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

async function getTranscriptionFile(filename) {
  const transcriptionFileName = `${filename}.transcription`;
  const s3client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const getTranscriptionFileCommand = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: transcriptionFileName,
  });
  let transcriptionFileResponse = null;
  try {
    transcriptionFileResponse = await s3client.send(
      getTranscriptionFileCommand
    );
  } catch (error) {}
  if (transcriptionFileResponse) {
    return JSON.parse(await streamToString(transcriptionFileResponse.Body));
  }
  return null;
}

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const filename = searchParams.get("filename");

  //find ready transcription
  const transcription = await getTranscriptionFile(filename);
  if (transcription) {
    return Response.json({
        status: "COMPLETED",
        transcription,
    });
  }

  //check if already transcribing
  const existingJob = await getJob(filename);

  if (existingJob) {
    return Response.json({
      status: existingJob.TranscriptionJob.TranscriptionJobStatus,
    });
  }

  //if not, create transcription job
  if (!existingJob) {
    const newJob = await createTranscriptionJob(filename);
    return Response.json({
      status: newJob.TranscriptionJob.TranscriptionJobStatus,
    });
  }

  return Response.json(null);
}
