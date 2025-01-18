"use client";

import styles from "./dashboard.module.css";
import { useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

const fetchUserData = async (): Promise<UserData | null> => {
  try {
    const res = await fetch(
      "https://hrms-api-and-admin.vercel.app/api/users/me",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    console.log("check1");

    return await res.json();

    console.log("check2");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleFetchUserData = async () => {
    const data = await fetchUserData();
    setUserData(data);
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <button onClick={handleFetchUserData}>Fetch User Data</button>
      {userData ? (
        <div>
          <p>
            Welcome, {userData.firstName} {userData.lastName}!
          </p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>No user data available. Click the button to fetch user data.</p>
      )}
    </div>
  );
}
