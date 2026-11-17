"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import { getLenis } from "@/lib/lenis";

/**
 * ページの一番上へ戻る（慣性スクロール［Lenis］が動いていればそれで、無ければブラウザの標準で）。
 * メニューを開いている間は Lenis が止まっていて、メニューが閉じるときに再開する（そのとき滑らかな移動は打ち切られる）ので、
 * 止まっているときは一瞬で戻す。
 */
export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, lenis.isStopped ? { immediate: true, force: true } : {});
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * ふつうの Link に、「いま開いているページと同じ場所へのリンクを押したら、そのページの一番上へ戻る」動きを足したもの
 * （2026-11-17 CEO指示「会社情報のタブを押したら、カンパニーの一番上に飛ぶように」）。
 * Next.js の Link は、同じページへのリンクを押しても位置を動かさないことがあるため、ここで明示する。
 * 別のページへのリンクや、#id 付きのリンクには何も足さない（ページを移ったときの先頭への移動は SmoothScroll が受け持つ）。
 */
export function ScrollTopLink({ href, onClick, ...rest }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (typeof href === "string" && href === pathname && !event.defaultPrevented) scrollToTop();
      }}
      {...rest}
    />
  );
}
