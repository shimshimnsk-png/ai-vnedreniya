// Серверная функция Netlify: принимает заявку с MiniApp и пересылает её в Telegram.
// Токен бота и chat_id читаются из переменных окружения Netlify — в код они НЕ попадают.

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  if (!token || !chatId) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server not configured" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { niche, service, projectName, taskDesc, contact } = payload;

  if (!contact || typeof contact !== "string" || !contact.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: "Contact required" }) };
  }

  const clean = (v, max = 500) =>
    (typeof v === "string" ? v : "").slice(0, max).replace(/[<>]/g, "");

  const text =
    `📩 Новая заявка с MiniApp\n\n` +
    `👤 Категория: ${clean(niche, 100) || "—"}\n` +
    `🔧 Услуга: ${clean(service, 100) || "—"}\n` +
    `🏢 Проект/компания: ${clean(projectName, 200) || "—"}\n` +
    `📝 Задача: ${clean(taskDesc, 1000) || "—"}\n` +
    `📞 Контакт: ${clean(contact, 200)}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: "Telegram rejected request" }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: "Upstream error" }) };
  }
}
