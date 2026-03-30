import type { VercelRequest, VercelResponse } from "@vercel/node";

const BOT_TOKEN = process.env.BOT_TOKEN!;
const APP_URL = "https://ernestresale.vercel.app";

async function sendMessage(chat_id: number, text: string, extra?: object) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, text, parse_mode: "HTML", ...extra }),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const update = req.body;
  const message = update?.message;

  if (message?.text === "/start") {
    await sendMessage(
      message.chat.id,
      `👜 <b>ernestresale</b>\n\nМаркетплейс дизайнерских вещей — покупай и продавай люксовые сумки, одежду и аксессуары напрямую между людьми.\n\n✦ Без посредников\n✦ Реальные продавцы с рейтингом\n✦ Быстро, удобно, внутри Telegram\n\nНажимай на <b>ernestresale</b> ниже 👇`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✦ Открыть ernestresale",
                web_app: { url: APP_URL },
              },
            ],
          ],
        },
      }
    );
  }

  return res.status(200).json({ ok: true });
}
