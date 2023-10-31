import { INewUser } from "@/types";
import {ID} from "appwrite";
import { account } from "./config";
export async function createUserAccount(user:INewUser) {
  try {
    
    // notice the email then password then name
    const createAccount = await account.create(
        ID.unique(),
        user.email, // email first
        user.password, // password second
        user.name, // name third
    )
    return createAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}