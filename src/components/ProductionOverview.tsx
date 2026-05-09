import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

function ProductionOverview() {
  const production = useSelector((state: RootState) => state.production)
  const activeTasks = production.tasks.filter((t) => t.status === 'in-progress')
  const completedTasks = production.tasks.filter((t) => t.status === 'completed')

  return (
    <div className="panel p-6">
      <h2 className="text-xl font-bold mb-4 text-production-weld">Production Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-industrial-700 p-4 rounded">
          <p className="text-industrial-400 text-sm">Active Tasks</p>
          <p className="text-3xl font-bold text-production-weld mt-2">{activeTasks.length}</p>
        </div>
        <div className="bg-industrial-700 p-4 rounded">
          <p className="text-industrial-400 text-sm">Completed</p>
          <p className="text-3xl font-bold text-production-paint mt-2">{completedTasks.length}</p>
        </div>
        <div className="bg-industrial-700 p-4 rounded">
          <p className="text-industrial-400 text-sm">Total Tasks</p>
          <p className="text-3xl font-bold text-production-mech mt-2">{production.tasks.length}</p>
        </div>
      </div>

      {/* Active Tasks List */}
      {activeTasks.length > 0 && (
        <div className="mt-6 space-y-2">
          <p className="text-sm text-industrial-400 font-semibold">Current Production:</p>
          {activeTasks.map((task) => (
            <div key={task.id} className="bg-industrial-700 p-3 rounded">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold capitalize">{task.stage}</p>
                <p className="text-xs text-industrial-400">{task.progress.toFixed(0)}%</p>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill bg-gradient-to-r from-production-weld to-production-paint"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductionOverview
