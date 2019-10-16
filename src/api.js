import React, {useContext, useState, useEffect} from 'react'
import {getFoods} from './food/api.js'

export const ApiContext = React.createContext({
    getFoods
})

export const useApi = () => useContext(ApiContext)

export const useLoadedState = (getValue, dependencies=[]) => {
    const [value, setValue] = useState(null)
    useEffect(() => {
        const gettingValue = getValue()
        gettingValue.then(setValue)
        return gettingValue.cancel //if there is the ability to cancel, go ahead and do that on dispose
    }, [getValue, ...dependencies]) //eslint-disable-line react-hooks/exhaustive-deps
    return [value, setValue]
}

export const useFromApi = (prop, ...args) => {
    const api = useApi(...args)
    return useLoadedState(api[prop], args)
}
