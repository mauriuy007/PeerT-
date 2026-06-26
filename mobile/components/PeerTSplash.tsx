import React, { useEffect } from "react";
import { StyleSheet, Dimensions, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";
import Svg, {
  Circle, Rect, Ellipse, Path, Line, G, Text as SvgText,
} from "react-native-svg";

const { width } = Dimensions.get("window");

type Props = { onFinish?: () => void };

export default function PeerTSplash({ onFinish }: Props) {
  const flyX     = useSharedValue(-width);
  const scale    = useSharedValue(0.9);
  const translateY = useSharedValue(0);
  const opacity  = useSharedValue(0);
  const bobY     = useSharedValue(0);
  const armRotate = useSharedValue(-12);
  const textOpacity = useSharedValue(0);
  const textY    = useSharedValue(14);

  useEffect(() => {
    // Vuela desde la izquierda al centro
    flyX.value = withTiming(0, { duration: 650, easing: Easing.out(Easing.cubic) });
    opacity.value = withTiming(1, { duration: 350 });

    // Bounce al llegar al centro
    scale.value = withDelay(520, withSequence(
      withTiming(1.1,  { duration: 260, easing: Easing.out(Easing.quad) }),
      withTiming(0.95, { duration: 130 }),
      withTiming(1,    { duration: 110 }),
    ));
    translateY.value = withDelay(520, withSequence(
      withTiming(-8, { duration: 260 }),
      withTiming(3,  { duration: 130 }),
      withTiming(0,  { duration: 110 }),
    ));

    // Bob continuo después del aterrizaje
    bobY.value = withDelay(900, withRepeat(
      withSequence(
        withTiming(-10, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        withTiming(0,   { duration: 1500, easing: Easing.inOut(Easing.sin) }),
      ),
      -1, true
    ));

    // Saludo del brazo
    armRotate.value = withDelay(900, withRepeat(
      withSequence(
        withTiming(22,  { duration: 450, easing: Easing.inOut(Easing.sin) }),
        withTiming(-12, { duration: 450, easing: Easing.inOut(Easing.sin) }),
      ),
      -1, false
    ));

    // Texto
    textOpacity.value = withDelay(700, withTiming(1, { duration: 500 }));
    textY.value       = withDelay(700, withTiming(0, { duration: 500 }));

    const timer = setTimeout(() => onFinish?.(), 2600);
    return () => clearTimeout(timer);
  }, []);

  const sceneStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: flyX.value },
      { scale: scale.value },
      { translateY: translateY.value + bobY.value },
    ],
  }));

  const armStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${armRotate.value}deg` }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textY.value }],
  }));

  return (
    <Animated.View style={styles.splash}>
      <Cloud style={{ top: "12%", width: 90, height: 28 }} delay={0} />
      <Cloud style={{ top: "28%", width: 60, height: 18 }} delay={3000} />
      <Cloud style={{ top: "62%", width: 110, height: 32 }} delay={1500} />

      <Animated.View style={sceneStyle}>
        <Svg width={260} height={230} viewBox="0 0 260 230">
          {/* AVIÓN */}
          <Path d="M20 148 Q60 132 180 136 Q220 137 240 148 Q220 160 180 160 Q60 168 20 148Z" fill="#E8F4FF"/>
          <Path d="M220 148 Q245 144 256 148 Q245 153 220 148Z" fill="#CBD5E1"/>
          <Rect x={185} y={138} width={22} height={14} rx={4} fill="#93C5FD" opacity={0.9}/>
          <Rect x={195} y={139} width={6} height={4} rx={2} fill="white" opacity={0.6}/>
          <Rect x={140} y={140} width={10} height={8} rx={3} fill="#93C5FD" opacity={0.7}/>
          <Rect x={120} y={141} width={10} height={8} rx={3} fill="#93C5FD" opacity={0.7}/>
          <Rect x={100} y={141} width={10} height={8} rx={3} fill="#93C5FD" opacity={0.7}/>
          <Rect x={80}  y={142} width={10} height={8} rx={3} fill="#93C5FD" opacity={0.7}/>
          <Path d="M110 158 Q130 195 170 200 Q155 160 110 158Z" fill="#CBD5E1"/>
          <Path d="M110 158 Q130 195 70 202 Q85 160 110 158Z" fill="#D1D5DB"/>
          <Path d="M38 152 Q28 168 18 172 Q25 155 38 152Z" fill="#CBD5E1"/>
          <Path d="M38 145 Q28 130 18 126 Q25 143 38 145Z" fill="#CBD5E1"/>
          <Path d="M30 148 Q22 118 35 108 Q42 120 38 148Z" fill="#CBD5E1"/>
          <Path d="M22 148 Q90 143 220 146" stroke="#378ADD" strokeWidth={2.5} fill="none" opacity={0.6}/>
          <Ellipse cx={118} cy={178} rx={14} ry={8} fill="#94A3B8"/>
          <Ellipse cx={118} cy={178} rx={10} ry={5} fill="#64748B"/>

          {/* PILOTO: PIERNAS */}
          <Rect x={104} y={140} width={13} height={22} rx={6} fill="#1E3A5F"/>
          <Ellipse cx={110} cy={164} rx={9} ry={5} fill="#111827"/>
          <Rect x={123} y={140} width={13} height={22} rx={6} fill="#1E3A5F"/>
          <Ellipse cx={129} cy={164} rx={9} ry={5} fill="#111827"/>

          {/* PILOTO: CUERPO */}
          <Rect x={100} y={108} width={40} height={36} rx={12} fill="#3B82F6"/>
          <Rect x={100} y={108} width={13} height={24} rx={6} fill="#2563EB"/>
          <Rect x={127} y={108} width={13} height={24} rx={6} fill="#2563EB"/>
          <Circle cx={120} cy={118} r={2.5} fill="#93C5FD"/>
          <Circle cx={120} cy={127} r={2.5} fill="#93C5FD"/>

          {/* PILOTO: BRAZO IZQUIERDO */}
          <Rect x={84} y={114} width={16} height={10} rx={5} fill="#FBBF24"/>
          <Ellipse cx={82} cy={119} rx={8} ry={6} fill="#FDE68A"/>

          {/* PILOTO: CABEZA */}
          <Circle cx={120} cy={88} r={30} fill="#FBBF24"/>

          {/* PILOTO: SOMBRERO */}
          <Ellipse cx={120} cy={62} rx={28} ry={7} fill="#1E3A5F"/>
          <Rect x={96} y={56} width={48} height={14} rx={8} fill="#1E3A5F"/>
          <Ellipse cx={120} cy={56} rx={22} ry={7} fill="#2563EB"/>
          <Rect x={96} y={67} width={48} height={5} rx={2.5} fill="#EF4444"/>
          <Circle cx={120} cy={60} r={5} fill="#FDE68A"/>
          <SvgText x={120} y={64} fontSize={6} textAnchor="middle" fill="#1E3A5F" fontWeight="bold">★</SvgText>

          {/* PILOTO: LENTES */}
          <Rect x={100} y={83} width={17} height={12} rx={5} fill="#1E3A5F"/>
          <Rect x={123} y={83} width={17} height={12} rx={5} fill="#1E3A5F"/>
          <Line x1={117} y1={89} x2={123} y2={89} stroke="#1E3A5F" strokeWidth={2.5}/>
          <Rect x={102} y={85} width={13} height={8} rx={4} fill="#60A5FA" opacity={0.9}/>
          <Rect x={125} y={85} width={13} height={8} rx={4} fill="#60A5FA" opacity={0.9}/>
          <Line x1={98}  y1={89} x2={100} y2={89} stroke="#1E3A5F" strokeWidth={2}/>
          <Line x1={140} y1={89} x2={142} y2={89} stroke="#1E3A5F" strokeWidth={2}/>

          {/* PILOTO: CARA */}
          <Ellipse cx={120} cy={97} rx={4} ry={3} fill="#F59E0B"/>
          <Path d="M110 103 Q120 112 130 103" stroke="#92400E" strokeWidth={2} fill="none" strokeLinecap="round"/>
          <Circle cx={104} cy={98} r={5} fill="#F87171" opacity={0.4}/>
          <Circle cx={136} cy={98} r={5} fill="#F87171" opacity={0.4}/>
        </Svg>

        {/* BRAZO DERECHO ANIMADO
            Centro en coords SVG ≈ (140, 114) → hombro derecho del piloto
            left = 140 - 30 = 110, top = 114 - 30 = 84                    */}
        <Animated.View style={[styles.armContainer, armStyle]}>
          <Svg width={60} height={60} viewBox="0 0 60 60">
            <G transform="translate(30,30) rotate(-120)">
              <Rect x={-6} y={0}  width={12} height={22} rx={6} fill="#FBBF24"/>
              <Rect x={-6} y={18} width={12} height={18} rx={6} fill="#FBBF24"/>
              <Ellipse cx={0} cy={38} rx={9} ry={7} fill="#FDE68A"/>
              <Ellipse cx={-5} cy={33} rx={3} ry={5} fill="#FDE68A"/>
              <Ellipse cx={-1} cy={31} rx={3} ry={5} fill="#FDE68A"/>
              <Ellipse cx={4}  cy={31} rx={3} ry={5} fill="#FDE68A"/>
              <Ellipse cx={8}  cy={33} rx={3} ry={5} fill="#FDE68A"/>
            </G>
          </Svg>
        </Animated.View>
      </Animated.View>

      <Animated.Text style={[styles.appName, textStyle]}>PeerT</Animated.Text>
      <Animated.Text style={[styles.tagline, textStyle]}>Tu copiloto de viajes</Animated.Text>

      <Animated.View style={[styles.dots, textStyle]}>
        <LoadingDot delay={0}/>
        <LoadingDot delay={200}/>
        <LoadingDot delay={400}/>
      </Animated.View>
    </Animated.View>
  );
}

function Cloud({ style, delay }: { style: ViewStyle; delay: number }) {
  const x = useSharedValue(width);
  useEffect(() => {
    x.value = withDelay(delay, withRepeat(
      withTiming(-200, { duration: 9000, easing: Easing.linear }),
      -1, false
    ));
  }, []);
  const anim = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));
  return <Animated.View style={[styles.cloud, style, anim]}/>;
}

function LoadingDot({ delay }: { delay: number }) {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(1.3, { duration: 600 }),
        withTiming(1,   { duration: 600 }),
      ), -1, false
    ));
  }, []);
  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return <Animated.View style={[styles.dot, dotStyle]}/>;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#1a6eb5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cloud: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 50,
  },
  armContainer: {
    position: "absolute",
    top: 84,
    left: 110,
  },
  appName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "500",
    letterSpacing: 1,
    marginTop: 20,
  },
  tagline: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    marginTop: 6,
  },
  dots: {
    flexDirection: "row",
    gap: 7,
    marginTop: 32,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
});
