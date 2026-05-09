import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from './components/Dashboard'
import ProductionPanel from './components/ProductionPanel'
import WorkerPanel from './components/WorkerPanel'
import DesignPanel from './components/DesignPanel'
import { RootState } from './store/store'
import { updateGameTime } from './store/gameSlice'

function App() {
  const dispatch = useDispatch()
  const gameSpeed = useSelector((state: RootState) => state.game.gameSpeed)

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateGameTime())
    }, 1000 / gameSpeed)

    return () => clearInterval(interval)
  }, [dispatch, gameSpeed])

  return (
    <div className="game-container p-4">
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Main Dashboard */}
        <div className="col-span-8 overflow-auto">
          <Dashboard />
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 space-y-4 overflow-auto">
          <DesignPanel />
          <ProductionPanel />
          <WorkerPanel />
        </div>
      </div>
    </div>
  )
}

export default App
