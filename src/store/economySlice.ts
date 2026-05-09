import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EconomyState {
  capital: number // Starting: $100,000
  totalRevenue: number
  totalExpenses: number
  tractorsSold: number
  marketDemand: number // 0-100 (affects selling prices)
}

const initialState: EconomyState = {
  capital: 100000,
  totalRevenue: 0,
  totalExpenses: 0,
  tractorsSold: 0,
  marketDemand: 50,
}

const economySlice = createSlice({
  name: 'economy',
  initialState,
  reducers: {
    addRevenue: (state, action: PayloadAction<number>) => {
      state.capital += action.payload
      state.totalRevenue += action.payload
    },

    subtractExpense: (state, action: PayloadAction<number>) => {
      state.capital -= action.payload
      state.totalExpenses += action.payload
    },

    sellTractor: (state, action: PayloadAction<number>) => {
      state.capital += action.payload
      state.totalRevenue += action.payload
      state.tractorsSold += 1
    },

    updateMarketDemand: (state, action: PayloadAction<number>) => {
      state.marketDemand = Math.max(0, Math.min(100, action.payload))
    },
  },
})

export const { addRevenue, subtractExpense, sellTractor, updateMarketDemand } = economySlice.actions
export default economySlice.reducer
