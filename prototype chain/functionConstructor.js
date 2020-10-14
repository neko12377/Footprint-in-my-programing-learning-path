/** @tutorial https://pjchender.blogspot.com/2016/06/javascriptfunction-constructornew.html */

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    console.log("使用 new 時這個函式有被執行");
}
// function 宣告時會建立 Execution Context, 裡面包含 Global Object, this, Outer Environment
// 使用 new 運算子時, 會先有一個空的物件被建立
const kasper = new Person("KB", "CHEN"); // this被指定到使用 new 運算子時建立的空物件
//執行 Person 這個 function 時, this.firstName, this.lastName 是在幫 new 建立的空物件賦予屬性名稱和屬性值
console.log(kasper);

function someone(){
    console.log(this, "用來確認使用 new 時 this 是否指到空物件");
}

const john = new someone(); //執行 someone
// console.log(john);

function Reaction(happy, sad) {
    this.happy = happy;
    this.sad = sad;
    // return {"RETURN":"原本 this 的內容就不會被回傳"}
}

const emotion = new Reaction("laugh", "cry");
console.log(emotion);

const anotherEmotion = new Reaction("jump up and down", "being alone");
console.log(anotherEmotion);

// 程式撰寫的過程當中忘記加上 new, 指定的變數會得到 function 原本要回傳的值, 叒