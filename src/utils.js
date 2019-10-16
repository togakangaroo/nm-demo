export const match = (items, others, areEqual) => {
    const additional = [...others]
    const removed = []
    for(const i of items) {
        const idx = additional.findIndex(areEqual(i))
        if(idx < 0)
            removed.push(i)
        else
            additional.splice(idx, 1)
    }
    return {additional, removed}
}
export const range = function * (min = 0) {
    let val = min;
    while(true) {
        yield val
        val += 1
    }
}
export const zip = function * (coll1, coll2) {
    const it2 = coll2[Symbol.iterator]()
    for(const item1 of coll1) {
        const {done, value} = it2.next()
        if(done)
            return
        yield [item1, value]
    }
}
export const replace = ({act, where}) => function * (arr) {
    for(const [x, i] of zip(arr, range()))
        if(where(x, i))
            yield act(x, i)
    else
        yield x
}
export const arr = x => Array.isArray(x) ? x : [...x]
