export function RouteSpinner({ size = 56 }: { size?: number }) {
  return (
    <div className="animate-spin" aria-hidden>
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="26" stroke="var(--color-orange)" strokeWidth="3" />
        <circle cx="30" cy="30" r="18" stroke="var(--color-orange)" strokeWidth="3" />
        <circle cx="30" cy="30" r="10" stroke="var(--color-orange)" strokeWidth="3" />
        <circle cx="30" cy="30" r="4" fill="var(--color-orange)" />
      </svg>
    </div>
  );
}
