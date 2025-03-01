
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceAlert } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ArrowDownRight, ExternalLink, Check, X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface PriceAlertCardProps {
  alert: PriceAlert;
}

const PriceAlertCard = ({ alert }: PriceAlertCardProps) => {
  const [status, setStatus] = useState(alert.status);

  const getSeverityColor = (severity: PriceAlert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-info/10 text-info border-info/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusBadge = (status: PriceAlert["status"]) => {
    switch (status) {
      case "new":
        return <Badge variant="outline" className="bg-primary/10 border-primary/20">New</Badge>;
      case "reviewing":
        return <Badge variant="outline" className="bg-warning/10 border-warning/20">Reviewing</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-success/10 border-success/20">Resolved</Badge>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const handleMarkAsReviewing = () => {
    toast("Alert marked as reviewing", {
      description: `Alert for ${alert.productName} is now under review`,
    });
    setStatus("reviewing");
  };

  const handleDismiss = () => {
    toast("Alert dismissed", {
      description: `Alert for ${alert.productName} marked as resolved`,
    });
    setStatus("resolved");
  };

  return (
    <Card className={`overflow-hidden border transition-all duration-300 animate-fade-in ${status === "resolved" ? "opacity-60" : ""}`}>
      <div className={`h-1 ${getSeverityColor(alert.severity)}`} />
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">
            {alert.productName}
          </CardTitle>
          {getStatusBadge(status)}
        </div>
        <div className="text-xs text-muted-foreground">{alert.websiteName}</div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-2 mt-2 mb-3">
          <div className="text-sm line-through text-muted-foreground">
            {formatCurrency(alert.previousPrice, alert.currency)}
          </div>
          <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
          <div className="font-medium">
            {formatCurrency(alert.currentPrice, alert.currency)}
          </div>
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 ml-auto">
            -{alert.changePercentage.toFixed(0)}%
          </Badge>
        </div>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>{alert.severity === "high" ? "Suspicious drop" : "Price change"}</span>
          </div>
          <div>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</div>
        </div>
        
        <div className="flex gap-2 mt-4">
          {status === "new" && (
            <>
              <Button variant="outline" size="sm" className="w-full h-8" onClick={handleMarkAsReviewing}>
                <Check className="h-3.5 w-3.5 mr-1" /> Review
              </Button>
              <Button variant="ghost" size="sm" className="w-full h-8" onClick={handleDismiss}>
                <X className="h-3.5 w-3.5 mr-1" /> Dismiss
              </Button>
            </>
          )}
          {status === "reviewing" && (
            <>
              <Button variant="outline" size="sm" className="w-full h-8" onClick={handleDismiss}>
                <Check className="h-3.5 w-3.5 mr-1" /> Mark Resolved
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full h-8"
                onClick={() => window.open(alert.productId, "_blank")}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1" /> View
              </Button>
            </>
          )}
          {status === "resolved" && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full h-8"
              onClick={() => window.open(alert.productId, "_blank")}
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1" /> View Product
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceAlertCard;
