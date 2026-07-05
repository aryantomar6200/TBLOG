import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setProject(config.appwriteProjectId)
      .setEndpoint(config.appwriteUrl);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userCreated = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if (userCreated) {
        return this.login({ email, password });
      } else {
        return userCreated;
      }
    } catch (error) {
      console.log("authservice  -->  createAccount -->" + error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("authservice  -->  login -->" + error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("authservice  -->  getCurrentUser -->" + error);
      return null
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("authservice  -->  logout -->" + error);
      throw error;
    }
  }
}

const authServices = new AuthService();

export default authServices;
