import { MMKV } from 'react-native-mmkv';

// Inisialisasi MMKV
export const storage = new MMKV();

/**
 * Simpan data user ke MMKV
 */
export const saveUserData = userData => {
  storage.set('userToken', userData.token);
  storage.set('userEmail', userData.email);
  storage.set('userId', userData.uid);

  console.log('✅ Data user disimpan ke MMKV:', {
    token: userData.token.substring(0, 20) + '...',
    email: userData.email,
    uid: userData.uid,
  });
};

/**
 * Ambil data user dari MMKV
 */
export const getUserData = () => {
  const token = storage.getString('userToken');
  const email = storage.getString('userEmail');
  const uid = storage.getString('userId');

  return { token, email, uid };
};

/**
 * Hapus semua data user dari MMKV (saat logout)
 */
export const clearUserData = () => {
  storage.delete('userToken');
  storage.delete('userEmail');
  storage.delete('userId');

  console.log('🗑️ Data user dihapus dari MMKV');
};

/**
 * Cek apakah user sudah login
 */
export const isUserLoggedIn = () => {
  const token = storage.getString('userToken');
  return token !== undefined && token !== null;
};
