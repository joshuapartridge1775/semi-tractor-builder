import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CabinStyle = 'day' | 'sleeper' | 'extended'
export type EngineType = 'diesel' | 'natural-gas' | 'hybrid'

export interface TractorDesign {
  id: string
  name: string
  cabin: CabinStyle
  engine: EngineType
  transmission: 'manual' | 'automatic'
  color: string
  wheelSize: number // 18, 20, 22 inches
  basePrice: number // Cost to produce
  marketPrice: number // Selling price
  createdAt: number
}

interface DesignState {
  designs: TractorDesign[]
  activeDesignId: string | null
}

const initialState: DesignState = {
  designs: [
    {
      id: 'design-1',
      name: 'Classic Hauler',
      cabin: 'day',
      engine: 'diesel',
      transmission: 'manual',
      color: '#c0392b',
      wheelSize: 20,
      basePrice: 45000,
      marketPrice: 65000,
      createdAt: Date.now(),
    },
  ],
  activeDesignId: 'design-1',
}

const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    createDesign: (state, action: PayloadAction<Omit<TractorDesign, 'id' | 'createdAt'>>) => {
      const newDesign: TractorDesign = {
        ...action.payload,
        id: `design-${Date.now()}`,
        createdAt: Date.now(),
      }

      state.designs.push(newDesign)
      state.activeDesignId = newDesign.id
    },

    updateDesign: (state, action: PayloadAction<{ id: string; updates: Partial<TractorDesign> }>) => {
      const design = state.designs.find((d) => d.id === action.payload.id)
      if (design) {
        Object.assign(design, action.payload.updates)
      }
    },

    setActiveDesign: (state, action: PayloadAction<string>) => {
      state.activeDesignId = action.payload
    },

    deleteDesign: (state, action: PayloadAction<string>) => {
      state.designs = state.designs.filter((d) => d.id !== action.payload)
      if (state.activeDesignId === action.payload) {
        state.activeDesignId = state.designs[0]?.id || null
      }
    },
  },
})

export const { createDesign, updateDesign, setActiveDesign, deleteDesign } = designSlice.actions
export default designSlice.reducer
