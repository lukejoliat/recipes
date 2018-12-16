import {
  handleFavorite,
  handleDelete,
  handleEdit,
  handleCreate
} from './event-handlers'

const registerGlobalEvents = $el => {
  document.addEventListener('delete', handleDelete, false)
  document.addEventListener('togglefavorite', handleFavorite, false)
  document.addEventListener('edit', handleEdit, false)
  document.addEventListener('create', handleCreate, false)
}

const unregisterGlobalEvents = $el => {
  document.removeEventListener('delete', handleDelete, false)
  document.removeEventListener('togglefavorite', handleFavorite, false)
  document.removeEventListener('edit', handleEdit, false)
  document.removeEventListener('create', handleCreate, false)
}

export { registerGlobalEvents, unregisterGlobalEvents }
