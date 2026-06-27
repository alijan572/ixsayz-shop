// Firebase adapter placeholder.
// Replace demoStore in app.js with these functions after adding your Firebase config.

window.IXSAYZ_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBLbsjqT6Jmvif9Mrt4oYtJny3lXTJREtE",
  authDomain: "ixsayz-shop-4920d.firebaseapp.com",
  databaseURL: "https://ixsayz-shop-4920d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ixsayz-shop-4920d",
  storageBucket: "ixsayz-shop-4920d.firebasestorage.app",
  messagingSenderId: "154521085904",
  appId: "1:154521085904:web:977ebb026ce6e9d391bbd5",
  measurementId: "G-GFMY3NN4CG"
};

export async function initFirebaseServices() {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
  const { getAuth } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");
  const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");
  const { getStorage } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js");
  const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js");

  const app = initializeApp(firebaseConfig);
  return {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
    analytics: getAnalytics(app)
  };
}
