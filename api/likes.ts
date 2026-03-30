import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { user_id, product_id } = req.body as { user_id: number; product_id: number };

  if (!user_id || !product_id) return res.status(400).json({ error: "user_id and product_id required" });

  if (req.method === "POST") {
    // Insert like (ignore if exists)
    await supabase.from("likes").upsert({ user_id, product_id }, { ignoreDuplicates: true });

    // Increment likes_count
    await supabase.rpc("increment_likes", { pid: product_id });

    return res.status(200).json({ liked: true });
  }

  if (req.method === "DELETE") {
    await supabase.from("likes").delete().match({ user_id, product_id });

    // Decrement likes_count
    await supabase.rpc("decrement_likes", { pid: product_id });

    return res.status(200).json({ liked: false });
  }

  // GET — return liked product ids for user
  if (req.method === "GET") {
    const uid = req.query.user_id as string;
    const { data } = await supabase.from("likes").select("product_id").eq("user_id", uid);
    return res.status(200).json({ liked_ids: data?.map((r) => r.product_id) ?? [] });
  }

  return res.status(405).end();
}
