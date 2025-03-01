
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search, PlusCircle } from "lucide-react";
import { toast } from "sonner";
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

const PriceScanForm = () => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [scanFrequency, setScanFrequency] = useState("hourly");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url || !name) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      toast.success("Website added successfully", {
        description: `Now monitoring ${name} for price changes`,
      });
      setUrl("");
      setName("");
      setScanFrequency("hourly");
      setIsSubmitting(false);
    }, 1500);
  };

  const detectWebsiteName = () => {
    if (!url) {
      toast.error("Please enter a URL first");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API request to detect website name
    setTimeout(() => {
      try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.replace('www.', '');
        const siteName = domain.split('.')[0]
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        setName(siteName);
        toast.success("Website name detected", {
          description: `Detected name: ${siteName}`,
        });
      } catch (error) {
        toast.error("Invalid URL format");
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Add Website to Monitor</CardTitle>
        <CardDescription>
          Start scanning e-commerce websites for price tampering vulnerabilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={detectWebsiteName}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Website Name</Label>
            <Input
              id="name"
              placeholder="My E-Commerce Store"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="frequency">Scan Frequency</Label>
            <Select value={scanFrequency} onValueChange={setScanFrequency}>
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <PlusCircle className="h-4 w-4" />
          )}
          Add Website
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PriceScanForm;
