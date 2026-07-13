import React, { useCallback, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, ActivityIndicator,
  StyleSheet, SafeAreaView, RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useSession } from '../../context/SessionContext';
import { tripsApi, Trip } from '../../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function HomeScreen({ navigation }: Props) {
  const { token } = useSession();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadTrips = useCallback(async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) setLoading(true);
    setError('');
    try {
      const data = await tripsApi.list(token);
      setTrips(data);
    } catch (e: any) {
      setError(e.message ?? 'No se pudieron cargar tus viajes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      loadTrips({ silent: trips.length > 0 });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadTrips]),
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadTrips({ silent: true });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Tus viajes</Text>
          <Text style={styles.subtitle}>Todo lo que estás planeando</Text>
        </View>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('CreateTrip')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>+ Nuevo viaje</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color="#1a6eb5" size="large" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.apiError}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => loadTrips()} activeOpacity={0.85}>
            <Text style={styles.retryBtnText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : trips.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>Aún no tienes viajes</Text>
          <Text style={styles.emptySubtitle}>Crea tu primer viaje para empezar a planear</Text>
          <TouchableOpacity
            style={[styles.primaryBtn, styles.emptyBtn]}
            onPress={() => navigation.navigate('CreateTrip')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Crear viaje</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1a6eb5" />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('TripDetail', { tripId: item.id })}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDates}>
                {formatDate(item.startDate)} — {formatDate(item.endDate)}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: { fontSize: 26, fontWeight: '700', color: '#1E3A5F' },
  subtitle: { fontSize: 14, color: '#64748B', marginTop: 4 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1E3A5F', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 20 },
  emptyBtn: { marginTop: 4 },
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
  primaryBtn: {
    backgroundColor: '#1a6eb5',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#1a6eb5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  listContent: { paddingHorizontal: 24, paddingBottom: 24 },
  card: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#1E3A5F' },
  cardDates: { fontSize: 13, color: '#64748B', marginTop: 6 },
});
