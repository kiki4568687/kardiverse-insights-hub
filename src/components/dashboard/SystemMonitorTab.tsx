import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle, CheckCircle2, Download } from "lucide-react";

const SystemMonitorTab = () => {
  const systemStatus = [
    { name: "API", status: "online" },
    { name: "AEI Sentinel", status: "online" },
    { name: "M-Pesa", status: "online" },
    { name: "Blockchain", status: "online" },
  ];

  const errorLog = [
    { time: "16:59:48", type: "sync", message: "Sync valid complete", status: "success" },
    { time: "14:35:47", type: "sync", message: "Sync status succeeded", status: "success" },
    { time: "09:18", type: "block", message: "Block sync delayed", status: "warning" },
  ];

  const sponsors = [
    { name: "Coca-Cola", status: "active" },
    { name: "Safaricom", status: "active" },
    { name: "Equity", status: "active" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="border-2 border-primary/50 bg-gradient-to-br from-card to-navy shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              NeoCard™ System Monitor
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* System Status & Uptime */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <Card className="border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemStatus.map((sys, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <span className="text-sm text-foreground">{sys.name}</span>
                <Badge className="bg-success/20 text-success border-success/30">
                  {sys.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Server Uptime */}
        <Card className="border-2 border-success/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Server Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8">
              <div className="relative">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    className="drop-shadow-[0_0_8px_hsl(var(--primary))]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-primary">99.98%</div>
                  <div className="text-xs text-muted-foreground">OPERATIONAL</div>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              System stable – all nodes synced
            </div>
          </CardContent>
        </Card>

        {/* Auto-Incident Reporter */}
        <Card className="border-2 border-destructive/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Auto-Incident Reporter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/30">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-destructive font-semibold">2 warnings detected</span>
              </div>
            </div>
            
            <Button size="sm" className="w-full bg-destructive text-white hover:bg-destructive/90">
              View Root Cause Report
            </Button>

            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-foreground">Sponsors Affected</h5>
              <div className="space-y-1">
                {sponsors.map((sponsor, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3 text-destructive" />
                      <span className="text-foreground">{sponsor.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Log */}
      <Card className="border-border bg-card/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Error Log</CardTitle>
            <Button size="sm" variant="outline" className="border-primary">
              <Download className="h-3 w-3 mr-2" />
              Export Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {errorLog.map((log, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 min-w-[100px]">
                  {log.status === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                  <span className="text-xs text-muted-foreground">{log.time}</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-foreground">{log.message}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-semibold">AEI SENTINAL:</span> Monitoring system health • 18:20:59 Sync valid
              complete • 16:20:59 sync status conflictd • 14:20:59 Low block propagation delay
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 24h System Health */}
      <Card className="border-border bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg">24 h System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">CPU</div>
              <div className="h-16 bg-muted rounded-lg relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 200 60">
                  <path
                    d="M 0 30 L 20 25 L 40 35 L 60 20 L 80 30 L 100 25 L 120 35 L 140 28 L 160 32 L 180 26 L 200 30"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">API latency</div>
              <div className="h-16 bg-muted rounded-lg relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 200 60">
                  <path
                    d="M 0 35 L 20 30 L 40 32 L 60 28 L 80 35 L 100 30 L 120 33 L 140 31 L 160 34 L 180 29 L 200 32"
                    fill="none"
                    stroke="hsl(var(--teal))"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">Blockchain</div>
              <div className="h-16 bg-muted rounded-lg relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 200 60">
                  <path
                    d="M 0 28 L 20 32 L 40 26 L 60 30 L 80 28 L 100 33 L 120 27 L 140 31 L 160 29 L 180 33 L 200 28"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">Sync</div>
              <div className="h-16 bg-muted rounded-lg relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 200 60">
                  <path
                    d="M 0 32 L 20 28 L 40 34 L 60 27 L 80 31 L 100 28 L 120 35 L 140 30 L 160 33 L 180 28 L 200 31"
                    fill="none"
                    stroke="hsl(var(--success))"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <CheckCircle2 className="h-5 w-5 text-success mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">APL ok</div>
            </div>
            <div>
              <CheckCircle2 className="h-5 w-5 text-success mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">AEI Link active</div>
            </div>
            <div>
              <CheckCircle2 className="h-5 w-5 text-success mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">M-Pesa healthy</div>
            </div>
            <div>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Request Tech Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnostic Scan */}
      <Card className="border-primary/30 bg-card/50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="text-success font-semibold">Diagnostic Scan Sum:</span> AEI ok • API latency • API latency <span className="text-primary">•</span> AEI Link active • M-Pesa healthy
            </div>
            <Button size="sm" variant="outline" className="border-primary">
              ALL SYSTEMS OPERATIONAL
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitorTab;
