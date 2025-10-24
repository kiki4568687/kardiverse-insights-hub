import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Download, Play, AlertTriangle } from "lucide-react";

const ProofAuditTab = () => {
  const proofData = [
    { uid: "SP-00X23-KV", date: "20 Oct 2025", status: "100% Valid" },
    { uid: "SP-00X23-KV", date: "20 Oct 2025", status: "100% Valid" },
    { uid: "SP-00X23-KV", date: "20 Oct 2025", status: "100% Valid" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="border-2 border-teal/50 bg-gradient-to-br from-card to-navy shadow-lg shadow-teal/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="h-6 w-6 text-teal" />
              Proof & Audit Monitor
            </CardTitle>
            <div className="flex gap-2">
              <Badge className="bg-success/20 text-success border-success/30">
                AEI SENTINAL VERIFIED
              </Badge>
              <Button size="sm" variant="outline" className="border-destructive text-destructive">
                Upload Backside Ad
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NFC Card Preview */}
        <Card className="border-2 border-primary/50 bg-card/80">
          <CardContent className="pt-6">
            <div className="relative aspect-[1.6/1] rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/5 border-2 border-destructive/30 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Badge className="bg-success/20 text-success border-success/30 text-xs">AEI</Badge>
                <div className="text-xs text-muted-foreground">NFC</div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-destructive font-bold text-2xl">Safaricom</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                    📱
                  </div>
                  <span className="text-xs text-foreground">TAP TO VERIFY ON NEOCHAIN</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  POWERED BY MPESA, MASTERCARD LIQ.<br/>
                  PATENT PROTECTED
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="text-sm text-muted-foreground">12 Oct</div>
              <div className="w-full h-1 bg-muted rounded-full mt-2">
                <div className="h-full bg-gradient-to-r from-primary to-secondary w-[60%] rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proof Details */}
        <Card className="border-border bg-card/80 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Proof Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">+883</div>
                <div className="text-sm text-muted-foreground">VALID USD</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">ESCROW PROGRESS</div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-teal" />
                  <span className="text-sm font-semibold text-foreground">AEI HASH: ca537d...6cd8b4</span>
                </div>
              </div>
            </div>

            {/* AEI Sentinel Hash */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">AEI SENTINAL HASH VERI.</h4>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-teal" />
                  <span className="text-sm font-mono text-foreground">AEI ... c3tc37d ... 6cd8b4</span>
                </div>
              </div>
            </div>

            {/* Verified Scan Data */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                AI Fraud Detection - Verified Scan Data
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground">UID</th>
                      <th className="text-left py-2 text-muted-foreground">Date</th>
                      <th className="text-left py-2 text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proofData.map((item, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 font-mono text-xs text-foreground">{item.uid}</td>
                        <td className="py-2 text-muted-foreground">{item.date}</td>
                        <td className="py-2">
                          <Badge className="bg-success/20 text-success border-success/30 text-xs">
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Media Archive */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Media Archive</h4>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-primary/20 rounded-lg flex items-center justify-center mb-2">
                        <div className="grid grid-cols-2 gap-1">
                          {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="w-2 h-2 bg-foreground rounded-sm" />
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">20 Oct</div>
                      <div className="text-xs text-muted-foreground">19:37</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                <Play className="h-4 w-4 mr-2" />
                PLAY DRONESHOW PROOF
              </Button>
              <Button variant="outline" className="flex-1 border-primary">
                <Download className="h-4 w-4 mr-2" />
                EXPORT AUDIT PACKAGE
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Detection Summary */}
      <Card className="border-2 border-primary/30 bg-card/50">
        <CardContent className="py-4">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-teal" />
            <span className="text-teal font-semibold">AI Fraud Detection Active:</span>
            <span className="text-muted-foreground">
              No duplicate scans detected • GPS coordinates verified • All timestamps validated •
              0 anomalies in last 24 hours
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProofAuditTab;
