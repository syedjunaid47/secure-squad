
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { Product } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataVisualizerProps {
  products: Product[];
}

const DataVisualizer = ({ products }: DataVisualizerProps) => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || "");

  const selectedProductData = products.find(p => p.id === selectedProduct);
  
  const chartData = selectedProductData?.priceHistory.map(point => ({
    date: point.date,
    price: point.price,
    formattedDate: format(parseISO(point.date), "MMM d")
  }));
  
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: selectedProductData?.currency || "USD",
    minimumFractionDigits: 2
  });

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background border rounded-md p-2 shadow-md text-xs">
          <p className="font-medium">{format(parseISO(label), "MMM d, yyyy")}</p>
          <p className="text-primary">
            Price: {currencyFormatter.format(payload[0].value as number)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-full animate-fade-in">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Price History</CardTitle>
            <CardDescription>
              Track price changes over time to detect suspicious patterns
            </CardDescription>
          </div>
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {products.map(product => (
                <SelectItem key={product.id} value={product.id} className="text-xs">
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="h-[300px] mt-4">
          {chartData && chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="formattedDate" 
                  tickLine={false}
                  tickMargin={10}
                  axisLine={{ opacity: 0.3 }}
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  tickFormatter={(value) => currencyFormatter.format(value).split('.')[0]}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={{ opacity: 0.3 }}
                  style={{ fontSize: '0.75rem' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>No price history data available for this product</p>
            </div>
          )}
        </div>
        
        {selectedProductData && (
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="text-muted-foreground">Current Price</p>
              <p className="font-medium">{currencyFormatter.format(selectedProductData.currentPrice)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Original Price</p>
              <p className="font-medium">{currencyFormatter.format(selectedProductData.originalPrice)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Discount</p>
              <p className="font-medium text-destructive">-{selectedProductData.discountPercentage.toFixed(0)}%</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataVisualizer;
