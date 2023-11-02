import { INewPost, INewUser } from "@/types";
import { ID, Query} from "appwrite";
import { account, appwriteConfig, avatar, database, storage } from "./config";
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

export async function signInAccount(user: {email:string,password:string})  {
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

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}


// posts 


// ============================== CREATE POST
export async function createPost(post: INewPost) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const newPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts(){
const posts = await database.listDocuments(
  appwriteConfig.databaseId,
  appwriteConfig.postsCollectionId,
  [Query.orderAsc('$createdAt'),Query.limit(20)]
  )
  if(!posts) throw new Error
  return posts;
}
// ============================== GET POSTS
export async function searchPosts(searchTerm: string) {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}
