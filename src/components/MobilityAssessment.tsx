import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Activity, AlertCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface MobilityAssessmentProps {
  userId: string;
}

const MobilityAssessment = ({ userId }: MobilityAssessmentProps) => {
  const [bodyPart, setBodyPart] = useState("shoulders");
  const [mobilityScore, setMobilityScore] = useState([5]);
  const [painLevel, setPainLevel] = useState([0]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const { toast } = useToast();

  const runAssessment = async () => {
    try {
      // Get AI recommendations
      const { data: aiData } = await supabase.functions.invoke("mobility-coach", {
        body: {
          userId,
          bodyPart,
          mobilityScore: mobilityScore[0],
          painLevel: painLevel[0],
        },
      });

      const drills = aiData?.recommendations || [];
      setRecommendations(drills);

      // Save assessment
      await supabase.from("mobility_assessments").insert({
        user_id: userId,
        body_part: bodyPart,
        mobility_score: mobilityScore[0],
        pain_level: painLevel[0],
        recommended_drills: drills,
      });

      toast({
        title: "Assessment Complete!",
        description: "Personalized mobility drills generated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Pre-Workout Mobility Assessment
      </h1>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Check Your Mobility
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Body Part</label>
            <Select value={bodyPart} onValueChange={setBodyPart}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shoulders">Shoulders</SelectItem>
                <SelectItem value="hips">Hips</SelectItem>
                <SelectItem value="ankles">Ankles</SelectItem>
                <SelectItem value="thoracic-spine">Thoracic Spine</SelectItem>
                <SelectItem value="wrists">Wrists</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Mobility Score: {mobilityScore[0]}/10
            </label>
            <Slider
              value={mobilityScore}
              onValueChange={setMobilityScore}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Pain Level: {painLevel[0]}/10
            </label>
            <Slider
              value={painLevel}
              onValueChange={setPainLevel}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          <Button
            onClick={runAssessment}
            className="w-full bg-gradient-primary hover:shadow-glow"
          >
            Run AI Assessment
          </Button>
        </div>
      </Card>

      {recommendations.length > 0 && (
        <Card className="p-6 bg-card/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-accent" />
            Recommended Drills
          </h3>
          <ul className="space-y-2">
            {recommendations.map((drill, index) => (
              <li
                key={index}
                className="p-3 bg-background rounded-lg flex items-start gap-2"
              >
                <span className="text-primary font-bold">{index + 1}.</span>
                <span>{drill}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default MobilityAssessment;