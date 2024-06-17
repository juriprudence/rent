export const firebaseConfig = {
    apiKey: "AIzaSyDLiw7TcdGuPh6INU20eosKOhmwJquOwiQ",
    authDomain: "voiture-a7249.firebaseapp.com",
    databaseURL: "https://voiture-a7249.firebaseio.com",
    projectId: "voiture-a7249",
    storageBucket: "voiture-a7249.appspot.com",
    messagingSenderId: "914244708466",
    appId: "1:914244708466:web:435b9770143f286f3afaeb",
    measurementId: "G-491N5YG0EP"
  };
  
  firebase.initializeApp(firebaseConfig);

  
  export const auth = firebase.auth();
  export const database = firebase.database();
  export const storage=firebase.storage();
  