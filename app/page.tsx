"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type Role = "admin" | "member";

export default function Home() {
  const { user } = useUser();
  const [role, setRole] = useState<Role>("member"); // Default to "member"

  useEffect(() => {
    const userRole = user?.publicMetadata.role as Role; // Type assertion
    setRole(userRole || "member");
  }, [user]);

  return (
    <div className="text-center text-4xl py-24">
      You are a {role === "admin" ? "Teacher" : "Student"}
    </div>
  );
}
