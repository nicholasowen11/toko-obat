import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  totalProducts: number;
}

export default function DashboardStats({ totalProducts }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Jumlah Produk</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </CardContent>
      </Card>
    </div>
  );
}