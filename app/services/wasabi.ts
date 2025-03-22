import AWS from "aws-sdk";

// Configure Wasabi S3
const s3 = new AWS.S3({
  endpoint: `https://${process.env.WASABI_ENDPOINT}`, // Wasabi's S3 endpoint
  accessKeyId: process.env.WASABI_ACCESS_KEY,
  secretAccessKey: process.env.WASABI_SECRET_KEY,
  region: "northeast-1", // Change to your Wasabi region
});

export const uploadMedia = async (imageBlob: Blob, name: string) => {
  try {
    const arrayBuffer = await imageBlob.arrayBuffer(); // Convert Blob to ArrayBuffer
    const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer

    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.WASABI_BUCKET_NAME as string,
      Key: name, // File name in Wasabi
      Body: buffer,
      ContentType: imageBlob.type || "image/png", // Adjust based on your Blob type
    };

    const data = await s3.upload(params).promise();
    console.log("File uploaded successfully:", data.Location);
    return data.Location; // Returns the public URL
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
