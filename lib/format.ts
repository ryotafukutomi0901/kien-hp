/** "2025-06-10" → "2025.06.10"（参考画像の日付表記） */
export function formatDate(iso: string): string {
  return iso.replaceAll("-", ".");
}

/** "0545-32-7860" → "tel:0545327860"（数字と + 以外を落とす） */
export function toTelHref(tel: string): string {
  return `tel:${tel.replace(/[^\d+]/g, "")}`;
}
