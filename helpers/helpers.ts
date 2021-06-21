import util from "util";
import { storage } from "../config";
import { File } from "../src/@types/Files";

const bucket = storage.bucket("node-test-product-images");

export const uploadImage = (file: File) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));

    const blobStream = blob.createWriteStream();

    blobStream
      .on("finish", () => {
        console.log("test");
        const publicUrl = util.format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", (e) => {
        console.log(e);
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
