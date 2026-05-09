import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import StatCard from './StatCard'
import ProductionOverview from './ProductionOverview'
import TractorGallery from './TractorGallery'
import { formatCurrency, formatTime } from '../utils/formatters'
import { Zap, Users, Briefcase, TrendingUp } from 'lucide-react'

function Dashboard() {
  const game = useSelector((state: RootState) => state.game)
  const economy = useSelector((state: RootState) => state.economy)
  const workers = useSelector((state: RootState) => state.workers)
  const production = useSelector((state: RootState) => state.production)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="panel p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-production-weld">Semi-Tractor Builder</h1>
            <p className="text-industrial-400 mt-2">Industrial Production Simulator</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-industrial-400">Game Time</p>
            <p className="text-2xl font-mono font-bold">{formatTime(game.gameTime)}</p>
            <p className="text-xs text-industrial-500 mt-1">Speed: {game.gameSpeed}x</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-production-weld" />}
          label="Capital"
          value={formatCurrency(economy.capital)}
          trend={economy.capital >= 100000 ? 'up' : 'down'}
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-production-paint" />}
          label="Workers"
          value={workers.workers.length.toString()}
        />
        <StatCard
          icon={<Briefcase className="w-6 h-6 text-production-mech" />}
          label="Tractors Sold"
          value={economy.tractorsSold.toString()}
        />
        <StatCard
          icon={<Zap className="w-6 h-6 text-yellow-400" />}
          label="Market Demand"
          value={`${economy.marketDemand.toFixed(0)}%`}
        />
      </div>

      {/* Production Overview */}
      <ProductionOverview />

      {/* Tractor Gallery */}
      <TractorGallery />
    </div>
  )
}

export default Dashboard
