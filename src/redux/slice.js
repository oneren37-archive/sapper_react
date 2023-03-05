import { createSlice } from "@reduxjs/toolkit"
import lClickReducer from './reducers/lClick'
import rClickReducer from './reducers/rClick'

const fieldSize = 16
const minesCount = 40

const initialState = {
    fieldSize,
    minesCount,
    flagsCount: 0,
    time: 0,
    gameStatus: 'running',
    isWondering: false,
    mines:  null,
    flags:  new Array(fieldSize).fill(0).map(() => new Array(fieldSize).fill(0)),
    opened: new Array(fieldSize).fill(0).map(() => new Array(fieldSize).fill(false))
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        restart() { return initialState },
        incrementTimer(state) {
            state.time += 1
        },
        lClick: lClickReducer,
        rClick: rClickReducer,
        setWonder(state, action) {
            state.isWondering = state.gameStatus === 'running' && action.payload
        }
    }
})

export const {
    restart,
    incrementTimer, 
    lClick, 
    rClick,
    setWonder
} = mainSlice.actions
export default mainSlice.reducer
