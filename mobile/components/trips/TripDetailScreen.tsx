import React, { useCallback, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, ActivityIndicator,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useSession } from '../../context/SessionContext';
import { tripsApi, TripDetail, Destination } from '../../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'TripDetail'>;

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function TripDetailScreen({ route, navigation }: Props) {
  const { tripId } = route.params;
  const { token } = useSession();
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTrip = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await tripsApi.getById(token, tripId);
      setTrip(data);
      navigation.setOptions({ title: data.name });
    } catch (e: any) {
      setError(e.message ?? 'No se pudo cargar el viaje');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tripId]);

  useFocusEffect(
    useCallback(() => {
      loadTrip();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadTrip]),
  );

  // Destination has no direct FK to Trip in the schema; the only persisted
  // link is through ItineraryItem (tripId + destinationId). "Destinations
  // attached to this trip" is therefore derived from the trip's itinerary
  // items, deduped by destination id.
  const destinations: Destination[] = trip
    ? Array.from(
        new Map(
          trip.itineraryItems
            .filter((item) => item.destination)
            .map((item) => [item.destination!.id, item.destination!] as const),
        ).values(),
      )
    : [];

  if (loading) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.centered}>
          <ActivityIndicator color="#1a6eb5" size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !trip) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.centered}>
          <Text style={styles.apiError}>{error || 'Viaje no encontrado'}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={loadTrip} activeOpacity={0.85}>
            <Text style={styles.retryBtnText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>{trip.name}</Text>
        <Text style={styles.subtitle}>
          {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Destinos</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddDestination', { tripId })}
          activeOpacity={0.85}
        >
          <Text style={styles.addBtnText}>+ Agregar destino</Text>
        </TouchableOpacity>
      </View>

      {destinations.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>Sin destinos todavía</Text>
          <Text style={styles.emptySubtitle}>Agrega el primer destino de este viaje</Text>
        </View>
      ) : (
        <FlatList
          data={destinations}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.city}</Text>
              <Text style={styles.cardSubtitle}>{item.country}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 8 },
  title: { fontSize: 26, fontWeight: '700', color: '#1E3A5F' },
  subtitle: { fontSize: 14, color: '#64748B', marginTop: 4 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E3A5F' },
  addBtn: {
    backgroundColor: '#1a6eb5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#1E3A5F', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center' },
  apiError: { color: '#EF4444', fontSize: 14, textAlign: 'center', marginBottom: 16 },
  retryBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryBtnText: { color: '#1a6eb5', fontWeight: '700' },
  listContent: { paddingHorizontal: 24, paddingBottom: 24 },
  card: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1E3A5F' },
  cardSubtitle: { fontSize: 13, color: '#64748B', marginTop: 4 },
});
