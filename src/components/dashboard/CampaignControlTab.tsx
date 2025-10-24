import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, StopCircle, Download, AlertTriangle, Users } from "lucide-react";

const CampaignControlTab = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Campaign Header */}
      <Card className="border-primary/50 bg-gradient-to-br from-card to-navy shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Campaign Control Center v5.3</CardTitle>
            <div className="flex gap-2">
              <Badge className="bg-success/20 text-success border-success/30">LIVE ON</Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30">NOWCHAINS</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Active Campaign */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Card */}
        <Card className="border-2 border-primary/50 bg-card/80 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-destructive to-destructive/50 flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" alt="Coca-Cola" className="w-8 h-8 invert" />
              </div>
              <div>
                <Badge className="bg-success/20 text-success border-success/30 mb-1">AEI</Badge>
                <h3 className="text-lg font-bold text-foreground">NEOCARD</h3>
                <p className="text-xs text-muted-foreground">SPONSOR EDITION</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-24 h-24 rounded-full border-4 border-primary/30 mx-auto overflow-hidden bg-muted">
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-foreground">
                JD
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-bold text-primary">JOHN DOE</h4>
              <p className="text-xs text-muted-foreground">Born 15-10-1988</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">UID:</span>
                <span className="text-foreground font-mono text-xs">SP-00X23-KV</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full border-primary/50">
              UPLOAD LOGO
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Last Sync: 20 Oct 2025 • NOC Verified
            </p>
          </CardContent>
        </Card>

        {/* Campaign Stats */}
        <Card className="border-border bg-card/80 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                <AlertTriangle className="h-5 w-5 inline mr-2 text-primary" />
                New Winner Detected - Reward Auto-Processing...
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">8,721</div>
                <div className="text-xs text-muted-foreground">Scans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">383</div>
                <div className="text-xs text-muted-foreground">Rewards Sent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal">482</div>
                <div className="text-xs text-muted-foreground">AR Activations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">257</div>
                <div className="text-xs text-muted-foreground">M-Pesa</div>
              </div>
            </div>

            {/* Geo Zone & Crew Monitor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Geo-Zone Map & Heat Tracker</h4>
                <div className="p-4 bg-muted rounded-lg space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">NAIROBI T1</span>
                    <Badge variant="outline" className="border-primary text-primary">Bus Zone 2</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Kids Parade Arena</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Crew & Device Monitor
                </h4>
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">100 Wakeillboards online</span>
                    <Badge className="bg-success/20 text-success border-success/30 text-xs">100 OK</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">110 Neo Card Readers connect</div>
                </div>
              </div>
            </div>

            {/* Export Links */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Export Proof CSV
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-teal text-teal">
                  Export Proof CSV
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Proof Capture URL: allbeen#4AEGC2WIEva
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time Controls */}
      <Card className="border-border bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">Real-Time Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-foreground">Action Controls</h5>
              <div className="flex flex-col gap-2">
                <Button size="sm" className="bg-success text-white hover:bg-success/90 justify-start">
                  <Play className="h-3 w-3 mr-2" />
                  New Deck
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 justify-start">
                  Reu-Winner Detected
                </Button>
                <Button size="sm" variant="outline" className="justify-start border-destructive text-destructive">
                  Deleted Auto Processing
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-foreground">Live Stats</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scans</span>
                  <span className="text-foreground font-semibold">9,820 / 10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rewards</span>
                  <span className="text-foreground font-semibold">136 / 150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AR-Pesa Sync</span>
                  <span className="text-foreground font-semibold">47 / 50</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-foreground">Progress Tracking</h5>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Goal</span>
                    <span className="text-foreground">98.2%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary w-[98%] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">90.6%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-full bg-teal w-[91%] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Trend</span>
                    <span className="text-success">+12%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-full bg-success w-[94%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-foreground">Quick Actions</h5>
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline" className="justify-start">
                  <Download className="h-3 w-3 mr-2" />
                  EXPORT DATA
                </Button>
                <Button size="sm" variant="outline" className="justify-start border-destructive text-destructive">
                  LIVE ALERT
                </Button>
                <Button size="sm" variant="outline" className="justify-start">
                  <Pause className="h-3 w-3 mr-2" />
                  PAUSE ALL
                </Button>
                <Button size="sm" variant="outline" className="justify-start border-destructive text-destructive">
                  <StopCircle className="h-3 w-3 mr-2" />
                  END CAMPAIGN
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Last Sync: 20 Oct 2025 • NOC verified • Avg Detected: 01 Nov 2025
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignControlTab;
