"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) {
    return { success: false, error: "Konfigurasi server tidak lengkap." };
  }

  if (username === validUser && password === validPass) {
    // Set cookie sesi admin, berlaku selama 1 hari
    const cookieStore = await cookies();
    cookieStore.set({
      name: "admin_session",
      value: "authenticated",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return { success: true };
  }

  return { success: false, error: "Username atau Password salah." };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}
