"use server";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createblog = async (blogData: any) => {
  const accessToken = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      method: "POST",
      body: blogData,
      headers: {
        Authorization: accessToken,
      },
      credentials: "include",
    });
    revalidateTag("BLOGS");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error",
      data: null,
    };
  }
};
export const getAllblog = async () => {
  console.log(process.env.NEXT_PUBLIC_BASE_API);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      next: { tags: ["BLOGS"] },
      method: "GET",
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error",
      data: null,
    };
  }
};
export const getSingleblog = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "GET",
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error",
      data: null,
    };
  }
};
export const updateblog = async (id: string, updateData: any) => {
  const accessToken = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "PATCH",
      headers: { Authorization: accessToken },
      body: updateData,
      credentials: "include",
    });
    revalidateTag("BLOGS");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error",
      data: null,
    };
  }
};
export const deleteblog = async (id: string) => {
  const accessToken = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: accessToken },
      credentials: "include",
    });
    revalidateTag("BLOGS");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error",
      data: null,
    };
  }
};
