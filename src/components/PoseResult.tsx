interface PoseResultProps {
  imageUrl: string | null;
  isLoading: boolean;
  description: string;
}

const PoseResult = ({ imageUrl, isLoading, description }: PoseResultProps) => {
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
    </div>
  );
};

export default PoseResult;
