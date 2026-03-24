import { Textarea } from "@/components/ui/textarea";

interface StyleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const StyleInput = ({ value, onChange }: StyleInputProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold font-display text-foreground">
        🎨 风格 & 场景
      </label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="例如：春游、可爱风、毕业照、闺蜜出游、搞怪风..."
        className="rounded-xl border-border bg-muted/50 text-foreground placeholder:text-muted-foreground resize-none min-h-[60px] font-body"
        rows={2}
      />
    </div>
  );
};

export default StyleInput;
