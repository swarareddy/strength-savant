import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Video, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FormCheckerProps {
  userId: string;
}

const FormChecker = ({ userId }: FormCheckerProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsRecording(true);
      toast({ title: "Recording started", description: "Perform your exercise" });
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Could not access camera",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);

    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        exercise: "Squat",
        formScore: 8.5,
        repCount: 10,
        feedback: [
          { type: "good", message: "Good depth achieved" },
          { type: "good", message: "Knees tracking over toes correctly" },
          { type: "warning", message: "Slight forward lean - engage core more" },
        ],
        velocity: 0.85,
      });
      toast({ title: "Analysis Complete!", description: "Check your form feedback below" });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        AI Form Checker
      </h1>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <div className="aspect-video bg-background rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {isRecording ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Start recording to analyze your form</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-center">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              className="bg-gradient-primary hover:shadow-glow"
            >
              <Video className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="destructive"
            >
              Stop & Analyze
            </Button>
          )}
        </div>
      </Card>

      {analysis && (
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-primary text-white">
            <h2 className="text-2xl font-bold mb-2">{analysis.exercise}</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Form Score</p>
                <p className="text-4xl font-bold">{analysis.formScore}/10</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Reps Counted</p>
                <p className="text-4xl font-bold">{analysis.repCount}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Avg Velocity</p>
                <p className="text-4xl font-bold">{analysis.velocity} m/s</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">Form Feedback</h3>
            <div className="space-y-3">
              {analysis.feedback.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-background rounded-lg"
                >
                  {item.type === "good" ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{item.message}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FormChecker;