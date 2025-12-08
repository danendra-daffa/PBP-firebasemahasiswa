/**
 * HomeScreen.js
 * Restyled by Danendra Daffa — Deep Purple & Teal Modern Theme (2025 Edition)
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { fetchMahasiswa } from '../services/firestoreService';
import { logoutUser } from '../services/authService';
import { getUserData } from '../config/storage';

const HomeScreen = ({ navigation }) => {
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const userData = getUserData();

  useEffect(() => {
    loadMahasiswa();
  }, []);

  const loadMahasiswa = async () => {
    setLoading(true);
    const result = await fetchMahasiswa();
    if (result.success) {
      setMahasiswaList(result.data);
    } else {
      Alert.alert('Error', result.error);
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMahasiswa();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    Alert.alert('Konfirmasi', 'Yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          const result = await logoutUser();
          if (result.success) navigation.replace('Login');
          else Alert.alert('Error', result.error);
        },
      },
    ]);
  };

  const renderMahasiswa = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.nama}</Text>
        <View style={styles.semesterBadge}>
          <Text style={styles.semesterText}>Sem {item.semester}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>NIM</Text>
          <Text style={styles.infoValue}>{item.nim}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Jurusan</Text>
          <Text style={styles.infoValue}>{item.jurusan}</Text>
        </View>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Data Kosong</Text>
      <Text style={styles.emptySubtitle}>Belum ada mahasiswa terdaftar</Text>
      <TouchableOpacity style={styles.retryButton} onPress={loadMahasiswa}>
        <Text style={styles.retryButtonText}>Coba Lagi</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#6d28d9" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Data Mahasiswa</Text>
            <Text style={styles.headerSubtitle}>{userData.email}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Keluar</Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6d28d9" />
            <Text style={styles.loadingText}>Memuat data...</Text>
          </View>
        ) : (
          <FlatList
            data={mahasiswaList}
            renderItem={renderMahasiswa}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={renderEmpty}
            ListHeaderComponent={
              mahasiswaList.length > 0 && (
                <View style={styles.listHeader}>
                  <Text style={styles.listHeaderText}>
                    {mahasiswaList.length} mahasiswa ditemukan
                  </Text>
                </View>
              )
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#6d28d9']}
                tintColor="#6d28d9"
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f5ff' },
  header: {
    backgroundColor: '#6d28d9',        // Deep Purple
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
    shadowColor: '#6d28d9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#e9d5ff',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoutButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 16, color: '#6d28d9', fontSize: 15 },

  list: { padding: 16 },
  listHeader: { marginBottom: 12 },
  listHeaderText: { fontSize: 15, color: '#6d28d9', fontWeight: '600' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 14,
    padding: 16,
    shadowColor: '#6d28d9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#f0e6ff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e1b4b',
    flex: 1,
  },
  semesterBadge: {
    backgroundColor: '#ddd6fe',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 30,
  },
  semesterText: {
    color: '#6d28d9',
    fontWeight: '700',
    fontSize: 12,
  },

  cardBody: { marginTop: 8 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: { fontSize: 14, color: '#94a3b8' },
  infoValue: { fontSize: 15, fontWeight: '600', color: '#1e1b4b' },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 4 },

  emptyContainer: { alignItems: 'center', paddingVertical: 80 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#6d28d9', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 24 },
  retryButton: {
    backgroundColor: '#6d28d9',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
    elevation: 4,
  },
  retryButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

export default HomeScreen;
