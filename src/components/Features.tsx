import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, Target, Zap, Award, LineChart } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get personalized workout recommendations and form tips based on your performance data",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Visualize your strength gains and workout consistency with beautiful charts",
  },
  {
    icon: Target,
    title: "Smart Goals",
    description: "AI sets realistic goals and adjusts them as you progress",
  },
  {
    icon: Zap,
    title: "Recovery Optimization",
    description: "Get notified when it's time for a deload or rest day to prevent injury",
  },
  {
    icon: Award,
    title: "Personal Records",
    description: "Celebrate your PRs with automatic tracking and milestone notifications",
  },
  {
    icon: LineChart,
    title: "Performance Analytics",
    description: "Deep dive into your workout data with advanced analytics and trends",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Powered by AI
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced features to help you train smarter, not just harder
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-primary group-hover:shadow-glow transition-all duration-300">
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
