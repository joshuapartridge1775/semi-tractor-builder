import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { createDesign, setActiveDesign } from '../store/designSlice'
import { Palette } from 'lucide-react'

function DesignPanel() {
  const dispatch = useDispatch<AppDispatch>()
  const design = useSelector((state: RootState) => state.design)

  const handleNewDesign = () => {
    dispatch(
      createDesign({
        name: `Design ${design.designs.length + 1}`,
        cabin: 'day',
        engine: 'diesel',
        transmission: 'manual',
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        wheelSize: 20,
        basePrice: 45000,
        marketPrice: 65000,
      }),
    )
  }

  return (
    <div className="panel p-4">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-production-paint" />
        <h3 className="text-lg font-bold text-white">Design</h3>
      </div>

      <div className="space-y-3">
        {design.designs.map((d) => (
          <button
            key={d.id}
            onClick={() => dispatch(setActiveDesign(d.id))}
            className={`w-full p-3 rounded text-left text-sm transition-all ${
              design.activeDesignId === d.id
                ? 'bg-production-weld text-white'
                : 'bg-industrial-700 text-industrial-200 hover:bg-industrial-600'
            }`}
          >
            <p className="font-semibold">{d.name}</p>
            <p className="text-xs opacity-75">{d.cabin} cabin</p>
          </button>
        ))}

        <button onClick={handleNewDesign} className="button-primary w-full mt-2">
          + New Design
        </button>
      </div>
    </div>
  )
}

export default DesignPanel
