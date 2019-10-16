import React from 'react'
import styled from 'styled-components'

const CaloriesContainer = styled.div`
    margin: 10px;
    font-family: monospace;
    display: inline-block;
`

export const Calories = ({value}) => (
    <CaloriesContainer>
      {value} calories
    </CaloriesContainer>
)
