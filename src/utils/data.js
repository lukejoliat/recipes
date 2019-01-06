/* eslint-disable no-undef */
// Initialize Firebase
var config = {
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

const getRecipe = async id =>
  db
    .collection('recipes')
    .doc(id)
    .get()
    .then(snapshot => ({ id: snapshot.id, ...snapshot.data() }))

const deleteRecipe = async id =>
  db
    .collection('recipes')
    .doc(id)
    .delete()

const editRecipe = async recipe => {
  if (recipe.image && recipe.image.name) {
    const imagesRef = storageRef.child(`images/${recipe.image.title}`)
    const upload = await imagesRef.put(recipe.image)
    const url = await upload.ref.getDownloadURL()
    recipe.image = url
  }
  return db
    .collection('recipes')
    .doc(recipe.id)
    .update(recipe)
}

const createRecipe = async (recipes = [], recipe) => {
  if (recipe.image && recipe.image.name) {
    const imagesRef = storageRef.child(`images/${recipe.image.title}`)
    const upload = await imagesRef.put(recipe.image)
    const url = await upload.ref.getDownloadURL()
    recipe.image = url
  } else {
    recipe.image = ``
  }
  return db
    .collection('recipes')
    .doc()
    .set(recipe)
}

const favoriteRecipe = async id => {
  const recipes = await getRecipes()
  const recipe = recipes.find(r => r.id === id)
  recipe.favorite = true
  return db
    .collection('recipes')
    .doc(recipe.id)
    .update(recipe)
}

const unFavoriteRecipe = async id => {
  const recipes = await getRecipes()
  const recipe = recipes.find(r => r.id === id)
  recipe.favorite = false
  return db
    .collection('recipes')
    .doc(recipe.id)
    .update(recipe)
}

const getRecipes = () =>
  db
    .collection('recipes')
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

export {
  deleteRecipe,
  createRecipe,
  getRecipes,
  getRecipe,
  favoriteRecipe,
  unFavoriteRecipe,
  editRecipe
}
