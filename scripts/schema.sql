-- Tabellen löschen falls sie existieren
-- DROP TABLE IF EXISTS sites;
-- DROP TABLE IF EXISTS authors;
-- DROP TABLE IF EXISTS categories;
-- DROP TABLE IF EXISTS articles;

-- Tabellen erstellen
CREATE TABLE sites (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  site_id TEXT UNIQUE NOT NULL,
  site_name TEXT NOT NULL,
  site_description TEXT,
  site_subdomain TEXT UNIQUE NOT NULL,
  site_logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  site_id TEXT REFERENCES sites(site_id) ON DELETE CASCADE,
  author_id TEXT UNIQUE NOT NULL,
  author_name TEXT NOT NULL,
  author_twitter TEXT,
  author_profile_img TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  site_id TEXT REFERENCES sites(site_id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (site_id, category)
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  site_id TEXT REFERENCES sites(site_id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  blog_html TEXT,
  author_id TEXT REFERENCES authors(author_id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  keywords TEXT,
  image TEXT,
  image_alt TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indizes erstellen für bessere Performance
CREATE INDEX idx_sites_user_id ON sites(user_id);
CREATE INDEX idx_articles_site_id ON articles(site_id);
