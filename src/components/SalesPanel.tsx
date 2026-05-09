import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { sellTractor } from '../store/economySlice'
import { sellCompletedTractor } from '../store/productionSlice'
import { formatCurrency } from '../utils/formatters'
import { ShoppingCart, AlertCircle } from 'lucide-react'
import { TractorDesign as Design } from '../store/designSlice'

type SaleEntry = {
  tractor: RootState['production']['completedTractors'][number]
  design: Design
  finalPrice: number
  profit: number
  demandMultiplier: number
  qualityMultiplier: number
}

function getQualityColor(quality: number) {
  if (quality >= 85) return 'text-green-400'
  if (quality >= 70) return 'text-yellow-400'
  return 'text-red-400'
}

function SalesPanel() {
  const dispatch = useDispatch<AppDispatch>()
  const [sellingId, setSellingId] = useState<string | null>(null)

  const completedTractors = useSelector((state: RootState) => state.production.completedTractors)
  const designs = useSelector((state: RootState) => state.design.designs)
  const marketDemand = useSelector((state: RootState) => state.economy.marketDemand)

  const tractorsReadyForSale = useMemo<SaleEntry[]>(() => {
    return completedTractors
      .map((tractor) => {
        const design = designs.find((d) => d.id === tractor.designId)

        if (!design) return null

        const demandMultiplier = 0.5 + (marketDemand / 100) * 1.5
        const qualityMultiplier = 0.8 + (tractor.quality / 100) * 0.4
        const finalPrice = Math.round(design.marketPrice * demandMultiplier * qualityMultiplier)
        const profit = Math.round(finalPrice - design.basePrice)

        return {
          tractor,
          design,
          finalPrice,
          profit,
          demandMultiplier,
          qualityMultiplier,
        }
      })
      .filter((entry): entry is SaleEntry => entry !== null)
      .sort((a, b) => b.finalPrice - a.finalPrice)
  }, [completedTractors, designs, marketDemand])

  const handleSellTractor = async (tractorId: string, salePrice: number, costBasis: number) => {
    if (sellingId) return

    setSellingId(tractorId)
    try {
      dispatch(sellCompletedTractor(tractorId))
      dispatch(
        sellTractor({
          salePrice,
          costBasis,
        }),
      )
    } finally {
      setSellingId(null)
    }
  }

  if (tractorsReadyForSale.length === 0) {
    return (
      <div className="panel p-4">
        <div className="flex items-center gap-2 text-industrial-400">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">No completed tractors ready for sale</p>
        </div>
      </div>
    )
  }

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-production-weld" />
          <h3 className="text-lg font-bold text-white">Sales</h3>
        </div>
        <p className="text-xs text-industrial-400">
          Demand Multiplier: {(0.5 + (marketDemand / 100) * 1.5).toFixed(2)}x
        </p>
      </div>

      <div className="space-y-3">
        {tractorsReadyForSale.map(
          ({ tractor, design, finalPrice, profit, demandMultiplier, qualityMultiplier }) => (
            <div
              key={tractor.id}
              className="bg-industrial-700 p-3 rounded border border-industrial-600"
            >
              <p className="font-semibold text-white mb-2">{design.name}</p>

              <div className="text-xs text-industrial-400 space-y-1 mb-3">
                <p>Base Cost: {formatCurrency(design.basePrice)}</p>
                <p className={getQualityColor(tractor.quality)}>Quality: {tractor.quality}%</p>
                <p>Demand Multiplier: {demandMultiplier.toFixed(2)}x</p>
                <p>Quality Multiplier: {qualityMultiplier.toFixed(2)}x</p>
                <p>Market Price: {formatCurrency(finalPrice)}</p>
                <p className={profit >= 0 ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                  Profit: {formatCurrency(profit)}
                </p>
              </div>

              <button
                onClick={() => handleSellTractor(tractor.id, finalPrice, design.basePrice)}
                disabled={sellingId !== null}
                className="button-primary w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sellingId === tractor.id
                  ? 'Selling...'
                  : `Sell for ${formatCurrency(finalPrice)}`}
              </button>
            </div>
          ),
        )}
      </div>
    </div>
  )
}

export default SalesPanel
