import { cn } from "@/lib/utils";

interface PeopleSelectorProps {
  count: number;
  onChange: (count: number) => void;
}

const PeopleSelector = ({ count, onChange }: PeopleSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold font-display text-foreground">
        👥 几个人拍照？
      </label>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }, (_, i) => i + 2).map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={cn(
              "w-12 h-12 rounded-xl font-display font-bold text-lg transition-all duration-200",
              count === num
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-button)] scale-110"
                : "bg-muted text-muted-foreground hover:bg-primary/10 hover:scale-105"
            )}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeopleSelector;
