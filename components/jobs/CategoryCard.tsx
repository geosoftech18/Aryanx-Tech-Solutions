
import {
  Briefcase,
  Coins,
  GraduationCap,
  HeartPulse,
  LineChart
} from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  category: {
    id: string;
    title: string;
    count: number;
    icon: string;
  };
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  // Map icon strings to actual Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "laptop-code":
        return <Briefcase className="h-6 w-6" />;
      case "chart-line":
        return <LineChart className="h-6 w-6" />;
      case "coins":
        return <Coins className="h-6 w-6" />;
      case "stethoscope":
        return <HeartPulse className="h-6 w-6" />;
      case "graduation-cap":
        return <GraduationCap className="h-6 w-6" />;
      case "handshake":
        return <Briefcase className="h-6 w-6" />; // Using Briefcase as placeholder, since HandshakeIcon doesn't exist
      default:
        return <Briefcase className="h-6 w-6" />;
    }
  };

  return (
    <Link href={`/jobs/categories/${category.id}`}>
      <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-all hover:border-blue-200 hover:bg-blue-50/30 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 rounded-full p-3 text-blue-600">
            {getIcon(category.icon)}
          </div>
          <div>
            <h3 className="text-lg font-medium">{category.title}</h3>
            <p className="text-slate-500 text-sm">{category.count} open positions</p>
          </div>
        </div>
      </div>
    </Link> );
};

export default CategoryCard;
