import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCmPgZMT5j-GGPzYYEHkgWyJ1K8qd8Dtvo",
  authDomain: "bibliofile-list.firebaseapp.com",
  databaseURL: "https://bibliofile-list.firebaseio.com",
  projectId: "bibliofile-list",
  storageBucket: "",
  messagingSenderId: "1044295895280",
  appId: "1:1044295895280:web:6075643ccfe8572d"
};

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;