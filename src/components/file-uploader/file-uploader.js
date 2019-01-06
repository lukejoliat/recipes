/* global HTMLElement */
import template from './file-uploader.html'
import { parse } from '../../utils/utils'
export default class FileUploader extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({
      mode: 'open'
    })
    this._file = null
    this._dropArea = null
    this._filesDone = 0
    this._filesToDo = 0
    this.$progressBar = null
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this._dropArea = this._shadowRoot.getElementById('drop-area')
    this.$progressBar = this._shadowRoot.getElementById('progress-bar')
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this._dropArea.addEventListener(
        eventName,
        e => this._preventDefaults(e),
        false
      )
    })
    ;['dragenter', 'dragover'].forEach(eventName => {
      this._dropArea.addEventListener(eventName, () => this._highlight(), false)
    })
    ;['dragleave', 'drop'].forEach(eventName => {
      this._dropArea.addEventListener(
        eventName,
        () => this._unhighlight(),
        false
      )
    })
    this._dropArea.addEventListener('drop', e => this._handleDrop(e), false)
    this._dropArea.addEventListener('change', e => this._handleSelect(e), false)
  }
  _unhighlight () {
    this._dropArea.classList.remove('highlight')
  }
  _highlight (e) {
    this._dropArea.classList.add('highlight')
  }
  _preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  _initializeProgress (numfiles) {
    this.$progressBar.value = 0
    this._filesDone = 0
    this._filesToDo = numfiles
  }
  _progressDone () {
    this._filesDone++
    this.$progressBar.value = (this._filesDone / this._filesToDo) * 100
  }
  async _handleFile (file) {
    this._initializeProgress(1)
    try {
      this.file = await parse(file)
      this._previewImage(this.file)
      this._progressDone()
    } catch (e) {
      console.error(e)
      this._shadowRoot.getElementById(
        'gallery'
      ).innerHTML = `<span style="color: red;">Upload Failed: ${e}<span>`
    }
  }
  _handleDrop (e) {
    let dt = e.dataTransfer
    let file = dt.files[0]
    this._handleFile(file)
  }
  _handleSelect (e) {
    const input = this._shadowRoot.querySelector('input[type=file]')
    this._handleFile(input.files[0])
  }
  _previewImage (file) {
    this._shadowRoot.getElementById(
      'gallery'
    ).innerHTML = `<img src="${file}" alt="recipe image">`
  }
  get file () {
    return this._file
  }
  set file (file) {
    this._file = file
    this._shadowRoot.getElementById(
      'gallery'
    ).innerHTML = `<img src="${file}" alt="recipe image">`
  }
}

window.customElements.define('file-uploader', FileUploader)
