import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAkcX8TKTPjjFIOETiYzeKggDOqX7-fM-o",
    authDomain: "todo-list-vue-f1676.firebaseapp.com",
    projectId: "todo-list-vue-f1676",
    storageBucket: "todo-list-vue-f1676.appspot.com",
    messagingSenderId: "333308231800",
    appId: "1:333308231800:web:a32fe56d7ecaa2f2f9ad8d"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const profileCollection = db.collection('profile')
const tasksCollection = db.collection('tasks')

export{
    db, auth, profileCollection, tasksCollection
}