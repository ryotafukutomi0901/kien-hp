import type { SVGProps } from "react";

import type { IconName } from "@/types/site";

/**
 * 線画アイコン（24pxグリッド、currentColor）。
 * 装飾目的のため既定で aria-hidden。意味を持たせる場合は呼び出し側で aria-label を付ける。
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </Svg>
  );
}

/*
 * 事業の絵記号（house / person / sun / heart / clipboard / document）は手描き風に描いている。
 * 汎用アイコンセットのような正確な幾何形にせず、線の端を閉じ切らない・屋根の線が頂点で交差する・
 * 光の線の長さをそろえない、などで「人の手で描いた」揺らぎを残す（2026-10-04 CEO指摘「AIっぽい」への対応）。
 * 主な使い道は components/common/ToneMark（淡い色面＋紺の線）。単体で使うときも同じ絵柄になる。
 */
export function HouseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.2 11.8C6.2 9.2 9.3 6.6 12.6 3.9" />
      <path d="M11.4 4.2c3.2 2.3 6.3 4.7 9.4 7.3" />
      <path d="M6.1 9.8c-.4 3.4-.3 6.9.1 10.3 4-.1 7.9 0 11.9-.2.3-3.4.3-6.8 0-10.3" />
      <path d="M10.3 20c-.2-1.6-.1-3.2.1-4.7 1-.6 2.5-.6 3.4 0 .2 1.6.2 3.1 0 4.6" />
      <path d="M16.2 7.6c-.1-1-.1-1.9 0-2.9.6-.1 1.3-.1 1.9 0 .1 1.4.1 2.8 0 4.2" />
    </Svg>
  );
}

export function PersonIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12.6 3.7c2.2.3 3.6 2.2 3.4 4.3-.2 2.1-2 3.6-4.1 3.4-2.1-.2-3.7-2.1-3.5-4.2.2-1.9 1.8-3.4 3.7-3.5.4 0 .7 0 1 .1" />
      <path d="M4.6 20.5c.3-3.9 3.3-6.8 7.2-6.9 3.9-.1 7 2.6 7.5 6.6" />
    </Svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12.4 7.5c2.4.2 4.2 2.3 4 4.7-.2 2.4-2.2 4.2-4.6 4-2.4-.1-4.2-2.2-4-4.6.2-2.3 2.1-4.1 4.4-4.1.2 0 .5 0 .8.1" />
      <path d="M12 2.3c.1.8.1 1.7 0 2.5M12.3 19.6c0 .7 0 1.3-.1 2M2.4 12.2c.8-.1 1.6-.1 2.3 0M19.7 11.9c.6 0 1.2 0 1.8.1M5.2 5c.6.5 1 1.1 1.5 1.7M17.5 17.3c.4.5.9.9 1.3 1.4M5.5 18.8c.4-.6.9-1.1 1.4-1.5M17.2 6.8c.5-.6 1-1.1 1.6-1.5" />
    </Svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12.2 19.8c-3.7-2.5-7.8-5.7-7.9-9.8-.1-2.6 1.8-4.6 4.1-4.6 1.6 0 2.8.9 3.6 2.3.8-1.4 2.1-2.4 3.7-2.3 2.3.1 4.1 2.1 3.9 4.6-.3 4-4.1 7.1-7.8 9.6" />
    </Svg>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.1 5.8c-.4 4.9-.3 9.8.1 14.7 4 .2 7.9.2 11.8-.1.3-4.9.3-9.7 0-14.6" />
      <path d="M9 6.1c-.2-.9 0-1.8.4-2.5h5.1c.4.7.5 1.6.3 2.5-1.9.2-3.9.2-5.8 0Z" />
      <path d="M9 10.5c2-.1 4-.1 6 .1M9.1 13.8c1.8-.1 3.7-.1 5.5 0M9 17c1.2-.1 2.4-.1 3.6 0" />
    </Svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.3 3.8c-.3 5.6-.2 11.1.1 16.7 3.9.2 7.8.2 11.6-.1.2-3.6.2-7.3 0-11-1.3-1.9-2.6-3.8-4.1-5.7-2.5-.1-5.1-.1-7.6.1" />
      <path d="M13.9 3.8c-.1 1.5-.1 2.9.1 4.4 1.3.2 2.7.2 4 .1" />
      <path d="M9 12.5c2-.1 3.9-.1 5.9 0M9 15.7c1.5-.1 3.1-.1 4.6 0" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8.5 3.5 9.9 7.3 8 9.2A12 12 0 0 0 14.8 16l1.9-1.9 3.8 1.4V18a2 2 0 0 1-2.1 2C10.8 19.6 4.4 13.2 4 5.6a2 2 0 0 1 2-2.1Z" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Svg {...props} fill="currentColor" stroke="none">
      <path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2Z" />
    </Svg>
  );
}

const SERVICE_ICONS: Record<IconName, (props: IconProps) => React.JSX.Element> = {
  house: HouseIcon,
  person: PersonIcon,
  sun: SunIcon,
  heart: HeartIcon,
  clipboard: ClipboardIcon,
  document: DocumentIcon,
};

/** data の icon 名から絵記号を引く（ふつうは components/common/ToneMark 経由で使う） */
export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Component = SERVICE_ICONS[name];
  return <Component {...props} />;
}
