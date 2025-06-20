"use server";

import { getValidToken } from "@/lib/verifyToken";
// import { revalidateTag } from "next/cache";

export const createskill = async (skillData: any) => {
  const accessToken = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`, {
      method: "POST",
      body: skillData,
      headers: {
        Authorization: accessToken,
      },
      credentials: "include",
    });
    // revalidateTag("SKIL");
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
export const getAllskill = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`, {
      // next: { tags: ["SKIL"] },
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
export const getSingleskill = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
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
export const updateskill = async (id: string, updateData: any) => {
  const accessToken = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: accessToken },
        body: updateData,
        credentials: "include",
      }
    );
    // revalidateTag("SKIL");
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
export const deleteskill = async (id: string) => {
  const accessToken = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: accessToken },
        credentials: "include",
      }
    );
    // revalidateTag("SKIL");
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
