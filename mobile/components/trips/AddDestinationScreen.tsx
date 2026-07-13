import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator,
  StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useSession } from '../../context/SessionContext';
import { destinationsApi, itineraryApi } from '../../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'AddDestination'>;

type AddDestinationFields = {
  city: string;
  country: string;
  countryCode: string;
  latitude: string;
  longitude: string;
  timezone: string;
};

export default function AddDestinationScreen({ route, navigation }: Props) {
  const { tripId } = route.params;
  const { token } = useSession();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<AddDestinationFields>({
    defaultValues: { city: '', country: '', countryCode: '', latitude: '', longitude: '', timezone: '' },
  });

  const submit = async (data: AddDestinationFields) => {
    setApiError('');
    setLoading(true);
    try {
      const destination = await destinationsApi.create(token, {
        city: data.city,
        country: data.country,
        countryCode: data.countryCode.toUpperCase(),
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        timezone: data.timezone,
      });

      // Destination has no direct relation to Trip in the schema — the only
      // way to persist "this destination belongs to this trip" is through
      // an ItineraryItem. We create a minimal one automatically so the
      // destination shows up on the Trip Detail screen and survives app
      // restarts, without exposing a separate itinerary UI (out of scope
      // for this ticket).
      try {
        await itineraryApi.create(token, {
          tripId,
          destinationId: destination.id,
          date: new Date().toISOString(),
          name: destination.city,
          description: 'Agregado desde la app móvil',
        });
      } catch (linkError: any) {
        setApiError(
          `El destino se creó, pero no se pudo vincular al viaje: ${linkError.message ?? 'error desconocido'}`,
        );
        setLoading(false);
        return;
      }

      navigation.goBack();
    } catch (e: any) {
      setApiError(e.message ?? 'No se pudo crear el destino');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Agregar destino</Text>
          <Text style={styles.subtitle}>Ingresa los datos del lugar</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Ciudad</Text>
            <Controller
              control={control}
              name="city"
              rules={{ required: 'La ciudad es requerida' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.city && styles.inputError]}
                  placeholder="Roma"
                  placeholderTextColor="#94A3B8"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.city && <Text style={styles.fieldError}>{errors.city.message}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>País</Text>
            <Controller
              control={control}
              name="country"
              rules={{ required: 'El país es requerido' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.country && styles.inputError]}
                  placeholder="Italia"
                  placeholderTextColor="#94A3B8"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.country && <Text style={styles.fieldError}>{errors.country.message}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Código de país (2 letras)</Text>
            <Controller
              control={control}
              name="countryCode"
              rules={{
                required: 'Requerido',
                pattern: { value: /^[A-Za-z]{2}$/, message: 'Deben ser 2 letras, ej. IT' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.countryCode && styles.inputError]}
                  placeholder="IT"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="characters"
                  maxLength={2}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.countryCode && <Text style={styles.fieldError}>{errors.countryCode.message}</Text>}
          </View>

          <View style={styles.row}>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Latitud</Text>
              <Controller
                control={control}
                name="latitude"
                rules={{
                  required: 'Requerida',
                  validate: (v) => {
                    const n = Number(v);
                    return (!Number.isNaN(n) && n >= -90 && n <= 90) || 'Entre -90 y 90';
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.latitude && styles.inputError]}
                    placeholder="41.9028"
                    placeholderTextColor="#94A3B8"
                    keyboardType="numbers-and-punctuation"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              {errors.latitude && <Text style={styles.fieldError}>{errors.latitude.message}</Text>}
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Longitud</Text>
              <Controller
                control={control}
                name="longitude"
                rules={{
                  required: 'Requerida',
                  validate: (v) => {
                    const n = Number(v);
                    return (!Number.isNaN(n) && n >= -180 && n <= 180) || 'Entre -180 y 180';
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.longitude && styles.inputError]}
                    placeholder="12.4964"
                    placeholderTextColor="#94A3B8"
                    keyboardType="numbers-and-punctuation"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              {errors.longitude && <Text style={styles.fieldError}>{errors.longitude.message}</Text>}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Zona horaria</Text>
            <Controller
              control={control}
              name="timezone"
              rules={{ required: 'La zona horaria es requerida' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.timezone && styles.inputError]}
                  placeholder="Europe/Rome"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.timezone && <Text style={styles.fieldError}>{errors.timezone.message}</Text>}
          </View>

          {apiError ? <Text style={styles.apiError}>{apiError}</Text> : null}

          <TouchableOpacity
            style={[styles.primaryBtn, loading && styles.btnDisabled]}
            onPress={handleSubmit(submit)}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>Agregar destino</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelRow}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '700', color: '#1E3A5F', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#64748B', marginBottom: 28 },
  row: { flexDirection: 'row', gap: 10 },
  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 6 },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#1E3A5F',
  },
  inputError: { borderColor: '#EF4444' },
  fieldError: { color: '#EF4444', fontSize: 12, marginTop: 4 },
  apiError: { color: '#EF4444', fontSize: 13, textAlign: 'center', marginBottom: 12 },
  primaryBtn: {
    backgroundColor: '#1a6eb5',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#1a6eb5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: { opacity: 0.7 },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  cancelRow: { alignItems: 'center', marginTop: 16 },
  cancelText: { fontSize: 14, color: '#64748B', fontWeight: '600' },
});
