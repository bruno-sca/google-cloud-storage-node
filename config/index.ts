import { Storage } from "@google-cloud/storage";
import path from "path";

const serviceKey = path.join("./config", "gcs.key.json");

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "your project id",
});

export { storage };
