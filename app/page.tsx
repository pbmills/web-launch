"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  const [role, setRole] = useState<any>("");

  useEffect(() => {
    setRole(user?.publicMetadata.role || "member");
  }, [user]);

  return (
    <div className="text-center text-4xl py-24">
      You are a {role === "admin" ? "Teacher" : "Student"}
    </div>
  );
}
