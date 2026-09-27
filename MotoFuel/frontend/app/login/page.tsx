"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/features/auth/services/auth.service";
import { tokenStorage } from "@/utils/token";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await authService.login({
        email,
        password,
      });

      tokenStorage.setTokens(
        result.access,
        result.refresh
      );

      setMessage("✅ Login successful");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("❌ Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 rounded-lg border p-6"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded bg-black p-2 text-white"
        >
          Login
        </button>

        {message && (
          <p className="text-center">{message}</p>
        )}
      </form>
    </div>
  );
}