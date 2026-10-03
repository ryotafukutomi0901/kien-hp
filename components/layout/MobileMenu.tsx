"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";
import type { Link as NavLink } from "@/types/site";

import styles from "./MobileMenu.module.css";

/** 1023px以下で表示するメニュー。PHASE 1は開閉の挙動のみ、見た目はHeader担当 */
export function MobileMenu({ nav, contact }: { nav: NavLink[]; contact: NavLink }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
        <span className="visually-hidden">{open ? "メニューを閉じる" : "メニューを開く"}</span>
      </button>
      <div id={panelId} className={styles.panel} hidden={!open}>
        <nav aria-label="モバイルナビゲーション">
          <ul className={styles.list}>
            {[...nav, contact].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
