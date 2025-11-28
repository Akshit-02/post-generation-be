import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const { S3_BUCKET_NAME } = process.env;

const s3Client = new S3Client({});

export const uploadToS3 = async (key, buffer, contentType) => {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);
  return key;
};
