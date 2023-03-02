import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementTimer } from '../../redux/slice'
import Display from '../display/Display'

export default function Time() {
    const value = useSelector(state => state.time)
    const status = useSelector(state => state.gameStatus)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (status == 'running') {
            const interval = setInterval(() => {
                dispatch(incrementTimer())
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [status])

    return (
        <Display value={value}/>
    )
}
