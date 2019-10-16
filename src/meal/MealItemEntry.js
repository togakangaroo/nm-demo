import React from 'react'
import {Labeled} from '../ui/Labeled.js'
import {Input} from '../ui/Input.js'
import {ShortFoodDisplay} from '../food/ShortFoodDisplay.js'
import {TotalMealItemCalories} from './TotalMealCalories.js'

const noop = () => {}
export const MealItemEntry = ({mealItem, onChange}) => {
    const changePortions = ({target: {value}}) => {
        onChange({...mealItem, portionsEaten: +value})
    }
    return (
        <form onSubmit={noop}>
          <header>
            <ShortFoodDisplay {...mealItem.food} />
          </header>

          <Labeled label="Portions Eaten">
              <Input placeholder="Portions Eaten"
                     type="number" min={1} required
                     value={mealItem.portionsEaten}
                     onChange={changePortions} />
          </Labeled>
          <TotalMealItemCalories {...mealItem} />
        </form>
    )
}
