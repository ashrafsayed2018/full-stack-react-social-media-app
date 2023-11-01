import { INewUser } from "@/types";
import { ID, Query} from "appwrite";
import { account, appwriteConfig, avatar, database } from "./config";
export async function createUserAccount(user:INewUser) {
  try {
    
    // notice the email then password then name
    const newAccount = await account.create(
        ID.unique(),
        user.email, // email first
        user.password, // password second
        user.name, // name third
    )
    if(!newAccount)  throw  Error;
    const avatarUrl = avatar.getInitials(user.name);

    const newUser = await saveUserToDB({accountId:newAccount.$id,name:newAccount.name,email:newAccount.email,username:user.username,imageUrl:avatarUrl});
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//  save new user to appwrite database

export async function saveUserToDB(user: {
  accountId:string,
  email:string,
  name: string;
  imageUrl:URL,
  username?:string
}) {
  try {
        const newUser = await database.createDocument(appwriteConfig.databaseId,appwriteConfig.usersCollectionId,ID.unique(),user)
        return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function signInAccount(user: {
  email:string,
  password:string
})  {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentUser() {
  try {
    
    const currentAccount = await account.get();
    if(!currentAccount)  throw  Error;
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
     appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    )
    if(!currentUser) throw new Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

