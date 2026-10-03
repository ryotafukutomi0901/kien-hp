/** "2025-06-10" → "2025.06.10"（参考画像の日付表記） */
export function formatDate(iso: string): string {
  return iso.replaceAll("-", ".");
}
