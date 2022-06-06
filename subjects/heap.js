import { Compare, defaultCompare, swap } from '../util.js'

export class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.heap = []
    }

    getLeftIndex(index) {
        return 2 * index + 1
    }c

    getRightIndex(index) {
        return 2 * index + 2
    }

    getParentIndex(index) {
        if (index === 0) {
            return undefined
        }
        //return Math.floor((index - 1) / 2)
        return index - 1
    }

    insert(value) {
        if (value != null) {
            this.heap.push(value)
            this.siftUp(this.heap.length - 1)
            return true
        }
        return false
    }

    siftUp(index) {
        let parent = this.getParentIndex(index)
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) >= Compare.BIGGER_THAN) {
            swap(this.heap, parent, index)
            index = parent
            parent = this.getParentIndex(index)
        }

        function swap(array, a, b) {
            const temp = array[a]
            array[a] = array[b]
            array[b] = temp
        }
    }

    size() {
        return this.heap.length
    }

    isEmpty() {
        return this.size() === 0
    }

    findMinium() {
        return this.isEmpty() ? undefined : this.heap[0]
    }

    findMaximium() {
        return this.isEmpty() ? undefined : this.heap[this.heap.length - 1]
    }


    // !!!!
    extract() {
        if (this.isEmpty()) {
            return undefined
        }

        if (this.size() === 1) {
            return this.heap.shift()
        }

        const removedValue = this.heap.shift()
        this.siftDown(0)
        return removedValue
    }

    siftDown(index) {
        let element = index
        const left = this.getLeftIndex(index)
        const right = this.getRightIndex(index)
        const size = this.size()

        if (left < size && this.compareFn(this.heap[element], this.heap[left]) >= Compare.BIGGER_THAN) {
            element = left
        } 

        if (right < size && this.compareFn(this.heap[element], this.heap[right]) >= Compare.BIGGER_THAN) {
            element = right
        }

        if (index !== element) {
            swap(this.heap, index, element)
            this.siftDown(element)
        }
    }
}

//const heap = new MinHeap()
// heap.insert(3)
// heap.insert(4)
// heap.insert(2)
// heap.insert(1)
// heap.insert(7)
// heap.insert(10)
// heap.insert(6)
// heap.insert(9)
// heap.insert(8)
// heap.insert(5)
// heap.insert(11)
// heap.insert(20)
// heap.insert(15)

// for (let i = 1; i < 10; i++) {
//     heap.insert(i)
// }
// console.log('Extract minimum: ', heap.extract())
// console.log(heap)


// console.log(heap)

// console.log('Heap size: ', heap.size())
// console.log('Heap is empty: ', heap.isEmpty())
// console.log('Heap min value: ', heap.findMinium())
// console.log('Heap max value: ', heap.findMaximium())


function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a)
}

export class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = reverseCompare(compareFn)
    }
}

// const maxHeap = new MaxHeap()
// maxHeap.insert(2)
// maxHeap.insert(3)
// maxHeap.insert(4)
// maxHeap.insert(5)
// maxHeap.insert(1)
// console.log(maxHeap)
// console.log('Heap size: ', maxHeap.size()) // 5
// console.log('Heap min value: ', maxHeap.findMinium()) // 5

function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length
    buildMaxHeap(array, compareFn)
    while (heapSize > 1) {
        swap(array, 0, --heapSize)
        heapify(array, 0, heapSize, compareFn)
    }

    return array
}

function buildMaxHeap(array, compareFn) {
    for (let i = Math.floor(array.length / 2); i > 0; i -= 1) {
        heapify(array, i, array.length, compareFn)
    }

    return array
}


// Verificar essa função
function heapify(array, index, compareFn) {
    let element = index
    const left = array.getLeftIndex(index)
    const right = array.getRightIndex(index)
    const size = array.size()

    if (left < size && this.compareFn(array[element], array[left]) >= Compare.BIGGER_THAN) {
        element = left
    } 

    if (right < size && this.compareFn(array[element], array[right]) >= Compare.BIGGER_THAN) {
        element = right
    }

    if (index !== element) {
        swap(array, index, element)
        this.siftDown(element)
    }
}

const array = [7, 6, 3, 5, 4, 1, 2]
console.log('Before sorting: ', array)
console.log('After sorting: ', heapSort(array))
