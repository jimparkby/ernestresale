import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { createHmac } from "crypto";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function validateTelegramInitData(initData: string, botToken: string): boolean {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return false;
  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  const secretKey = createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();
  const computedHash = createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  return computedHash === hash;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { initData } = req.body as { initData: string };
  if (!initData) return res.status(400).json({ error: "initData required" });

  const botToken = process.env.BOT_TOKEN!;

  // In dev mode skip validation
  const isDev = process.env.NODE_ENV === "development";
  if (!isDev && !validateTelegramInitData(initData, botToken)) {
    return res.status(401).json({ error: "Invalid initData" });
  }

  const params = new URLSearchParams(initData);
  const userRaw = params.get("user");
  if (!userRaw) return res.status(400).json({ error: "No user in initData" });

  const tgUser = JSON.parse(userRaw);

  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        id: tgUser.id,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name ?? null,
        username: tgUser.username ?? null,
        photo_url: tgUser.photo_url ?? null,
      },
      { onConflict: "id", ignoreDuplicates: false }
    )
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ user: data });
}
