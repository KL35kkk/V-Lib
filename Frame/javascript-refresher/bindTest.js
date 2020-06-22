const kkk = {
    x: 42,
    getX() {
      return this.x;
    }
  }
  
  const unboundGetX = kkk.getX;
  console.log(unboundGetX()); // The function gets invoked at the global scope
  // expected output: undefined
  
  const boundGetX = unboundGetX.bind(kkk);
  console.log(boundGetX());
  // expected output: 42
  