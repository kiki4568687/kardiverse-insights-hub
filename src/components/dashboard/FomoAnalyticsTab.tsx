import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Flame, Eye, Download } from "lucide-react";

const FomoAnalyticsTab = () => {
  const engagementData = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 52 },
    { day: "Wed", value: 38 },
    { day: "Thu", value: 65 },
    { day: "Fri", value: 58 },
    { day: "Sat", value: 72 },
    { day: "Sun", value: 68 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary/50 bg-gradient-to-br from-card to-navy">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">10,284</div>
            <p className="text-xs text-muted-foreground mt-1">+18%</p>
          </CardContent>
        </Card>

        <Card className="border-teal/50 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">AEI Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal">10,002</div>
            <p className="text-xs text-success mt-1">Proof on chain</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Value per Scan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">€75,20</div>
            <p className="text-xs text-muted-foreground mt-1">AEI audited</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Flame className="h-4 w-4 text-destructive" />
              Active FMOKs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">28</div>
            <p className="text-xs text-muted-foreground mt-1">All in playpod</p>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Heat Cycle */}
      <Card className="border-border bg-card/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Flame className="h-5 w-5 text-destructive" />
              Engagement Heat Cycle (Weekly Pulse)
            </CardTitle>
            <Badge className="bg-destructive/20 text-destructive border-destructive/30">
              LIVE CAMPAIGN ALERT
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chart */}
            <div className="flex items-end justify-between gap-2 h-32">
              {engagementData.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-full bg-muted rounded-t-lg relative" style={{ height: `${item.value}%` }}>
                    <div 
                      className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-primary to-secondary"
                      style={{ height: `${item.value}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.day}</span>
                </div>
              ))}
            </div>
            
            {/* Event Labels */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-primary/50 text-primary">PIZZA NIGHT</Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">COFFEE BOOST</Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">KIDS PARADE</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI & FOMO Level */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI Analysis */}
        <Card className="border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">ROI & FOMO Sync</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">ROI</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">34.2%</div>
                  <div className="text-xs text-success">AEI VERIFIED</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">ROI Source Breakdown</p>
                <div className="flex gap-2">
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold text-primary">70%</div>
                    <div className="text-xs text-muted-foreground">Direct</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold text-secondary">20%</div>
                    <div className="text-xs text-muted-foreground">Organic</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold text-teal">10%</div>
                    <div className="text-xs text-muted-foreground">Other</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-card hover:bg-muted">
                EXPORT DATA
              </Button>
              <Button size="sm" className="flex-1 bg-destructive/20 text-destructive hover:bg-destructive/30">
                LIVE ALERT
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FOMO Level Meter */}
        <Card className="border-2 border-teal/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5 text-teal" />
              FOMO Level Meter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-teal/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal">HIGH</div>
                  <div className="text-xs text-muted-foreground">KENYA</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">USA</span>
                <Badge variant="outline" className="border-muted">Medium</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">JAPAN</span>
                <Badge variant="outline" className="border-muted">Low</Badge>
              </div>
            </div>

            <Button size="sm" className="w-full bg-teal text-background hover:bg-teal/90">
              VIEW AEI HASH
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer Info */}
      <Card className="border-primary/30 bg-card/50">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex gap-4">
              <span>All data AEI-secured</span>
              <span className="text-primary">•</span>
              <span>Blockchain-verified</span>
              <span className="text-primary">•</span>
              <span>Audit-ready</span>
              <span className="text-primary">•</span>
              <span>Kardiverse NeoCard Sync 4</span>
            </div>
            <Button size="sm" variant="outline" className="border-primary/50 text-primary">
              <Download className="h-3 w-3 mr-1" />
              EXPORT PROOF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FomoAnalyticsTab;
