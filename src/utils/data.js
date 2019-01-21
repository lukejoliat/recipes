// Initialize Firebase
import { db, storageRef } from '../config/firebase-config'
export default class DataService {
  constructor () {
    this._cursor = null
  }
  getRecipe (id) {
    return db
      .collection('recipes')
      .doc(id)
      .get()
      .then(snapshot => ({ id: snapshot.id, ...snapshot.data() }))
  }
  deleteRecipe (id) {
    return db
      .collection('recipes')
      .doc(id)
      .delete()
  }
  async editRecipe (recipe) {
    if (recipe.image && recipe.title) {
      const imagesRef = storageRef.child(`images/${recipe.title}`)
      const upload = await imagesRef.putString(recipe.image, 'data_url')
      const url = await upload.ref.getDownloadURL()
      recipe.image = url
    }
    return db
      .collection('recipes')
      .doc(recipe.id)
      .update(recipe)
  }
  async createRecipe (recipe) {
    if (recipe.image && recipe.title) {
      const imagesRef = storageRef.child(`images/${recipe.title}`)
      const upload = await imagesRef.putString(recipe.image, 'data_url')
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
  async favoriteRecipe (id) {
    const recipes = await this.getRecipes()
    const recipe = recipes.find(r => r.id === id)
    recipe.favorite = true
    return db
      .collection('recipes')
      .doc(recipe.id)
      .update(recipe)
  }
  async unFavoriteRecipe (id) {
    const recipes = await this.getRecipes()
    const recipe = recipes.find(r => r.id === id)
    recipe.favorite = false
    return db
      .collection('recipes')
      .doc(recipe.id)
      .update(recipe)
  }
  async getRecipes (limit = 6, value, isFavorite) {
    let ref = db.collection('recipes')
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
