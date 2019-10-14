import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



var config = {
    apiKey: "AIzaSyBVGmXxUMCWbdPCEnpLYwIJrdfr9oyRtbo",
    authDomain: "myfirstmelody-daba3.firebaseapp.com",
    databaseURL: "https://myfirstmelody-daba3.firebaseio.com",
    projectId: "myfirstmelody-daba3",
    storageBucket: "myfirstmelody-daba3.appspot.com",
    messagingSenderId: "822793308945",
    appId: "1:822793308945:web:0d35a0693285bf6ca51ab0",
    measurementId: "G-NMG6SLJ52H"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();

    this.googleProvider = new app.auth.GoogleAuthProvider();

  }

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

    // *** User API ***

    user = uid => this.db.doc(`users/${uid}`);

    users = () => this.db.collection('users');
}
export default Firebase;
