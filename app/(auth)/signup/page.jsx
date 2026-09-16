"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  // Form State
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account.");
      }
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const labelClassName =
    "text-xs font-medium uppercase tracking-wide text-on-surface-variant";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-semibold text-on-surface">
          Create account
        </h2>
        <p className="text-sm leading-6 text-on-surface-variant">
          Start protecting your environment secrets in one quiet vault.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={userName}
            className="w-full rounded-lg border border-outline bg-transparent px-3 py-2 text-sm text-on-surface"
            placeholder="Username should be unique"
            autoComplete="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              className="w-full rounded-lg border border-outline bg-transparent px-3 py-2 pr-10 text-sm text-on-surface"
              placeholder="Enter a strong password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <Image
                src={passwordVisible ? "/eye-open.svg" : "/eye-off.svg"}
                alt=""
                width="18"
                height="18"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClassName} htmlFor="repeatPassword">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={repeatPasswordVisible ? "text" : "password"}
              id="repeatPassword"
              value={repeatPassword}
              className="w-full rounded-lg border border-outline bg-transparent px-3 py-2 pr-10 text-sm text-on-surface"
              placeholder="Repeat your password"
              autoComplete="new-password"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              aria-label={
                repeatPasswordVisible ? "Hide password" : "Show password"
              }
              onClick={() => setRepeatPasswordVisible(!repeatPasswordVisible)}
            >
              <Image
                src={repeatPasswordVisible ? "/eye-open.svg" : "/eye-off.svg"}
                alt=""
                width="18"
                height="18"
              />
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg border border-error/40 bg-error-container/30 px-3 py-2 text-sm text-on-error-container">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-on-surface-variant">
        Already have an account?{" "}
        <Link
          className="font-medium text-primary hover:text-primary/80"
          href="/login"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
