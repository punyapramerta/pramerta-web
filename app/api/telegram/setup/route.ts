import { NextResponse } from "next/server";
import { getTelegramBotToken } from "@/lib/telegram";

// Helper route to register or check Telegram Webhook status
// Usage: GET /api/telegram/setup?url=https://your-domain.com/api/telegram/webhook
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const webhookUrl = searchParams.get("url");
    const token = getTelegramBotToken();

    if (!webhookUrl) {
      // Just check current webhook info
      const infoRes = await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`);
      const infoData = await infoRes.json();
      return NextResponse.json({
        message: "Pass ?url=YOUR_WEBHOOK_URL to set webhook",
        webhookInfo: infoData,
      });
    }

    const secret = process.env.TELEGRAM_WEBHOOK_SECRET || "";
    const setRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        secret_token: secret,
      }),
    });

    const setData = await setRes.json();
    return NextResponse.json({
      success: setData.ok,
      result: setData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
