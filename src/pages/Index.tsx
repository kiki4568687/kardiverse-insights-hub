import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Settings, 
  Shield, 
  DollarSign, 
  Activity,
  Lock,
  Image,
  Database
} from "lucide-react";
import OverviewTab from "@/components/dashboard/OverviewTab";
import FomoAnalyticsTab from "@/components/dashboard/FomoAnalyticsTab";
import CampaignControlTab from "@/components/dashboard/CampaignControlTab";
import ProofAuditTab from "@/components/dashboard/ProofAuditTab";
import EscrowLedgerTab from "@/components/dashboard/EscrowLedgerTab";
import SystemMonitorTab from "@/components/dashboard/SystemMonitorTab";
import SecurityLogsTab from "@/components/dashboard/SecurityLogsTab";
import MediaLibraryTab from "@/components/dashboard/MediaLibraryTab";
import DataBridgeTab from "@/components/dashboard/DataBridgeTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-background">
                K
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">NeoCard™ Sponsor Dashboard</h1>
                <p className="text-sm text-muted-foreground">Kardiverse Staff Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-medium border border-success/30">
                AI ACTIVE
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30">
                NOC VERIFIED
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-9 gap-2 bg-card/50 p-2 h-auto rounded-xl border border-border">
            <TabsTrigger value="overview" className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
              <span className="text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="fomo" className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">FOMO</span>
            </TabsTrigger>
            <TabsTrigger value="campaign" className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="h-4 w-4" />
              <span className="text-xs">Campaign</span>
            </TabsTrigger>
            <TabsTrigger value="proof" className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Proof</span>
            </TabsTrigger>
            <TabsTrigger value="escrow" className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs">Escrow</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Activity className="h-4 w-4" />
              <span className="text-xs">System</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Lock className="h-4 w-4" />
              <span className="text-xs">Security</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Image className="h-4 w-4" />
              <span className="text-xs">Media</span>
            </TabsTrigger>
            <TabsTrigger value="bridge" className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Database className="h-4 w-4" />
              <span className="text-xs">Bridge</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="fomo" className="space-y-6">
            <FomoAnalyticsTab />
          </TabsContent>

          <TabsContent value="campaign" className="space-y-6">
            <CampaignControlTab />
          </TabsContent>

          <TabsContent value="proof" className="space-y-6">
            <ProofAuditTab />
          </TabsContent>

          <TabsContent value="escrow" className="space-y-6">
            <EscrowLedgerTab />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SystemMonitorTab />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecurityLogsTab />
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <MediaLibraryTab />
          </TabsContent>

          <TabsContent value="bridge" className="space-y-6">
            <DataBridgeTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
