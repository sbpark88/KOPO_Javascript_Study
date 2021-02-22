// Tamplate literal
// const numberPad1 = "123\n456\n   789";
// console.log(numberPad1);
//
// const numberPad2 = "123" + "\n" + "456" + "\n" + "   789";
// console.log(numberPad2);
//
// const numberPad3 = `123
// 456
//    789`;
// console.log(numberPad3);

// const greeting = "Hello";
// const name = "velog";

// console.log("message : " + greeting + " " + name + "!");
// console.log(`message : ${greeting} ${name.toUpperCase()}!`);
// console.log(`2 x 7 = ${2 * 7}`);


// Arrow function
// let x = 7;

// const square = x => { return x * x; }
// console.log(square(x));
//
// const square = x => x * x;
// console.log(square(x));

// const rainbow = () => { return { first: "red", second: "orange", third: "yellow" }; }
// console.log(rainbow());
//
// const rainbow = () => ( { first: "red", second: "orange", third: "yellow" } )
// console.log(rainbow());

// const number = [1, 2, 3, 4];
// const square = number.map(x => x * x);
// console.log(square);

// normal function
// function Prefixer(prefix) {
//     this.prefix = prefix;
// }
//
// Prefixer.prototype.prefixArray = function (arr) {
//     return arr.map(function (x) {
//         return `${this} ${x}`;
//     })
// }
//
// let pre = new Prefixer('Hi');
// console.log(pre.prefixArray(['Lee', 'Kim']));   // [ 'undefined Lee', 'undefined Kim' ]

// function Prefixer(prefix) {
//   this.prefix = prefix;
// }
//
// Prefixer.prototype.prefixArray = function (arr) {
//   var that = this;
//   return arr.map(function (x) {
//     return `${that.prefix} ${x}`;
//   });
// };
//
// let pre = new Prefixer('Hi');
// console.log(pre.prefixArray(['Lee', 'Kim']));   // [ 'Hi Lee', 'Hi Kim' ]

function Prefixer(prefix) {
    this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
    return arr.map((x) => `${this.prefix} ${x}`);
};

let pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));   // [ 'Hi Lee', 'Hi Kim' ]

const person = {
    name: 'Lee',
    sayHi: () => console.log(`Hi ${this.name}`)
};

// const person = {
//   name: 'Lee',
//   sayHi: function () {console.log(`Hi ${this.name}`)}
// };
//
// person.sayHi();

