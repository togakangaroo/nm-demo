import React from 'react'
import {FoodSelector} from '../food/FoodSelector.js'
import {MealItemEntry} from './MealItemEntry.js'
import {TotalMealCalories} from './TotalMealCalories.js'

const createMealItem = food => ({
    food,
    portionsEaten: 1,
})

export const MealBuilder = ({meal, onChange}) => {
    const onMealItemAdded = (food) => {
        if(meal.items.some(i => i.food.id === food.id))
            return
        const items = meal.items.concat(createMealItem(food))
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
          <FoodSelector onAdd={onMealItemAdded} />
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
