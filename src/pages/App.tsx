import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Auth from "@/components/Auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import WorkoutLogger from "@/components/WorkoutLogger";
import AICoach from "@/components/AICoach";
import ProgressTracker from "@/components/ProgressTracker";
import NutritionTracker from "@/components/NutritionTracker";
import MobilityAssessment from "@/components/MobilityAssessment";
import CommunityChallenges from "@/components/CommunityChallenges";
import FormChecker from "@/components/FormChecker";
import VBTTracker from "@/components/VBTTracker";

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-background overflow-x-auto">
          <TabsTrigger value="dashboard" className="rounded-none">Dashboard</TabsTrigger>
          <TabsTrigger value="workout" className="rounded-none">Workout</TabsTrigger>
          <TabsTrigger value="progress" className="rounded-none">Progress</TabsTrigger>
          <TabsTrigger value="nutrition" className="rounded-none">Nutrition</TabsTrigger>
          <TabsTrigger value="mobility" className="rounded-none">Mobility</TabsTrigger>
          <TabsTrigger value="form" className="rounded-none">Form Check</TabsTrigger>
          <TabsTrigger value="vbt" className="rounded-none">VBT</TabsTrigger>
          <TabsTrigger value="challenges" className="rounded-none">Challenges</TabsTrigger>
          <TabsTrigger value="coach" className="rounded-none">AI Coach</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Dashboard userId={session.user.id} />
        </TabsContent>

        <TabsContent value="workout">
          <div className="container mx-auto p-4">
            <WorkoutLogger userId={session.user.id} />
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="container mx-auto p-4">
            <ProgressTracker userId={session.user.id} />
          </div>
        </TabsContent>

        <TabsContent value="nutrition">
          <div className="container mx-auto p-4">
            <NutritionTracker userId={session.user.id} />
          </div>
        </TabsContent>

        <TabsContent value="mobility">
          <div className="container mx-auto p-4">
            <MobilityAssessment userId={session.user.id} />
          </div>
        </TabsContent>

        <TabsContent value="form">
          <div className="container mx-auto p-4">
            <FormChecker userId={session.user.id} />
          </div>
        </TabsContent>

        <TabsContent value="vbt">
          <div className="container mx-auto p-4">
            <VBTTracker userId={session.user.id} />
          </div>
        </TabsContent>

        <TabsContent value="challenges">
          <div className="container mx-auto p-4">
            <CommunityChallenges userId={session.user.id} />
          </div>
        </TabsContent>

        <TabsContent value="coach">
          <div className="container mx-auto p-4 max-w-4xl">
            <AICoach userId={session.user.id} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;