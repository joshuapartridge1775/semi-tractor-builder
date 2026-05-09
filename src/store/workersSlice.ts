import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type WorkerType = 'welder' | 'painter' | 'mechanic'

export interface Worker {
  id: string
  name: string
  type: WorkerType
  skill: number // 0-100
  experience: number // Total experience points
  salary: number // Per game day
  assignedTo: string | null // Task ID
  efficiency: number // 0.5 - 2.0 multiplier
  morale: number // 0-100
}

interface WorkersState {
  workers: Worker[]
  totalHired: number
}

const initialState: WorkersState = {
  workers: [
    {
      id: 'worker-1',
      name: 'Jack Miller',
      type: 'welder',
      skill: 60,
      experience: 500,
      salary: 150,
      assignedTo: null,
      efficiency: 1.2,
      morale: 80,
    },
    {
      id: 'worker-2',
      name: 'Sarah Chen',
      type: 'painter',
      skill: 55,
      experience: 400,
      salary: 140,
      assignedTo: null,
      efficiency: 1.0,
      morale: 75,
    },
    {
      id: 'worker-3',
      name: 'Mike Thompson',
      type: 'mechanic',
      skill: 50,
      experience: 300,
      salary: 160,
      assignedTo: null,
      efficiency: 0.95,
      morale: 70,
    },
  ],
  totalHired: 3,
}

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    hireWorker: (state, action: PayloadAction<WorkerType>) => {
      const names: Record<WorkerType, string[]> = {
        welder: ['Alex', 'Chris', 'Jordan', 'Pat', 'Riley'],
        painter: ['Morgan', 'Casey', 'Bailey', 'Quinn', 'Skyler'],
        mechanic: ['Taylor', 'Sam', 'Drew', 'River', 'Avery'],
      }

      const randomName = names[action.payload][Math.floor(Math.random() * names[action.payload].length)]
      const baseSalary = { welder: 150, painter: 140, mechanic: 160 }[action.payload]

      const newWorker: Worker = {
        id: `worker-${Date.now()}`,
        name: randomName,
        type: action.payload,
        skill: Math.random() * 30 + 30,
        experience: 0,
        salary: baseSalary,
        assignedTo: null,
        efficiency: 0.8 + Math.random() * 0.4,
        morale: 70 + Math.random() * 20,
      }

      state.workers.push(newWorker)
      state.totalHired += 1
    },

    assignWorker: (state, action: PayloadAction<{ workerId: string; taskId: string }>) => {
      const worker = state.workers.find((w) => w.id === action.payload.workerId)
      if (worker) {
        worker.assignedTo = action.payload.taskId
      }
    },

    unassignWorker: (state, action: PayloadAction<string>) => {
      const worker = state.workers.find((w) => w.id === action.payload)
      if (worker) {
        worker.assignedTo = null
      }
    },

    updateWorkerSkill: (state, action: PayloadAction<{ workerId: string; skillGain: number }>) => {
      const worker = state.workers.find((w) => w.id === action.payload.workerId)
      if (worker) {
        worker.skill = Math.min(100, worker.skill + action.payload.skillGain)
        worker.experience += action.payload.skillGain * 10
      }
    },

    updateWorkerMorale: (state, action: PayloadAction<{ workerId: string; change: number }>) => {
      const worker = state.workers.find((w) => w.id === action.payload.workerId)
      if (worker) {
        worker.morale = Math.max(0, Math.min(100, worker.morale + action.payload.change))
      }
    },

    fireWorker: (state, action: PayloadAction<string>) => {
      state.workers = state.workers.filter((w) => w.id !== action.payload)
    },
  },
})

export const {
  hireWorker,
  assignWorker,
  unassignWorker,
  updateWorkerSkill,
  updateWorkerMorale,
  fireWorker,
} = workersSlice.actions
export default workersSlice.reducer
