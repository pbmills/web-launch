"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    console.log(user)
    setRole(user?.publicMetadata.role as string || "member");
  }, [user]);

  return (
    <div className="text-center text-4xl py-24">
      You are a {role === "admin" ? "Teacher" : "Student"}
    </div>
  );
}
