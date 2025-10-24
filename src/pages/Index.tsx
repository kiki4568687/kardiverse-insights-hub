import { useState } from "react";
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
import LiveBiddingSystemTab from "@/components/dashboard/LiveBiddingSystemTab";
import CampaignControlTab from "@/components/dashboard/CampaignControlTab";
import ProofAuditTab from "@/components/dashboard/ProofAuditTab";
import EscrowLedgerTab from "@/components/dashboard/EscrowLedgerTab";
import SystemMonitorTab from "@/components/dashboard/SystemMonitorTab";
import AIInsightsTab from "@/components/dashboard/AIInsightsTab";
import MediaLibraryTab from "@/components/dashboard/MediaLibraryTab";
import DataBridgeTab from "@/components/dashboard/DataBridgeTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, component: OverviewTab },
    { id: "fomo", label: "Live Bidding System", icon: TrendingUp, component: LiveBiddingSystemTab },
    { id: "campaign", label: "Campaign Control", icon: Settings, component: CampaignControlTab },
    { id: "proof", label: "Proof Audit", icon: Shield, component: ProofAuditTab },
    { id: "escrow", label: "Escrow Ledger", icon: DollarSign, component: EscrowLedgerTab },
    { id: "system", label: "System Monitor", icon: Activity, component: SystemMonitorTab },
    { id: "ai-insights", label: "AI Insights & ROI", icon: TrendingUp, component: AIInsightsTab },
    { id: "media", label: "Media & Proof Library", icon: Image, component: MediaLibraryTab },
    { id: "bridge", label: "Sponsor Data Bridge", icon: Database, component: DataBridgeTab },
  ];

  const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-background">
                K
              </div>
              <div>
              <h1 className="text-lg font-bold text-foreground">Kardiverse</h1>
              <p className="text-xs text-muted-foreground">Staff Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Status Indicators */}
        <div className="p-4 border-t border-border space-y-2">
          <div className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-medium border border-success/30 text-center">
                AI ACTIVE
              </div>
          <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30 text-center">
                NOC VERIFIED
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">NeoCard™ Sponsor Dashboard</h2>
              <p className="text-sm text-muted-foreground">
                {menuItems.find(item => item.id === activeTab)?.label}
              </p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </main>
    </div>
  );
};

export default Index;
