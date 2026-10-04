"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { ArrowRightIcon, CloseIcon, MenuIcon } from "@/components/icons";
import type { Link as NavLink } from "@/types/site";

import styles from "./MobileMenu.module.css";

/** PCナビを表示し始める幅。Header.module.css / MobileMenu.module.css の 1280px と揃える */
const DESKTOP_QUERY = "(min-width: 1280px)";

/**
 * 現在地の判定。ハッシュ付きリンク（/about#offices と /about#company）は
 * 同じページで複数項目が同時に該当してしまうため対象外にする。
 */
function isCurrent(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * ナビの項目（li）を描画する。現在地の判定に usePathname が要るためクライアント側で描く。
 * PCナビ（Header）とメニューパネルの両方で使う。
 * 現在地には aria-current="page" を付け、見た目は各CSSの [aria-current] で付ける。
 */
export function NavItems({
  nav,
  linkClassName,
  withArrow = false,
}: {
  nav: NavLink[];
  linkClassName: string;
  withArrow?: boolean;
}) {
  const pathname = usePathname();
  return nav.map((item) => (
    <li key={item.href}>
      <Link
        href={item.href}
        className={linkClassName}
        aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
      >
        <span>{item.label}</span>
        {withArrow && <ArrowRightIcon size={20} className={styles.arrow} />}
      </Link>
    </li>
  ));
}

/** Tab で巡回させる要素（非表示のものは除く） */
function focusablesIn(region: HTMLElement) {
  return [...region.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
    (el) => el.getClientRects().length > 0,
  );
}

/**
 * 1279px以下で表示するメニュー（参考モックに無いため、トークンとトンマナに合わせて設計）。
 * - ヘッダー直下に全面パネルを開く。開いている間は背景のスクロールを止める
 * - Escで閉じ、フォーカスをメニューボタンへ戻す
 * - 開いている間は Tab がヘッダー（ロゴ・お問い合わせ・メニューボタン・パネル）の中だけを巡回する
 * - ヘッダー内のリンクを押したら閉じる（同じページ内のハッシュリンクでも閉じるよう、遷移ではなくクリックで判定）
 * - 1280px以上に広がったら自動で閉じる（PCナビに切り替わるため）
 */
export function MobileMenu({ nav, contact }: { nav: NavLink[]; contact: NavLink }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!open || !root) return;
    const region = root.closest<HTMLElement>("header") ?? root;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusablesIn(region);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (!region.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    const onClick = (e: Event) => {
      if (e.target instanceof Element && e.target.closest("a")) setOpen(false);
    };

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    region.addEventListener("click", onClick);
    desktop.addEventListener("change", onDesktop);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      region.removeEventListener("click", onClick);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        <span className={styles.toggleLabel}>{open ? "閉じる" : "メニュー"}</span>
      </button>
      <div id={panelId} className={styles.panel} hidden={!open}>
        <Container className={styles.panelInner}>
          <nav aria-label="メニュー">
            <ul className={styles.list}>
              <NavItems nav={nav} linkClassName={styles.link} withArrow />
            </ul>
          </nav>
          <Button href={contact.href} size="lg" className={styles.contact}>
            {contact.label}
          </Button>
        </Container>
      </div>
    </div>
  );
}
