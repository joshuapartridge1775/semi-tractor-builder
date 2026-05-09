import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { hireWorker } from '../store/workersSlice'
import { Users } from 'lucide-react'

function WorkerPanel() {
  const dispatch = useDispatch<AppDispatch>()
  const workers = useSelector((state: RootState) => state.workers)
  const economy = useSelector((state: RootState) => state.economy)

  const welders = workers.workers.filter((w) => w.type === 'welder')
  const painters = workers.workers.filter((w) => w.type === 'painter')
  const mechanics = workers.workers.filter((w) => w.type === 'mechanic')

  const monthlyPayroll = workers.workers.reduce((sum, w) => sum + w.salary, 0) * 30

  const canHireWelder = economy.capital >= 5000
  const canHirePainter = economy.capital >= 4500
  const canHireMechanic = economy.capital >= 5500

  return (
    <div className="panel p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-production-paint" />
        <h3 className="text-lg font-bold text-white">Workers</h3>
      </div>

      <div className="space-y-3 text-xs">
        <div className="bg-industrial-700 p-3 rounded">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Welders</p>
            <span className="bg-industrial-800 px-2 py-1 rounded">{welders.length}</span>
          </div>
          <button
            onClick={() => dispatch(hireWorker('welder'))}
            disabled={!canHireWelder}
            className={`w-full py-1 rounded text-xs font-semibold transition-colors ${
              canHireWelder ? 'button-primary' : 'bg-industrial-600 text-industrial-400 cursor-not-allowed'
            }`}
          >
            Hire - $5,000
          </button>
        </div>

        <div className="bg-industrial-700 p-3 rounded">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Painters</p>
            <span className="bg-industrial-800 px-2 py-1 rounded">{painters.length}</span>
          </div>
          <button
            onClick={() => dispatch(hireWorker('painter'))}
            disabled={!canHirePainter}
            className={`w-full py-1 rounded text-xs font-semibold transition-colors ${
              canHirePainter ? 'button-primary' : 'bg-industrial-600 text-industrial-400 cursor-not-allowed'
            }`}
          >
            Hire - $4,500
          </button>
        </div>

        <div className="bg-industrial-700 p-3 rounded">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Mechanics</p>
            <span className="bg-industrial-800 px-2 py-1 rounded">{mechanics.length}</span>
          </div>
          <button
            onClick={() => dispatch(hireWorker('mechanic'))}
            disabled={!canHireMechanic}
            className={`w-full py-1 rounded text-xs font-semibold transition-colors ${
              canHireMechanic ? 'button-primary' : 'bg-industrial-600 text-industrial-400 cursor-not-allowed'
            }`}
          >
            Hire - $5,500
          </button>
        </div>

        <div className="bg-industrial-800 p-3 rounded border border-industrial-600 mt-4">
          <p className="text-industrial-400 mb-1">Monthly Payroll:</p>
          <p className="font-bold text-production-weld">${monthlyPayroll.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default WorkerPanel
