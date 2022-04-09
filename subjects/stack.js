class Stack {
    constructor() {
        this.count = 0
        this.items = {}
    }

    //metodos
    push(element) {
        this.items[this.count] = element
        this.count++
    }

    size() {
        return this.count
    }

    isEmpty() {
        return this.count === 0
    }

    pop() {
        if (this.isEmpty()) {
            return undefined
        }

        this.count--
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }

    peek() {
        if (this.isEmpty()) {
            return undefined
        }

        return this.items[this.count - 1]
    }

    clear() {
        this.items = {}
        this.count = 0
    }

    // clear2() {
    //     while(!this.isEmpty()) {
    //         this.pop()
    //     }
    // }

    toString() {
        if (this.isEmpty()) {
            return ''
        }

        let objString = `${this.items[0]}`
        for (let i = 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`
        }

        return objString
    }
}


// const stack = new Stack()
// stack.push(5)
// stack.push(8)

// console.log(stack)
// console.log(stack.size())
// console.log(stack.isEmpty())
// console.log(stack.toString())

// const stack = new Stack()

// console.log(Object.getOwnPropertyNames(stack))
// console.log(Object.keys(stack))
// console.log(stack.items)


//################################################################################

// const _items = Symbol('stackItems')
// class StackPrivate {
//     constructor() {
//         this[_items] = []
//     }

//     //metodos
//     push(element) {
//         this[_items].push(element)
//     }

//     print() {
//         return this[_items]
//     }

// }

// const stackPrivate = new StackPrivate()

// stackPrivate.push(5)
// stackPrivate.push(8)
// console.log(stackPrivate)
// console.log(stackPrivate[_items])

// let objectSymbols = Object.getOwnPropertySymbols(stackPrivate)
// console.log(objectSymbols.length)
// console.log(objectSymbols)
// console.log(objectSymbols[0])

// stackPrivate[objectSymbols[0]].push(1)
// console.log(stackPrivate.print())


//################################################################################

const items = new WeakMap()

class Stack1 {
    constructor() {
        items.set(this, [])
    }

    push(element) {
        const s = items.get(this)
        s.push(element)
    }

    pop() {
        const s = items.get(this)
        const r = s.pop()
        return r
    }

    // outros metodos
}


function decimalToBinary(decNumber) {
    const remStack = new Stack()
    let number = decNumber
    let rem
    let binaryString = ''

    while (number > 0) {
        rem = Math.floor(number % 2)
        remStack.push(rem)
        number = Math.floor(number/2)
    }

    while (!remStack.isEmpty()) {
        binaryString += remStack.pop().toString()
    }

    return binaryString
}


function baseConverter(decNumber, base) {
    const remStack = new Stack()
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number = decNumber
    let rem
    let baseString = ''

    if (!(base >= 2 && base <= 36)) {
        return ''
    }

    while (number > 0) {
        rem = Math.floor(number % base)
        remStack.push(rem)
        number = Math.floor(number / base)
    }

    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()]
    }

    return baseString
}

console.log(baseConverter(100345, 2)); // 11000011111111001
console.log(baseConverter(100345, 8)); // 303771
console.log(baseConverter(100345, 16)); // 187F9
console.log(baseConverter(100345, 35)); // 2BW0



console.log('\n')