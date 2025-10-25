import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  RefreshCw, 
  FileText, 
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
  Activity,
  Zap,
  Database,
  Link,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Circle,
  Check,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import jsPDF from 'jspdf';

const DataBridgeTab = () => {
  const [systemStatus, setSystemStatus] = useState([
    {
      system: "System A",
      status: "Active",
      interval: "5 min",
      statusType: "active"
    },
    {
      system: "System B",
      status: "Linked",
      interval: "10 min",
      statusType: "linked"
    },
    {
      system: "System C",
      status: "Pending",
      interval: "11:45",
      statusType: "pending"
    },
    {
      system: "System E",
      status: "Offline",
      interval: "10:27",
      statusType: "offline"
    },
    {
      system: "System E",
      status: "Offline",
      interval: "-",
      statusType: "offline"
    }
  ]);

  const [bridgeProgress, setBridgeProgress] = useState(94);
  const [latency, setLatency] = useState(62);
  const [packetLoss, setPacketLoss] = useState(0);
  const [aiForecast, setAiForecast] = useState({
    nextUpdate: 3,
    confidence: 97
  });
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [showLedgerDialog, setShowLedgerDialog] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed'>('idle');
  const [ledgerData, setLedgerData] = useState([
    { block: "#942", hash: "0x8fa3...78bd", timestamp: "2025-01-15 14:32:11", status: "Verified", txCount: 24 },
    { block: "#941", hash: "0x7ea2...56ac", timestamp: "2025-01-15 14:31:45", status: "Verified", txCount: 18 },
    { block: "#940", hash: "0x6db1...45bd", timestamp: "2025-01-15 14:31:22", status: "Verified", txCount: 31 },
    { block: "#939", hash: "0x5ca0...34ac", timestamp: "2025-01-15 14:30:58", status: "Verified", txCount: 27 },
    { block: "#938", hash: "0x4b9f...23bd", timestamp: "2025-01-15 14:30:35", status: "Verified", txCount: 22 }
  ]);

  // Real-time updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (!isLive) return;

      // Update bridge progress with small variations
      setBridgeProgress(prev => {
        const variation = (Math.random() - 0.5) * 4; // ±2%
        return Math.max(90, Math.min(100, Math.round(prev + variation)));
      });

      // Update latency with realistic variations
      setLatency(prev => {
        const variation = (Math.random() - 0.5) * 10; // ±5ms
        return Math.max(50, Math.min(80, Math.round(prev + variation)));
      });

      // Update packet loss (usually 0%)
      setPacketLoss(prev => {
        const variation = Math.random() < 0.1 ? Math.random() * 0.5 : 0; // 10% chance of small packet loss
        return Math.round(prev + variation);
      });

      // Update AI forecast
      setAiForecast(prev => {
        return {
          nextUpdate: Math.max(1, Math.min(5, prev.nextUpdate - 1)),
          confidence: Math.max(95, Math.min(99, Math.round(prev.confidence + (Math.random() - 0.5) * 2)))
        };
      });

      // Update system status with realistic changes
      setSystemStatus(prevStatus => {
        return prevStatus.map(system => {
          // Small chance to change status
          if (Math.random() < 0.05 && system.statusType !== "offline") {
            const statuses = ["Active", "Linked", "Pending"];
            const statusTypes = ["active", "linked", "pending"];
            const randomIndex = Math.floor(Math.random() * statuses.length);
            
            return {
              ...system,
              status: statuses[randomIndex],
              statusType: statusTypes[randomIndex]
            };
          }
          return system;
        });
      });

      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(updateInterval);
  }, [isLive]);

  const getStatusColor = (statusType: string) => {
    switch (statusType) {
      case "active": return "text-teal-400";
      case "linked": return "text-blue-400";
      case "pending": return "text-yellow-400";
      case "offline": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case "active": return <div className="w-3 h-3 bg-teal-400 rounded-full"></div>;
      case "linked": return <div className="w-3 h-3 bg-blue-400 rounded-full"></div>;
      case "pending": return <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>;
      case "offline": return <div className="w-3 h-3 bg-red-400 rounded-full"></div>;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
    }
  };

  const handleForceSync = () => {
    setShowSyncDialog(true);
    setSyncStatus('syncing');
    setSyncProgress(0);
    
    // Simulate sync progress
    const progressInterval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setSyncStatus('completed');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleOpenLedger = () => {
    setShowLedgerDialog(true);
  };

  const handleOpenLedgerEmpty = () => {
    setShowLedgerDialog(true);
  };

  const handleEmptyAction = () => {
    alert("This button is reserved for future functionality.");
  };

  return (
    <div className="space-y-6 min-h-screen p-6">
      {/* Header */}
          <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white neon-text">Tab 9 - Sponsor Data Bridge</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full icon-glow"></div>
              <span className="text-sm text-gray-400 text-glow">Bridge Online ✓ Live Sync with SYSTEM N & CRM Cloud</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"
            style={{
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.6), 0 0 16px rgba(139, 92, 246, 0.5), 0 0 24px rgba(59, 130, 246, 0.3)'
            }}
          >
            <span className="text-white font-bold text-base">K</span>
          </div>
          <span 
            className="font-bold text-base sm:text-lg neon-text"
            style={{
              color: 'hsl(195, 100%, 50%)',
              textShadow: '0 0 3px hsl(195, 100%, 60%), 0 0 6px hsl(195, 100%, 60%)'
            }}
          >
            KARDIVERSE
          </span>
        </div>
            </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - System Status */}
        <div className="space-y-6">
          {/* System Status Table */}
          <Card className="bg-card border-border card-glow border border-cyan-400/20">
            <CardHeader>
              <CardTitle className="text-white neon-text">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">System</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Interval</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {systemStatus.map((system, index) => (
                      <TableRow key={index} className="border-gray-700 hover:bg-gray-700/50 glow-on-hover">
                        <TableCell className="text-white font-medium text-glow">{system.system}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(system.statusType)}
                            <span className={`font-medium text-glow ${getStatusColor(system.statusType)}`}>
                              {system.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-400">{system.interval}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="bg-card border-border card-glow border border-purple-400/20">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-400 rounded-full icon-glow"></div>
                  <span className="text-sm text-white text-glow">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full icon-glow"></div>
                  <span className="text-sm text-white text-glow">Alert</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full icon-glow"></div>
                  <span className="text-sm text-white text-glow">Alert</span>
                </div>
                <div className="space-y-1 mt-4">
                  <span className="text-sm text-slate-300 text-glow">Pending</span>
                  <span className="text-sm text-slate-300 text-glow">Blockchain Linked</span>
                  <span className="text-sm text-slate-300 text-glow">Export All → Audit</span>
            </div>
          </div>
        </CardContent>
      </Card>
        </div>

        {/* Center Column - Data Bridge Diagram */}
        <div className="space-y-6">
          {/* Data Bridge Progress */}
          <Card className="bg-card border-border card-glow border border-blue-400/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.5))' }}>
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#374151"
                      strokeWidth="8"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#00ffff"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - bridgeProgress / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white neon-text">{bridgeProgress}%</span>
              </div>
            </div>
                <span className="text-sm text-cyan-400 uppercase tracking-wide text-glow">Data Bridge</span>
              </div>
          </CardContent>
        </Card>

          {/* System Nodes Diagram */}
          <Card className="bg-card border-border card-glow border border-green-400/20">
          <CardHeader>
              <CardTitle className="text-white neon-text">System Nodes</CardTitle>
          </CardHeader>
            <CardContent>
              <div className="h-80 relative">
                <svg className="w-full h-full" viewBox="0 0 300 400">
                  {/* Data Bridge Node - Center */}
                  <circle cx="150" cy="200" r="30" fill="#00ffff" stroke="#00ffff" strokeWidth="2" />
                  <text x="150" y="205" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">Data Bridge</text>
                  
                  {/* CRM Node - Top Left */}
                  <circle cx="80" cy="100" r="25" fill="#00ffff" stroke="#00ffff" strokeWidth="2" />
                  <text x="80" y="105" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">CRM</text>
                  
                  {/* SYSTEM N Node - Top Right */}
                  <circle cx="220" cy="100" r="25" fill="#00ffff" stroke="#00ffff" strokeWidth="2" />
                  <text x="220" y="105" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">SYSTEM N</text>
                  
                  {/* DASHBOARD Node - Bottom */}
                  <circle cx="150" cy="320" r="25" fill="#00ffff" stroke="#00ffff" strokeWidth="2" />
                  <text x="150" y="325" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">DASHBOARD</text>
                  
                  {/* Connections */}
                  <line x1="95" y1="120" x2="135" y2="180" stroke="#00ffff" strokeWidth="3" />
                  <line x1="205" y1="120" x2="165" y2="180" stroke="#00ffff" strokeWidth="3" />
                  <line x1="150" y1="230" x2="150" y2="295" stroke="#ef4444" strokeWidth="3" />
                  <line x1="95" y1="125" x2="205" y2="125" stroke="#00ffff" strokeWidth="3" />
                </svg>
              </div>
          </CardContent>
        </Card>

          {/* Performance Metrics */}
          <Card className="bg-card border-border card-glow border border-orange-400/20">
            <CardContent className="p-4">
              <div className="space-y-2">
              <div className="flex justify-between">
                  <span className="text-sm text-slate-300 text-glow">Latency</span>
                  <span className="text-sm text-white font-medium text-glow">{latency} ms</span>
              </div>
              <div className="flex justify-between">
                  <span className="text-sm text-slate-300 text-glow">Packet Loss</span>
                  <span className="text-sm text-white font-medium text-glow">{packetLoss}%</span>
                </div>
              </div>
          </CardContent>
        </Card>
      </div>

        {/* Right Column - Accuracy & Actions */}
        <div className="space-y-6">
          {/* Accuracy Box */}
          <Card className="bg-card border-border card-glow border border-red-400/20">
          <CardHeader>
              <CardTitle className="text-white neon-text">Accuracy & Actions</CardTitle>
          </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-300 text-glow">0x8fa3...78bd</div>
                <div className="text-sm text-gray-300 text-glow">Validated on Ledger #942</div>
                <div className="text-sm text-green-400 text-glow">Checksum OK</div>
              </div>
          </CardContent>
        </Card>

          {/* AI Forecast Box */}
          <Card className="bg-card border-border card-glow border border-yellow-400/20">
          <CardHeader>
              <CardTitle className="text-white neon-text">AI Forecast</CardTitle>
          </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-300 text-glow">Next Update in {aiForecast.nextUpdate} min</div>
                <div className="text-sm text-green-400 text-glow">Confidence {aiForecast.confidence}%</div>
            </div>
          </CardContent>
        </Card>

          {/* Action Buttons */}
          <Card className="bg-card border-border card-glow border border-cyan-400/20">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={handleForceSync}
                  className="aspect-square bg-cyan-600 hover:bg-cyan-700 text-white button-glow glow-on-hover"
                >
                  <RefreshCw className="h-4 w-4 icon-glow" />
                </Button>
                <Button
                  onClick={handleOpenLedgerEmpty}
                  className="aspect-square bg-green-600 hover:bg-green-700 text-white button-glow glow-on-hover"
                >
                  <FileText className="h-4 w-4 icon-glow" />
                </Button>
                <Button
                  onClick={handleEmptyAction}
                  className="aspect-square bg-gray-600 hover:bg-gray-700 text-white button-glow glow-on-hover"
                >
                  <Circle className="h-4 w-4 icon-glow" />
                </Button>
              </div>
              <div className="mt-3 text-center">
                <div className="text-xs text-gray-400 text-glow">Force Sync</div>
                <div className="text-xs text-gray-400 text-glow">Open Ledger</div>
                <div className="text-xs text-gray-400"></div>
            </div>
          </CardContent>
        </Card>

          {/* Alert Message */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 card-glow glow-on-hover">
            <div className="text-red-400 text-sm text-glow">SYSTEM E Offline - Auto retry in 2 min</div>
          </div>
        </div>
      </div>

      {/* Force Sync Dialog */}
      <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
        <DialogContent className="bg-card border-border text-white max-w-2xl border border-cyan-400/30 card-glow">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white neon-text flex items-center gap-2">
              <RefreshCw className={`h-6 w-6 text-cyan-400 icon-glow ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              Force Data Synchronization
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {/* Sync Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300 text-glow">Sync Progress</span>
                <span className="text-sm font-bold text-cyan-400 neon-text">{syncProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300 card-glow"
                  style={{ width: `${syncProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Sync Status */}
            <Card className="bg-card border-border card-glow border border-green-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemStatus.map((system, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded glow-on-hover">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full icon-glow ${
                          syncProgress > (index + 1) * 20 ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'
                        }`}></div>
                        <span className="text-sm text-white text-glow">{system.system}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {syncProgress > (index + 1) * 20 ? (
                          <>
                            <Check className="h-4 w-4 text-green-400" />
                            <span className="text-xs text-green-400">Synced</span>
                          </>
                        ) : syncProgress >= index * 20 ? (
                          <>
                            <RefreshCw className="h-4 w-4 text-cyan-400 animate-spin" />
                            <span className="text-xs text-cyan-400">Syncing...</span>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400">Waiting...</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sync Details */}
            {syncStatus === 'completed' && (
              <Card className="bg-green-900/20 border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <div>
                      <div className="text-sm font-bold text-green-400">Synchronization Complete!</div>
                      <div className="text-xs text-gray-300 mt-1">All systems are now in sync with the data bridge.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {syncStatus === 'completed' ? (
                <Button
                  onClick={() => {
                    setShowSyncDialog(false);
                    setSyncStatus('idle');
                    setSyncProgress(0);
                  }}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white button-glow glow-on-hover"
                >
                  Close
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowSyncDialog(false);
                    setSyncStatus('idle');
                    setSyncProgress(0);
                  }}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 glow-on-hover"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ledger Viewer Dialog */}
      <Dialog open={showLedgerDialog} onOpenChange={setShowLedgerDialog}>
        <DialogContent className="bg-card border-border text-white max-w-4xl max-h-[80vh] overflow-y-auto border border-green-400/30 card-glow">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white neon-text flex items-center gap-2">
              <FileText className="h-6 w-6 text-green-400 icon-glow" />
              Blockchain Ledger Viewer
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {/* Ledger Summary */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-card border-border card-glow border border-cyan-400/20">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-400 text-glow">Total Blocks</div>
                  <div className="text-2xl font-bold text-cyan-400 neon-text">942</div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border card-glow border border-green-400/20">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-400 text-glow">Validated</div>
                  <div className="text-2xl font-bold text-green-400 neon-text">100%</div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border card-glow border border-blue-400/20">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-400 text-glow">Latest Block</div>
                  <div className="text-2xl font-bold text-white neon-text">#942</div>
                </CardContent>
              </Card>
            </div>

            {/* Ledger Table */}
            <Card className="bg-card border-border card-glow border border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text">Recent Blockchain Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Block</TableHead>
                        <TableHead className="text-gray-300">Hash</TableHead>
                        <TableHead className="text-gray-300">Timestamp</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Transactions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ledgerData.map((entry, index) => (
                        <TableRow key={index} className="border-gray-700 hover:bg-muted/50">
                          <TableCell className="text-cyan-400 font-mono">{entry.block}</TableCell>
                          <TableCell className="text-gray-300 font-mono text-sm">{entry.hash}</TableCell>
                          <TableCell className="text-gray-400 text-sm">{entry.timestamp}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span className="text-green-400 text-sm">{entry.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-white">{entry.txCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Ledger Details */}
            <Card className="bg-card border-border card-glow">
              <CardHeader>
                <CardTitle className="text-lg text-white">Current Ledger: #942</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-400">Block Hash</div>
                    <div className="text-sm text-cyan-400 font-mono">0x8fa3...78bd</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Previous Hash</div>
                    <div className="text-sm text-gray-300 font-mono">0x7ea2...56ac</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Checksum</div>
                    <div className="text-sm text-green-400 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      OK
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Validation</div>
                    <div className="text-sm text-green-400">Verified on Chain</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowLedgerDialog(false)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  alert("Exporting ledger data... This will download a complete ledger report in PDF format.");
                }}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataBridgeTab;
