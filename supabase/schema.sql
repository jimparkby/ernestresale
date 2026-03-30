-- Users (registered via Telegram)
CREATE TABLE users (
  id BIGINT PRIMARY KEY,          -- Telegram user ID
  first_name TEXT NOT NULL,
  last_name TEXT,
  username TEXT,
  photo_url TEXT,
  city TEXT DEFAULT '',
  payment_info TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  seller_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  condition TEXT NOT NULL DEFAULT 'Отличное',
  material TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image_url TEXT NOT NULL,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes
CREATE TABLE likes (
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, product_id)
);

-- Helper functions for atomic like/unlike
CREATE OR REPLACE FUNCTION increment_likes(pid BIGINT)
RETURNS void LANGUAGE sql AS $$
  UPDATE products SET likes_count = likes_count + 1 WHERE id = pid;
$$;

CREATE OR REPLACE FUNCTION decrement_likes(pid BIGINT)
RETURNS void LANGUAGE sql AS $$
  UPDATE products SET likes_count = GREATEST(0, likes_count - 1) WHERE id = pid;
$$;

-- Storage bucket for product images (run in Supabase Dashboard → Storage)
-- Create bucket named "products" with public access
