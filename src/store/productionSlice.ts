import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ProductionStage = 'welding' | 'painting' | 'mechanics'
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled'

export interface ProductionTask {
  id: string
  tractorInstanceId: string
  designId: string
  stage: ProductionStage
  status: TaskStatus
  progress: number
  quality: number
  workerId: string | null
  startTime: number
  estimatedDuration: number
  completedTime: number | null
}

export interface CompletedTractor {
  id: string
  tractorInstanceId: string
  designId: string
  quality: number
  completedTime: number
}

interface ProductionState {
  tasks: ProductionTask[]
  completedTractors: CompletedTractor[]
}

const initialState: ProductionState = {
  tasks: [],
  completedTractors: [],
}

const REQUIRED_STAGES: ProductionStage[] = ['welding', 'painting', 'mechanics']

const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

const getStageDuration = (stage: ProductionStage) => {
  switch (stage) {
    case 'welding':
      return 120
    case 'painting':
      return 90
    case 'mechanics':
      return 90
  }
}

const tryCompleteProductionRun = (state: ProductionState, tractorInstanceId: string) => {
  const runTasks = state.tasks.filter((t) => t.tractorInstanceId === tractorInstanceId)

  if (runTasks.length === 0) return

  const completedTasksByStage = REQUIRED_STAGES.map((stage) =>
    runTasks.find((t) => t.stage === stage && t.status === 'completed'),
  )

  if (!completedTasksByStage.every(Boolean)) return

  const completedTasks = completedTasksByStage as ProductionTask[]
  const designId = completedTasks[0].designId

  const alreadyCompleted = state.completedTractors.some(
    (tractor) => tractor.tractorInstanceId === tractorInstanceId,
  )

  if (alreadyCompleted) return

  const averageQuality = Math.round(
    completedTasks.reduce((sum, task) => sum + task.quality, 0) / completedTasks.length,
  )

  state.completedTractors.push({
    id: createId('completed-tractor'),
    tractorInstanceId,
    designId,
    quality: averageQuality,
    completedTime: Date.now(),
  })

  state.tasks = state.tasks.filter((task) => task.tractorInstanceId !== tractorInstanceId)
}

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {
    createTask: (
      state,
      action: PayloadAction<{
        tractorInstanceId: string
        designId: string
        stage: ProductionStage
        workerId: string | null
      }>,
    ) => {
      state.tasks.push({
        id: createId('task'),
        tractorInstanceId: action.payload.tractorInstanceId,
        designId: action.payload.designId,
        stage: action.payload.stage,
        status: 'in-progress',
        progress: 0,
        quality: Math.round(50 + Math.random() * 30),
        workerId: action.payload.workerId,
        startTime: Date.now(),
        estimatedDuration: getStageDuration(action.payload.stage),
        completedTime: null,
      })
    },

    createProductionRun: (
      state,
      action: PayloadAction<{
        designId: string
        workerAssignments?: Partial<Record<ProductionStage, string | null>>
      }>,
    ) => {
      const tractorInstanceId = createId('tractor-instance')

      for (const stage of REQUIRED_STAGES) {
        state.tasks.push({
          id: createId('task'),
          tractorInstanceId,
          designId: action.payload.designId,
          stage,
          status: 'pending',
          progress: 0,
          quality: Math.round(50 + Math.random() * 30),
          workerId: action.payload.workerAssignments?.[stage] ?? null,
          startTime: 0,
          estimatedDuration: getStageDuration(stage),
          completedTime: null,
        })
      }
    },

    startTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId)

      if (!task || task.status !== 'pending') return

      task.status = 'in-progress'
      task.startTime = Date.now()
    },

    assignWorkerToTask: (
      state,
      action: PayloadAction<{ taskId: string; workerId: string | null }>,
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId)

      if (!task || task.status === 'completed' || task.status === 'cancelled') return

      task.workerId = action.payload.workerId
    },

    updateTaskProgress: (state, action: PayloadAction<{ taskId: string; progress: number }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId)

      if (!task || task.status === 'cancelled' || task.status === 'completed') return

      if (task.status === 'pending') {
        task.status = 'in-progress'
        task.startTime = task.startTime || Date.now()
      }

      task.progress = Math.min(100, Math.max(0, action.payload.progress))

      if (task.progress >= 100) {
        task.status = 'completed'
        task.completedTime = Date.now()

        tryCompleteProductionRun(state, task.tractorInstanceId)
      }
    },

    cancelTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload)

      if (task && task.status !== 'completed') {
        task.status = 'cancelled'
      }
    },

    cancelProductionRun: (state, action: PayloadAction<{ tractorInstanceId: string }>) => {
      for (const task of state.tasks) {
        if (
          task.tractorInstanceId === action.payload.tractorInstanceId &&
          task.status !== 'completed'
        ) {
          task.status = 'cancelled'
        }
      }
    },

    completeProductionRun: (state, action: PayloadAction<{ tractorInstanceId: string }>) => {
      tryCompleteProductionRun(state, action.payload.tractorInstanceId)
    },

    sellCompletedTractor: (state, action: PayloadAction<string>) => {
      const index = state.completedTractors.findIndex((t) => t.id === action.payload)

      if (index !== -1) {
        state.completedTractors.splice(index, 1)
      }
    },
  },
})

export const {
  createTask,
  createProductionRun,
  startTask,
  assignWorkerToTask,
  updateTaskProgress,
  cancelTask,
  cancelProductionRun,
  completeProductionRun,
  sellCompletedTractor,
} = productionSlice.actions

export default productionSlice.reducer
