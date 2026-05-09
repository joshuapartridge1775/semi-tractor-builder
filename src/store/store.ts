import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'
import workersReducer from './workersSlice'
import productionReducer from './productionSlice'
import designReducer from './designSlice'
import economyReducer from './economySlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    workers: workersReducer,
    production: productionReducer,
    design: designReducer,
    economy: economyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
