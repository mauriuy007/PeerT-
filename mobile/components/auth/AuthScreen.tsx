import React, { useState } from 'react';
import {
  View, Text, ScrollView, KeyboardAvoidingView,
  Platform, StyleSheet, SafeAreaView,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing,
} from 'react-native-reanimated';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import PilotBadge from '../PilotBadge';
import { AuthResponse } from '../../services/api';

type AuthView = 'login' | 'register';

type Props = {
  onAuthenticated: (token: string, user: AuthResponse['user']) => void;
};

export default function AuthScreen({ onAuthenticated }: Props) {
  const [view, setView] = useState<AuthView>('login');
  const cardOpacity = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const switchView = (next: AuthView) => {
    const direction = next === 'register' ? 1 : -1;
    cardOpacity.value = withTiming(0, { duration: 180, easing: Easing.out(Easing.cubic) });
    cardTranslateY.value = withTiming(direction * 12, { duration: 180 });
    setTimeout(() => {
      setView(next);
      cardTranslateY.value = -direction * 12;
      cardOpacity.value = withTiming(1, { duration: 220, easing: Easing.out(Easing.cubic) });
      cardTranslateY.value = withTiming(0, { duration: 220, easing: Easing.out(Easing.cubic) });
    }, 190);
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.brand}>
          <PilotBadge size={72} />
          <Text style={styles.appName}>PeerT</Text>
          <Text style={styles.tagline}>Tu copiloto de viajes</Text>
        </View>

        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={styles.cardContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={cardStyle}>
              {view === 'login'
                ? <LoginForm
                    onSuccess={onAuthenticated}
                    onGoRegister={() => switchView('register')}
                  />
                : <RegisterForm
                    onSuccess={onAuthenticated}
                    onGoLogin={() => switchView('login')}
                  />}
            </Animated.View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1a6eb5',
  },
  flex: {
    flex: 1,
  },
  brand: {
    height: 190,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },
  appName: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 8,
  },
  tagline: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 16,
  },
  cardContent: {
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 50,
  },
});
