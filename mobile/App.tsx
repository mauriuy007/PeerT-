import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing,
} from 'react-native-reanimated';
import PeerTSplash from './components/PeerTSplash';
import AuthScreen from './components/auth/AuthScreen';

type Phase = 'splash' | 'transitioning' | 'auth';

export default function App() {
  const [phase, setPhase] = useState<Phase>('splash');
  const [token, setToken] = useState<string | null>(null);

  const splashOpacity = useSharedValue(1);
  const authOpacity = useSharedValue(0);

  const splashStyle = useAnimatedStyle(() => ({ opacity: splashOpacity.value }));
  const authStyle = useAnimatedStyle(() => ({ opacity: authOpacity.value }));

  const handleSplashFinish = () => {
    setPhase('transitioning');
    splashOpacity.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) });
    authOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
    setTimeout(() => setPhase('auth'), 700);
  };

  const handleAuthenticated = (newToken: string) => {
    setToken(newToken);
    // TODO: navigate to main app screen
    console.log('Authenticated, token:', newToken);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {(phase === 'splash' || phase === 'transitioning') && (
        <Animated.View style={[StyleSheet.absoluteFill, splashStyle]}>
          <PeerTSplash onFinish={handleSplashFinish} />
        </Animated.View>
      )}

      {(phase === 'transitioning' || phase === 'auth') && (
        <Animated.View style={[StyleSheet.absoluteFill, authStyle]}>
          <AuthScreen onAuthenticated={handleAuthenticated} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
