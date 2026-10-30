"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { ToneMark } from "@/components/common/ToneMark";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon } from "@/components/icons";
import { getLenis } from "@/lib/lenis";
import type { Link as NavLink, NavItem } from "@/types/site";

import styles from "./MobileMenu.module.css";
import dropdownStyles from "./NavDropdown.module.css";

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
 * ヘッダー（PC）の「事業内容」。マウスを乗せると3事業のタブが開く（2026-10-28 CEO指示）。
 * - マウス: 乗せると開き、離すと閉じる
 * - キーボード・タップ: ボタンで開閉。Esc で閉じてボタンへ戻る。タブから外へ移ると閉じる
 * 子項目のどれかを開いているページでは、「事業内容」に現在地の下線を付ける（data-current）。
 */
function NavDropdown({ item, linkClassName }: { item: NavItem; linkClassName: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const children = item.children ?? [];
  const current = children.some((child) => isCurrent(pathname, child.href));
  return (
    <li
      className={dropdownStyles.item}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`${linkClassName} ${dropdownStyles.trigger}`}
        aria-expanded={open}
        aria-controls={panelId}
        data-current={current || undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{item.label}</span>
        <ChevronDownIcon size={14} strokeWidth={2.4} className={dropdownStyles.chevron} />
      </button>
      <div id={panelId} className={dropdownStyles.panel} hidden={!open}>
        <ul className={dropdownStyles.tabs}>
          {children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className={[dropdownStyles.tab, child.tone && dropdownStyles[child.tone]].filter(Boolean).join(" ")}
                aria-current={isCurrent(pathname, child.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {child.icon && child.tone && (
                  <span className={dropdownStyles.stamp}>
                    <ToneMark icon={child.icon} tone={child.tone} className={dropdownStyles.mark} />
                  </span>
                )}
                {/* 事業名は日本語だけ（2026-10-28 CEO指示。欧文はやめた） */}
                <span className={dropdownStyles.label}>{child.label}</span>
                <ArrowRightIcon size={16} className={dropdownStyles.arrow} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/**
 * ナビの項目（li）を描画する。現在地の判定に usePathname が要るためクライアント側で描く。
 * PCナビ（Header）とメニューパネルの両方で使う。
 * 現在地には aria-current="page" を付け、見た目は各CSSの [aria-current] で付ける。
 * 子項目のある項目（事業内容）は、PCナビではマウスで開くタブ（NavDropdown）、メニューパネルでは見出し＋子項目の一覧にする。
 */
export function NavItems({
  nav,
  linkClassName,
  withArrow = false,
}: {
  nav: NavItem[];
  linkClassName: string;
  withArrow?: boolean;
}) {
  const pathname = usePathname();
  return nav.map((item) => {
    if (item.children?.length) {
      if (!withArrow) return <NavDropdown key={item.href} item={item} linkClassName={linkClassName} />;
      // メニューパネル: 「事業内容」を見出しにして、3事業を1段下げて並べる
      return (
        <li key={item.href} className={styles.group}>
          <span className={styles.groupLabel}>{item.label}</span>
          <ul className={styles.subList}>
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={`${linkClassName} ${styles.subLink}`}
                  aria-current={isCurrent(pathname, child.href) ? "page" : undefined}
                >
                  <span className={styles.subLabel}>
                    {child.icon && child.tone && <ToneMark icon={child.icon} tone={child.tone} className={styles.subMark} />}
                    {child.label}
                  </span>
                  <ArrowRightIcon size={20} className={styles.arrow} />
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    return (
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
    );
  });
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
export function MobileMenu({ nav, contact }: { nav: NavItem[]; contact: NavLink }) {
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

  // 慣性スクロール（Lenis）も、メニューを開いている間は止める（背景のページが動かないように）
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
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
        {open ? (
          <CloseIcon size={22} />
        ) : (
          <span className={styles.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}
        <span className={styles.toggleLabel}>{open ? "閉じる" : "メニュー"}</span>
      </button>
      <div id={panelId} className={styles.panel} hidden={!open} data-lenis-prevent>
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
