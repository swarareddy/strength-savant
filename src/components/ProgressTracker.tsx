import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Award } from "lucide-react";

interface ProgressTrackerProps {
  userId: string;
}

const ProgressTracker = ({ userId }: ProgressTrackerProps) => {
  const [progressData, setProgressData] = useState<any[]>([]);
  const [personalRecords, setPersonalRecords] = useState<any[]>([]);

  useEffect(() => {
    fetchProgressData();
    fetchPersonalRecords();
  }, [userId]);

  const fetchProgressData = async () => {
    const { data } = await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(30);

    if (data) {
      const chartData = data.map((workout) => ({
        date: new Date(workout.created_at).toLocaleDateString(),
        intensity: workout.intensity_level,
        duration: workout.duration_minutes,
      }));
      setProgressData(chartData);
    }
  };

  const fetchPersonalRecords = async () => {
    const { data } = await supabase
      .from("personal_records")
      .select("*")
      .eq("user_id", userId)
      .order("achieved_at", { ascending: false })
      .limit(10);

    setPersonalRecords(data || []);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Progress Tracker
      </h1>

      {/* Charts */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Workout Trends
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="intensity" stroke="#8b5cf6" strokeWidth={2} />
            <Line type="monotone" dataKey="duration" stroke="#f97316" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Personal Records */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-accent" />
          Personal Records
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalRecords.map((record) => (
            <div
              key={record.id}
              className="p-4 bg-gradient-primary rounded-lg text-white"
            >
              <h3 className="font-bold text-lg">{record.exercise_name}</h3>
              <p className="text-3xl font-bold my-2">
                {record.value} {record.unit}
              </p>
              <p className="text-sm opacity-90">
                {new Date(record.achieved_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProgressTracker;