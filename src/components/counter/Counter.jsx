import React from 'react'
import { useSelector } from 'react-redux'
import Display from '../display/Display'

export default function Counter() {
    const value = useSelector(state => state.minesCount - state.flagsCount)

    return (
        <Display value={value}/>
    )
}
