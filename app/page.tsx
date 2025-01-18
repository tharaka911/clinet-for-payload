"use client";

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
// import Cookies from 'js-cookie';
import styles from "./page.module.css";

export default function Home() {
  const [response, setResponse] = useState(null);
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

      const result = await res.json();
      setResponse(result);
      console.log(result);

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
        {response && <div className={styles.response}>{JSON.stringify(response)}</div>}
      </main>
    </div>
  );
}