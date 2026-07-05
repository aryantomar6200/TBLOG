import { Client, ID, TablesDB } from "appwrite";
import config from "../config/config";
import { Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  TablesDB;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
  }

  async createPost({ title, content, featuredImage, slug, status, userId }) {
    try {
      return await this.tablesDB.createRow(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        slug,
        { title: title, content, featuredImage, slug, status, userId },
      );
    } catch (error) {
      console.log("databaseService --> createpost -> " + error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        slug,
        { title, content, featuredImage, slug, status },
      );
    } catch (error) {
      console.log("databaseService --> updatePost -> " + error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        slug,
      );

      return true;
    } catch (error) {
      console.log("databaseService --> deletePost -> " + error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        slug,
      );
    } catch (error) {
      console.log("databaseService --> getpost -> " + error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDB.listRows(
        config.appwriteDatabaseId,
        config.appwriteTableId,
        queries,
      );
    } catch (error) {
      console.log("databaseService --> getposts -> " + error);
      return false;
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
