import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Zap, Eye, AlertCircle } from "lucide-react";

const OverviewTab = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* AI Snapshot Banner */}
      <Card className="border-2 border-primary/50 bg-gradient-to-br from-card to-navy shadow-lg shadow-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <Zap className="h-6 w-6" />
              AI Snapshot
            </CardTitle>
            <Badge className="bg-primary/20 text-primary border-primary/30">LIVE</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-primary mb-2">+983%</div>
          <p className="text-muted-foreground">
            AI detects unprecedented engagement spike. Campaign performance exceeds all historical benchmarks.
            Scan optimization and content tuning are automatically adjusting for maximum conversion.
          </p>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4 text-teal" />
              Watch Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">2,512</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+18.3%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Card Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">6,010</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+24.7%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AR Coverages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">907</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+12.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Active Sponsors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">28</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">All synced</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Campaign */}
        <Card className="border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">My Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Campaign ID</span>
                <span className="text-foreground font-mono">#26.BAC231</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">License Status</span>
                <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Block Hour Progress</span>
                <span className="text-primary font-semibold">68% Active</span>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-[68%]" />
            </div>
            <p className="text-xs text-muted-foreground">Scans vs. Goal tracking</p>
          </CardContent>
        </Card>

        {/* AI Auto-Pilot */}
        <Card className="border-2 border-teal/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-teal" />
              AI Auto-Pilot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Adjust Scan Content</span>
              <Badge className="bg-success/20 text-success border-success/30 text-xs">ON</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Optimize Conversion</span>
              <Badge className="bg-success/20 text-success border-success/30 text-xs">ON</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Launch in Sequence</span>
              <Badge className="bg-success/20 text-success border-success/30 text-xs">ON</Badge>
            </div>
            <div className="pt-2">
              <p className="text-xs text-teal">100 Licenses Active • All systems optimal</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Privacy */}
      <Card className="border-border bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">AEI Response</p>
              <p className="text-sm font-medium text-foreground">Auto</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Optimize C&msure</p>
              <p className="text-sm font-medium text-foreground">Active</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Linked Wallet</p>
              <p className="text-sm font-medium text-primary">M-Pesa +245</p>
            </div>
          </div>
          <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
