const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyC8j06rVrsWRky68r_hC8kMPxtFTO-LUvg",
  authDomain: "smash-d-waffle-house.firebaseapp.com",
  projectId: "smash-d-waffle-house",
  storageBucket: "smash-d-waffle-house.firebasestorage.app",
  messagingSenderId: "271884319775",
  appId: "1:271884319775:web:80d120e72e92cc8397a92a",
  measurementId: "G-F2815WQQ3Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    const snapshot = await getDocs(collection(db, 'menu_items'));
    console.log("Found items:", snapshot.size);
    snapshot.forEach(doc => {
      console.log(doc.data().title);
    });
  } catch(e) {
    console.error("Error:", e.message);
  }
}
test();
