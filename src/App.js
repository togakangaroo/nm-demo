import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import './App.css';
import {getFoods} from './foods.js'

const Input = styled.input`
    &[required]:invalid {
        background-color: ##ffd0d0;
    }
`

const ApiContext = React.createContext({
    getFoods
})
const useApi = () => useContext(ApiContext)

const When = ({value, render}) => {
    if(value)
        return render(value)
    return "Please wait..."
}
const useLoadedState = (getValue, dependencies=[]) => {
    const [value, setValue] = useState(null)
    useEffect(() => {
        const gettingValue = getValue()
        gettingValue.then(setValue)
        return gettingValue.cancel //if there is the ability to cancel, go ahead and do that on dispose
    }, [getValue, ...dependencies]) //eslint-disable-line react-hooks/exhaustive-deps
    return [value, setValue]
}

const MultiSelect = ({values, onChange, children}) => {
    const setValues = ({target}) => {
        onChange([...target.querySelectorAll(`option`)].filter(o => o.selected).map(o => o.value))
    }
    return React.createElement(`select`, {multiple: true, value: values, onChange: setValues}, children)
}

const shortMealDisplay = ({name, portion, calories}) => `${name} (${calories} per ${portion}g)`
const ShortMealDisplay = shortMealDisplay

const clone = obj => ({...obj})
const FoodSelector = ({values, onChange}) => {
    const { getFoods } = useApi()
    const [foods] = useLoadedState(getFoods)
    return (
        <When value={foods} render={() =>(
            <MultiSelect valuse={values} onChange={ids => onChange(foods.filter(f => ids.includes(f.id)).map(clone))}>
              {foods.map(f => (
                  <option key={f.id} value={f.id}>{shortMealDisplay(f)}</option>
              ))}
            </MultiSelect>
        )}/>
    )
}

const noop = () => {}
const MealItemEntry = ({meal, onChange}) => {
    const changePortions = ({target: {value}}) => {
        onChange({...meal, portionsEaten: +value})
    }
    return (
        <form onSubmit={noop}>
          <header>
            <ShortMealDisplay {...meal.food} />
          </header>
          <Input placeholder="Portions Eaten"
                 type="number" min={1} required
                 value={meal.portionsEaten}
                 onChange={changePortions} />
        </form>
    )
}

const match = (items, others, areEqual) => {
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
const range = function * (min = 0) {
    let val = min;
    while(true) {
        yield val
        val += 1
    }
}
const zip = function * (coll1, coll2) {
    const it2 = coll2[Symbol.iterator]()
    for(const item1 of coll1) {
        const {done, value} = it2.next()
        if(done)
            return
        yield [item1, value]
    }
}
const replace = ({act, where}) => function * (arr) {
    for(const [x, i] of zip(arr, range()))
        if(where(x, i))
            yield act(x, i)
        else
            yield x
}
const arr = x => Array.isArray(x) ? x : [...x]
const createMeal = food => ({
    food,
    portionsEaten: 1,
})
const MealBuilder = () => {
    const [mealItems, setMealItems] = useState([])
    const onMealItemsChange = (foods) => {
        const {additional, removed} = match(mealItems, foods, mi => f => mi.food.id === f.id)
        const newFoods = mealItems
              .filter(mi => !removed.includes(mi))
              .concat(additional.map(createMeal))
        setMealItems(newFoods)
    }
    const onMealEntryChange = (x) => {
        setMealItems(arr(
            replace({
                act: o => ({...o, portionsEaten: x.portionsEaten}),
                where: (o) => o.food.id === x.food.id
            })(mealItems)
        ))
    }
    return (
        <section>
          <header>Build your meal</header>
          <FoodSelector value={mealItems.map(x => x.food.id)} onChange={onMealItemsChange} />
          <ul>
            {mealItems.map(x => (
                <li key={x.food.id}><MealItemEntry meal={x} onChange={onMealEntryChange} /></li>
            ))}
          </ul>
        </section>
    )
}

const MyMeals = () => {
    return "my meals"
}

const App = () => (
    <>
      <MealBuilder />
      <MyMeals />
    </>
)

export default App;
