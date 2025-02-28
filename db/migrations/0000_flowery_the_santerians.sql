CREATE TABLE "authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"author_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"author_name" varchar NOT NULL,
	"author_profile_img" varchar NOT NULL,
	"author_instagram" varchar NOT NULL,
	"author_twitter" varchar NOT NULL,
	CONSTRAINT "authors_author_id_unique" UNIQUE("author_id")
);
--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_id" varchar NOT NULL,
	"blog_html" text,
	"image" varchar,
	"image_alt" varchar,
	"category_id" integer NOT NULL,
	"author_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"subtitle" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"keywords" text[],
	"published" boolean NOT NULL,
	"shareable" boolean NOT NULL,
	"site_id" varchar NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"category" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"document_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"document" text NOT NULL,
	"title" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"site_id" varchar NOT NULL,
	CONSTRAINT "documents_document_id_unique" UNIQUE("document_id")
);
--> statement-breakpoint
CREATE TABLE "sites" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_id" varchar NOT NULL,
	"site_id" varchar NOT NULL,
	"site_name" varchar NOT NULL,
	"site_description" text,
	"site_subdomain" varchar NOT NULL,
	"site_logo" varchar,
	"site_cover_image" varchar,
	"site_custom_domain" varchar,
	"updated_at" timestamp,
	CONSTRAINT "sites_site_id_unique" UNIQUE("site_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"email" varchar NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"user_id" varchar NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id")
);
