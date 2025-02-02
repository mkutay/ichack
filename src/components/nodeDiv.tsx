import { Label } from "./ui/label";

export function NodeDiv({ text }: { text: string }) {
  return (
    <div className="rounded-base h-28 w-full border-2 border-border p-4 shadow-shadow items-center flex justify-center">
      <Label className="text-lg">{text}</Label>
    </div>
  )
}