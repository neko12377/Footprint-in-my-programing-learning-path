/**@tutorial https://pjchender.blogspot.com/2016/06/javascriptfunction-constructorprototype.html*/

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    // 把方法放在函式建構式中這麼做雖然程式仍然可以正確執行並得到結果，但是這麼做會有個問題，如果我們是把這個方法直接寫在函式建構式中，那麼每一個物件都會包含有這個方法，
    // 如果我們有 1000 個物件根據這個函式建構式所建立，那麼這 1000 個物件都會包含這個方法在內，如此將會占據相當多的記憶體；但如果是建立在 prototype 中，我們只會有一個這樣的方法。
    // 所以，為了效能上的考量，通常會把方法（method）放在建構式的 prototype 中，因為它們可以是通用的；把屬性（property）放在建構式當中，因為每一個物件可能都會有不同的屬性內容，
    // 如此將能有效減少記憶體的問題。
    this.Hello = () => {};
}

// function.prototype 原本是空物件
console.log("Person.prototype 加入屬性前", Person.prototype);

// 將此新物件在原型物件加入新屬性前創立
const john = new Person('John', 'Doe');
// 會包含 Hello 方法, 但不包含 getFullName 方法
console.log(john);

// 此處為 function.prototype 加入 FullName 屬性
Person.prototype.getFullName = function() {
    return this.firstName + " " + this.lastName;
}

// 原型物件即使後來才加入新屬性, 繼承該物件的子物件仍會透過 execution context 中的 outer environment 去向外找尋該屬性
console.log("john.getFullName()", john.getFullName());

const jane = new Person('Jane', 'Doe');
console.log(jane);

// 函式當中 prototype 這個屬性並不是這個函式的 prototype，它指的是所有透過這個 function constructor 所建立出來的物件的 prototype
// 建構函式中的 prototype 屬性是繼承其的物件的 prototype, 而非 Person.__proto__
console.log("Person.prototype 加入屬性後", Person.prototype)
// john 繼承了 Person 因此 john.__proto__ 會等於 Person.prototype
// 使用 new 建立新物件時 會將建構函式的 prototype 屬性加到 new 所建立的空物件內, 成為該物件的 .__protp__
console.log(john.__proto__);
console.log(Person.__proto__);
