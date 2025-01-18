"use client";

import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("https://hrms-api-and-admin.vercel.app/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      await res.json();
      console.log("check0");

      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Sign In</button>
        </form>
      </main>
    </div>
  );
}