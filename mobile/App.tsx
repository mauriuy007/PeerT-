import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing,
} from 'react-native-reanimated';
import PeerTSplash from './components/PeerTSplash';
import AuthScreen from './components/auth/AuthScreen';
import MainNavigator from './navigation/MainNavigator';
import { SessionProvider, Session } from './context/SessionContext';
import { AuthResponse } from './services/api';

type Phase = 'splash' | 'transitioning' | 'auth' | 'main';

export default function App() {
  const [phase, setPhase] = useState<Phase>('splash');
  const [session, setSession] = useState<Session | null>(null);

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

  // Minimal login -> Home handoff. Token persistence (expo-secure-store),
  // session bootstrap on app launch, logout, and 401 handling belong to the
  // companion ticket "Wire mobile auth screens to backend signup/login
  // endpoints" and are intentionally not implemented here — this session is
  // in-memory only and is lost on app restart.
  const handleAuthenticated = (newToken: string, user: AuthResponse['user']) => {
    setSession({ token: newToken, userId: user.id });
    setPhase('main');
  };

  return (
    <View style={styles.root}>
      <StatusBar style={phase === 'main' ? 'dark' : 'light'} />

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

      {phase === 'main' && session && (
        <View style={StyleSheet.absoluteFill}>
          <SessionProvider session={session}>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </SessionProvider>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
