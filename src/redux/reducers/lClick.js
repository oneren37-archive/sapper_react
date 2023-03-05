export default function lClick(state, action) {
    if (state.gameStatus !== 'running') return 
    const pos = action.payload

    if (!state.mines) {
        generateInitialState(state, pos)
    }

    if (state.mines[pos[0]][pos[1]] === 9) {
        for (let i = 0; i < state.fieldSize; i++) {
            for (let j = 0; j < state.fieldSize; j++) {
                if (state.mines[i][j] === 9) {
                    if (state.flags[i][j] === 2) state.flags[i][j] = 0
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
}

/**
 * Расставляет случайно мины, с учетом того, что в первой выбранной пользователем клетке не должно быть мин
 * @param {Position} initalPick - первая клетка, выбранная пользователем
 */
function generateInitialState(state, initalPick) {
    state.mines = new Array(state.fieldSize).fill(0).map(() => new Array(state.fieldSize).fill(0))
    const mines = state.mines
    const fieldSize = state.fieldSize

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

/**
 * Координаты ячейки на игровом поле в декартовой системе координат.
 * pos[0] - строка
 * pos[1] - столбец
 * @typedef Position
 * @type {number[]}
 */