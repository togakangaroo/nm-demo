import React from 'react'
import {Calories} from '../ui/Calories.js'

const totalMealItemCalories = ({portionsEaten, food: { calories }}) => portionsEaten*calories
export const TotalMealItemCalories = (x) => (
    !x.portionsEaten ? null : (
        <Calories value={totalMealItemCalories(x)} />
    )
)

const sum = (a, b) => a+b
export const TotalMealCalories = ({items}) => (
    <div>
      <Calories value={items.map(totalMealItemCalories).reduce(sum, 0)}/>
      over {items.length} items
    </div>
)
