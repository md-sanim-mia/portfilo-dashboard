/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  console.log(process.env.NEXT_PUBLIC_BASE_API);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success && result?.data?.accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    }

    return result;
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: error.message };
  }
};

// export const getMeFoDb = async () => {
//   const token = await getValidToken();
//   const user = jwtDecode(token) as any;
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/users/${user?.id}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//       }
//     );

//     const result = await res.json();
//     return result;
//   } catch (error: any) {
//     return { success: false, message: error.message };
//   }
// };

// export const getCurrentUser = async () => {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("accessToken")?.value;

//   if (accessToken) {
//     const decodedData = jwtDecode(accessToken);
//     return decodedData;
//   }
//   return null;
// };

export const logout = async () => {
  const cookieStore = await cookies();
  console.log({ cookieStore });
  cookieStore.delete("accessToken");
};

// export const getNewToken = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: (await cookies()).get("refreshToken")!.value,
//         },
//       }
//     );

//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };
