import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "PATCH") return res.status(405).end();

  const { user_id, city, payment_info } = req.body as {
    user_id: number;
    city?: string;
    payment_info?: string;
  };

  if (!user_id) return res.status(400).json({ error: "user_id required" });

  const updates: Record<string, string> = {};
  if (city !== undefined) updates.city = city;
  if (payment_info !== undefined) updates.payment_info = payment_info;

  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", user_id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ user: data });
}
