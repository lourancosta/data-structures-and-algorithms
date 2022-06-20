import { Compare, defaultCompare, swap } from "../../util.js"
import { createNonSortedArray } from "./bubbleSort.js"

function selectionSort(array, compareFn = defaultCompare) {
    const { length } = array
    let indexMin

    for (let i = 0; i < length - 1; i++) {
        indexMin = i
        
        for (let j = i; j < length; j++) {
            if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                indexMin = j
            }
        }

        if (i !== indexMin) {
            swap(array, i, indexMin)
        }
    }

    return array
}


// --------------------  TESTS  --------------------
let array = createNonSortedArray(5)
console.log(array)

array = selectionSort(array)
console.log(array)