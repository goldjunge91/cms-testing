import { pgTable, serial, timestamp, varchar, text, uuid, boolean, integer, pgEnum } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  email: varchar("email").unique().notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  userId: varchar("user_id").unique().notNull(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  documentId: uuid("document_id").unique().defaultRandom().notNull(),
  document: text("document").notNull(),
  title: varchar("title").notNull(),
  userId: varchar("user_id").notNull(),
  siteId: varchar("site_id").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  category: varchar("category").notNull(),
});

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  authorId: uuid("author_id").unique().defaultRandom().notNull(),
  authorName: varchar("author_name").notNull(),
  authorProfileImg: varchar("author_profile_img").notNull(),
  authorInstagram: varchar("author_instagram").notNull(),
  authorTwitter: varchar("author_twitter").notNull(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: varchar("user_id").notNull(),
  blogHtml: text("blog_html"),
  image: varchar("image"),
  imageAlt: varchar("image_alt"),
  categoryId: integer("category_id").notNull(),
  authorId: varchar("author_id").notNull(),
  title: varchar("title").notNull(),
  subtitle: varchar("subtitle").notNull(),
  slug: varchar("slug").unique().notNull(),
  keywords: text("keywords").array(), // PostgreSQL array für keywords
  published: boolean("published").notNull(),
  shareable: boolean("shareable").notNull(),
  siteId: varchar("site_id").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const sites = pgTable("sites", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: varchar("user_id").notNull(),
  siteId: varchar("site_id").unique().notNull(),
  siteName: varchar("site_name").notNull(),
  siteDescription: text("site_description"),
  siteSubdomain: varchar("site_subdomain").notNull(),
  siteLogo: varchar("site_logo"),
  siteCoverImage: varchar("site_cover_image"),
  siteCustomDomain: varchar("site_custom_domain"),
  updatedAt: timestamp("updated_at"),
});
