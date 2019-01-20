/* eslint-disable no-undef */
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCrLALh35T6Rb-0t4OQ_aqLRh7W8IhJMNc',
  authDomain: 'recipes-226405.firebaseapp.com',
  databaseURL: 'https://recipes-226405.firebaseio.com',
  projectId: 'recipes-226405',
  storageBucket: 'recipes-226405.appspot.com',
  messagingSenderId: '1072381355302'
}
firebase.initializeApp(config)
export default class DataService {
  constructor () {
    this.storageRef = firebase.storage().ref()
    this.db = firebase.firestore()
    this._cursor = null
  }
  getRecipe (id) {
    return this.db
      .collection('recipes')
      .doc(id)
      .get()
      .then(snapshot => ({ id: snapshot.id, ...snapshot.data() }))
  }
  deleteRecipe (id) {
    return this.db
      .collection('recipes')
      .doc(id)
      .delete()
  }
  async editRecipe (recipe) {
    if (recipe.image && recipe.image.name) {
      const imagesRef = storageRef.child(`images/${recipe.image.title}`)
      const upload = await imagesRef.put(recipe.image)
      const url = await upload.ref.getDownloadURL()
      recipe.image = url
    }
    return this.db
      .collection('recipes')
      .doc(recipe.id)
      .update(recipe)
  }
  async createRecipe (recipe) {
    if (recipe.image && recipe.image.name) {
      const imagesRef = storageRef.child(`images/${recipe.image.title}`)
      const upload = await imagesRef.put(recipe.image)
      const url = await upload.ref.getDownloadURL()
      recipe.image = url
    } else {
      recipe.image = ``
    }
    return this.db
      .collection('recipes')
      .doc()
      .set(recipe)
  }
  async favoriteRecipe (id) {
    const recipes = await this.getRecipes()
    const recipe = recipes.find(r => r.id === id)
    recipe.favorite = true
    return this.db
      .collection('recipes')
      .doc(recipe.id)
      .update(recipe)
  }
  async unFavoriteRecipe (id) {
    const recipes = await this.getRecipes()
    const recipe = recipes.find(r => r.id === id)
    recipe.favorite = false
    return this.db
      .collection('recipes')
      .doc(recipe.id)
      .update(recipe)
  }
  // getRecipes () {
  //   return this.db
  //     .collection('recipes')
  //     .get()
  //     .then(snapshot => {
  //       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //     })
  // }
  // getFavorites (limit = 6) {
  //   let ref = this.db.collection('recipes')
  //   if (this.cursor) {
  //     ref = ref.startAfter(this.cursor)
  //   }
  //   return (ref = ref
  //     .limit(limit)
  //     .where('favorite', '==', true)
  //     .get()
  //     .then(snapshot => {
  //       this.cursor = snapshot.docs[snapshot.docs.length - 1]
  //       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //     }))
  // }
  // search (limit = 6, value = ``, favorite) {
  //   let ref = this.db.collection('recipes')
  //   ref = ref.where('title', '==', value)
  //   if (favorite) {
  //     ref = ref.where('favorite', '==', favorite)
  //   }
  //   return ref
  //     .limit(limit)
  //     .get()
  //     .then(snapshot => {
  //       this.cursor = snapshot.docs[snapshot.docs.length - 1]
  //       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //     })
  // }
  // searchPaginated (limit = 6, value = ``, favorite) {
  //   let ref = this.db.collection('recipes').where('title', '==', value)
  //   if (favorite) ref = ref.where('favorite', '==', favorite)
  //   if (this.cursor) {
  //     ref = ref.startAfter(this.cursor)
  //   }
  //   return (ref = ref
  //     .limit(limit)
  //     .get()
  //     .then(snapshot => {
  //       this.cursor = snapshot.docs[snapshot.docs.length - 1]
  //       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //     }))
  // }
  async getRecipes (limit = 6, value, isFavorite) {
    let ref = this.db.collection('recipes')
    if (this.cursor) {
      ref = ref.startAfter(this.cursor)
    }
    if (isFavorite) {
      ref = ref.where('favorite', '==', true)
    }
    if (value) {
      ref = ref.where('title', '==', value)
    }
    return (ref = ref
      .limit(limit)
      .get()
      .then(snapshot => {
        this.cursor = snapshot.docs[snapshot.docs.length - 1]
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      }))
  }
  set cursor (cursor) {
    this._cursor = cursor
  }
  get cursor () {
    return this._cursor
  }
}
