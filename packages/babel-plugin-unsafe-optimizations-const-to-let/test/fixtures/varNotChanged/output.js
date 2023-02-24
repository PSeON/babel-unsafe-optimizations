var varVar;
let varLetValue = 1;
let constLet = 2;
function test() {
  var varVar;
  let varLetValue = 1;
  let constLet = 2;
  console.log(varVar, varLetValue, constLet);
}
console.log(varVar, varLetValue, constLet);
console.log(test());
