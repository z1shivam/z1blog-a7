import { TriangleAlertIcon } from "lucide-react";
interface FormErrorProps {
  message?: string;
}

export const ErrorToast = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-red-600/15 text-red-600 flex items-center gap-x-2 rounded-md p-3 text-sm font-medium">
      <TriangleAlertIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
