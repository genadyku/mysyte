const localStorage = window.localStorage

if (!localStorage) {
  console.log('localStorage not implemented in your browser')
}

export default localStorage
