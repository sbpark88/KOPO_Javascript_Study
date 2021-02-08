/*
ES5에서 변수를 선언하는 유일한 방법은 var 키워드를 사용하는 것이다.
var 키워드는 다음과 같은 특징과 그로 인한 문제점을 갖는다.
1. 함수 레벨 스코프 : for-loop의 초기화 식에서 사용한 변수를 for-loop 외부 전역에서 참조 가능하다.
2. var 키워드 생략 허용 : 의도치 않은 변수의 전역화.
3. 중복 선언 허용 : 의도하지 않은 변숫값 변경.
4. 변수 호이스팅 : 변수를 선언하기 전에 참조 가능.

따라서 ES6에서는 이러한 var의 문제점을 해결하기 위해 let, const 키워드를 도입하였다.
 */
/*
함수 : function() { }
블록 : { }

var -> 함수 레벨 스코프 : 함수 내부에서 선언한 변수는 지역변수, 그 외 블록 내부를 포함한 모든 변수는 전역변수다.
let -> 블록 레벨 스코프 : 코드 블록 내부에서 선언한 변수는 지역변수다.
 */
// 함수 레벨 스코프
// console.log(foo);   // undefined
//
// var foo = 123;
// console.log(foo);   // 123
//
// {
//     var foo = 335;  // 중복 선언이 허용된다. 그리고 함수 내부가 아니므로 전역변수다. 따라서 전역 변수 var foo = 123;의 값을 335로 바꾼다.
// }
// console.log(foo);   // 335

// 블록 레벨 스코프
// let too = 123;
// {
//     let too = 324;      // 블록 레벨 스코프로 지역변수다.
//     let bar = 231;
//     console.log(too);   // 324
// }
// console.log(too);   // 123
// console.log(bar);   // ReferenceError: bar is not defined

// let foo = 90;    // 전역변수
// {
//     console.log(foo);   // 90
//     let foo = 23;
// }

// Closure
// var arr = [];
//
// for (var i = 0; i < 3; i++) {
//     (function (k) {
//         arr.push(function () { console.log(k); });
//     }(i));
// }
//
// for (var j = 0; j < 3; j++) {
//     arr[j]();

// }

// var arr = [];
//
// for (let i = 0; i < 3; i++) {
//     arr.push(function () { console.log(i); });
// }
//
// // 배열에서 함수를 꺼내어 호출한다.
// for (var j = 0; j < 3; j++) { arr[j](); }	// 0 1 2

// Const
// let foo;
// foo = 15;
// console.log(foo);
//
// const bar;  // SyntaxError: Missing initializer in const declaration
// bar = 20;
// console.log(bar);

// const rainbow = { first: `led`
//                 , second: `orange`
//                 , thrid: `yello`
//                 , fourth: `green` };
//
// console.log(rainbow);
//
// // rainbow = null; // TypeError: Assignment to constant variable.
//
// // property는 접근 가능하다.
// // 수정
// rainbow.first = `purple`;
//
// // 추가
// rainbow.fifth = `blue`;
// rainbow['sixth'] = `navy`;
//
// // 삭제
// delete rainbow.thrid;
//
// console.log(rainbow);


for (let i = 0; i < 3; i ++) {
    console.log(i);     // 0, 1, 2
}

const MAXROWS = 3;
for (let i = 0; i < MAXROWS; i ++) {
    console.log(i);     // 0, 1, 2
}
