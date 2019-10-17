import React from 'react'
import {Link} from '@reach/router'
import {TotalMealCalories} from './TotalMealCalories.js'

const ShortMealDisplay = TotalMealCalories

export const MealList = ({meals}) => (
    <article>
      {!meals.length ? (
      `No meals yet`
      ) : (
          <ul>
            {meals.map(m => (
                <li key={m.id}>
                  <Link to={`/${m.id}`}>
                    <ShortMealDisplay {...m} />
                  </Link>
                </li>
            ))}
          </ul>
      )}
    </article>
)
