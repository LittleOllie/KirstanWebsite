"use client";

import { cn, isAnchorHref } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef, MouseEventHandler } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-text hover:bg-accent-hover shadow-card hover:shadow-soft transition-all duration-300",
  secondary:
    "bg-accent-2 text-text hover:bg-accent-2/80 shadow-card hover:shadow-soft transition-all duration-300",
  outline:
    "border border-accent bg-transparent text-text hover:bg-accent/20 transition-all duration-300",
  ghost: "bg-transparent text-text hover:bg-accent/15 transition-all duration-300",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3 text-sm tracking-wide",
  lg: "px-8 py-3.5 text-base tracking-wide",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-full font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            className={classes}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }

      if (isAnchorHref(href)) {
        const { onClick } = props;
        return (
          <a
            href={href}
            className={classes}
            onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
          >
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

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
