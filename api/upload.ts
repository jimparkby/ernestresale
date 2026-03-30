import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  // Expects { base64: "data:image/jpeg;base64,...", user_id: number }
  const { base64, user_id } = req.body as { base64: string; user_id: number };
  if (!base64 || !user_id) return res.status(400).json({ error: "base64 and user_id required" });

  const matches = base64.match(/^data:(.+);base64,(.+)$/);
  if (!matches) return res.status(400).json({ error: "Invalid base64" });

  const mimeType = matches[1];
  const buffer = Buffer.from(matches[2], "base64");
  const ext = mimeType.split("/")[1] ?? "jpg";
  const fileName = `${user_id}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, buffer, { contentType: mimeType, upsert: false });

  if (error) return res.status(500).json({ error: error.message });

  const { data } = supabase.storage.from("products").getPublicUrl(fileName);
  return res.status(200).json({ url: data.publicUrl });
}
