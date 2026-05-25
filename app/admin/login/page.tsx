"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../actions";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Login gagal");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">
              admin_panel_settings
            </span>
          </div>
          <h1 className="text-2xl font-headline font-extrabold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Silakan login untuk mengelola konten website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">error</span>
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 block" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="Masukkan username"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 block" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-3.5 rounded-xl transition-colors mt-6 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Login
                <span className="material-symbols-outlined text-lg">login</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
