import { Client, ID, Storage } from "appwrite";
import config from "../config/config";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.storage = new Storage(this.client);
    console.log(this.storage);
  }

  async uploadFile(file) {
    try {
      return this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("storageServices --> uploadFile -> " + error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("storageServices --> deleteFile -> " + error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFileView(config.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
