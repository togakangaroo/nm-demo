import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
    display: inline-block;
    &:after {
        content: ":";
        margin-right: 0.6em;
    }
`

export const Labeled = ({label, children}) =>(
    <label>
      <Label>{label}</Label>
      {children}
    </label>
)
