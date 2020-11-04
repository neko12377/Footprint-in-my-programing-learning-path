function a() {}
// function a 的 prototype 是 物件 a
// a 的 prototype 是 a{}
console.log(a.prototype, "a.prototype") // a{}
// function a 的原型鏈指向 function
// a 的 __proto__ 是 [function]
console.log(a.__proto__, "a.__proto__") // [Function]
// 物件 a 的 constructor 是 function a
console.log(a.prototype.constructor, "a.prototype.constructor") // [function: a]
const aa = new a();
// aa 的 __proto__ 是 a{}
console.log(aa.__proto__, "aa.__proto__") // a{}
// aa 的 constructor 是 [function: a]
console.log(aa.constructor, "aa.constructor") // [function: a]
// aa 的 constructor 的 prototype 是 a {} === function a 的 prototype
console.log(aa.constructor.prototype, "aa.constructor.prototype") // a {}
// a{} 的 constructor 是 [function: a]