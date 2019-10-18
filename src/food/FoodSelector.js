import React, {useState} from 'react'
import styled from 'styled-components'
import {When} from '../ui/When.js'
import {Input} from '../ui/Input.js'
import {useApi, useLoadedState} from '../api.js'
import {ShortFoodDisplay} from '../food/ShortFoodDisplay.js'

const PlainButton = styled.button`
    display: inline-block;
    background-color: transparent;
    margin: 0;
    padding: 0;
    border: 0;
`

const Section = styled.section`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 10px;
`

export const FoodSelector = ({onAdd}) => {
    const [search, setSearch] = useState(``)
    const {getFoods} = useApi()
    const [foods] = useLoadedState(() => getFoods(search), [search, getFoods])
    return (
        <Section>
          <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          <When value={foods} render={() =>(
              <ul>
                {foods.map(f => (
                    <li key={f.id}>
                      <PlainButton onClick={() => onAdd(f)}>
                        <ShortFoodDisplay {...f} />
                      </PlainButton>
                    </li>
                ))}
              </ul>
          )}/>
        </Section>
    )
}
