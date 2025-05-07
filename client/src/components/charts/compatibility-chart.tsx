import { getCompatibilityColor } from '@/lib/utils';

interface CompatibilityChartProps {
  score: number;
}

export function CompatibilityChart({ score }: CompatibilityChartProps) {
  const color = getCompatibilityColor(score);
  
  return (
    <div className="compatibility-chart">
      <div className={`compatibility-fill ${color}`} style={{ width: `${score}%` }}></div>
    </div>
  );
}
