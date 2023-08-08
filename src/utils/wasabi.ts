import AWS from "aws-sdk";
import { getStorageInfo } from "./credentials";

export const uploadFileToWasabi = async (file, key) => {
  try {
    const storageInfo = await getStorageInfo();

    const s3 = new AWS.S3({
      accessKeyId: storageInfo.wasabiAccessKeyId,
      secretAccessKey: storageInfo.wasabiAccessKeySecret,
      endpoint: "https://s3.wasabisys.com",
      s3ForcePathStyle: true,
    });

    const params = {
      Bucket: storageInfo.wasabiBucketName,
      Key: key,
      Body: file,
      ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.error(`Upload Error: ${err}`);
          reject(err);
        } else {
          const url = `https://${storageInfo.wasabiBucketName}.s3.wasabisys.com/${key}`;
          resolve(url);
        }
      });
    });
  } catch (error) {
    console.error("Failed to get storage info:", error);
    throw error;
  }
};
