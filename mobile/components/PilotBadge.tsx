import React from "react";
import Svg, { Circle, Rect, Ellipse, Path, Line } from "react-native-svg";

type Props = {
  /** Rendered width/height in px (viewBox is square, so this sets both). */
  size?: number;
  /** Include the three "speed lines" to the left of the head for an in-motion feel. */
  showSpeedLines?: boolean;
  /** Stroke color for the speed lines. Defaults to brand blue for light backgrounds. */
  speedLineColor?: string;
};

/**
 * Compact mark distilled from the PeerTSplash mascot's head (goggles, navy
 * cap with red stripe, gold skin). Meant for small/reusable placements —
 * e.g. the AuthScreen header — where the full animated mascot doesn't fit.
 */
export default function PilotBadge({
  size = 64,
  showSpeedLines = false,
  speedLineColor = "#1a6eb5",
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      {showSpeedLines && (
        <>
          <Path
            d="M10 80 Q25 82 40 84"
            stroke={speedLineColor}
            strokeWidth={5}
            strokeLinecap="round"
            fill="none"
            opacity={0.8}
          />
          <Path
            d="M4 100 Q22 101 42 102"
            stroke={speedLineColor}
            strokeWidth={6}
            strokeLinecap="round"
            fill="none"
            opacity={0.55}
          />
          <Path
            d="M14 120 Q28 121 40 122"
            stroke={speedLineColor}
            strokeWidth={4}
            strokeLinecap="round"
            fill="none"
            opacity={0.35}
          />
        </>
      )}

      {/* CABEZA */}
      <Circle cx={100} cy={95} r={42} fill="#FBBF24" />

      {/* SOMBRERO */}
      <Ellipse cx={100} cy={62} rx={40} ry={10} fill="#1E3A5F" />
      <Rect x={64} y={52} width={72} height={20} rx={11} fill="#1E3A5F" />
      <Ellipse cx={100} cy={52} rx={31} ry={10} fill="#2563EB" />
      <Rect x={64} y={68} width={72} height={7} rx={3.5} fill="#EF4444" />
      <Circle cx={100} cy={57} r={6} fill="#FDE68A" />

      {/* LENTES */}
      <Rect x={70} y={88} width={26} height={18} rx={8} fill="#1E3A5F" />
      <Rect x={104} y={88} width={26} height={18} rx={8} fill="#1E3A5F" />
      <Line x1={96} y1={97} x2={104} y2={97} stroke="#1E3A5F" strokeWidth={4} />
      <Rect x={73} y={91} width={20} height={12} rx={6} fill="#60A5FA" opacity={0.9} />
      <Rect x={107} y={91} width={20} height={12} rx={6} fill="#60A5FA" opacity={0.9} />

      {/* CARA */}
      <Ellipse cx={100} cy={108} rx={5} ry={4} fill="#F59E0B" />
      <Path
        d="M88 116 Q100 128 112 116"
        stroke="#92400E"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}
