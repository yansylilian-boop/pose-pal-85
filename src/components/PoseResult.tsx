import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface PoseResultProps {
  imageUrl: string | null;
  isLoading: boolean;
  description: string;
}

const PoseResult = ({ imageUrl, isLoading, description }: PoseResultProps) => {
  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pose-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("已保存到相册/下载文件夹");
    } catch {
      toast.error("下载失败，请长按图片手动保存");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/20 animate-ping absolute inset-0" />
          <div className="w-20 h-20 rounded-full bg-primary/40 flex items-center justify-center text-3xl animate-float relative">
            📸
          </div>
        </div>
        <p className="font-display font-semibold text-muted-foreground animate-pulse">
          正在生成姿势...
        </p>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <div className="text-5xl mb-4 animate-float">🎨</div>
        <p className="font-display font-medium">选择人数和性别，点击生成</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-bounce-in">
      <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border border-border">
        <img
          src={imageUrl}
          alt="生成的拍照姿势"
          className="w-full object-contain"
        />
      </div>
      {description && (
        <p className="text-sm text-muted-foreground font-body text-center px-4">
          {description}
        </p>
      )}
      <Button
        onClick={handleDownload}
        className="w-full h-12 rounded-2xl font-display font-bold text-base bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <Download className="w-5 h-5 mr-2" />
        保存图片
      </Button>
    </div>
  );
};

export default PoseResult;
