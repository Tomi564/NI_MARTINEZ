export default function PageHeroTitle({ text }: { text: string }) {
  const parts = text.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length === 1) {
    return <>{parts[0]}</>;
  }
  const [first, second, ...rest] = parts;
  return (
    <>
      {first}{" "}
      <span className="text-orange">{second}</span>
      {rest.length > 0 ? <> {rest.join(" ")}</> : null}
    </>
  );
}
