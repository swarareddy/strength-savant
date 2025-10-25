import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import heroImage from "@/assets/hero-workout.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fitness motivation"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Animated Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="flex items-center justify-center mb-6 gap-2">
          <Dumbbell className="w-12 h-12 text-primary animate-bounce" />
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-primary bg-clip-text text-transparent">
            FitTrack AI
          </h1>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
          Your Intelligent Workout Partner
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Track workouts, get AI-powered insights, and crush your fitness goals with smart training recommendations
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold"
          >
            Start Training
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold"
          >
            View Features
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">AI</div>
            <div className="text-sm text-muted-foreground mt-1">Powered</div>
          </div>
          <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
            <div className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">100%</div>
            <div className="text-sm text-muted-foreground mt-1">Free</div>
          </div>
          <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
            <div className="text-4xl font-bold text-foreground">24/7</div>
            <div className="text-sm text-muted-foreground mt-1">Tracking</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
