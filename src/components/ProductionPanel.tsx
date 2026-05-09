import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Wrench } from 'lucide-react'

function ProductionPanel() {
  const production = useSelector((state: RootState) => state.production)
  const workers = useSelector((state: RootState) => state.workers)

  const weldingCount = production.tasks.filter(
    (t) => t.stage === 'welding' && t.status === 'in-progress',
  ).length
  const paintingCount = production.tasks.filter(
    (t) => t.stage === 'painting' && t.status === 'in-progress',
  ).length
  const mechCount = production.tasks.filter(
    (t) => t.stage === 'mechanics' && t.status === 'in-progress',
  ).length

  return (
    <div className="panel p-4">
      <div className="flex items-center gap-2 mb-4">
        <Wrench className="w-5 h-5 text-production-weld" />
        <h3 className="text-lg font-bold text-white">Production Stations</h3>
      </div>

      <div className="space-y-3">
        <div className="bg-industrial-700 p-3 rounded">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-production-weld">Welding</p>
            <p className="text-xs bg-industrial-800 px-2 py-1 rounded">{weldingCount}/3</p>
          </div>
          <p className="text-xs text-industrial-400 mt-1">
            {workers.workers.filter((w) => w.type === 'welder').length} welders available
          </p>
        </div>

        <div className="bg-industrial-700 p-3 rounded">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-production-paint">Painting</p>
            <p className="text-xs bg-industrial-800 px-2 py-1 rounded">{paintingCount}/3</p>
          </div>
          <p className="text-xs text-industrial-400 mt-1">
            {workers.workers.filter((w) => w.type === 'painter').length} painters available
          </p>
        </div>

        <div className="bg-industrial-700 p-3 rounded">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-production-mech">Mechanics</p>
            <p className="text-xs bg-industrial-800 px-2 py-1 rounded">{mechCount}/3</p>
          </div>
          <p className="text-xs text-industrial-400 mt-1">
            {workers.workers.filter((w) => w.type === 'mechanic').length} mechanics available
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductionPanel
