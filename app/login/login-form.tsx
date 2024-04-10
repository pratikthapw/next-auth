"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const router = useRouter();
  function handleSubmit() {
    startTransition(async () => {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard",
      });

      if (res?.ok) {
        router.push("/dashboard");
        setSuccess("logged in");
      }
      if (res?.error) {
        setSuccess("Invalid credentials");
      }
    });
  }
  return (
    <div className="space-y-20">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Your email"
      />
      <br />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Your password"
      />
      <br />
      <p>{success}</p>
      <button disabled={isPending} type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default LoginForm;
