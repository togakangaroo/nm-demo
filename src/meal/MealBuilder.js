import React from 'react'
import {match} from '../utils.js'
import {FoodSelector} from '../food/FoodSelector.js'
import {MealItemEntry} from './MealItemEntry.js'
import {TotalMealCalories} from './TotalMealCalories.js'

const createMealItem = food => ({
    food,
    portionsEaten: 1,
})

export const MealBuilder = ({meal, onChange}) => {
    const onMealItemsChange = (foods) => {
        const {additional, removed} = match(meal.items, foods, (mi, f) => mi.food.id === f.id)
        const items = meal.items
              .filter(mi => !removed.includes(mi))
              .concat(additional.map(createMealItem))
        onChange({...meal, items})
    }
    const onMealEntryChange = (x) => {
        const items = meal.items.map(mi => (
            mi.food.id !== x.food.id ? mi : {...mi, portionsEaten: x.portionsEaten}
        ))
        onChange({...meal, items})
    }
    return (
        <form onSubmit={noSubmit}>
          <FoodSelector value={meal.items.map(x => x.food.id)} onChange={onMealItemsChange} />
          <ul>
            {meal.items.map(x => (
                <li key={x.food.id}>
                  <MealItemEntry mealItem={x} onChange={onMealEntryChange} />
                </li>
            ))}
          </ul>
          <TotalMealCalories items={meal.items} />
        </form>
    )
}

const noSubmit = e => e.preventDefault()
