
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertCircle, 
  Settings, 
  ChevronDown, 
  BarChart3, 
  Activity, 
  FileText, 
  MonitorX 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Header = () => {
  const [isMonitoring, setIsMonitoring] = useState(true);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    toast(isMonitoring ? "Monitoring paused" : "Monitoring resumed", {
      description: isMonitoring 
        ? "Price tampering detection has been paused" 
        : "Price tampering detection is now active",
      action: {
        label: "Undo",
        onClick: () => setIsMonitoring(isMonitoring),
      },
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-medium">Price Tamper Hunter</h1>
          <div className="hidden md:flex items-center ml-6 space-x-1">
            <Button variant="ghost" className="text-sm flex items-center gap-1.5 h-9">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-sm flex items-center gap-1.5 h-9">
              Websites
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm flex items-center gap-1.5 h-9">
                  Reports <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 animate-fade-in">
                <DropdownMenuLabel>Report Types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Price Alerts
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Vulnerability Reports
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="text-sm flex items-center gap-1.5 h-9">
              Attack Simulator
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={isMonitoring ? "default" : "outline"} 
            size="sm" 
            className="h-9 gap-1.5 transition-all duration-300" 
            onClick={toggleMonitoring}
          >
            {isMonitoring ? (
              <>
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Monitoring Active</span>
              </>
            ) : (
              <>
                <MonitorX className="h-4 w-4" />
                <span className="hidden sm:inline">Monitoring Paused</span>
              </>
            )}
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
