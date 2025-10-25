import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, TrendingUp, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VBTTrackerProps {
  userId: string;
}

const VBTTracker = ({ userId }: VBTTrackerProps) => {
  const [exercise, setExercise] = useState("squat");
  const [weight, setWeight] = useState("");
  const [velocity, setVelocity] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [trainingGoal, setTrainingGoal] = useState("strength");
  const { toast } = useToast();

  const measureVelocity = () => {
    // Simulate velocity measurement
    const simulatedVelocity = (Math.random() * 0.5 + 0.3).toFixed(2);
    setVelocity(parseFloat(simulatedVelocity));

    // Generate recommendation based on velocity and goal
    const vel = parseFloat(simulatedVelocity);
    let rec = "";

    if (trainingGoal === "strength" && vel < 0.4) {
      rec = "⚡ Velocity too low for strength gains. Reduce weight by 5-10% or end set.";
    } else if (trainingGoal === "strength" && vel > 0.5) {
      rec = "💪 Great velocity! Consider adding 2.5-5kg for next set.";
    } else if (trainingGoal === "power" && vel < 0.7) {
      rec = "⚠️ Velocity below power zone. Reduce weight to maintain 0.75-1.0 m/s.";
    } else if (trainingGoal === "power" && vel >= 0.7) {
      rec = "🚀 Perfect power zone! Maintain this velocity.";
    } else if (trainingGoal === "hypertrophy") {
      rec = vel < 0.5
        ? "✅ Good tempo for hypertrophy. 2-3 more reps."
        : "💪 Velocity optimal. Continue until form breaks down.";
    } else {
      rec = "✅ Velocity is appropriate for your training goal.";
    }

    setRecommendation(rec);
    toast({
      title: "Velocity Measured",
      description: `${simulatedVelocity} m/s recorded`,
    });
  };

  const getVelocityZone = () => {
    if (velocity >= 1.0) return { color: "text-purple-500", zone: "Max Velocity" };
    if (velocity >= 0.75) return { color: "text-blue-500", zone: "Power" };
    if (velocity >= 0.5) return { color: "text-green-500", zone: "Strength-Speed" };
    if (velocity >= 0.3) return { color: "text-yellow-500", zone: "Strength" };
    return { color: "text-red-500", zone: "Max Strength" };
  };

  const zone = getVelocityZone();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Velocity-Based Training
      </h1>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          VBT Autopilot
        </h2>

        <div className="space-y-4">
          <div>
            <Label>Training Goal</Label>
            <Select value={trainingGoal} onValueChange={setTrainingGoal}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strength">Max Strength</SelectItem>
                <SelectItem value="power">Power</SelectItem>
                <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Exercise</Label>
            <Select value={exercise} onValueChange={setExercise}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="squat">Squat</SelectItem>
                <SelectItem value="bench">Bench Press</SelectItem>
                <SelectItem value="deadlift">Deadlift</SelectItem>
                <SelectItem value="row">Barbell Row</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
            />
          </div>

          <Button
            onClick={measureVelocity}
            className="w-full bg-gradient-primary hover:shadow-glow"
            disabled={!weight}
          >
            <Zap className="w-4 h-4 mr-2" />
            Measure Rep Velocity
          </Button>
        </div>
      </Card>

      {velocity > 0 && (
        <>
          <Card className="p-8 bg-gradient-primary text-white">
            <div className="text-center">
              <p className="text-sm opacity-90 mb-2">Barbell Velocity</p>
              <p className={`text-6xl font-bold ${zone.color}`}>
                {velocity} m/s
              </p>
              <p className="text-lg mt-2">{zone.zone}</p>
            </div>
          </Card>

          {recommendation && (
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                {recommendation.includes("⚠️") || recommendation.includes("⚡") ? (
                  <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-green-500 flex-shrink-0" />
                )}
                <div>
                  <h3 className="font-bold text-lg mb-1">AI Recommendation</h3>
                  <p className="text-muted-foreground">{recommendation}</p>
                </div>
              </div>
            </Card>
          )}
        </>
      )}

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-3">Velocity Zones</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Max Velocity (≥ 1.0 m/s)</span>
            <span className="text-purple-500 font-semibold">Speed</span>
          </div>
          <div className="flex justify-between">
            <span>Power (0.75-1.0 m/s)</span>
            <span className="text-blue-500 font-semibold">Explosive</span>
          </div>
          <div className="flex justify-between">
            <span>Strength-Speed (0.5-0.75 m/s)</span>
            <span className="text-green-500 font-semibold">Dynamic</span>
          </div>
          <div className="flex justify-between">
            <span>Strength (0.3-0.5 m/s)</span>
            <span className="text-yellow-500 font-semibold">Controlled</span>
          </div>
          <div className="flex justify-between">
            <span>Max Strength (&lt; 0.3 m/s)</span>
            <span className="text-red-500 font-semibold">Maximal</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VBTTracker;