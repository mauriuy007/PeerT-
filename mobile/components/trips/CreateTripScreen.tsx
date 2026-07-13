import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator,
  StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useSession } from '../../context/SessionContext';
import { tripsApi } from '../../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateTrip'>;

type CreateTripFields = {
  name: string;
  startDate: string;
  endDate: string;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export default function CreateTripScreen({ navigation }: Props) {
  const { token, userId } = useSession();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<CreateTripFields>({
    defaultValues: { name: '', startDate: '', endDate: '' },
  });

  const submit = async (data: CreateTripFields) => {
    setApiError('');
    setLoading(true);
    try {
      await tripsApi.create(token, {
        name: data.name,
        startDate: new Date(`${data.startDate}T00:00:00.000Z`).toISOString(),
        endDate: new Date(`${data.endDate}T00:00:00.000Z`).toISOString(),
        ownerId: userId,
      });
      navigation.goBack();
    } catch (e: any) {
      setApiError(e.message ?? 'No se pudo crear el viaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Nuevo viaje</Text>
          <Text style={styles.subtitle}>Cuéntanos los detalles básicos</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Nombre del viaje</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: 'El nombre es requerido', minLength: { value: 2, message: 'Mínimo 2 caracteres' } }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  placeholder="Ej. Verano en Italia"
                  placeholderTextColor="#94A3B8"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.name && <Text style={styles.fieldError}>{errors.name.message}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Fecha de inicio</Text>
            <Controller
              control={control}
              name="startDate"
              rules={{
                required: 'La fecha de inicio es requerida',
                pattern: { value: DATE_RE, message: 'Formato AAAA-MM-DD' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.startDate && styles.inputError]}
                  placeholder="2026-08-01"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.startDate && <Text style={styles.fieldError}>{errors.startDate.message}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Fecha de fin</Text>
            <Controller
              control={control}
              name="endDate"
              rules={{
                required: 'La fecha de fin es requerida',
                pattern: { value: DATE_RE, message: 'Formato AAAA-MM-DD' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.endDate && styles.inputError]}
                  placeholder="2026-08-10"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.endDate && <Text style={styles.fieldError}>{errors.endDate.message}</Text>}
          </View>

          {apiError ? <Text style={styles.apiError}>{apiError}</Text> : null}

          <TouchableOpacity
            style={[styles.primaryBtn, loading && styles.btnDisabled]}
            onPress={handleSubmit(submit)}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>Crear viaje</Text>}
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
