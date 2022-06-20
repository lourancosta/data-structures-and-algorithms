import { Compare, defaultCompare, swap } from "../../util.js";

function bubbleSort(array, compareFn = defaultCompare) {
    const { length } = array

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1)
            }
        }
    }

    return array
}

function modifiedBublleSort(array, compareFn = defaultCompare) {
    const { length } = array

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1)
            }
        }
    }

    return array
}

export function createNonSortedArray(size) {
    const array = []

    for (let i = size; i > 0; i--) {
        array.push(i)
    }

    return array
}


// --------------------  TESTS  --------------------
let array = createNonSortedArray(6)
//console.log(array)

//array = bubbleSort(array)

array = modifiedBublleSort(array)
//console.log(array)
