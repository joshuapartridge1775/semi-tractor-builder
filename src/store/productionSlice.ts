import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ProductionStage = 'welding' | 'painting' | 'mechanics'
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled'

export interface ProductionTask {
  id: string
  designId: string
  stage: ProductionStage
  status: TaskStatus
  progress: number // 0-100
  quality: number // 0-100 (affects selling price)
  workerId: string | null
  startTime: number
  estimatedDuration: number // in seconds
  completedTime: number | null
}

interface ProductionState {
  tasks: ProductionTask[]
  completedTractors: string[] // Design IDs of completed tractors
}

const initialState: ProductionState = {
  tasks: [],
  completedTractors: [],
}

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {
    createTask: (
      state,
      action: PayloadAction<{ designId: string; stage: ProductionStage; workerId: string }>,
    ) => {
      const newTask: ProductionTask = {
        id: `task-${Date.now()}`,
        designId: action.payload.designId,
        stage: action.payload.stage,
        status: 'in-progress',
        progress: 0,
        quality: 50 + Math.random() * 30,
        workerId: action.payload.workerId,
        startTime: Date.now(),
        estimatedDuration: action.payload.stage === 'welding' ? 120 : 90,
        completedTime: null,
      }

      state.tasks.push(newTask)
    },

    updateTaskProgress: (state, action: PayloadAction<{ taskId: string; progress: number }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId)
      if (task) {
        task.progress = Math.min(100, action.payload.progress)
        if (task.progress >= 100) {
          task.status = 'completed'
          task.completedTime = Date.now()
        }
      }
    },

    cancelTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload)
      if (task) {
        task.status = 'cancelled'
      }
    },

    completeProduction: (state, action: PayloadAction<string>) => {
      const designId = action.payload
      const tractorTasks = state.tasks.filter((t) => t.designId === designId)
      if (tractorTasks.every((t) => t.status === 'completed')) {
        state.completedTractors.push(designId)
      }
    },
  },
})

export const { createTask, updateTaskProgress, cancelTask, completeProduction } =
  productionSlice.actions
export default productionSlice.reducer
