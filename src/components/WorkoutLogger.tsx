import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

const WorkoutLogger = () => {
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState({
    name: "",
    sets: 0,
    reps: 0,
    weight: 0,
  });

  const addExercise = () => {
    if (!currentExercise.name) {
      toast({
        title: "Missing Information",
        description: "Please enter an exercise name",
        variant: "destructive",
      });
      return;
    }

    const newExercise: Exercise = {
      id: Date.now().toString(),
      ...currentExercise,
    };

    setExercises([...exercises, newExercise]);
    setCurrentExercise({ name: "", sets: 0, reps: 0, weight: 0 });
    
    toast({
      title: "Exercise Added!",
      description: `${currentExercise.name} added to your workout`,
    });
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
    toast({
      title: "Exercise Removed",
      description: "Exercise deleted from workout",
    });
  };

  return (
    <section className="py-20 px-4 container mx-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-primary bg-clip-text text-transparent">
          Log Your Workout
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Track your exercises, sets, reps, and weight
        </p>

        {/* Input Form */}
        <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-border shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <Label htmlFor="exercise-name" className="text-foreground">Exercise Name</Label>
              <Input
                id="exercise-name"
                placeholder="e.g., Bench Press"
                value={currentExercise.name}
                onChange={(e) =>
                  setCurrentExercise({ ...currentExercise, name: e.target.value })
                }
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="sets" className="text-foreground">Sets</Label>
              <Input
                id="sets"
                type="number"
                placeholder="0"
                value={currentExercise.sets || ""}
                onChange={(e) =>
                  setCurrentExercise({
                    ...currentExercise,
                    sets: parseInt(e.target.value) || 0,
                  })
                }
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="reps" className="text-foreground">Reps</Label>
              <Input
                id="reps"
                type="number"
                placeholder="0"
                value={currentExercise.reps || ""}
                onChange={(e) =>
                  setCurrentExercise({
                    ...currentExercise,
                    reps: parseInt(e.target.value) || 0,
                  })
                }
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="weight" className="text-foreground">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="0"
                value={currentExercise.weight || ""}
                onChange={(e) =>
                  setCurrentExercise({
                    ...currentExercise,
                    weight: parseFloat(e.target.value) || 0,
                  })
                }
                className="bg-background border-border"
              />
            </div>
          </div>
          <Button
            onClick={addExercise}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Exercise
          </Button>
        </Card>

        {/* Exercise List */}
        {exercises.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground mb-4">Today's Workout</h3>
            {exercises.map((exercise) => (
              <Card
                key={exercise.id}
                className="p-4 bg-card/50 backdrop-blur-sm border-border flex items-center justify-between hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-foreground">{exercise.name}</h4>
                  <p className="text-muted-foreground">
                    {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight} lbs
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExercise(exercise.id)}
                  className="hover:bg-destructive/20 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Card>
            ))}
            <Button className="w-full bg-gradient-accent hover:shadow-accent transition-all duration-300 text-lg py-6">
              Complete Workout
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkoutLogger;
