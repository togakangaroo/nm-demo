import React from 'react'
import {Router} from '@reach/router'
import {MealCreator, MealEditor} from './meal/MealEditors.js'
import {MealList} from './meal/MealList.js'
import {useLoadedState, useApi} from './api.js'
import {When} from './ui/When.js'

const App = () => {
    const {getMyState, saveMyState} = useApi()
    const [myState, setMyState] = useLoadedState(getMyState)

    const setMyMeals = (myMeals) => {
        const s = {myMeals}
        setMyState(s)
        saveMyState(s)
    }
    const addMeal = (meal) => setMyMeals([...myState.myMeals, meal])
    const saveMeal = (meal) => setMyMeals(myState.myMeals.map(m => m.id === meal.id ? meal : m))
    const deleteMeal = ({id}) => setMyMeals(myState.myMeals.filter(m => m.id !== id))

    return (
        <When value={myState} render={({myMeals}) => (
            <>
              <Router>
                <MealEditor path="/:mealId" meals={myMeals} saveMeal={saveMeal} deleteMeal={deleteMeal}/>
                <MealCreator path="/" saveMeal={addMeal} />
              </Router>
              <Router>
                <MealList path="/*" meals={myMeals} />
              </Router>
            </>
        )} />
    )
}

export default App;
