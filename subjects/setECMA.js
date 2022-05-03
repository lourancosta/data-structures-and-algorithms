const set = new Set()
set.add(1)
set.add(100)
set.add(1000)
// console.log(set.values())
// console.log(set.has(1))
// console.log(set.size)

set.delete(100)
// console.log(set.values())
// console.log(set.size)

set.clear()
// console.log(set.values())

//------------------------------

const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)

const setB = new Set()
setB.add(2)
setB.add(3)
setB.add(4)

const union = (set1, set2) => {
    const unionAB = new Set()
    set1.forEach(value => unionAB.add(value))
    set2.forEach(value => unionAB.add(value))

    return unionAB
}
// console.log(union(setA, setB))

const interserction = (set1, set2) => {
    const interserctionSet = new Set()
    set1.forEach(value => {
        if (set2.has(value)) {
            interserctionSet.add(value)
        }
    })

    return interserctionSet
}
//console.log(interserction(setA, setB))

const difference = (set1, set2) => {
    const differenceSet = new Set()
    set1.forEach(value => {
        if (!set2.has(value)) {
            differenceSet.add(value)
        }
    })

    return differenceSet
}
//console.log(difference(setA, setB))

const unionSpread = new Set([...setA, ...setB])
console.log(unionSpread)

const interserctionSpread = new Set([...setA].filter(x => setB.has(x)))
console.log(interserctionSpread)

const differenceSpread = new Set([...setA].filter(x => !setB.has(x)))
console.log(differenceSpread)

