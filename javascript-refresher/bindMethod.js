class NameGenerator {
    constructor() {
      const btn = document.querySelector('button')
      this.names = ['Max', 'Manu', 'Anna']
      this.currentName = 0
      btn.addEventListener('click', this.addName.bind(this))
      // we can bind this constructor into the 'addName' method when the 'addName' function is called
      // we can also use call()/apply() here
      // call/apply/bind difference: https://www.codementor.io/@niladrisekhardutta/how-to-call-apply-and-bind-in-javascript-8i1jca6jp
    }
  
    addName() {
      const name = new NameField(this.names[this.currentName]) // this might cause failure of reference if we don't bind the constructor
      this.currentName++
      if (this.currentName >= this.names.length) {
        this.currentName = 0
      }
    }

  }