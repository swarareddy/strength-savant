import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { 
  Activity, 
  TrendingUp, 
  Zap, 
  Heart, 
  Moon, 
  Target,
  LogOut 
} from "lucide-react";

interface DashboardProps {
  userId: string;
}

const Dashboard = ({ userId }: DashboardProps) => {
  const [recoveryScore, setRecoveryScore] = useState(0);
  const [todayMetrics, setTodayMetrics] = useState<any>(null);
  const [recentWorkouts, setRecentWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, [userId]);

  const fetchDashboardData = async () => {
    try {
      // Fetch today's health metrics
      const { data: metrics } = await supabase
        .from("health_metrics")
        .select("*")
        .eq("user_id", userId)
        .eq("date", new Date().toISOString().split("T")[0])
        .maybeSingle();

      setTodayMetrics(metrics);
      setRecoveryScore(metrics?.recovery_score || 0);

      // Fetch recent workouts
      const { data: workouts } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentWorkouts(workouts || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out successfully" });
  };

  const getRecoveryColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Recovery Score Card */}
        <Card className="p-8 mb-8 bg-gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-2">Today's Recovery Score</p>
              <h2 className={`text-6xl font-bold ${getRecoveryColor(recoveryScore)}`}>
                {recoveryScore}%
              </h2>
              <p className="mt-4 text-white/90">
                {recoveryScore >= 80 && "You're ready for high intensity training!"}
                {recoveryScore >= 60 && recoveryScore < 80 && "Moderate workout recommended"}
                {recoveryScore < 60 && "Consider a recovery day or light session"}
              </p>
            </div>
            <Activity className="w-32 h-32 opacity-20" />
          </div>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Moon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sleep</p>
                <p className="text-2xl font-bold">{todayMetrics?.sleep_hours || 0}h</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stress</p>
                <p className="text-2xl font-bold">{todayMetrics?.stress_level || 0}/10</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">HRV</p>
                <p className="text-2xl font-bold">{todayMetrics?.hrv_score || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Soreness</p>
                <p className="text-2xl font-bold">{todayMetrics?.soreness_level || 0}/10</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Workouts */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Recent Workouts
          </h3>
          {recentWorkouts.length > 0 ? (
            <div className="space-y-3">
              {recentWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="p-4 bg-background rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{workout.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(workout.created_at).toLocaleDateString()} • {workout.duration_minutes} min
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Intensity</p>
                    <p className="text-lg font-bold">{workout.intensity_level}/10</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No workouts logged yet. Start your first workout!
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;