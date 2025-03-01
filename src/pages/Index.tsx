
import { useEffect } from "react";
import Header from "@/components/Header";
import PriceScanForm from "@/components/PriceScanForm";
import MonitoringTable from "@/components/MonitoringTable";
import PriceAlertCard from "@/components/PriceAlertCard";
import VulnerabilityReport from "@/components/VulnerabilityReport";
import AttackSimulator from "@/components/AttackSimulator";
import DataVisualizer from "@/components/DataVisualizer";
import { mockWebsites, mockPriceAlerts, mockVulnerabilityReports, mockProducts, mockStatsSummary } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertCircle, HardDrive, Activity } from "lucide-react";

const Index = () => {
  // For animation purposes - simulate gradual loading of UI elements
  useEffect(() => {
    // Content already loads with animations from CSS classes
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-20 pb-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Dashboard Summary Cards */}
          <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            <Card>
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Monitored Websites</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-2xl font-bold">{mockStatsSummary.totalWebsites}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockStatsSummary.totalProducts} products tracked
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertCircle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-2xl font-bold">{mockStatsSummary.activePriceAlerts}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockPriceAlerts.filter(a => a.status === "new").length} new alerts today
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
                <Shield className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-2xl font-bold">{mockStatsSummary.criticalVulnerabilities}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockVulnerabilityReports.filter(v => v.status === "open").length} open issues
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Attack Success Rate</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-2xl font-bold">{mockStatsSummary.successfulAttacks}/10</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {(mockStatsSummary.successfulAttacks / 10 * 100).toFixed(0)}% of simulations successful
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Left Column - Monitor & Control */}
          <div className="col-span-full md:col-span-8 space-y-6">
            <Card className="animate-fade-in">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xl">Monitored Websites</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <MonitoringTable websites={mockWebsites} />
              </CardContent>
            </Card>
            
            <Tabs defaultValue="chart" className="w-full animate-fade-in">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Price History</TabsTrigger>
                <TabsTrigger value="simulator">Attack Simulator</TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <DataVisualizer products={mockProducts} />
              </TabsContent>
              <TabsContent value="simulator">
                <AttackSimulator />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Alerts & Reports */}
          <div className="col-span-full md:col-span-4 space-y-6">
            <PriceScanForm />
            
            <div className="space-y-2 animate-fade-in">
              <h3 className="text-lg font-medium">Recent Price Alerts</h3>
              <div className="space-y-3">
                {mockPriceAlerts.map(alert => (
                  <PriceAlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
            
            <div className="space-y-2 animate-fade-in">
              <h3 className="text-lg font-medium">Vulnerability Reports</h3>
              <div className="space-y-3">
                {mockVulnerabilityReports.map(report => (
                  <VulnerabilityReport key={report.id} report={report} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
