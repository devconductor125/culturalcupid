import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getStorageInfo } from "../utils/credentials";
import { uploadFileToWasabi } from "../utils/wasabi";

const firebaseStorage = getStorage();

export const uploadImage = async (image: any) => {
  const storageInfo = await getStorageInfo();

  if (storageInfo.wasabiEnabled) {
    try {
      const key = image.mimetype.startsWith("image/")
        ? `images/${image.originalname}`
        : `videos/${image.originalname}`;
      return await uploadFileToWasabi(image.buffer, key);
    } catch (error) {
      console.log(`Failed to upload to Wasabi: ${error}`);
      console.log("Falling back to Firebase...");
    }
  }

  try {
    let reference;
    if (image.mimetype.startsWith("image/")) {
      reference = ref(firebaseStorage, `images/${image.originalname}`);
    } else {
      reference = ref(firebaseStorage, `videos/${image.originalname}`);
    }
    const blob = await uploadBytesResumable(reference, image.buffer, {
      contentType: image.mimetype,
    });
    return await getDownloadURL(blob.ref);
  } catch (error) {
    console.log(`Failed to upload to Firebase: ${error}`);
    throw error;
  }
};

export const uploadImages = async (req, res, next) => {
  try {
    const images = req.files;
    const imagePromises = images.map(async (image) => await uploadImage(image));

    const imageRes = await Promise.all(imagePromises);
    res.send({ data: imageRes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
