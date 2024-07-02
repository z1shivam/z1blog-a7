import { CheckCircle2Icon } from "lucide-react";
interface FormSuccessProps {
  message?: string;
}

export const SuccessToast = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm font-medium text-emerald-600">
      <CheckCircle2Icon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
