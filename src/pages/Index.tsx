import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WorkoutLogger from "@/components/WorkoutLogger";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <WorkoutLogger />
    </div>
  );
};

export default Index;
