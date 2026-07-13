import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { authApi, AuthResponse } from '../../services/api';

type RegisterFields = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  onSuccess: (token: string, user: AuthResponse['user']) => void;
  onGoLogin: () => void;
};

export default function RegisterForm({ onSuccess, onGoLogin }: Props) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const { control, handleSubmit, watch, formState: { errors } } = useForm<RegisterFields>({
    defaultValues: { name: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  const password = watch('password');

  const submit = async (data: RegisterFields) => {
    setApiError('');
    setLoading(true);
    try {
      const res = await authApi.register(data.name, data.lastName, data.email, data.password);
      onSuccess(res.token, res.user);
    } catch (e: any) {
      setApiError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Únete a PeerT gratis</Text>

      <View style={styles.row}>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.label}>Nombre</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Requerido', minLength: { value: 2, message: 'Mínimo 2' } }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Ana"
                placeholderTextColor="#94A3B8"
                autoCapitalize="words"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.name && <Text style={styles.fieldError}>{errors.name.message}</Text>}
        </View>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.label}>Apellido</Text>
          <Controller
            control={control}
            name="lastName"
            rules={{ required: 'Requerido', minLength: { value: 2, message: 'Mínimo 2' } }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.lastName && styles.inputError]}
                placeholder="García"
                placeholderTextColor="#94A3B8"
                autoCapitalize="words"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.lastName && <Text style={styles.fieldError}>{errors.lastName.message}</Text>}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'El email es requerido',
            pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Email inválido' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="tu@email.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.email && <Text style={styles.fieldError}>{errors.email.message}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Contraseña</Text>
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'La contraseña es requerida',
            minLength: { value: 8, message: 'Mínimo 8 caracteres' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.password && <Text style={styles.fieldError}>{errors.password.message}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Confirmar contraseña</Text>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Confirmación requerida',
            validate: v => v === password || 'Las contraseñas no coinciden',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.confirmPassword && <Text style={styles.fieldError}>{errors.confirmPassword.message}</Text>}
      </View>

      {apiError ? <Text style={styles.apiError}>{apiError}</Text> : null}

      <TouchableOpacity
        style={[styles.primaryBtn, loading && styles.btnDisabled]}
        onPress={handleSubmit(submit)}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.primaryBtnText}>Crear cuenta</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoLogin} style={styles.toggleRow}>
        <Text style={styles.toggleText}>¿Ya tienes cuenta? </Text>
        <Text style={styles.toggleLink}>Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
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
  inputError: {
    borderColor: '#EF4444',
  },
  fieldError: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  apiError: {
    color: '#EF4444',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
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
  btnDisabled: {
    opacity: 0.7,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  toggleText: {
    fontSize: 14,
    color: '#64748B',
  },
  toggleLink: {
    fontSize: 14,
    color: '#1a6eb5',
    fontWeight: '700',
  },
});
