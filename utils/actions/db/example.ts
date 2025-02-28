import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(userId: string) {
  try {
    const user = await db.select().from(users).where(eq(users.userId, userId));
    return user[0] || null;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function createUser(userData: {
  email: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}) {
  try {
    const result = await db.insert(users).values(userData).returning();
    return result[0];
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create user");
  }
}
