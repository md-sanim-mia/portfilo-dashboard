 
"use server";
import { cookies } from "next/headers";

export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  const token = await cookieStore.get("accessToken")!.value;

  return token;
};
