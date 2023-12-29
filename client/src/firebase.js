import firebase from 'firebase'

var config = {
	apiKey: "AIzaSyB3-5wUV-PykGzKC0mXBabPWONcj-Lxcjw",
	authDomain: "moraba-cb10d.firebaseapp.com",
	databaseURL: "https://moraba-cb10d.firebaseio.com",
	projectId: "moraba-cb10d",
	storageBucket: "moraba-cb10d.appspot.com",
	messagingSenderId: "288927585294"
};

firebase.initializeApp(config);

const googleProvider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

export const authProviders = { google: googleProvider, facebook: fbProvider, twitter: twitterProvider };

export const auth = firebase.auth();
export default firebase;