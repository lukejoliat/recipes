/* global firebase */
const config = {
  apiKey: 'AIzaSyCrLALh35T6Rb-0t4OQ_aqLRh7W8IhJMNc',
  authDomain: 'recipes-226405.firebaseapp.com',
  databaseURL: 'https://recipes-226405.firebaseio.com',
  projectId: 'recipes-226405',
  storageBucket: 'recipes-226405.appspot.com',
  messagingSenderId: '1072381355302'
}
firebase.initializeApp(config)
const storageRef = firebase.storage().ref()
const db = firebase.firestore()

export { db, storageRef }
