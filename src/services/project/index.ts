"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createProject = async (projectData: any) => {
  const accessToken = await getValidToken();
  console.log(process.env.NEXT_PUBLIC_BASE_API);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      method: "POST",
      body: projectData,
      headers: {
        Authorization: accessToken,
      },
      credentials: "include",
    });
    // revalidateTag("PROJECT");

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
export const getAllProject = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      next: { tags: ["PROJECT"] },
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
export const getSingleProject = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "GET",
      }
    );
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
export const updateProject = async (id: string, updateData: any) => {
  const accessToken = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: accessToken },
        body: updateData,
        credentials: "include",
      }
    );
    revalidateTag("PROJECT");
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
export const deleteProject = async (id: string) => {
  const accessToken = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: accessToken },
        credentials: "include",
      }
    );
    revalidateTag("PROJECT");
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
