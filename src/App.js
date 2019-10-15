import React, {useContext, useState, useEffect} from 'react';
import './App.css';
import {getFoods} from './foods.js'

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

const clone = obj => ({...obj})
const FoodSelector = ({values, onChange}) => {
    const { getFoods } = useApi()
    const [foods] = useLoadedState(getFoods)
    return (
        <When value={foods} render={() =>(
            <MultiSelect value={values} onChange={ids => foods.filter(f => ids.includes(f.id)).map(clone)}>
              {foods.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.calories}cal)</option>
              ))}
            </MultiSelect>
        )}/>
    )
}

const MealBuilder = () => {
    const [mealItems, setMealItems] = useState([])
    const onMealItemsChange = (foods) => {
        setMealItems(foods)
    }
    return (
        <section>
          <header>Build your meal</header>
          <FoodSelector value={mealItems.map(x => x.id)} onChange={onMealItemsChange} />
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
