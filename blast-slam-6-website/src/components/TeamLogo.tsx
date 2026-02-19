"use client";

import { useState } from "react";
import Image from "next/image";
import { getTeamLogo, imageBlurDataUrl } from "@/lib/assets";

interface TeamLogoProps {
  name: string;
  size?: number;
  className?: string;
}

/**
 * Renders a team logo image with a styled-initials fallback.
 */
export default function TeamLogo({ name, size = 32, className = "" }: TeamLogoProps) {
  const [failed, setFailed] = useState(false);
  const src = getTeamLogo(name);

  if (failed) {
    // Fallback: team initials in a styled circle
    const initials = name
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-blast-surface border border-blast-border font-heading font-bold text-blast-lime shrink-0 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.38 }}
      >
        {initials}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={`object-contain shrink-0 ${className}`}
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
      placeholder="blur"
      blurDataURL={imageBlurDataUrl}
    />
  );
}
