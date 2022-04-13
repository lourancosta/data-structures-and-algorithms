//@ts-check

let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
console.log(daysOfWeek.length)

// for (day in daysOfWeek) {
// //    console.log(daysOfWeek[day])
// }


// //####################################################

// const fibonacci = []
// fibonacci[1] = 1
// fibonacci[2] = 1

// for (let i = 3; i < 20; i++) {
//     fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]
// }

// for (let i = 1; i< fibonacci.length; i++) {
// //    console.log(fibonacci[i])
// }


// //####################################################

// let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// numbers.push(10, 11, 12, 13, 14, 15)
// //console.log(numbers)

// Array.prototype.insertFirstPosition = function(value) {
//     for (let i = this.length; i>= 0; i--) {
//         this[i] = this[i - 1]
//     }
//     this[0] = value
// }

// Array.prototype.reIndex = function(myArray) {
//     const newArray = []
//     for (let i = 0; i < myArray.length; i++) {
//         if(myArray[i] != undefined) {
//             //console.log(myArray[i])
//             newArray.push(myArray[i])
//         }
//     }
//     return newArray
// }

// Array.prototype.removeFirstPosition = function() {
//     for (let i = 0; i < this.length; i++) {
//         let item = this[i]
//         let array = this
//         this[i] = this[i + 1]
//     }
//     return this.reIndex(this)
// }

// numbers.insertFirstPosition(-1)
// numbers.unshift(-4, -3, -2) // adiciona no comeco do array
// numbers.pop() // remove ultimo elemento do array
// numbers = numbers.removeFirstPosition()
// numbers.shift()
// //console.log(numbers)

// numbers.splice(5,3)
// //console.log(numbers)

// numbers.splice(5, 0, 3, 4, 5)
// //console.log(numbers)


// //####################################################

// let averageTemp = []
//  averageTemp[0] = [72, 75, 79, 79, 81, 81]
//  averageTemp[1] = [81, 79, 75, 75, 73, 73, 85]

//  function printMatrix(myMatrix) {
//      for (let i = 0; i < myMatrix.length; i++) {
//          for (let j = 0; j < myMatrix[i].length; j++) [
//              console.log(myMatrix[i][j])
//          ]
//      }
//  }
//  //console.table(averageTemp)

//  const matrix3x3x3 = []
//  for (let i = 0; i < 3; i++) {
//      matrix3x3x3[i] = []
//      for (let j = 0; j < 3; j++) {
//          matrix3x3x3[i][j] = []
//          for (let z = 0; z < 3; z++) {
//             matrix3x3x3[i][j][z] = i + j + z
//          }
         
//      }
//  }
//  //console.table(matrix3x3x3)

//  //####################################################

//  const zero = 0
//  const positiveNumbers = [1, 2, 3]
//  const negativeNumbers = [-3, -2, -1]

//  let concatNumbers = negativeNumbers.concat(zero, positiveNumbers)
//  //console.log(concatNumbers)


//   //####################################################

//   function isEven(x) {
//       //console.log(x)
//       return x % 2 === 0 ? true : false
//   }
//   //const isEven = x => x % 2 === 0

//   let numbersCheck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
//   //numbersCheck.every(isEven)
//   //numbersCheck.some(isEven)
//   //numbersCheck.forEach(isEven)

//   const myMap = numbersCheck.map(isEven)
//   const evenNumbers = numbersCheck.filter(isEven)
  
//   const somaNC = numbersCheck.reduce((previous, current) => previous + current)
//   //const teste = numbersCheck.copyWithin()
//   //const teste = numbersCheck.entries()
//   //const teste = numbersCheck.includes(133)
//   //const teste = numbersCheck.find() 
//   //const teste = numbersCheck.findIndex((x) => x == 5)
//   //const teste = numbersCheck.fill(144, 15, 20) -> deu errado

//   for (const number of numbersCheck) {
//       //console.log(number % 2 === 0 ? `${number} -> Even` : `${number} -> odd`)
//   }

//   let iterator = numbersCheck[Symbol.iterator]()
//   let atualIterator

//   for (const n of iterator) {
//       //let atualIterator = n
//       //console.log(n)
//   }

//   let aEntries = numbersCheck.entries()
//   let aKeys = numbersCheck.keys()
//   let aValues = numbersCheck.values()

// //   console.log(aEntries.next().value); // [0, 1] - posição 0, valor 1
// //   console.log(aEntries.next().value); // [1, 2] - posição 1, valor 2
// //   console.log(aEntries.next().value); // [2, 3] - posição 2, valor 3
// //   console.log()
// for (const n of aValues) {
//     //console.log(aValues.next())
// }


// //####################################################

// let numbers2 = Array.from(numbers)
// let evens = Array.from(numbers, x => (x % 2 == 0))
// // console.log(numbers2)
// // console.log(evens)


// //####################################################

// //console.log(numbers)
// numbers.reverse()

// numbers.sort()
// numbers.sort((a, b) => a - b)
// // function compare(a, b) {
// //     if (a < b) { return -1 }
// //     if (a > b) { return 1 }

// //     return 0
// // }
// //numbers.sort(compare)
// // console.log(numbers)


// //####################################################

// const friends = [
//     { name: 'Mariana', age: 31},
//     { name: 'Louran', age: 30},
//     { name: 'Frida', age: 3},
//     { name: 'Saulo', age: 35},
//     { name: 'Vinicius', age: 26},
// ]
// //console.log(friends)

// function comparePerson(a, b) {
//     if (a.age < b.age) { return -1 }
//     if (a.age > b.age) { return 1 }

//     return 0
// }
// //console.log(friends.sort(comparePerson))


// //####################################################

// let names = ['Ana', 'ana', 'john', 'John']
// //console.log(names.sort())

// // console.log(names.sort((a, b) => {
// //     if (a.toLocaleLowerCase() < b.toLocaleLowerCase) { return -1 }
// //     if (a.toLocaleLowerCase() > b.toLocaleLowerCase) { return 1 }

// //     return 0
// // }))


// //####################################################

// // console.log(numbers.indexOf(10))
// // console.log(numbers.indexOf(100))

// numbers.push(10)
// // console.log(numbers.lastIndexOf(10))
// // console.log(numbers.lastIndexOf(100))


// //####################################################

// let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

// function multipleOf13(element, index, array) {
//     return (element % 13 == 0)
// }
// // console.log(numbers.find(multipleOf13))
// // console.log(numbers.findIndex(multipleOf13))
// // console.log(numbers.includes(15))
// // console.log(numbers.includes(29))

// let numbers2 = [7,6,5,4,3,2,1]
// console.log(numbers2.includes())


// console.log(numbers.toString())

// const numbersString = numbers.join('-')
// console.log(numbersString)

// //####################################################

// let length = 5
// let int16 = new Int16Array(length)

// let array16 = []
// array16.length = length

// for (let i = 0; i<length; i++) {
//     int16[i] = i+1
// }

// console.log(int16)

// //####################################################




console.log('\n')



