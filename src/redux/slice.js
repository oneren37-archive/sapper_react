import { createSlice } from "@reduxjs/toolkit"

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
        lClick(state, action) {
            if (state.gameStatus !== 'running') return 
            const pos = action.payload

            if (!state.mines) {
                generateInitialState(state, pos)
            }
    
            if (state.mines[pos[0]][pos[1]] === 9) {
                for (let i = 0; i < state.fieldSize; i++) {
                    for (let j = 0; j < state.fieldSize; j++) {
                        if (state.mines[i][j] === 9) {
                            state.opened[i][j] = true
                        }
                        else if (state.flags[i][j] === 1) {
                            state.flags[i][j] = 0
                            state.opened[i][j] = true
                            state.mines[i][j] = 11
                        }
                    }
                }   
                state.mines[pos[0]][pos[1]] = 10
                state.gameStatus = 'lose'
            }
            else {
                openField(state, pos)
            }
        },
        rClick(state, action) {
            if (state.gameStatus !== 'running') return 
            const [i, j] = action.payload

            if (state.opened && state.opened[i][j]) return 
            if (state.flagsCount === state.minesCount && state.flags[i][j] === 0) return

            state.flags[i][j] = (state.flags[i][j]+1)%3

            switch (state.flags[i][j]) {
                case 1: state.flagsCount += 1; break;
                case 2: state.flagsCount -= 1; break;
            }

            if (state.flagsCount === state.minesCount) {
                checkWin(state)
            }
        },
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


/**
 * Расставляет случайно мины, с учетом того, что в первой выбранной пользователем клетке не должно быть мин
 * @param {Position} initalPick - первая клетка, выбранная пользователем
 */
function generateInitialState(state, initalPick) {
    state.mines = new Array(state.fieldSize).fill(0).map(() => new Array(state.fieldSize).fill(0))
    const mines = state.mines

    //случайно генерим 40 позиций для мин
    new Array(fieldSize*fieldSize).fill(0)
        .map((el, i) => i)
        .filter(el => el !== initalPick[0]*state.fieldSize+initalPick[1])
        .sort(() => Math.random()-0.5)
        .slice(0, state.minesCount)
        .map(el => {mines[Math.floor(el/state.fieldSize)][Math.floor(el%state.fieldSize)] = 9})
    
    for (let i = 0; i < state.fieldSize; i++) {
        for (let j = 0; j < state.fieldSize; j++) {
            if (mines[i][j] !== 9) {
                mines[i][j] = getNeighbors(state, [i, j])
                    .map(([i, j]) => mines[i][j])
                    .filter(e => e === 9).length
            }
        }
    }
}

/**
 * Рекурсивно открывает поля без мин поблизости
 * @param {Position} pos 
 */
function openField(state, pos) {
    const [i, j] = pos
    if (state.opened[i][j] === true || state.flags[i][j] !== 0) return 
    state.opened[i][j] = true
    if (state.mines[i][j] === 0) {
        getNeighbors(state, pos).forEach(cell => openField(state, cell))
    }
}

/**
 * Возвращает массив индексов соседей для данной ячейки
 * @param {Position} pos
 * @returns {Position[]} 
 */
function getNeighbors(state, pos) {
    const neighbors = []
    for (let i = Math.max(pos[0]-1, 0); i <= Math.min(pos[0]+1, state.fieldSize-1); i++) {
        for (let j = Math.max(pos[1]-1, 0); j <= Math.min(pos[1]+1, state.fieldSize-1); j++) {
            if (pos[0] !== i || pos[1] !== j) {
                neighbors.push([i, j])
            }
        }
    }
    return neighbors
}

function checkWin(state) {
    const mines = state.mines
    const flags = state.flags

    for (let i = 0; i < mines.length; i++) {
        for (let j = 0; j < mines[0].length; j++) {
            if (mines[i][j] === 9 && flags[i][j] !== 1) return
        }
    }
    return state.gameStatus = 'win'
}

/**
 * Координаты ячейки на игровом поле в декартовой системе координат.
 * pos[0] - строка
 * pos[1] - столбец
 * @typedef Position
 * @type {number[]}
 */