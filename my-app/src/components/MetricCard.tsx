import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

export default function MetricCard({ label, value, unit, description, icon, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="card-navy p-5 hover:border-cyan-accent/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-navy-700 text-cyan-accent">
          {icon}
        </div>
        <span className="text-xs text-gray-500">{description}</span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        <AnimatedCounter value={value} suffix={unit} />
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
}
