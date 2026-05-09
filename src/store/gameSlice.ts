import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  gameTime: number // in seconds
  gameSpeed: number // 1x, 2x, 4x speed
  isPaused: boolean
  difficulty: 'easy' | 'normal' | 'hard'
}

const initialState: GameState = {
  gameTime: 0,
  gameSpeed: 1,
  isPaused: false,
  difficulty: 'normal',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGameTime: (state) => {
      if (!state.isPaused) {
        state.gameTime += 1
      }
    },
    setGameSpeed: (state, action: PayloadAction<number>) => {
      state.gameSpeed = action.payload
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused
    },
    setDifficulty: (state, action: PayloadAction<'easy' | 'normal' | 'hard'>) => {
      state.difficulty = action.payload
    },
  },
})

export const { updateGameTime, setGameSpeed, togglePause, setDifficulty } = gameSlice.actions
export default gameSlice.reducer
