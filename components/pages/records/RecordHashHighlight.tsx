"use client";

import { useEffect } from "react";

/**
 * URL のハッシュ（#<record.id>）に一致する記事に data-current を付け、RecordList の強調表示を出す。
 *
 * 直接アクセスやページ内の <a href="#..."> は CSS の :target だけで強調できるが、トップのカードなど
 * next/link からの遷移は history.pushState で URL を変えるため :target が更新されない。その分をここで補う。
 * 何も描画しない。JS が無い環境では :target による強調だけになる。
 */
export function RecordHashHighlight() {
  useEffect(() => {
    let current: Element | null = null;
    const apply = () => {
      current?.removeAttribute("data-current");
      const id = decodeURIComponent(window.location.hash.slice(1));
      current = id ? document.getElementById(id) : null;
      current?.setAttribute("data-current", "");
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => {
      window.removeEventListener("hashchange", apply);
      current?.removeAttribute("data-current");
    };
  }, []);

  return null;
}
