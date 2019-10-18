const noop = () => {}

/*
  A form of debounce specific to api promises. This is a bit better then the
  type of debounce you see implemented in eg lodash first because putting
  milliseconds first just makes more sense, second because its specific to
  promises meaning it does both a leading and trailing edge debounce but then
  also when it is debouncing it is returning unresolved promises (not resolved
  to the last value!). When we eventually *do* get a completed promise, all of
  those become resolved or rejected
*/
const debouncePromise = (ms, getVal) => {
    let nextInvoke
    let timeout
    const awaiting = []

    const finish = resOrRej => async (val) => {
        for(const x of awaiting)
            x[resOrRej](val)
        awaiting.splice(0)
        return val
    }
    const getAndResolveAll = (...args) => (
        getVal(...args).then(finish(`resolve`), finish(`reject`))
    )
    const resetTimeout = (onTimeout = noop) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            nextInvoke = notDebouncing
            onTimeout()
        }, ms)
    }
    // states:
    const debouncing = (...args) => {
        resetTimeout(() => getAndResolveAll(...args)) //the lambda is the trailing edge debounce
        return new Promise((resolve, reject) => awaiting.push({resolve, reject}))
    }
    const notDebouncing = (...args) => {
        awaiting.splice(0)
        nextInvoke = debouncing
        resetTimeout()
        return getAndResolveAll(...args)
    }

    nextInvoke = notDebouncing //leading edge debounce
    return (...args) => nextInvoke(...args)
}

const searchFoods = debouncePromise(2500, (search) => (
    fetch(`https://uih0b7slze.execute-api.us-east-1.amazonaws.com/dev/search?kv=${search}`).then(x => x.json())
))

export const getFoods = (search) => ((search||``).length < 3) ? Promise.resolve([]) : searchFoods(search)
