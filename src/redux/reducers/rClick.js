export default function rClickReducer(state, action) {
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