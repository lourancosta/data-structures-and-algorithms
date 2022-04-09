const area = require('./17-CalcArea')
const Book = require('./17-Book')

console.log(area.circleArea(2))
console.log(area.squareArea(2))

const myBook = new Book ('Que desespero')
myBook.printTitle()