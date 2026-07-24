import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  viewAllHref,
  viewAllLabel = "View All",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-end justify-between mb-10 lg:mb-12 ${className}`}>
      <h2 className="text-display-md">{title}</h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="nav-link text-[12px] font-medium text-muted hover:text-fg tracking-[0.1em] uppercase flex items-center gap-2 pb-0.5 transition-colors duration-200"
        >
          {viewAllLabel}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
