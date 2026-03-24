import { useState } from "react";
import { Button } from "@/components/ui/button";
import PeopleSelector from "@/components/PeopleSelector";
import GenderSelector from "@/components/GenderSelector";
import StyleInput from "@/components/StyleInput";
import PoseResult from "@/components/PoseResult";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [peopleCount, setPeopleCount] = useState(2);
  const [maleCount, setMaleCount] = useState(1);
  const [styleText, setStyleText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handlePeopleChange = (count: number) => {
    setPeopleCount(count);
    setMaleCount(Math.min(maleCount, count));
  };

  const generatePose = async () => {
    setIsLoading(true);
    setImageUrl(null);
    setDescription("");

    try {
      const femaleCount = peopleCount - maleCount;
      const { data, error } = await supabase.functions.invoke("generate-pose", {
        body: { peopleCount, maleCount, femaleCount, stylePrompt: styleText },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setImageUrl(data.imageUrl);
        setDescription(data.description || "");
        setHasGenerated(true);
      } else {
        throw new Error("未获取到图片");
      }
    } catch (err: any) {
      console.error("Generate pose error:", err);
      toast.error("生成失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-foreground">
            📸「漫拍」Foto
          </h1>
          <p className="text-muted-foreground font-body">
            选择人数和性别，AI 帮你设计漫画风格姿势
          </p>
        </div>

        {/* Controls */}
        <div className="bg-card rounded-3xl p-6 space-y-6 shadow-[var(--shadow-card)] border border-border">
          <PeopleSelector count={peopleCount} onChange={handlePeopleChange} />
          <GenderSelector
            total={peopleCount}
            maleCount={maleCount}
            onChange={setMaleCount}
          />
          <StyleInput value={styleText} onChange={setStyleText} />
          <Button
            onClick={generatePose}
            disabled={isLoading}
            className="w-full h-14 text-lg font-display font-bold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-button)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? "生成中..." : hasGenerated ? "🔄 换一个动作" : "✨ 生成姿势"}
          </Button>
        </div>

        {/* Result */}
        <PoseResult
          imageUrl={imageUrl}
          isLoading={isLoading}
          description={description}
        />
      </div>
    </div>
  );
};

export default Index;
