import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SellTractorPayload {
  salePrice: number
  costBasis: number
}

interface EconomyState {
  capital: number
  totalRevenue: number
  totalExpenses: number
  totalCostsRecovered: number
  totalProfit: number
  tractorsSold: number
  marketDemand: number
}

const initialState: EconomyState = {
  capital: 100000,
  totalRevenue: 0,
  totalExpenses: 0,
  totalCostsRecovered: 0,
  totalProfit: 0,
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

    sellTractor: (state, action: PayloadAction<SellTractorPayload>) => {
      const { salePrice, costBasis } = action.payload
      const profit = salePrice - costBasis

      state.capital += salePrice
      state.totalRevenue += salePrice
      state.totalCostsRecovered += costBasis
      state.totalProfit += profit
      state.tractorsSold += 1
    },

    updateMarketDemand: (state, action: PayloadAction<number>) => {
      state.marketDemand = Math.max(0, Math.min(100, action.payload))
    },
  },
})

export const { addRevenue, subtractExpense, sellTractor, updateMarketDemand } = economySlice.actions
export default economySlice.reducer
