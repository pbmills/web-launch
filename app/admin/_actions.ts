"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(formData: FormData) {
  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    return { message: "Not Authorized" };
  }

  const userId = formData.get("id");
  const role = formData.get("role");

  // Validate that both the user ID and role are valid strings
  if (typeof userId !== "string" || typeof role !== "string") {
    return { message: "Invalid user ID or role" };
  }

  try {
    const res = await (
      await clerkClient()
    ).users.updateUser(userId, {
      publicMetadata: { role: role },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return {
      message: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}

export async function removeRole(formData: FormData) {
  const userId = formData.get("id");

  // Validate that the user ID is a valid string
  if (typeof userId !== "string") {
    return { message: "Invalid user ID" };
  }

  try {
    const res = await (
      await clerkClient()
    ).users.updateUser(userId, {
      publicMetadata: { role: null },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return {
      message: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}
