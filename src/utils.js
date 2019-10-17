export const match = (items, others, areEqual) => {
    const additional = [...others]
    const removed = []
    for(const i of items) {
        const idx = additional.findIndex(x => areEqual(i, x))
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

export const zip = function * (combineFn, ...collections) {
    const iterators = collections.map(c => c[Symbol.iterator]())
    while(true) {
        const items = iterators.map(it => it.next())
        if(items.some(i => i.done))
            return
        yield combineFn(...items.map(i => i.value))
    }
}
export const zipTuple = (...colls) => zip(Array, ...colls)
