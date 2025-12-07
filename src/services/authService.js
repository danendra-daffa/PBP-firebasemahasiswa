import auth from '@react-native-firebase/auth';
import { saveUserData, clearUserData } from '../config/storage';

/**
 * Login user dengan email dan password
 */
export const loginUser = async (email, password) => {
  try {
    console.log('Mencoba login dengan email:', email);

    // Login via Firebase Auth
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    // Dapatkan token untuk disimpan (sesuai materi)
    const token = await user.getIdToken();

    // Simpan ke MMKV
    saveUserData({
      token: token,
      email: user.email,
      uid: user.uid,
    });

    console.log('Login berhasil!');
    return { success: true, user };
  } catch (error) {
    console.error('Login gagal:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Register user baru
 */
export const registerUser = async (email, password) => {
  try {
    console.log('Mencoba register dengan email:', email);

    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    console.log('Register berhasil!');
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Register gagal:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    console.log('Mencoba logout...');

    await auth().signOut();
    clearUserData(); // Hapus dari MMKV

    console.log('Logout berhasil!');
    return { success: true };
  } catch (error) {
    console.error('Logout gagal:', error.message);
    return { success: false, error: error.message };
  }
};
