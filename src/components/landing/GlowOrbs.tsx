/**
 * Animated, blurred gradient orbs for hero backgrounds.
 * Pure CSS, GPU-cheap. Hidden from a11y tree.
 */
export function GlowOrbs() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="glow-orb animate-orb-drift"
        style={{
          top: "-10%",
          left: "10%",
          width: 520,
          height: 520,
          background: "hsl(217 91% 60% / 0.55)",
        }}
      />
      <div
        className="glow-orb animate-orb-drift"
        style={{
          top: "20%",
          right: "5%",
          width: 460,
          height: 460,
          background: "hsl(188 91% 43% / 0.45)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="glow-orb animate-orb-drift"
        style={{
          bottom: "-15%",
          left: "30%",
          width: 600,
          height: 600,
          background: "hsl(258 90% 66% / 0.35)",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}