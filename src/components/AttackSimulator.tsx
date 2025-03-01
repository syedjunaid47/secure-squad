import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Switch } from "@/components/ui/switch";
import { PlayCircle, AlertTriangle, FileJson } from "lucide-react";
import { AttackSimulation } from "@/types";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const initialParameters = [
  { id: "1", name: "product_id", value: "12345", manipulated: false },
  { id: "2", name: "price", value: "199.99", manipulated: false },
  { id: "3", name: "quantity", value: "1", manipulated: false },
  { id: "4", name: "total", value: "199.99", manipulated: false }
];

const AttackSimulator = () => {
  const [endpoint, setEndpoint] = useState("/api/checkout/process");
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE">("POST");
  const [parameters, setParameters] = useState(initialParameters);
  const [activeTab, setActiveTab] = useState("setup");
  const [simulationResult, setSimulationResult] = useState<AttackSimulation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleParameterChange = (id: string, field: "name" | "value", newValue: string) => {
    setParameters(parameters.map(param => 
      param.id === id ? { ...param, [field]: newValue } : param
    ));
  };

  const handleToggleManipulation = (id: string) => {
    setParameters(parameters.map(param => 
      param.id === id ? { ...param, manipulated: !param.manipulated } : param
    ));
  };

  const addParameter = () => {
    const newId = String(parameters.length + 1);
    setParameters([...parameters, { id: newId, name: "", value: "", manipulated: false }]);
  };

  const removeParameter = (id: string) => {
    setParameters(parameters.filter(param => param.id !== id));
  };

  const runSimulation = () => {
    setIsLoading(true);
    
    // Check if at least one parameter is marked as manipulated
    const hasManipulatedParams = parameters.some(param => param.manipulated);
    
    if (!hasManipulatedParams) {
      toast.warning("No parameters marked for manipulation", {
        description: "At least one parameter should be marked as manipulated for the attack simulation",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API request
    setTimeout(() => {
      // Determine if the attack is successful (simulated logic)
      const success = parameters.some(p => 
        p.manipulated && (p.name.includes("price") || p.name.includes("total"))
      );
      
      const result: AttackSimulation = {
        id: Math.random().toString(36).substring(7),
        websiteId: "w1",
        targetEndpoint: endpoint,
        method: method,
        parameters: parameters.map(p => ({
          name: p.name,
          value: p.value,
          manipulated: p.manipulated
        })),
        success: success,
        responseCode: success ? 200 : 403,
        responseData: success 
          ? JSON.stringify({
              status: "success",
              order_id: `ORD-${Math.floor(Math.random() * 10000)}`,
              total_charged: parameters.find(p => p.name.includes("total"))?.value || "0"
            }, null, 2)
          : JSON.stringify({
              status: "error",
              message: "Server-side validation failed. Tampering detected."
            }, null, 2),
        timestamp: new Date().toISOString()
      };
      
      setSimulationResult(result);
      setActiveTab("result");
      setIsLoading(false);
      
      toast(success ? "Attack simulation successful" : "Attack simulation failed", {
        description: success 
          ? "Price tampering vulnerability detected!" 
          : "Website appears to be protected against this attack vector",
      });
    }, 2000);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Price Tampering Attack Simulator</CardTitle>
        <CardDescription>
          Test e-commerce sites for checkout price manipulation vulnerabilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="setup">Attack Setup</TabsTrigger>
            <TabsTrigger value="result" disabled={!simulationResult}>
              Simulation Result
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="endpoint">Target Endpoint</Label>
              <Input
                id="endpoint"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="/api/checkout"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="method">HTTP Method</Label>
              <Select value={method} onValueChange={(value) => setMethod(value as any)}>
                <SelectTrigger id="method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Request Parameters</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={addParameter} 
                  className="h-8 px-2 text-xs"
                >
                  Add Parameter
                </Button>
              </div>
              
              <div className="space-y-3">
                {parameters.map((param) => (
                  <div key={param.id} className="flex items-center gap-2">
                    <Input
                      value={param.name}
                      onChange={(e) => handleParameterChange(param.id, "name", e.target.value)}
                      placeholder="Parameter name"
                      className="flex-1"
                    />
                    <Input
                      value={param.value}
                      onChange={(e) => handleParameterChange(param.id, "value", e.target.value)}
                      placeholder="Value"
                      className="flex-1"
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={param.manipulated}
                        onCheckedChange={() => handleToggleManipulation(param.id)}
                        id={`manipulate-${param.id}`}
                      />
                      <Label 
                        htmlFor={`manipulate-${param.id}`} 
                        className="text-xs cursor-pointer"
                      >
                        Manipulate
                      </Label>
                    </div>
                    {parameters.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeParameter(param.id)}
                        className="h-8 w-8 p-0"
                      >
                        &times;
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <div className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
                <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                <span>Parameters marked for manipulation will be modified during the attack simulation</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="result">
            {simulationResult && (
              <div className="space-y-4">
                <div className="p-3 rounded-md bg-muted/50 border">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{simulationResult.method} {simulationResult.targetEndpoint}</div>
                    <Badge 
                      variant={simulationResult.success ? "destructive" : "outline"}
                      className={`${simulationResult.success ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      {simulationResult.success ? "Vulnerable" : "Protected"}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-muted-foreground">Status Code:</span>{" "}
                      <span className={simulationResult.responseCode >= 400 ? "text-destructive" : "text-success"}>
                        {simulationResult.responseCode}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted-foreground">Manipulated Parameters:</span>{" "}
                      {simulationResult.parameters.filter(p => p.manipulated).map(p => (
                        <Badge key={p.name} variant="outline" className="ml-1 mr-1">
                          {p.name}: {p.value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-1.5 mb-2 text-sm">
                    <FileJson className="h-4 w-4" />
                    <span>Response</span>
                  </div>
                  <pre className="p-3 rounded-md bg-muted/50 border overflow-auto text-xs">
                    {simulationResult.responseData}
                  </pre>
                </div>
                
                <div className="pt-2">
                  {simulationResult.success && (
                    <div className="text-sm flex items-center gap-1.5 text-destructive bg-destructive/10 p-2 rounded-md">
                      <AlertTriangle className="h-4 w-4" />
                      <span>
                        Vulnerability detected! The server accepted manipulated parameters without validation.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        {activeTab === "setup" ? (
          <Button 
            onClick={runSimulation}
            className="w-full gap-2"
            disabled={isLoading}
          >
            <PlayCircle className="h-4 w-4" />
            {isLoading ? "Running simulation..." : "Run Attack Simulation"}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => setActiveTab("setup")}
            className="w-full"
          >
            Back to Setup
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AttackSimulator;
