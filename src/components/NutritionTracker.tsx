import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Utensils, Droplets } from "lucide-react";

interface NutritionTrackerProps {
  userId: string;
}

const NutritionTracker = ({ userId }: NutritionTrackerProps) => {
  const [mealType, setMealType] = useState("breakfast");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [hydration, setHydration] = useState("");
  const { toast } = useToast();

  const logMeal = async () => {
    try {
      const { error } = await supabase.from("nutrition_logs").insert({
        user_id: userId,
        meal_type: mealType,
        calories: parseInt(calories),
        protein_grams: parseFloat(protein),
        carbs_grams: parseFloat(carbs),
        fats_grams: parseFloat(fats),
        hydration_ml: hydration ? parseInt(hydration) : null,
      });

      if (error) throw error;

      // Get AI recommendation
      const { data: aiData } = await supabase.functions.invoke("nutrition-coach", {
        body: {
          userId,
          meal: { calories, protein, carbs, fats },
        },
      });

      toast({
        title: "Meal logged!",
        description: aiData?.recommendation || "Nutrition tracked successfully",
      });

      // Reset form
      setCalories("");
      setProtein("");
      setCarbs("");
      setFats("");
      setHydration("");
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
        Nutrition Tracker
      </h1>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Utensils className="w-6 h-6" />
          Log Your Meal
        </h2>

        <div className="space-y-4">
          <div>
            <Label>Meal Type</Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
                <SelectItem value="post-workout">Post-Workout</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Calories</Label>
              <Input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Protein (g)</Label>
              <Input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Carbs (g)</Label>
              <Input
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Fats (g)</Label>
              <Input
                type="number"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Hydration (ml)
            </Label>
            <Input
              type="number"
              value={hydration}
              onChange={(e) => setHydration(e.target.value)}
              placeholder="0"
            />
          </div>

          <Button
            onClick={logMeal}
            className="w-full bg-gradient-accent hover:shadow-accent"
          >
            Log Meal & Get AI Recommendation
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-accent text-white">
        <h3 className="text-xl font-bold mb-2">💡 Post-Workout Nutrition Tip</h3>
        <p>
          After intense training, aim for 30-40g protein and 50-60g carbs within 2 hours
          for optimal recovery and muscle growth.
        </p>
      </Card>
    </div>
  );
};

export default NutritionTracker;