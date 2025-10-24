import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Download, Shield, AlertCircle } from "lucide-react";

const EscrowLedgerTab = () => {
  const transactions = [
    { amount: "€800", id: "254722...30", date: "22 Oct 2025", status: "verified" },
    { amount: "€460", id: "254705...15", date: "22 Oct 2025", status: "audit" },
    { amount: "€1,200", id: "254710...90", date: "21 Oct 2025", status: "audit" },
    { amount: "€340", id: "254704...12", date: "20 Oct 2025", status: "audit" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="border-2 border-primary/50 bg-gradient-to-br from-card to-navy shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              Escrow Payment Ledger
            </CardTitle>
            <div className="flex gap-2">
              <Badge className="bg-success/20 text-success border-success/30">LIVE RELEASE</Badge>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">€1,800</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary & Release Rule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Escrow Summary */}
        <Card className="border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Escrow Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">TOTAL</div>
                <div className="text-4xl font-bold text-primary">€150,000</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">RELEASED</div>
                <div className="text-3xl font-bold text-foreground">€13,600</div>
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground">9.1%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary via-teal to-secondary w-[9%]" />
                </div>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="h-32 bg-muted rounded-lg relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 100">
                <path
                  d="M 0 80 Q 50 70, 100 75 T 200 65 T 300 55 T 400 45"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  className="drop-shadow-[0_0_8px_hsl(var(--primary))]"
                />
                <path
                  d="M 0 80 Q 50 70, 100 75 T 200 65 T 300 55 T 400 45 L 400 100 L 0 100 Z"
                  fill="url(#gradient)"
                  opacity="0.2"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
                <span>16</span>
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
                <span>22</span>
                <span>23</span>
                <span>23</span>
                <span>23</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auto-Release Rule */}
        <Card className="border-2 border-teal/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-teal" />
              Auto-Release Rule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Release Policy</div>
                <div className="text-lg font-semibold text-foreground">
                  40% direct • 60% after proof
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" 
                  alt="Coca-Cola" 
                  className="w-12 h-12 object-contain invert"
                />
                <div className="text-destructive font-semibold">Coca-Cola</div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-destructive rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SF</span>
                </div>
                <div className="text-destructive font-semibold">Safaricom</div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">KFC</span>
                </div>
                <div className="text-foreground font-semibold">KFC</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* M-Pesa Transactions */}
      <Card className="border-border bg-card/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">M-PESA Transactions</CardTitle>
            <Badge className="bg-success/20 text-success border-success/30">
              AI Monitoring Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold text-primary">{tx.amount}</div>
                  <div className="font-mono text-sm text-muted-foreground">+{tx.id}</div>
                  <div className="text-sm text-muted-foreground">{tx.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  {tx.status === "verified" ? (
                    <>
                      <Badge className="bg-success/20 text-success border-success/30">
                        AEI Verified
                      </Badge>
                      <Button size="sm" variant="outline" className="border-teal text-teal">
                        View in Tab 4
                      </Button>
                    </>
                  ) : (
                    <>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        AEI Pending
                      </Badge>
                      <Button size="sm" variant="outline" className="border-primary text-primary">
                        Audit verific.
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blockchain & Export */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-primary/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-teal" />
              Blockchain Hash Record
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 font-mono text-sm text-muted-foreground truncate">
                25cd923f...924e21a
              </div>
              <Badge className="bg-success/20 text-success border-success/30 text-xs">
                NOC VERIFIED
              </Badge>
            </div>
            <div className="flex items-center justify-center p-8">
              <div className="w-24 h-24 rounded-full border-4 border-teal/30 flex items-center justify-center">
                <Shield className="h-12 w-12 text-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-sm">Export & Audit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Export Payment Report (PDF)
            </Button>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  AI monitors all transactions for irregular patterns, delayed payouts, and anomalies.
                  All escrow releases are blockchain-verified and audit-ready.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EscrowLedgerTab;
