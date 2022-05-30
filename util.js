export function defaultEquals(a, b) {
    return a === b
}

export function defaulToString(item) {
    if (item === null) {
        return 'NULL'
    }

    if (item === undefined) {
        return 'UNDEFINED'
    }

    if (typeof item === 'string' || item instanceof String) {
        return `${item}`
    }

    return item.toString()
}

export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

export function defaultCompare(a, b) {
    if (a === b) {
        return 0
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

export const swap = (array, a, b) => [array[a], array[b]] = [array[b], array[a]]
// function swap(array, a, b) {
//     const temp = array[a]
//     array[a] = array[b]
//     array[b] = temp
// }