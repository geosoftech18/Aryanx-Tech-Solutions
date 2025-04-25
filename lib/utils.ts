import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalary(salary: number): string {
  // Convert to lakhs (divide by 100,000)
  const lakhs = salary / 100000;
  
  if (lakhs >= 100) {
    // If salary is 1 crore or more
    const crores = lakhs / 100;
    return `₹${crores.toFixed(2)}Cr/year`;
  } else {
    // Format in lakhs
    return `₹${lakhs.toFixed(2)}L/year`;
  }
}

export function formatCompactNumber(number: number): string {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}
