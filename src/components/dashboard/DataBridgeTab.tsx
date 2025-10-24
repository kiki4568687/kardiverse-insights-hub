import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Brain, Activity, Zap, ExternalLink } from "lucide-react";

const DataBridgeTab = () => {
  const apiIndicators = [
    { name: "Salesforce", status: "ACTIVE" },
    { name: "HubSpot", status: "ACTIVE" },
    { name: "Oracle", status: "ACTIVE" },
    { name: "SAP", status: "ACTIVE" },
  ];

  const hashStream = [
    "1B.44.4/ 314552d452A82b33",
    "1B.44.6/ 830d4433DA8/0b64",
    "1B.44.4/ a055d862c446238",
    "1B.44.6/ 1746d2150D407AA4",
    "1B.44.4/ 1c0f86b6841c7T0",
    "1B.44.4/ F29B326440P0b02",
    "1B.44.4/ 8eff33447d0506c",
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="border-2 border-teal/50 bg-gradient-to-br from-card to-navy shadow-lg shadow-teal/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Database className="h-6 w-6 text-teal" />
              NeoCard™ Sponsor Dashboard - Data Bridge
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* AI Sentinal */}
      <Card className="border-2 border-primary/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI SENTINAL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Visualization */}
            <div className="flex items-center justify-center p-8">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-4 border-teal/30 flex items-center justify-center">
                  <Brain className="h-24 w-24 text-teal drop-shadow-[0_0_20px_hsl(var(--teal))]" />
                </div>
                <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-primary/20 border-2 border-primary animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary animate-pulse" />
              </div>
            </div>

            {/* AI Stats */}
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="text-lg font-bold text-teal">Predicting latency spike in Kenya node (Confidence 52%)</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">NeoCard</div>
                  <Badge className="bg-success/20 text-success border-success/30">✓</Badge>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Blockchain</div>
                  <Badge className="bg-success/20 text-success border-success/30">✓</Badge>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Sponsor CRM</div>
                  <Badge className="bg-success/20 text-success border-success/30">✓</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Live Hash Stream */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">LIVE HASH STREAM</h4>
              <Badge className="bg-success/20 text-success border-success/30 text-xs">STREAMING</Badge>
            </div>
            <div className="p-4 bg-navy rounded-lg font-mono text-xs space-y-1 max-h-32 overflow-y-auto">
              {hashStream.map((hash, i) => (
                <div key={i} className="text-teal">{hash}</div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* NeoCard */}
        <Card className="border-2 border-primary/50 bg-card/80">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">NeoCard</CardTitle>
              <Badge className="bg-success/20 text-success border-success/30 text-xs">SYNCED</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-center p-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">NC</span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Cards</span>
                <span className="text-foreground font-semibold">10,284</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Sync</span>
                <span className="text-success">2 min ago</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full border-primary">
              <ExternalLink className="h-3 w-3 mr-2" />
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Blockchain */}
        <Card className="border-2 border-secondary/50 bg-card/80">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Blockchain</CardTitle>
              <Badge className="bg-success/20 text-success border-success/30 text-xs">ACTIVE</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-center p-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
                <Activity className="h-10 w-10 text-background" />
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verified Txns</span>
                <span className="text-foreground font-semibold">10,002</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Chain Status</span>
                <span className="text-success">Synced</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full border-secondary">
              <ExternalLink className="h-3 w-3 mr-2" />
              View Chain
            </Button>
          </CardContent>
        </Card>

        {/* Sponsor CRM */}
        <Card className="border-2 border-teal/50 bg-card/80">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Sponsor CRM</CardTitle>
              <Badge className="bg-success/20 text-success border-success/30 text-xs">CONNECTED</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-center p-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal to-teal/50 flex items-center justify-center">
                <Database className="h-10 w-10 text-background" />
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sponsors</span>
                <span className="text-foreground font-semibold">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Sync</span>
                <span className="text-success">Real-time</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full border-teal">
              <ExternalLink className="h-3 w-3 mr-2" />
              Manage
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* API Indicators & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Indicators */}
        <Card className="border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">API Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {apiIndicators.map((api, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-semibold text-foreground">{api.name}</span>
                <Badge className="bg-success/20 text-success border-success/30">{api.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Intelligence */}
        <Card className="border-2 border-primary/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              AI Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <div className="text-sm font-semibold text-primary mb-1">Data Optimization</div>
              <div className="text-xs text-muted-foreground">
                Routing Safaricom scan data via Japan node – latency reduced by 18%
              </div>
            </div>

            <div className="p-4 bg-teal/10 border border-teal/30 rounded-lg">
              <div className="text-sm font-semibold text-teal mb-1">Smart Contract Advisor</div>
              <div className="text-xs text-muted-foreground">
                3 contracts can be merged to reduce gas costs by 24%
              </div>
            </div>

            <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
              <div className="text-sm font-semibold text-secondary mb-1">Predictive ROI</div>
              <div className="text-xs text-muted-foreground">
                Projected RO² next 24h: +6.3% (based on traffic and sync velocity)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Throughput & Chain Governance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border bg-card/80 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">AI Chain Governance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Smart Contract Activity</div>
              <div className="text-2xl font-bold text-foreground">5 Executed • 14 Pending</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Load Balancing</div>
              <div className="text-sm text-foreground">
                Shift 10% load from UBA node to Kenya node to maintain sync equilibrium
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">JAPAN</div>
                <div className="w-12 h-12 mx-auto rounded-full border-4 border-teal/30 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-teal" />
                </div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">EUROPE</div>
                <div className="w-12 h-12 mx-auto rounded-full border-4 border-primary/30 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">USA</div>
                <div className="w-12 h-12 mx-auto rounded-full border-4 border-secondary/30 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-secondary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-teal/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Data Throughput Meter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-teal/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal">780</div>
                    <div className="text-xs text-muted-foreground">MB/s</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Peak</span>
                <span className="text-foreground">842 MB/s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Average</span>
                <span className="text-foreground">687 MB/s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Status */}
      <Card className="border-primary/30 bg-card/50">
        <CardContent className="py-4">
          <div className="text-sm text-muted-foreground text-center">
            Last Sync: 20Oct 2025 • Data Fully Synced • AI Sentinel Active • NeoChain™ Verified
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataBridgeTab;
