import React, {useState, useEffect} from 'react'
import {navigate, Link} from '@reach/router'
import styled from 'styled-components'
import uuid from 'uuid/v4'
import {MealBuilder} from './MealBuilder.js'
import {DateDisplay} from '../ui/DateDisplay.js'

const Footer = styled.footer`
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    margin: 0 20px;
`

const useDepenentState = (defaultValue, dependencies) => {
    const [value, setValue] = useState(defaultValue)
    useEffect(() => {
        setValue(defaultValue)
    }, dependencies) //eslint-disable-line react-hooks/exhaustive-deps
    return [value, setValue]
}

const defaultMeal = () => ({
    id: uuid(),
    timestamp: new Date().toISOString(),
    items: [],
})

export const MealCreator = ({saveMeal}) => {
    const [meal, setMeal] = useState(defaultMeal())
    const onSave = () => {
        saveMeal(meal)
        navigate(`/${meal.id}`)
    }
    return (
        <section>
          <header>Build a Meal</header>
          <MealBuilder meal={meal} onChange={setMeal} />
          <Footer>
            <button onClick={onSave}>Save Meal</button>
          </Footer>
        </section>
    )
}
export const MealEditor = ({mealId, meals, saveMeal, deleteMeal}) => {
    // yes, we want a weak compare here mealId might be a string
    const defaultMeal = meals.find(m => m.id == mealId) //eslint-disable-line eqeqeq
    const [meal, setMeal] = useDepenentState(defaultMeal, [meals, mealId])
    const onDelete = () => {
        deleteMeal(meal)
        navigate(`/`)
    }
    return (
        <section>
          <header>Edit Meal from <DateDisplay value={meal.timestamp} /></header>
          <MealBuilder meal={meal} onChange={setMeal} />
          <Footer>
            <button onClick={() => saveMeal(meal)}>Save Meal</button>
            <button onClick={onDelete}>Delete Meal</button>
            <Link to="/">Add New Meal</Link>
          </Footer>
        </section>
    )
}
