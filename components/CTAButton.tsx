"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "coral" | "white";
type Size = "sm" | "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
}

interface ButtonProps extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
  children: ReactNode;
}

interface LinkProps extends SharedProps {
  href: string;
  external?: boolean;
  children: ReactNode;
}

type CTAButtonProps = ButtonProps | LinkProps;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-sage-500 text-white hover:bg-sage-600 active:bg-sage-700 shadow-soft hover:shadow-card",
  secondary:
    "border-2 border-sage-500 text-sage-600 hover:bg-sage-50 active:bg-sage-100",
  ghost: "text-sage-600 hover:bg-sage-50 active:bg-sage-100",
  coral:
    "bg-coral-500 text-white hover:bg-coral-600 active:bg-coral-700 shadow-soft hover:shadow-card",
  white:
    "bg-white text-sage-700 hover:bg-cream-50 active:bg-cream-100 shadow-soft hover:shadow-card",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm font-medium rounded-xl",
  md: "px-6 py-3 text-base font-semibold rounded-2xl",
  lg: "px-8 py-4 text-lg font-semibold rounded-2xl",
};

export default function CTAButton(props: CTAButtonProps) {
  const { variant = "primary", size = "md", children, className = "", fullWidth } = props as ButtonProps & LinkProps;

  const classes = [
    "inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...rest } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonRest } = props as ButtonProps & { href?: undefined };
  return (
    <button {...buttonRest} className={classes}>
      {children}
    </button>
  );
}
