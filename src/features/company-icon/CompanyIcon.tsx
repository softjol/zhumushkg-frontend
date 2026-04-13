import { cn } from "@/shared/lib/utils";

const RANDOM_COLORS = [
  { bg: "bg-[#FEF9C3]", text: "text-[#966b2d]" }, // Muted Amber/Brown
  { bg: "bg-[#DBEAFE]", text: "text-[#4B6187]" }, // Muted Steel Blue
  { bg: "bg-[#DCFCE7]", text: "text-[#4F755E]" }, // Muted Sage Green
  { bg: "bg-[#F3E8FF]", text: "text-[#70568B]" }, // Muted Heather Purple
  { bg: "bg-[#FFE4E6]", text: "text-[#8F5B67]" }, // Muted Rose/Mauve
  { bg: "bg-[#E0F2FE]", text: "text-[#4A728A]" }, // Muted Slate Blue
];

export default function CompanyIcon({ company, className }: { company: string; className?: string }) {
  const initial = company.charAt(0).toUpperCase();
  
  // Use a simple hash to consistently pick a color for a company
  const colorIndex = Math.abs(company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % RANDOM_COLORS.length;
  const colors = RANDOM_COLORS[colorIndex];

  return (
    <span className={cn("flex items-center justify-center h-8 w-8 rounded-lg font-bold text-sm shadow-sm border border-border/20 uppercase flex-shrink-0", colors.bg, colors.text, className)}>
      {initial}
    </span>
  );
}
