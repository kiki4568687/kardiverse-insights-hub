import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  Server,
  RefreshCw,
  Search,
  ArrowDown,
  Layers,
  Zap,
  AlertTriangle,
  BarChart3,
  X,
  Settings,
  ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";
import jsPDF from 'jspdf';

const SystemMonitorTab = () => {
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [showModuleControls, setShowModuleControls] = useState(false);
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(false);
  const [showModuleLayers, setShowModuleLayers] = useState(false);
  const [buttonStates, setButtonStates] = useState<{[key: string]: 'idle' | 'loading' | 'success'}>({});
  
  const [systemModules, setSystemModules] = useState([
    {
      module: "API Server",
      status: "Online",
      statusType: "online",
      uptime: "99.97%",
      responseTime: "18 Oct 12:10"
    },
    {
      module: "Dashboard Backend",
      status: "Lag Detected",
      statusType: "lag",
      uptime: "98.4%",
      responseTime: "18 Oct 12:08"
    },
    {
      module: "License Server",
      status: "Online",
      statusType: "online",
      uptime: "100%",
      responseTime: "18 Oct 12:11"
    },
    {
      module: "Database Cluster",
      status: "Oizure",
      statusType: "warning",
      uptime: "95%",
      responseTime: "18 Oct 12:09"
    },
    {
      module: "CDN / Cache",
      status: "Down",
      statusType: "down",
      uptime: "13.07",
      responseTime: "18 Oct 12:07"
    }
  ]);

  const [incidentFeed, setIncidentFeed] = useState([
    { id: 1, message: "12 CDN timeout", severity: "medium" },
    { id: 2, message: "113 API retry spike", severity: "high" },
    { id: 3, message: "142 Cache flush success", severity: "low" }
  ]);

  const [aiPrediction, setAiPrediction] = useState({
    message: "System load expected to normalize within 4 minutes (94% confidence)",
    confidence: 94,
    timeRemaining: 4
  });

  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Real-time updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (!isLive) return;

      // Update system modules with realistic variations
      setSystemModules(prevModules => {
        return prevModules.map(module => {
          // Random chance to update status (3% chance every 2 seconds)
          if (Math.random() < 0.03) {
            const statuses = ["Online", "Lag Detected", "Oizure", "Down"];
            const statusTypes = ["online", "lag", "warning", "down"];
            const randomIndex = Math.floor(Math.random() * statuses.length);
            
            return {
              ...module,
              status: statuses[randomIndex],
              statusType: statusTypes[randomIndex],
              responseTime: new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })
            };
          }
          return module;
        });
      });

      // Update incident feed
      setIncidentFeed(prevIncidents => {
        // Random chance to add new incident (2% chance every 3 seconds)
        if (Math.random() < 0.02) {
          const messages = [
            "API response time spike",
            "Database connection timeout",
            "Cache miss rate increase",
            "Memory usage threshold exceeded",
            "Network latency detected"
          ];
          const severities = ["low", "medium", "high"];
          const newIncident = {
            id: Date.now(),
            message: messages[Math.floor(Math.random() * messages.length)],
            severity: severities[Math.floor(Math.random() * severities.length)]
          };
          return [newIncident, ...prevIncidents.slice(0, 2)]; // Keep only latest 3
        }
        return prevIncidents;
      });

      // Update AI prediction
      setAiPrediction(prevPrediction => {
        const newTimeRemaining = Math.max(1, prevPrediction.timeRemaining - 1);
        const newConfidence = Math.max(85, prevPrediction.confidence + (Math.random() - 0.5) * 2);
        
        return {
          ...prevPrediction,
          timeRemaining: newTimeRemaining,
          confidence: Math.round(newConfidence),
          message: `System load expected to normalize within ${newTimeRemaining} minutes (${Math.round(newConfidence)}% confidence)`
        };
      });

      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(updateInterval);
  }, [isLive]);

  const getStatusColor = (statusType: string) => {
    switch (statusType) {
      case "online": return "text-green-400";
      case "lag": return "text-yellow-400";
      case "warning": return "text-orange-400";
      case "down": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "high": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const handleRunDiagnostics = () => {
    setShowDiagnostics(true);
  };

  const handleOpenModuleControls = () => {
    setShowModuleControls(true);
  };

  const handleArrowDown = () => {
    setShowPerformanceMetrics(true);
  };

  const handleLayers = () => {
    setShowModuleLayers(true);
  };

  const handleRestartModule = (module: any, index: number) => {
    const buttonKey = `restart-${index}`;
    
    // Set loading state
    setButtonStates(prev => ({ ...prev, [buttonKey]: 'loading' }));

    // Simulate restart process
    setTimeout(() => {
      // Update module status
      setSystemModules(prevModules => {
        const newModules = [...prevModules];
        newModules[index] = {
          ...newModules[index],
          status: "Online",
          statusType: "online",
          uptime: "100%",
          responseTime: new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        return newModules;
      });

      // Add to incident feed
      setIncidentFeed(prevIncidents => {
        const newIncident = {
          id: Date.now(),
          message: `${module.module} restarted successfully`,
          severity: "low"
        };
        return [newIncident, ...prevIncidents.slice(0, 2)];
      });

      // Set success state briefly, then reset
      setButtonStates(prev => ({ ...prev, [buttonKey]: 'success' }));
      setTimeout(() => {
        setButtonStates(prev => ({ ...prev, [buttonKey]: 'idle' }));
      }, 1000);

      alert(`${module.module} restarted successfully!`);
    }, 2000);
  };

  const handleStopModule = (module: any, index: number) => {
    const buttonKey = `stop-${index}`;
    
    // Set loading state
    setButtonStates(prev => ({ ...prev, [buttonKey]: 'loading' }));

    // Simulate stop process
    setTimeout(() => {
      // Update module status
      setSystemModules(prevModules => {
        const newModules = [...prevModules];
        newModules[index] = {
          ...newModules[index],
          status: "Stopped",
          statusType: "down",
          uptime: "0%",
          responseTime: new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        return newModules;
      });

      // Add to incident feed
      setIncidentFeed(prevIncidents => {
        const newIncident = {
          id: Date.now(),
          message: `${module.module} stopped by user`,
          severity: "high"
        };
        return [newIncident, ...prevIncidents.slice(0, 2)];
      });

      // Set success state briefly, then reset
      setButtonStates(prev => ({ ...prev, [buttonKey]: 'success' }));
      setTimeout(() => {
        setButtonStates(prev => ({ ...prev, [buttonKey]: 'idle' }));
      }, 1000);

      alert(`${module.module} stopped successfully!`);
    }, 1500);
  };

  const handleConfigureModule = (module: any, index: number) => {
    const buttonKey = `config-${index}`;
    
    // Set loading state
    setButtonStates(prev => ({ ...prev, [buttonKey]: 'loading' }));

    // Show configuration dialog
    const configOptions = [
      "CPU Allocation",
      "Memory Limit", 
      "Network Bandwidth",
      "Log Level",
      "Health Check Interval",
      "Auto-restart Policy"
    ];

    const currentConfig = {
      "CPU Allocation": "2 cores",
      "Memory Limit": "4GB",
      "Network Bandwidth": "1Gbps",
      "Log Level": "INFO",
      "Health Check Interval": "30s",
      "Auto-restart Policy": "Enabled"
    };

    let configMessage = `Configuration for ${module.module}:\n\n`;
    configOptions.forEach(option => {
      configMessage += `${option}: ${currentConfig[option as keyof typeof currentConfig]}\n`;
    });
    configMessage += `\nWould you like to modify these settings?`;

    setTimeout(() => {
      if (confirm(configMessage)) {
        // Simulate configuration update
        setTimeout(() => {
          setIncidentFeed(prevIncidents => {
            const newIncident = {
              id: Date.now(),
              message: `${module.module} configuration updated`,
              severity: "low"
            };
            return [newIncident, ...prevIncidents.slice(0, 2)];
          });

          // Set success state briefly, then reset
          setButtonStates(prev => ({ ...prev, [buttonKey]: 'success' }));
          setTimeout(() => {
            setButtonStates(prev => ({ ...prev, [buttonKey]: 'idle' }));
          }, 1000);

          alert(`${module.module} configuration updated successfully!`);
        }, 1000);
      } else {
        // Reset button if cancelled
        setButtonStates(prev => ({ ...prev, [buttonKey]: 'idle' }));
      }
    }, 500);
  };

  const handleRestartAllModules = () => {
    if (confirm("Are you sure you want to restart ALL modules? This will cause temporary service interruption.")) {
      // Set loading state for all restart buttons
      const newButtonStates: {[key: string]: 'loading'} = {};
      systemModules.forEach((_, index) => {
        newButtonStates[`restart-${index}`] = 'loading';
      });
      setButtonStates(prev => ({ ...prev, ...newButtonStates }));

      // Simulate restart all process
      setTimeout(() => {
        // Update all modules to online
        setSystemModules(prevModules => {
          return prevModules.map(module => ({
            ...module,
            status: "Online",
            statusType: "online",
            uptime: "100%",
            responseTime: new Date().toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })
          }));
        });

        // Add to incident feed
        setIncidentFeed(prevIncidents => {
          const newIncident = {
            id: Date.now(),
            message: "All modules restarted successfully",
            severity: "low"
          };
          return [newIncident, ...prevIncidents.slice(0, 2)];
        });

        // Set success state for all buttons, then reset
        const successButtonStates: {[key: string]: 'success'} = {};
        systemModules.forEach((_, index) => {
          successButtonStates[`restart-${index}`] = 'success';
        });
        setButtonStates(prev => ({ ...prev, ...successButtonStates }));
        
        setTimeout(() => {
          const idleButtonStates: {[key: string]: 'idle'} = {};
          systemModules.forEach((_, index) => {
            idleButtonStates[`restart-${index}`] = 'idle';
          });
          setButtonStates(prev => ({ ...prev, ...idleButtonStates }));
        }, 1000);

        alert("All modules restarted successfully!");
      }, 3000);
    }
  };

  const handleExportLogs = async () => {
    try {
      const pdf = new jsPDF();
      
      // Header
      pdf.setFontSize(20);
      pdf.text('KARDIVERSE SYSTEM LOGS', 20, 30);
      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 40);
      pdf.text('System Status & Troubleshooting Report', 20, 50);
      
      // Draw line separator
      pdf.setDrawColor(0, 0, 0);
      pdf.line(20, 55, 190, 55);
      
      // System Status Section
      pdf.setFontSize(16);
      pdf.text('SYSTEM STATUS', 20, 70);
      
      pdf.setFontSize(12);
      let yPos = 80;
      const lineHeight = 8;
      
      systemModules.forEach((module, index) => {
        pdf.text(`${module.module}: ${module.status}`, 20, yPos);
        pdf.text(`  Uptime: ${module.uptime}`, 20, yPos + lineHeight);
        pdf.text(`  Response Time: ${module.responseTime}`, 20, yPos + lineHeight * 2);
        yPos += lineHeight * 4;
      });
      
      // Incident Feed Section
      yPos += 10;
      pdf.setFontSize(16);
      pdf.text('INCIDENT FEED', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      
      incidentFeed.forEach((incident, index) => {
        pdf.text(`${incident.message} (${incident.severity})`, 20, yPos);
        yPos += lineHeight;
      });
      
      // AI Prediction Section
      yPos += 15;
      pdf.setFontSize(16);
      pdf.text('AI PREDICTION', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      pdf.text(aiPrediction.message, 20, yPos);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('This document is digitally signed and verified by Kardiverse Blockchain System', 20, 280);
      pdf.text('For verification, contact support or visit the verification portal', 20, 285);
      
      // Save the PDF
      const fileName = `system-logs-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      alert(`System logs exported successfully as ${fileName}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleNOCDashboard = () => {
    alert("Redirecting to NOC Dashboard...");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 min-h-screen p-6 bg-card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white neon-text">Tab 6 - System Status & Troubleshooting</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse icon-glow"></div>
          <span className="text-sm text-green-400 font-medium text-glow">Live Uptime Feed - NOC verified ✓</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - System Status Table */}
        <Card className="bg-card border-border card-glow border border-cyan-400/20">
          <CardHeader>
            <CardTitle className="text-xl text-white neon-text">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Module</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Uptime</TableHead>
                    <TableHead className="text-slate-300">Response (ms)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemModules.map((module, index) => (
                    <TableRow key={index} className="border-slate-700 hover:bg-slate-700/50 glow-on-hover">
                      <TableCell className="text-white font-medium text-glow">{module.module}</TableCell>
                      <TableCell>
                        <span className={`font-medium text-glow ${getStatusColor(module.statusType)}`}>
                          {module.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-white text-glow">{module.uptime}</TableCell>
                      <TableCell className="text-white">{module.responseTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Performance Feed */}
        <Card className="bg-card border-border card-glow border border-purple-400/20">
          <CardHeader>
            <CardTitle className="text-xl text-white neon-text">Performance Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Incident Feed */}
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-3 text-glow">Incident Feed</h4>
              <div className="space-y-2">
                {incidentFeed.map((incident, index) => (
                  <div key={incident.id} className="flex items-center gap-2 p-2 bg-slate-700/50 rounded text-xs glow-on-hover card-glow">
                    <div className={`w-2 h-2 rounded-full icon-glow ${
                      incident.severity === 'high' ? 'bg-red-400' :
                      incident.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <span className={`text-glow ${getSeverityColor(incident.severity)}`}>
                      {incident.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRunDiagnostics}
                className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 button-glow glow-on-hover"
              >
                <Search className="h-4 w-4 mr-2 icon-glow" />
                Run Diagnostics
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleArrowDown}
                className="border-slate-400 text-slate-400 hover:bg-slate-400/10 glow-on-hover"
              >
                <ArrowDown className="h-4 w-4 icon-glow" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLayers}
                className="border-slate-400 text-slate-400 hover:bg-slate-400/10 glow-on-hover"
              >
                <Layers className="h-4 w-4 icon-glow" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenModuleControls}
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 button-glow glow-on-hover"
              >
                <RefreshCw className="h-4 w-4 mr-2 icon-glow" />
                Restart Module
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Graph - Line Chart */}
        <Card className="bg-card border-border card-glow border border-green-400/20">
          <CardHeader>
            <CardTitle className="text-xl text-white neon-text">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-t from-slate-700/20 to-transparent rounded-lg p-4 relative">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid-performance" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-performance)" />

                {/* Y-axis labels */}
                <text x="5" y="25" fontSize="10" fill="currentColor" opacity="0.6">600</text>
                <text x="5" y="65" fontSize="10" fill="currentColor" opacity="0.6">400</text>
                <text x="5" y="105" fontSize="10" fill="currentColor" opacity="0.6">200</text>
                <text x="5" y="145" fontSize="10" fill="currentColor" opacity="0.6">100</text>
                <text x="5" y="185" fontSize="10" fill="currentColor" opacity="0.6">0</text>

                {/* Normal line (green) - following mockup pattern */}
                <path
                  d="M 40,180 L 60,170 L 80,160 L 100,150 L 120,140 L 140,130 L 160,120 L 180,110 L 200,100 L 220,90 L 240,80 L 260,70 L 280,60 L 300,50 L 320,40 L 340,30 L 360,20 L 380,10 L 400,0"
                  stroke="#10b981"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Lag line (orange) - following mockup pattern */}
                <path
                  d="M 40,190 L 60,185 L 80,180 L 100,175 L 120,170 L 140,165 L 160,160 L 180,155 L 200,150 L 220,145 L 240,140 L 260,135 L 280,130 L 300,125 L 320,120 L 340,115 L 360,110 L 380,105 L 400,100"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data points for green line */}
                <circle cx="40" cy="180" r="4" fill="#10b981" />
                <circle cx="100" cy="150" r="4" fill="#10b981" />
                <circle cx="160" cy="120" r="4" fill="#10b981" />
                <circle cx="220" cy="90" r="4" fill="#10b981" />
                <circle cx="280" cy="60" r="4" fill="#10b981" />
                <circle cx="340" cy="30" r="4" fill="#10b981" />
                <circle cx="400" cy="0" r="4" fill="#10b981" />

                {/* Data points for orange line */}
                <circle cx="40" cy="190" r="4" fill="#f59e0b" />
                <circle cx="100" cy="175" r="4" fill="#f59e0b" />
                <circle cx="160" cy="160" r="4" fill="#f59e0b" />
                <circle cx="220" cy="145" r="4" fill="#f59e0b" />
                <circle cx="280" cy="130" r="4" fill="#f59e0b" />
                <circle cx="340" cy="115" r="4" fill="#f59e0b" />
                <circle cx="400" cy="100" r="4" fill="#f59e0b" />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Right Graph - Bar Chart */}
        <Card className="bg-card border-border card-glow border border-blue-400/20">
          <CardHeader>
            <CardTitle className="text-xl text-white neon-text">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-t from-slate-700/20 to-transparent rounded-lg p-4 relative">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid-bars" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-bars)" />

                {/* Y-axis labels */}
                <text x="5" y="25" fontSize="10" fill="currentColor" opacity="0.6">300</text>
                <text x="5" y="65" fontSize="10" fill="currentColor" opacity="0.6">200</text>
                <text x="5" y="105" fontSize="10" fill="currentColor" opacity="0.6">100</text>
                <text x="5" y="185" fontSize="10" fill="currentColor" opacity="0.6">0</text>

                {/* Bar chart - following mockup pattern with varied heights */}
                {[
                  { x: 50, height: 120, color: "#10b981" },
                  { x: 80, height: 140, color: "#10b981" },
                  { x: 110, height: 100, color: "#10b981" },
                  { x: 140, height: 160, color: "#10b981" },
                  { x: 170, height: 130, color: "#10b981" },
                  { x: 200, height: 180, color: "#10b981" },
                  { x: 230, height: 150, color: "#10b981" },
                  { x: 260, height: 200, color: "#10b981" },
                  { x: 290, height: 170, color: "#10b981" },
                  { x: 320, height: 220, color: "#10b981" },
                  { x: 350, height: 190, color: "#10b981" },
                  { x: 380, height: 240, color: "#10b981" }
                ].map((bar, index) => (
                  <rect
                    key={index}
                    x={bar.x}
                    y={200 - bar.height}
                    width="20"
                    height={bar.height}
                    fill={bar.color}
                    className={isLive ? "animate-pulse" : ""}
                    rx="2"
                  />
                ))}

                {/* Bar chart labels */}
                <text x="60" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">1</text>
                <text x="90" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">2</text>
                <text x="120" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">3</text>
                <text x="150" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">4</text>
                <text x="180" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">5</text>
                <text x="210" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">6</text>
                <text x="240" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">7</text>
                <text x="270" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">8</text>
                <text x="300" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">9</text>
                <text x="330" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">10</text>
                <text x="360" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">11</text>
                <text x="390" y="195" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">12</text>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Prediction */}
      <Card className="bg-card border-border border-2 border-cyan-400/30 shadow-lg shadow-blue-400/20 card-glow">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center neon-glow">
              <Zap className="w-4 h-4 text-cyan-400 icon-glow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white neon-text">AI Prediction</h3>
              <p className="text-sm text-cyan-300 text-glow">{aiPrediction.message}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full icon-glow"></div>
          <span className="text-sm text-white text-glow">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full icon-glow"></div>
          <span className="text-sm text-white text-glow">Lag</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full icon-glow"></div>
          <span className="text-sm text-white text-glow">Incident</span>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleExportLogs}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors glow-on-hover"
        >
          <Download className="h-4 w-4 icon-glow" />
          <span className="text-glow">Export Logs</span>
        </button>
        
        <button
          onClick={handleNOCDashboard}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors glow-on-hover"
        >
          <Server className="h-4 w-4 icon-glow" />
          <span className="text-glow">NOC Dashboard</span>
        </button>
      </div>

      {/* Diagnostics Dialog */}
      <Dialog open={showDiagnostics} onOpenChange={setShowDiagnostics}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Search className="h-5 w-5" />
              System Diagnostics Report
            </DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Generated: {new Date().toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>System Health Check</span>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* System Health Overview */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-card border-border card-glow border border-green-400/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-slate-300">Healthy Modules</span>
                  </div>
                  <div className="text-2xl font-bold text-white neon-text">3/5</div>
                  <div className="text-xs text-green-400">60% operational</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border card-glow border border-yellow-400/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-slate-300">Issues Detected</span>
                  </div>
                  <div className="text-2xl font-bold text-white neon-text">2</div>
                  <div className="text-xs text-yellow-400">Requires attention</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border card-glow border border-cyan-400/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-slate-300">Avg Response Time</span>
                  </div>
                  <div className="text-2xl font-bold text-white neon-text">45ms</div>
                  <div className="text-xs text-cyan-400">Within acceptable range</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Diagnostics */}
            <Card className="bg-card border-border card-glow border border-slate-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text">Detailed Diagnostics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemModules.map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded glow-on-hover">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full icon-glow ${
                          module.statusType === 'online' ? 'bg-green-400' :
                          module.statusType === 'lag' ? 'bg-yellow-400' :
                          module.statusType === 'warning' ? 'bg-orange-400' : 'bg-red-400'
                        }`}></div>
                        <span className="font-medium text-white neon-text">{module.module}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`text-glow ${getStatusColor(module.statusType)}`}>
                          {module.status}
                        </span>
                        <span className="text-slate-300">Uptime: {module.uptime}</span>
                        <span className="text-slate-300">Response: {module.responseTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-card border-border card-glow border border-yellow-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-yellow-500/10 rounded glow-on-hover">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-yellow-400">Dashboard Backend: Consider scaling resources</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded glow-on-hover">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-red-400">CDN / Cache: Immediate attention required</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded glow-on-hover">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-400">API Server: Performance optimal</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDiagnostics(false)}
                className="flex-1 border-slate-400 text-slate-400 hover:bg-slate-400/10 glow-on-hover"
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
              <Button
                variant="outline"
                onClick={handleExportLogs}
                className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 button-glow glow-on-hover"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Diagnostics
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Module Controls Dialog */}
      <Dialog open={showModuleControls} onOpenChange={setShowModuleControls}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <RefreshCw className="h-5 w-5" />
              Module Control Center
            </DialogTitle>
            <div className="text-sm text-muted-foreground">
              Restart, stop, or configure system modules
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            {systemModules.map((module, index) => (
              <Card key={index} className="bg-card border-border card-glow border border-cyan-400/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full icon-glow ${
                        module.statusType === 'online' ? 'bg-green-400' :
                        module.statusType === 'lag' ? 'bg-yellow-400' :
                        module.statusType === 'warning' ? 'bg-orange-400' : 'bg-red-400'
                      }`}></div>
                      <div>
                        <div className="font-medium text-white neon-text">{module.module}</div>
                        <div className={`text-sm text-glow ${getStatusColor(module.statusType)}`}>
                          {module.status}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestartModule(module, index)}
                        disabled={buttonStates[`restart-${index}`] === 'loading'}
                        className={`border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 button-glow glow-on-hover ${
                          buttonStates[`restart-${index}`] === 'success' ? 'bg-green-500/20 border-green-400' : ''
                        }`}
                      >
                        <RefreshCw className={`h-4 w-4 mr-1 icon-glow ${
                          buttonStates[`restart-${index}`] === 'loading' ? 'animate-spin' : ''
                        }`} />
                        {buttonStates[`restart-${index}`] === 'loading' ? 'Restarting...' : 
                         buttonStates[`restart-${index}`] === 'success' ? 'Success!' : 'Restart'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStopModule(module, index)}
                        disabled={buttonStates[`stop-${index}`] === 'loading'}
                        className={`border-red-400 text-red-400 hover:bg-red-400/10 button-glow glow-on-hover ${
                          buttonStates[`stop-${index}`] === 'success' ? 'bg-green-500/20 border-green-400' : ''
                        }`}
                      >
                        <X className={`h-4 w-4 mr-1 icon-glow ${
                          buttonStates[`stop-${index}`] === 'loading' ? 'animate-spin' : ''
                        }`} />
                        {buttonStates[`stop-${index}`] === 'loading' ? 'Stopping...' : 
                         buttonStates[`stop-${index}`] === 'success' ? 'Success!' : 'Stop'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfigureModule(module, index)}
                        disabled={buttonStates[`config-${index}`] === 'loading'}
                        className={`border-slate-400 text-slate-400 hover:bg-slate-400/10 button-glow glow-on-hover ${
                          buttonStates[`config-${index}`] === 'success' ? 'bg-green-500/20 border-green-400' : ''
                        }`}
                      >
                        <Settings className={`h-4 w-4 mr-1 icon-glow ${
                          buttonStates[`config-${index}`] === 'loading' ? 'animate-spin' : ''
                        }`} />
                        {buttonStates[`config-${index}`] === 'loading' ? 'Configuring...' : 
                         buttonStates[`config-${index}`] === 'success' ? 'Success!' : 'Config'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowModuleControls(false)}
                className="flex-1 border-slate-400 text-slate-400 hover:bg-slate-400/10 glow-on-hover"
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
              <Button
                variant="outline"
                onClick={handleRestartAllModules}
                className="flex-1 border-orange-400 text-orange-400 hover:bg-orange-400/10 button-glow glow-on-hover"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Restart All
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Performance Metrics Dialog */}
      <Dialog open={showPerformanceMetrics} onOpenChange={setShowPerformanceMetrics}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="h-5 w-5" />
              Performance Metrics
            </DialogTitle>
            <div className="text-sm text-muted-foreground">
              Detailed performance analysis and metrics
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Performance Summary */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-card border-border card-glow border border-green-400/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 neon-text">98.5%</div>
                  <div className="text-sm text-slate-300">Overall Uptime</div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border card-glow border border-cyan-400/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400 neon-text">45ms</div>
                  <div className="text-sm text-slate-300">Avg Response</div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border card-glow border border-yellow-400/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400 neon-text">2</div>
                  <div className="text-sm text-slate-300">Active Issues</div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border card-glow border border-purple-400/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 neon-text">156</div>
                  <div className="text-sm text-slate-300">Requests/min</div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Trends */}
            <Card className="bg-card border-border card-glow border border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text">Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded glow-on-hover">
                    <span className="text-white neon-text">CPU Usage</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                      <span className="text-sm text-green-400">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded glow-on-hover">
                    <span className="text-white neon-text">Memory Usage</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                      <span className="text-sm text-yellow-400">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded glow-on-hover">
                    <span className="text-white neon-text">Disk Usage</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="bg-cyan-400 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                      <span className="text-sm text-cyan-400">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded glow-on-hover">
                    <span className="text-white neon-text">Network I/O</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{width: '32%'}}></div>
                      </div>
                      <span className="text-sm text-green-400">32%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPerformanceMetrics(false)}
                className="flex-1 border-slate-400 text-slate-400 hover:bg-slate-400/10 glow-on-hover"
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => alert("Exporting performance metrics...")}
                className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 button-glow glow-on-hover"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Metrics
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Module Layers Dialog */}
      <Dialog open={showModuleLayers} onOpenChange={setShowModuleLayers}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Layers className="h-5 w-5" />
              System Architecture Layers
            </DialogTitle>
            <div className="text-sm text-muted-foreground">
              Hierarchical view of system modules and their dependencies
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Layer 1 - Frontend Layer */}
            <Card className="bg-card border-border card-glow border border-cyan-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  Layer 1: Frontend & User Interface
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Dashboard UI</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">React Components</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Real-time Updates</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">WebSocket Client</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">CDN Cache</span>
                      <span className="text-xs text-yellow-400 ml-auto">Lag</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Static Assets</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layer 2 - API Gateway */}
            <Card className="bg-card border-border card-glow border border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  Layer 2: API Gateway & Load Balancer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">API Gateway</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Load Balancer</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Rate Limiter</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">SSL Termination</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Request Router</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Health Checker</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layer 3 - Application Services */}
            <Card className="bg-card border-border card-glow border border-orange-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  Layer 3: Application Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">API Server</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Dashboard Backend</span>
                      <span className="text-xs text-yellow-400 ml-auto">Lag</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">License Server</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Authentication</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Session Manager</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Business Logic</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layer 4 - Data Layer */}
            <Card className="bg-card border-border card-glow border border-red-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  Layer 4: Data & Storage Layer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Database Cluster</span>
                      <span className="text-xs text-orange-400 ml-auto">Warning</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">CDN / Cache</span>
                      <span className="text-xs text-red-400 ml-auto">Down</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Redis Cache</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">File Storage</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Backup System</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Data Replication</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layer 5 - Infrastructure */}
            <Card className="bg-card border-border card-glow border border-teal-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                  Layer 5: Infrastructure & Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">System Monitor</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Log Aggregator</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Alert Manager</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Metrics Collector</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">Health Checker</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded glow-on-hover">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white neon-text">NOC Integration</span>
                      <span className="text-xs text-green-400 ml-auto">Online</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layer Dependencies */}
            <Card className="bg-card border-border card-glow border border-slate-400/20">
              <CardHeader>
                <CardTitle className="text-lg text-white neon-text">Layer Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded glow-on-hover">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-white neon-text">Frontend Layer</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                    <span className="text-xs text-slate-400">Depends on API Gateway</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded glow-on-hover">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-white neon-text">API Gateway</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                    <span className="text-xs text-slate-400">Routes to Application Services</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded glow-on-hover">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span className="text-sm text-white neon-text">Application Services</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                    <span className="text-xs text-slate-400">Accesses Data Layer</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded glow-on-hover">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-sm text-white neon-text">Data Layer</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                    <span className="text-xs text-slate-400">Monitored by Infrastructure</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowModuleLayers(false)}
                className="flex-1 border-slate-400 text-slate-400 hover:bg-slate-400/10 glow-on-hover"
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => alert("Exporting layer architecture...")}
                className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 button-glow glow-on-hover"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Architecture
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SystemMonitorTab;
