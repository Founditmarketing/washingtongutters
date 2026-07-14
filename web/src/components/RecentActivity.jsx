import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

/*
 * Subtle social-proof ticker that surfaces real-feeling recent activity.
 * Restrained — no flashing toasts, no FOMO countdown timers. Just a quiet
 * pulse that says "this company is actively booking work in your area."
 *
 * Replace the static array with a Jobber webhook-fed feed in Phase 2.5.
 */

const ACTIVITY = [
  { city: "Edmonds", action: "booked install", when: "12 min ago" },
  { city: "Bellevue", action: "got an estimate", when: "38 min ago" },
  { city: "Mill Creek", action: "added gutter guards", when: "1 hr ago" },
  { city: "Bothell", action: "completed install", when: "2 hr ago" },
  { city: "Kirkland", action: "requested a quote", when: "3 hr ago" },
  { city: "Lynnwood", action: "booked replacement", when: "4 hr ago" },
];

export default function RecentActivity() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ACTIVITY.length), 4500);
    return () => clearInterval(t);
  }, []);

  const a = ACTIVITY[idx];

  return (
    <div
      className="hidden md:flex items-center gap-2.5 text-white/85 text-[13px]"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[var(--color-copper)] opacity-75" />
        <span className="relative inline-flex rounded-none h-2 w-2 bg-[var(--color-copper)]" />
      </span>
      <MapPin className="w-3.5 h-3.5 text-[var(--color-copper)]" />
      <span className="tabular-nums">
        <span className="text-white font-semibold">{a.city}</span> · {a.action} · {a.when}
      </span>
    </div>
  );
}
