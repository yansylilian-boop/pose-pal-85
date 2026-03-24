import { cn } from "@/lib/utils";

export interface PoseStyle {
  id: string;
  label: string;
  emoji: string;
  prompt: string;
}

export const POSE_STYLES: PoseStyle[] = [
  { id: "funny", label: "搞怪风", emoji: "🤪", prompt: "funny, goofy, exaggerated expressions, silly poses, humorous" },
  { id: "sweet", label: "甜蜜风", emoji: "🥰", prompt: "sweet, warm, intimate, gentle smiles, heart-warming, soft lighting" },
  { id: "cool", label: "酷炫风", emoji: "😎", prompt: "cool, confident, stylish, street fashion, dynamic angles, edgy" },
  { id: "elegant", label: "优雅风", emoji: "✨", prompt: "elegant, graceful, refined, sophisticated poses, classy outfits" },
  { id: "cute", label: "可爱风", emoji: "🐱", prompt: "cute, kawaii, adorable, chibi-like proportions, playful, pastel" },
  { id: "adventure", label: "冒险风", emoji: "🏔️", prompt: "adventurous, energetic, action poses, outdoor exploration, exciting" },
];

interface StyleSelectorProps {
  selected: string;
  onChange: (id: string) => void;
}

const StyleSelector = ({ selected, onChange }: StyleSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold font-display text-foreground">
        🎨 姿势风格
      </label>
      <div className="grid grid-cols-3 gap-2">
        {POSE_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-3 px-2 rounded-xl font-display text-sm transition-all duration-200",
              selected === style.id
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-button)] scale-105"
                : "bg-muted text-muted-foreground hover:bg-primary/10 hover:scale-105"
            )}
          >
            <span className="text-xl">{style.emoji}</span>
            <span className="font-bold">{style.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
