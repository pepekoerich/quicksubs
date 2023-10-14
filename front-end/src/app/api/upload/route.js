

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
  signatureVersion: "v4",
});

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");
  const { name, type } = file;

  const ext = name.split(".").pop();
  const newName = `${Date.now()}.${ext}`;

  const s3Params = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: newName,
    ContentType: type,
    ACL: "public-read",
  });

  const uploadUrl = await getSignedUrl(s3, s3Params, { expiresIn: 3600 });

  return new Response(JSON.stringify({ uploadUrl, key: newName, type }));
}