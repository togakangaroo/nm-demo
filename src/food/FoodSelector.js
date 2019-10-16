import React from 'react'
import {When} from '../ui/When.js'
import {useFromApi} from '../api.js'
import {shortFoodDisplay} from '../food/ShortFoodDisplay.js'

const MultiSelect = ({values, onChange, children, size=20}) => {
    const setValues = ({target}) => {
        onChange([...target.querySelectorAll(`option`)].filter(o => o.selected).map(o => o.value))
    }
    return React.createElement(`select`, {multiple: true, size, value: values, onChange: setValues}, children)
}

const clone = obj => ({...obj})

export const FoodSelector = ({values, onChange}) => {
    const [foods] = useFromApi(`getFoods`)
    return (
        <When value={foods} render={() =>(
            <MultiSelect valuse={values} onChange={ids => onChange(foods.filter(f => ids.includes(f.id)).map(clone))}>
            {foods.map(f => (
                <option key={f.id} value={f.id}>{shortFoodDisplay(f)}</option>
            ))}
            </MultiSelect>
        )}/>
    )
}
