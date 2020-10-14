function Foo(name, salutation) {
    this.name = name;
    this.salutation = salutation
    this.greet = function() {
        console.log(this.salutation);
    }
    function A() {
        console.log("AAA");
    }
} // this is constructor

let a = new Foo('Foo', "Hello");
console.log(Foo); //constructor
console.log(Foo.prototype); //
console.log(Foo.prototype.constructor);
{
    console.log(Foo.prototype.__proto__); //Object.prototype
    console.log(Object.prototype)
}

console.log("%c======== I am demarcation =========", "font-size: 3rem; color: royalblue")

function FooFo(curse) {
    this.curse = curse
    this.beAngered = function() {
        console.log(this.curse)
    }
}
FooFo.prototype = new Foo();
FooFo.prototype.constructor = FooFo;

console.log(FooFo.constructor)

const FooFoFo = new FooFo();

Foo.prototype.newMethod = function() {
    console.log("NEW!");
}
console.log(FooFoFo.constructor);
console.log(FooFoFo);

console.log("%c======== I am demarcation =========", "font-size: 3rem; color: royalblue")

class Boo {
    constructor() {
        this.name = name;
        this.salutation = salutation
        this.greet = function() {
            console.log(salutation);
        }
    }
    static function () {
        console.log("AAA");
    }
}

console.log(Boo);
console.log(Boo.prototype);
console.log(Boo.prototype.constructor);
console.log(Boo.prototype.__proto__);

