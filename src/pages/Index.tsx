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
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col">
        {/* Logo Section */}
        <div className="p-4 md:p-6 border-b border-border">
            <div className="flex flex-col items-center gap-3 relative">
              {/* Subtle glow background behind the logo section */}
              <div 
                className="absolute inset-0 rounded-lg opacity-40 blur-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              />
              <div className="relative w-full flex justify-center">
                {/* Minimal glow layer */}
                <img 
                  src="/logo-transparent.png" 
                  alt="Kardiverse Logo" 
                  className="absolute w-48 h-12 object-contain opacity-20 blur-sm"
                />
                {/* Main logo - clean and sharp */}
                <img 
                  src="/logo-transparent.png" 
                  alt="Kardiverse Logo" 
                  className="relative w-48 h-12 object-contain opacity-100"
                />
              </div>
              <h1 className="text-base font-bold text-foreground neon-text">Staff Portal</h1>
            </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 md:p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-3 rounded-lg text-left transition-colors glow-on-hover ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground button-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className={`h-4 w-4 md:h-5 md:w-5 flex-shrink-0 ${activeTab === item.id ? 'icon-glow' : ''}`} />
                <span className={`font-medium text-sm md:text-base truncate ${activeTab === item.id ? 'text-glow' : ''}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Status Indicators */}
        <div className="p-3 md:p-4 border-t border-border space-y-2">
          <div className="px-3 py-1 rounded-full bg-success/20 text-success text-[10px] md:text-xs font-medium border border-success/30 text-center glow-on-hover card-glow neon-text">
                AI ACTIVE
              </div>
          <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] md:text-xs font-medium border border-primary/30 text-center glow-on-hover card-glow neon-text">
                NOC VERIFIED
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <h2 className="text-lg md:text-xl font-bold text-foreground neon-text truncate">NeoCard™ Sponsor Dashboard</h2>
              <p className="text-xs md:text-sm text-muted-foreground truncate">
                {menuItems.find(item => item.id === activeTab)?.label}
              </p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </main>
    </div>
  );
};

export default Index;
