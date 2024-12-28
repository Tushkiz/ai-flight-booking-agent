import { Loader } from "lucide-react";

interface ToolCallLoadingProps {
  message?: string;
}

export default function ToolCallLoading({
  message = "Processing...",
}: ToolCallLoadingProps) {
  return (
    <div className="flex border rounded-xl h-[60px] items-center px-4 gap-2">
      <Loader className="size-6 animate-spin text-blue-500" />
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-fade-in">{message}</span>
    </div>
  );
}
