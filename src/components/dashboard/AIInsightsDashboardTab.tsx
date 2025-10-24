import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Eye, Download } from "lucide-react";

const SecurityLogsTab = () => {
  const threatLogs = [
    { time: "14:32:11", threat: "Suspicious login attempt", severity: "medium", location: "Kenya" },
    { time: "11:15:44", threat: "Unusual API request pattern", severity: "low", location: "USA" },
    { time: "09:44:22", threat: "Rate limit exceeded", severity: "medium", location: "Japan" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="border-2 border-destructive/50 bg-gradient-to-br from-card to-navy shadow-lg shadow-destructive/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="h-6 w-6 text-destructive" />
              Security Logs
            </CardTitle>
            <div className="flex gap-2">
              <Badge className="bg-success/20 text-success border-success/30">
                AI THREAT INTELLIGENCE ACTIVE
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Threats Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">23</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Blocked Attacks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">18</div>
            <p className="text-xs text-success mt-1">Auto-blocked</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">3</div>
            <p className="text-xs text-muted-foreground mt-1">Under investigation</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">94%</div>
            <p className="text-xs text-success mt-1">Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Threat Intelligence */}
      <Card className="border-2 border-primary/30 bg-card/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              AI Threat Intelligence Feed
            </CardTitle>
            <Badge className="bg-primary/20 text-primary border-primary/30">REAL-TIME</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {threatLogs.map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <AlertTriangle 
                      className={`h-4 w-4 ${
                        log.severity === "medium" ? "text-primary" : "text-muted-foreground"
                      }`} 
                    />
                    <span className="text-xs text-muted-foreground font-mono">{log.time}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-foreground">{log.threat}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${
                      log.severity === "medium" 
                        ? "border-primary text-primary" 
                        : "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {log.severity}
                  </Badge>
                  <span className="text-sm text-muted-foreground min-w-[80px]">{log.location}</span>
                </div>
                <Button size="sm" variant="ghost" className="ml-4">
                  Investigate
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Detection Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">AI Detection Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="text-sm font-semibold text-foreground">Brute Force Detection</div>
                  <div className="text-xs text-muted-foreground">Multiple failed login attempts</div>
                </div>
                <Badge className="bg-success/20 text-success border-success/30">ACTIVE</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="text-sm font-semibold text-foreground">DDoS Protection</div>
                  <div className="text-xs text-muted-foreground">Abnormal traffic patterns</div>
                </div>
                <Badge className="bg-success/20 text-success border-success/30">ACTIVE</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="text-sm font-semibold text-foreground">SQL Injection Scanner</div>
                  <div className="text-xs text-muted-foreground">Malicious query detection</div>
                </div>
                <Badge className="bg-success/20 text-success border-success/30">ACTIVE</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="text-sm font-semibold text-foreground">Anomaly Detection</div>
                  <div className="text-xs text-muted-foreground">Behavioral analysis</div>
                </div>
                <Badge className="bg-success/20 text-success border-success/30">ACTIVE</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-teal/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Recent Security Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-success mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-success">Threat Blocked</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Automated DDoS attack from 15 IPs blocked and added to blacklist
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">14:32 • Today</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-primary">Investigation Initiated</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Suspicious API access pattern detected from Tokyo region
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">11:15 • Today</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-foreground">Security Update</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Firewall rules updated with latest threat intelligence
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">09:44 • Today</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export & Actions */}
      <Card className="border-border bg-card/80">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="text-teal font-semibold">AI Security Status:</span> All threat detection systems operational • 0 critical alerts • Last scan: 2 minutes ago
            </div>
            <Button size="sm" variant="outline" className="border-primary">
              <Download className="h-3 w-3 mr-2" />
              Export Security Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityLogsTab;
