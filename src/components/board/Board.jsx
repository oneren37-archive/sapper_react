import React from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { rClick, lClick, setWonder } from '../../redux/slice'

import './Board.scss'

export default function Board() {
    const size = useSelector(state => state.fieldSize)
    return (
        <div className='board'>
            {new Array(size).fill(0).map((el, i) => (<div className='board-row' key={i}>
                {new Array(size).fill(0).map((el, j) => <Cell i={i} j={j} key={j}/>)}
            </div>))}
        </div>
    )
}


function Cell({ i, j }) {
    const [rPressed, setRPressed] = React.useState(false)
    const dispatch = useDispatch()
    const gameStatus = useSelector(state => state.gameStatus)
    const mines = useSelector(state => state.mines ? state.mines[i][j] : 0)
    const flag = useSelector(state => state.flags[i][j])
    const opened = useSelector(state => state.opened[i][j])

    const handleMouseDown = (e) => {
        switch(e.button) {
            case 0: 
                flag === 0 && dispatch(setWonder(!opened))
                break
            case 2: 
                setRPressed(flag !== 0)
                break
        }
    }

    const hanleMouseUp = (e) => {
        switch(e.button) {
            case 0: 
                flag === 0 && dispatch(lClick([i, j]))
                flag === 0 && dispatch(setWonder(false))
                break
            case 2: 
                dispatch(rClick([i, j]))
                setRPressed(false)
                break
        }
    }

    return (
        <div
            className={classnames(
                'board-row__cell',
                {[`board-row__cell_${mines}`]: opened},
                {'board-row__cell_flag': flag === 1},
                {'board-row__cell_question': flag === 2},
                {'board-row__cell_question-pressed': gameStatus === 'running' && flag !== 0 && rPressed}
            )}
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={handleMouseDown}
            onMouseUp={hanleMouseUp}
        ></div>
    )
}