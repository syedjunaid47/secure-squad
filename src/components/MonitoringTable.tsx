
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ExternalLink, Play, Pause, Trash2, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Website } from "@/types";
import { toast } from "sonner";

interface MonitoringTableProps {
  websites: Website[];
}

const MonitoringTable = ({ websites }: MonitoringTableProps) => {
  const handleAction = (action: string, website: Website) => {
    switch (action) {
      case "scan":
        toast.success(`Scanning started for ${website.name}`, {
          description: "This may take a few minutes to complete",
        });
        break;
      case "pause":
        toast(`Monitoring paused for ${website.name}`);
        break;
      case "resume":
        toast(`Monitoring resumed for ${website.name}`);
        break;
      case "delete":
        toast.warning(`Website removed: ${website.name}`, {
          action: {
            label: "Undo",
            onClick: () => toast.success(`${website.name} restored`),
          },
        });
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status: Website["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-success text-success-foreground">Active</Badge>;
      case "paused":
        return <Badge variant="outline" className="text-muted-foreground">Paused</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Website</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Scanned</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {websites.map((website) => (
            <TableRow key={website.id} className="transition-colors hover:bg-muted/50">
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{website.name}</span>
                  <a 
                    href={website.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-muted-foreground hover:underline flex items-center gap-1"
                  >
                    {website.url.replace(/(^\w+:|^)\/\//, '')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </TableCell>
              <TableCell>{website.productCount}</TableCell>
              <TableCell>{getStatusBadge(website.status)}</TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(website.lastScanned), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 animate-fade-in">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleAction("scan", website)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Scan Now
                    </DropdownMenuItem>
                    {website.status === "active" ? (
                      <DropdownMenuItem 
                        onClick={() => handleAction("pause", website)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Pause className="h-4 w-4" />
                        Pause
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem 
                        onClick={() => handleAction("resume", website)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Play className="h-4 w-4" />
                        Resume
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleAction("delete", website)}
                      className="flex items-center gap-2 cursor-pointer text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {websites.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <p>No websites added yet</p>
                  <p className="text-sm">Add your first website to start monitoring</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonitoringTable;
