import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Trophy, Users } from "lucide-react";

interface CommunityChallengesProps {
  userId: string;
}

const CommunityChallenges = ({ userId }: CommunityChallengesProps) => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [myChallenges, setMyChallenges] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchChallenges();
    fetchMyChallenges();
  }, [userId]);

  const fetchChallenges = async () => {
    const { data } = await supabase
      .from("challenges")
      .select("*, challenge_participants(count)")
      .order("created_at", { ascending: false });
    setChallenges(data || []);
  };

  const fetchMyChallenges = async () => {
    const { data } = await supabase
      .from("challenge_participants")
      .select("*, challenges(*)")
      .eq("user_id", userId);
    setMyChallenges(data || []);
  };

  const joinChallenge = async (challengeId: string) => {
    try {
      const { error } = await supabase
        .from("challenge_participants")
        .insert({ challenge_id: challengeId, user_id: userId });

      if (error) throw error;

      toast({ title: "Challenge joined!", description: "Good luck!" });
      fetchChallenges();
      fetchMyChallenges();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Community Challenges
      </h1>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-accent" />
          Active Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="p-4 bg-background rounded-lg">
              <h3 className="font-bold text-lg mb-2">{challenge.challenge_name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {challenge.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{challenge.challenge_participants?.[0]?.count || 0} participants</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => joinChallenge(challenge.id)}
                  className="bg-gradient-accent"
                >
                  Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {myChallenges.length > 0 && (
        <Card className="p-6 bg-gradient-primary text-white">
          <h2 className="text-2xl font-bold mb-4">My Challenges</h2>
          <div className="space-y-3">
            {myChallenges.map((participation) => (
              <div key={participation.id} className="p-4 bg-white/10 rounded-lg">
                <h3 className="font-bold">{participation.challenges.challenge_name}</h3>
                <div className="mt-2">
                  <div className="text-sm opacity-90">Progress</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-1">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{
                        width: `${
                          (participation.current_progress /
                            participation.challenges.target_value) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CommunityChallenges;