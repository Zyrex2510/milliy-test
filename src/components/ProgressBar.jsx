export default function ProgressBar({ value, max }) {
    const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  
    return (
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
  
        <div className="h-3 w-full rounded-full bg-white/60 border border-white/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  }
  