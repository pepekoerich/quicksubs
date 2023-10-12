import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const maxDuration = 50; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const { name, type } = file;
  const data = await file.arrayBuffer();

  const s3client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const ext = name.split(".").slice(-1);
  const newName = `${Date.now()}.${ext}`;

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    ACL: "public-read",
    Key: newName,
    Body: data,
    ContentType: type,
  });

  await s3client.send(uploadCommand);

  return Response.json({ newName });
}
