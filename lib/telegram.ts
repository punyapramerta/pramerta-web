// Telegram Bot API Helpers for Pramerta (PAS HVAC)

export type TelegramInlineKeyboardButton = {
  text: string;
  callback_data?: string;
  url?: string;
};

export type TelegramInlineKeyboardMarkup = {
  inline_keyboard: TelegramInlineKeyboardButton[][];
};

export function getTelegramBotToken(): string {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not defined in environment variables.");
  }
  return token;
}

export async function sendTelegramMessage(
  chatId: number | string,
  text: string,
  options?: {
    parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
    reply_markup?: TelegramInlineKeyboardMarkup;
    disable_web_page_preview?: boolean;
  }
) {
  const token = getTelegramBotToken();
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const body: Record<string, any> = {
    chat_id: chatId,
    text,
    parse_mode: options?.parse_mode || "Markdown",
    disable_web_page_preview: options?.disable_web_page_preview ?? false,
  };

  if (options?.reply_markup) {
    body.reply_markup = options.reply_markup;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Telegram sendMessage error:", errorData);
    throw new Error(`Failed to send Telegram message: ${res.statusText}`);
  }

  return res.json();
}

export async function sendTelegramChatAction(
  chatId: number | string,
  action: "typing" | "upload_photo" | "record_video" = "typing"
) {
  try {
    const token = getTelegramBotToken();
    const url = `https://api.telegram.org/bot${token}/sendChatAction`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        action,
      }),
    });
  } catch (err) {
    console.error("Failed to send chat action:", err);
  }
}

export async function answerTelegramCallbackQuery(
  callbackQueryId: string,
  text?: string
) {
  try {
    const token = getTelegramBotToken();
    const url = `https://api.telegram.org/bot${token}/answerCallbackQuery`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text,
      }),
    });
  } catch (err) {
    console.error("Failed to answer callback query:", err);
  }
}

// ─── INLINE KEYBOARD PRESETS ─────────────────────────────────

export function getAudienceKeyboard(): TelegramInlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "🏢 B2B & Plant Manager", callback_data: "aud:B2B & Plant Manager" },
      ],
      [
        { text: "⚡ IT & Facility Engineer", callback_data: "aud:IT & Facility Engineer" },
      ],
      [
        { text: "🏗️ Kontraktor & Procurement", callback_data: "aud:Kontraktor Building & Procurement" },
      ],
      [
        { text: "✨ Gunakan Default", callback_data: "aud:default" },
      ],
    ],
  };
}

export function getPurposeKeyboard(): TelegramInlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "📚 Edukasi & SEO", callback_data: "purp:Edukasi & SEO" },
      ],
      [
        { text: "🎯 Lead Generation & RFQ", callback_data: "purp:Lead Generation & RFQ" },
      ],
      [
        { text: "⚙️ Solusi Teknis HVAC", callback_data: "purp:Highlight Solusi Teknis HVAC" },
      ],
    ],
  };
}

export function getAdminEditKeyboard(adminUrl: string): TelegramInlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "📝 Edit & Check di Admin Web", url: adminUrl },
      ],
    ],
  };
}
