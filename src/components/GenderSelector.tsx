import { cn } from "@/lib/utils";

interface GenderSelectorProps {
  total: number;
  maleCount: number;
  onChange: (maleCount: number) => void;
}

const GenderSelector = ({ total, maleCount, onChange }: GenderSelectorProps) => {
  const femaleCount = total - maleCount;

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold font-display text-foreground">
        ⚤ 性别比例
      </label>
      <div className="flex items-center gap-4 bg-muted rounded-2xl p-4">
        <div className="flex-1 text-center">
          <div className="text-2xl mb-1">🧑</div>
          <div className="font-display font-bold text-lg text-foreground">{maleCount} 男</div>
        </div>
        <input
          type="range"
          min={0}
          max={total}
          value={maleCount}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-primary h-2 rounded-full cursor-pointer"
        />
        <div className="flex-1 text-center">
          <div className="text-2xl mb-1">👩</div>
          <div className="font-display font-bold text-lg text-foreground">{femaleCount} 女</div>
        </div>
      </div>
      <div className="flex justify-center gap-1">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              "text-xl transition-all duration-200",
              i < maleCount ? "grayscale-0" : "grayscale-0"
            )}
          >
            {i < maleCount ? "🧑" : "👩"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GenderSelector;
