import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

function TractorGallery() {
  const design = useSelector((state: RootState) => state.design)

  return (
    <div className="panel p-6">
      <h2 className="text-xl font-bold mb-4 text-production-weld">Tractor Designs</h2>
      <div className="grid grid-cols-2 gap-4">
        {design.designs.map((design) => (
          <div
            key={design.id}
            className="bg-industrial-700 p-4 rounded border-2 border-industrial-600 hover:border-production-weld transition-colors"
          >
            <div
              className="w-full h-32 rounded mb-3 border-2"
              style={{ backgroundColor: design.color, borderColor: design.color }}
            />
            <p className="font-semibold text-white">{design.name}</p>
            <div className="text-xs text-industrial-400 mt-2 space-y-1">
              <p>Cabin: {design.cabin}</p>
              <p>Engine: {design.engine}</p>
              <p>Base: ${design.basePrice} | Market: ${design.marketPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TractorGallery
