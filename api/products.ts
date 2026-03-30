import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("products")
      .select("*, users(id, first_name, last_name, username, city)")
      .order("likes_count", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ products: data });
  }

  if (req.method === "POST") {
    const { seller_id, brand, name, price, condition, material, description, image_url } =
      req.body;

    if (!seller_id || !brand || !name || !price || !image_url) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("products")
      .insert({ seller_id, brand, name, price, condition, material, description, image_url })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ product: data });
  }

  return res.status(405).end();
}
