import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(userId: string) {
  try {
    const result = await db.select().from(users).where(eq(users.userId, userId));
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function createUser(userData: {
  email: string;
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
}) {
  try {
    const result = await db.insert(users).values(userData).returning();
    return result[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function updateUser(
  userId: string,
  data: Partial<{
    email: string;
    firstName: string | null;
    lastName: string | null;
    profileImageUrl: string | null;
  }>
) {
  try {
    const result = await db
      .update(users)
      .set(data)
      .where(eq(users.userId, userId))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}
