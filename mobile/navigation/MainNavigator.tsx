import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import HomeScreen from '../components/trips/HomeScreen';
import CreateTripScreen from '../components/trips/CreateTripScreen';
import TripDetailScreen from '../components/trips/TripDetailScreen';
import AddDestinationScreen from '../components/trips/AddDestinationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: '#1a6eb5',
        headerTitleStyle: { color: '#1E3A5F' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'PeerT' }} />
      <Stack.Screen name="CreateTrip" component={CreateTripScreen} options={{ title: 'Nuevo viaje' }} />
      <Stack.Screen name="TripDetail" component={TripDetailScreen} options={{ title: 'Viaje' }} />
      <Stack.Screen name="AddDestination" component={AddDestinationScreen} options={{ title: 'Agregar destino' }} />
    </Stack.Navigator>
  );
}
