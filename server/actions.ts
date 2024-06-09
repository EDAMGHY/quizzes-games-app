"use server";

import { database } from "@/database";
import { posts } from "@/database/schema";

export const createPost = async () => {
  // try {
  //   const user = await database.insert(posts).values({
  //     title: "Test Title",
  //     body: "Test Body",
  //   });
  //   return user;
  // } catch (err) {
  //   console.log({ err });
  //   throw new Error("Failed to create post");
  // }
};
