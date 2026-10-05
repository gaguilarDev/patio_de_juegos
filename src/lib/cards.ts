import { randomBytes, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type CardTheme = "rosa" | "dorado" | "noche";

export interface Card {
  id: string;
  title: string;
  message: string;
  from?: string;
  to?: string;
  theme: CardTheme;
  audioFile: string;
  audioType: string;
  createdAt: string;
}

export const THEMES: CardTheme[] = ["rosa", "dorado", "noche"];
export const MAX_AUDIO_BYTES = 20 * 1024 * 1024;
export const AUDIO_TYPES: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
  "audio/aac": "aac",
  "audio/ogg": "ogg",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/webm": "webm",
};

const DATA_DIR = path.resolve(process.env.DATA_DIR ?? "./data");
const CARDS_DIR = path.join(DATA_DIR, "cards");
const ID_RE = /^[A-Za-z0-9_-]{8,32}$/;

export const isValidId = (id: string) => ID_RE.test(id);
export const cardPath = (id: string, file: string) => path.join(CARDS_DIR, id, file);

export function checkAdmin(password: string | null): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return process.env.NODE_ENV !== "production";
  if (!password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function saveCard(
  data: Omit<Card, "id" | "createdAt" | "audioFile">,
  audio: Buffer,
  ext: string,
): Promise<Card> {
  const id = randomBytes(9).toString("base64url");
  const card: Card = { ...data, id, audioFile: `song.${ext}`, createdAt: new Date().toISOString() };
  const dir = path.join(CARDS_DIR, id);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, card.audioFile), audio);
  await fs.writeFile(path.join(dir, "card.json"), JSON.stringify(card, null, 2));
  return card;
}

export async function getCard(id: string): Promise<Card | null> {
  if (!isValidId(id)) return null;
  try {
    return JSON.parse(await fs.readFile(path.join(CARDS_DIR, id, "card.json"), "utf-8")) as Card;
  } catch {
    return null;
  }
}

export type PublicCard = Pick<Card, "id" | "title" | "message" | "from" | "to" | "theme">;
export const toPublic = ({ id, title, message, from, to, theme }: Card): PublicCard => ({
  id, title, message, from, to, theme,
});
