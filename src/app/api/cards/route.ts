import { NextResponse } from "next/server";
import { AUDIO_TYPES, CardTheme, MAX_AUDIO_BYTES, THEMES, checkAdmin, saveCard } from "@/lib/cards";

export const dynamic = "force-dynamic";

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  if (!checkAdmin(req.headers.get("x-admin-password"))) return fail("Contraseña incorrecta", 401);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Formulario inválido");
  }

  const text = (k: string, max: number) => String(form.get(k) ?? "").trim().slice(0, max);
  const title = text("title", 80);
  const message = text("message", 2000);
  const from = text("from", 60) || undefined;
  const to = text("to", 60) || undefined;
  const theme = text("theme", 10) as CardTheme;
  const audio = form.get("audio");

  if (!title) return fail("Falta el título");
  if (!message) return fail("Falta el mensaje");
  if (!THEMES.includes(theme)) return fail("Tema inválido");
  if (!(audio instanceof File) || audio.size === 0) return fail("Falta la canción");
  if (audio.size > MAX_AUDIO_BYTES) return fail("La canción pesa más de 20 MB");
  const ext = AUDIO_TYPES[audio.type];
  if (!ext) return fail("Formato de audio no soportado (usa mp3, m4a, ogg o wav)");

  const card = await saveCard({ title, message, from, to, theme, audioType: audio.type }, Buffer.from(await audio.arrayBuffer()), ext);
  return NextResponse.json({ id: card.id, url: `/i/${card.id}` }, { status: 201 });
}
