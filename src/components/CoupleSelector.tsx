interface CoupleSelectorProps {
  maleCount: number;
  femaleCount: number;
  coupleCount: number;
  onChange: (count: number) => void;
}

const CoupleSelector = ({ maleCount, femaleCount, coupleCount, onChange }: CoupleSelectorProps) => {
  const maxCouples = Math.min(maleCount, femaleCount);
  const isSinglePossible = maxCouples === 1;

  if (maxCouples === 0) return null;

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold font-display text-foreground">
        💕 情侣关系
      </label>
      {isSinglePossible ? (
        <div className="flex items-center gap-3 bg-muted rounded-2xl p-4">
          <span className="text-foreground font-body">是否为情侣？</span>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => onChange(0)}
              className={`px-4 py-2 rounded-xl font-display font-bold text-sm transition-all ${
                coupleCount === 0
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground border border-border"
              }`}
            >
              不是
            </button>
            <button
              onClick={() => onChange(1)}
              className={`px-4 py-2 rounded-xl font-display font-bold text-sm transition-all ${
                coupleCount === 1
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground border border-border"
              }`}
            >
              是
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-muted rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-foreground font-body">有几对情侣？</span>
            <span className="font-display font-bold text-lg text-primary">{coupleCount} 对</span>
          </div>
          <input
            type="range"
            min={0}
            max={maxCouples}
            value={coupleCount}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-primary h-2 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-body">
            <span>0 对</span>
            <span>{maxCouples} 对</span>
          </div>
        </div>
      )}
      {coupleCount > 0 && (
        <p className="text-xs text-muted-foreground font-body">
          💡 情侣之间可以有亲密的拍照姿势哦
        </p>
      )}
    </div>
  );
};

export default CoupleSelector;
