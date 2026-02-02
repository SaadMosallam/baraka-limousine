type LogoMarkProps = {
  className?: string;
};

type LogoLockupProps = {
  label: string;
  className?: string;
  markClassName?: string;
  textClassName?: string;
  stacked?: boolean;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 180 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 52C28 30 58 20 96 20H116C140 20 160 28 172 44" />
        <path d="M26 52H160" />
        <path d="M68 28H98" />
      </g>
    </svg>
  );
}

export function LogoLockup({
  label,
  className,
  markClassName,
  textClassName,
  stacked,
}: LogoLockupProps) {
  const layout = stacked ? "flex-col" : "flex-row";
  return (
    <span className={`inline-flex items-center gap-3 ${layout} ${className ?? ""}`}>
      <LogoMark className={markClassName ?? "h-6 w-16"} />
      <span className={`text-current ${textClassName ?? "text-base font-semibold tracking-wide"}`}>
        {label}
      </span>
    </span>
  );
}
