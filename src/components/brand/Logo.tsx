import Image from "next/image";
import Link from "next/link";

/* DA monogram SVG — matches the actual brand mark from logo1.jpeg */
export function DAMonogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* D — rounded rectangular outer shape with curved right side */}
      <path
        d="M18 15 H48 C68 15 78 30 78 50 C78 70 68 85 48 85 H18 Z"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      {/* A — triangular form inside the D */}
      <path
        d="M32 85 L50 25 L68 85"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* A crossbar */}
      <line
        x1="38"
        x2="62"
        y1="68"
        y2="68"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Horizontal lockup: DA monogram + DIALGA wordmark side by side */
export function LogoHorizontal({ className = "", light = false }: { className?: string; light?: boolean }) {
  const textColor = light ? "text-white" : "text-fg";
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <DAMonogram className={`w-10 h-10 ${textColor}`} />
      <span className={`font-display text-[1.35rem] font-semibold tracking-[0.18em] uppercase ${textColor}`}>
        DIALGA
      </span>
    </Link>
  );
}

/* Compact navbar logo: DA monogram + DIALGA */
export function LogoNav({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <DAMonogram className="w-9 h-9 text-fg" />
      <span className="font-display text-[1.25rem] font-semibold tracking-[0.18em] uppercase text-fg">
        DIALGA
      </span>
    </Link>
  );
}

/* Full vertical lockup for hero / footer */
export function LogoLockup({ className = "", light = false }: { className?: string; light?: boolean }) {
  const textColor = light ? "text-white" : "text-fg";
  const subColor = light ? "text-white/60" : "text-muted";
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <DAMonogram className={`w-16 h-16 ${textColor}`} />
      <span className={`font-display text-[1.6rem] font-semibold tracking-[0.22em] uppercase ${textColor}`}>
        DIALGA
      </span>
      <span className={`text-[0.75rem] tracking-[0.18em] ${subColor} italic`} style={{ fontFamily: "Georgia, serif" }}>
        Elevate your style
      </span>
    </div>
  );
}

/* White version for dark overlays */
export function LogoLockupWhite({ className = "" }: { className?: string }) {
  return <LogoLockup className={className} light />;
}

/* Use the JPEG logo for hero where the full lockup is needed */
export function LogoHeroImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/brand/logo1.jpeg"
        alt="DIALGA — Elevate your style"
        width={280}
        height={280}
        className="object-contain"
        priority
      />
    </div>
  );
}
