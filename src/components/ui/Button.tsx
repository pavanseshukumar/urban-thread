import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "sm" | "lg";

const base =
  "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-35";

const variants: Record<Variant, string> = {
  primary:
    "rounded-md bg-foreground text-background hover:opacity-90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:scale-[1.01] dark:hover:shadow-[0_4px_20px_rgba(255,255,255,0.06)]",
  secondary:
    "rounded-md border border-subtle text-foreground hover:border-foreground hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:scale-[1.01] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.04)]",
  ghost: "rounded-md text-muted hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[11px] tracking-wide uppercase",
  default: "px-6 py-3 text-[13px] tracking-wide",
  lg: "px-8 py-3.5 text-[13px] tracking-wide",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = AsButton | AsLink;

export default function Button({
  variant = "primary",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    return <a {...(props as AsLink)} className={classes} />;
  }

  return <button {...(props as AsButton)} className={classes} />;
}
