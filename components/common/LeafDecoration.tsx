import Image from "next/image";

import styles from "./LeafDecoration.module.css";

export type LeafVariant = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "single" | "small";

const LEAVES: Record<LeafVariant, { src: string; width: number; height: number }> = {
  "top-left": { src: "/images/decor/leaf-top-left.png", width: 148, height: 118 },
  "top-right": { src: "/images/decor/leaf-top-right.png", width: 154, height: 126 },
  "bottom-left": { src: "/images/decor/leaf-bottom-left.png", width: 138, height: 118 },
  "bottom-right": { src: "/images/decor/leaf-bottom-right.png", width: 162, height: 98 },
  single: { src: "/images/decor/leaf-single.png", width: 74, height: 118 },
  small: { src: "/images/decor/leaf-small.png", width: 136, height: 90 },
};

/**
 * 水彩風の葉っぱ装飾。位置・大きさは呼び出し側のclassNameで決める
 * （親要素に position: relative を付け、このclassNameで top/left/width 等を指定する）。
 * 装飾なので alt は空、スクリーンリーダーから隠す。
 */
export function LeafDecoration({
  variant,
  className,
  flip = false,
}: {
  variant: LeafVariant;
  className?: string;
  /** 左右反転して使い回す場合 */
  flip?: boolean;
}) {
  const leaf = LEAVES[variant];
  return (
    <div className={[styles.leaf, flip && styles.flip, className].filter(Boolean).join(" ")} aria-hidden="true">
      <Image src={leaf.src} alt="" width={leaf.width} height={leaf.height} className={styles.image} />
    </div>
  );
}
