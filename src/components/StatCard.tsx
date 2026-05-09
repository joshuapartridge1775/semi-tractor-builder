import { ReactNode } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string
  trend?: 'up' | 'down' | 'neutral'
}

function StatCard({ icon, label, value, trend = 'neutral' }: StatCardProps) {
  return (
    <div className="stat-card flex items-start justify-between">
      <div className="flex-1">
        <p className="text-industrial-400 text-sm mb-2">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        {icon}
        {trend === 'up' && <ArrowUp className="w-4 h-4 text-green-500" />}
        {trend === 'down' && <ArrowDown className="w-4 h-4 text-red-500" />}
      </div>
    </div>
  )
}

export default StatCard
