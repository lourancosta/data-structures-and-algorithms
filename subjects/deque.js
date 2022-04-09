class Queue {
    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    enqueue(element) {
        this.items[this.count] = element
        this.count++
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined
        }

        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        
        return result
    }

    peek() {
        if (this.isEmpty()) {
            return undefined
        }

        return this.items[this.lowestCount]
    }

    isEmpty() {
        return this.count - this.lowestCount === 0
    }

    // isEmpty2() {
    //     return this.size() === 0
    // }

    size() {
        return this.count - this.lowestCount
    }

    clear() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }

    toString() {
        if (this.isEmpty()) {
            return ''
        }

        let objString = `${this.items[this.lowestCount]}`
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`
        }

        return objString
    }

}

class Deque {
    constructor() {
       this.count = 0
       this.lowestCount = 0
       this.items = {}
    }

    addFront(element) {
        if (this.isEmpty()) {
            this.addBack(element)
        } else if (this.lowestCount > 0) {
            this.lowestCount--
            this.items[this.lowestCount] = element
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1]
            }
            this.count++
            this.lowestCount = 0
            this.items[0] = element
        }
    }

    addBack(element) { 
        this.items[this.count] = element
        this.count++
    }

    removeFront() {
        if (this.isEmpty()) {
            return undefined
        }

        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        
        return result
    }

    removeBack() {
        if (this.isEmpty()) {
            return undefined
        }

        this.count--
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }

    peekFront() {
        if (this.isEmpty()) {
            return undefined
        }

        return this.items[this.lowestCount]
    }

    peekBack() { 
        if (this.isEmpty()) {
            return undefined
        }

        return this.items[this.count - 1]
    }

    isEmpty() {
        return this.count - this.lowestCount === 0
    }

    toString() { 
        if (this.isEmpty()) {
            return ''
        }
        
        let objString = `${this.items[this.lowestCount]}`
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`
        }
        
        return objString
    }

    size() {
        if (this.isEmpty()) {
            return undefined
        }

        return this.count - this.lowestCount
    }
}

const deque = new Deque()

// console.log(deque.isEmpty())

// deque.addBack('Louran')
// deque.addBack('Mariana')
// deque.addBack('Frida')

// console.log(deque.toString())

// deque.addBack('Liz')
// console.log(deque.toString())
// console.log(deque.size())
// console.log(deque.isEmpty())

// deque.removeFront()
// console.log(deque.toString())

// deque.removeBack()
// console.log(deque.toString())

// deque.addFront('Louran')
// console.log(deque.toString())


//#################################################

// function hotPotato(elementList, num) {
//     const queue = new Queue()
//     const eliminatedList = []
    
//     for (let i = 0; i < elementList.length; i++) {
//         queue.enqueue(elementList[i])
//     }

//     while (queue.size() > 1) {
//         for (let i = 0; i < num; i++) {
//             queue.enqueue(queue.dequeue())
//         }
//         eliminatedList.push(queue.dequeue())
//     }

//     return {
//         eliminated: eliminatedList,
//         winner: queue.dequeue()
//     }
// }

// const names = ['Louran', 'Mariana', 'Frida', 'Aristides', 'Maria']
// const result = hotPotato(names, 65)

// result.eliminated.forEach(name => {
//     console.log(`${name} was eliminated from the Hot Potato game.`)
// })

// console.log(`The winner is: ${result.winner}`)

//#################################################

function palindromeChecker(aString) {
    if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
        return false
    }

    const deque = new Deque()
    const lowerString = aString.toLocaleLowerCase().split(' ').join('')
    let isEqual = true
    let firstChar, lastChar

    for (let i = 0; i < lowerString.length; i++) {
        deque.addBack(lowerString.charAt(i))
    }

    while (deque.size() > 1 && isEqual) {
        firstChar = deque.removeFront()
        lastChar = deque.removeBack()

        if (firstChar !== lastChar) {
            isEqual = false
        }
    }

    return isEqual
}


console.log('a', palindromeChecker('a'))
console.log('aa', palindromeChecker('aa'))
console.log('ana', palindromeChecker('ananana'))
console.log('ansa', palindromeChecker('ansa'))



// console.log('\n')

