import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { restart } from '../../redux/slice'

import './Smile.scss'

export default function Smile() {
    const status = useSelector(state => state.gameStatus)
    const wonder = useSelector(state => state.isWondering)
    const [isPressed, setIsPressed] = React.useState(false)
    const dispatch = useDispatch()

    return (
        <div 
            className={`smile smile_${isPressed ? 'pressed' : (wonder ? 'waiting' : status)}`}
            onClick={() => dispatch(restart())}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
        ></div>
    )
}
