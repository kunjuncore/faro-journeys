import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ 
  title = "Error", 
  message, 
  onRetry 
}: ErrorMessageProps) => {
  return (
    <Alert variant="destructive" className="my-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        <span>{message}</span>
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="w-fit"
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
