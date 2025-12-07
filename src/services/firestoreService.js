import firestore from '@react-native-firebase/firestore';

/**
 * Fetch semua data mahasiswa dari Firestore
 */
export const fetchMahasiswa = async () => {
  try {
    console.log('Mengambil data mahasiswa dari Firestore...');

    // GET data menggunakan SDK Firebase (sesuai materi)
    const snapshot = await firestore().collection('mahasiswa').get();

    const mahasiswaList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Berhasil ambil ${mahasiswaList.length} data mahasiswa`);
    return { success: true, data: mahasiswaList };
  } catch (error) {
    console.error('Gagal ambil data mahasiswa:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Tambah mahasiswa baru (bonus untuk demo)
 */
export const addMahasiswa = async mahasiswaData => {
  try {
    console.log('Menambah mahasiswa baru:', mahasiswaData.nama);

    await firestore()
      .collection('mahasiswa')
      .add({
        ...mahasiswaData,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    console.log('Mahasiswa berhasil ditambahkan!');
    return { success: true };
  } catch (error) {
    console.error('Gagal tambah mahasiswa:', error.message);
    return { success: false, error: error.message };
  }
};
