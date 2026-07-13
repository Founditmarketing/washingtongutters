export default function Eyebrow({ children, color = "copper", icon: Icon }) {
  const accent = color === "copper" ? "text-[var(--color-copper)]" : "text-white/80";
  const rule = color === "copper" ? "bg-[var(--color-copper)]" : "bg-white/40";
  return (
    <span className={`inline-flex items-center gap-2 ${accent} text-[11px] tracking-[0.3em] uppercase font-semibold`}>
      {Icon ? <Icon className="w-3.5 h-3.5" /> : <span className={`h-px w-8 ${rule}`} />}
      {children}
    </span>
  );
}
