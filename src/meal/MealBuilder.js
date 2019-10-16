import React, {useState} from 'react'
import {match, arr, replace} from '../utils.js'
import {FoodSelector} from '../food/FoodSelector.js'
import {MealItemEntry} from './MealItemEntry.js'
import {TotalMealCalories} from './TotalMealCalories.js'

const createMeal = food => ({
    food,
    portionsEaten: 1,
})

export const MealBuilder = () => {
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
                <li key={x.food.id}>
                  <MealItemEntry mealItem={x} onChange={onMealEntryChange} />
                </li>
            ))}
          </ul>
          <TotalMealCalories mealItems={mealItems} />
        </section>
    )
}
