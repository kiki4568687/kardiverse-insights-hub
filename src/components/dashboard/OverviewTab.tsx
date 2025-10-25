import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Progress } from "@/components/ui/progress";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { 

  TrendingUp, 

  Users, 

  Zap, 

  Eye, 

  AlertCircle, 

  BarChart3, 

  QrCode, 

  MapPin, 

  Clock,

  Target,

  Activity,

  Globe,

  Smartphone,

  CreditCard,

  Shield,

  CheckCircle,

  XCircle,

  AlertTriangle,

  Brain,

  Lightbulb,

  TrendingDown,

  Star,

  ArrowUpRight,

  ArrowDownRight,

  RefreshCw,

  Sparkles,

  Download,

  ExternalLink,

  Info,

  Upload,

  FileImage,

  DollarSign

} from "lucide-react";

import { useState, useRef, useEffect } from "react";



const OverviewTab = () => {

  const [showDetails, setShowDetails] = useState<string | null>(null);

  const [exportData, setExportData] = useState(false);

  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [isUploading, setIsUploading] = useState(false);

  const [premiumMode, setPremiumMode] = useState(true);

  const [selectedDuration, setSelectedDuration] = useState("7");

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [realTimeData, setRealTimeData] = useState({

    totalScans: 5847,

    uniqueUsers: 1834,

    dailyAverage: 234,

    successRate: 99.8,

    aiAccuracy: 97.5,

    totalCards: 4678,

    activeDevices: 892,

    peakHour: "12:00-14:00",

    avgEngagement: 6.7,

    lastUpdate: new Date(),

    isLive: true

  });

  const fileInputRef = useRef<HTMLInputElement>(null);



  const handleExport = (type: string) => {

    setExportData(true);

    

    // Generate real downloadable files

    if (type.includes("CSV")) {

      const csvData = generateCSVData();

      downloadFile(csvData, `${type.toLowerCase().replace(/\s+/g, '_')}.csv`, 'text/csv');

    } else if (type.includes("JSON")) {

      const jsonData = generateJSONData();

      downloadFile(jsonData, `${type.toLowerCase().replace(/\s+/g, '_')}.json`, 'application/json');

    } else if (type.includes("PDF")) {

      const pdfData = generatePDFData();

      downloadFile(pdfData, `${type.toLowerCase().replace(/\s+/g, '_')}.pdf`, 'application/pdf');

    } else {

      // Generic data export

      const genericData = generateGenericData(type);

      downloadFile(genericData, `${type.toLowerCase().replace(/\s+/g, '_')}.txt`, 'text/plain');

    }

    

    setTimeout(() => {

      setExportData(false);

      alert(`${type} downloaded successfully!`);

    }, 1000);

  };



  const generateCSVData = () => {

    const headers = ['Metric', 'Value', 'Status', 'Timestamp'];

    const rows = [

      ['Total Scans', '5,847', 'Active', new Date().toISOString()],

      ['Unique Users', '1,834', 'Verified', new Date().toISOString()],

      ['Daily Average', '234', 'Optimal', new Date().toISOString()],

      ['Top Location', 'Nairobi CBD', 'Leading', new Date().toISOString()],

      ['Success Rate', '99.8%', 'Excellent', new Date().toISOString()]

    ];

    return [headers, ...rows].map(row => row.join(',')).join('\n');

  };



  const generateJSONData = () => {

    return JSON.stringify({

      timestamp: new Date().toISOString(),

      metrics: {

        totalScans: 5847,

        uniqueUsers: 1834,

        dailyAverage: 234,

        topLocation: 'Nairobi CBD',

        successRate: 99.8

      },

      status: 'Active',

      recommendations: [

        'Scale Nairobi CBD campaign',

        'Optimize content for peak hours',

        'Expand to Uganda and Tanzania markets'

      ]

    }, null, 2);

  };



  const generatePDFData = () => {

    return `%PDF-1.4

1 0 obj

<<

/Type /Catalog

/Pages 2 0 R

>>

endobj



2 0 obj

<<

/Type /Pages

/Kids [3 0 R]

/Count 1

>>

endobj



3 0 obj

<<

/Type /Page

/Parent 2 0 R

/MediaBox [0 0 612 792]

/Contents 4 0 R

>>

endobj



4 0 obj

<<

/Length 44

>>

stream

BT

/F1 12 Tf

100 700 Td

(Kardiverse Dashboard Report) Tj

ET

endstream

endobj



xref

0 5

0000000000 65535 f 

0000000009 00000 n 

0000000058 00000 n 

0000000115 00000 n 

0000000204 00000 n 

trailer

<<

/Size 5

/Root 1 0 R

>>

startxref

297

%%EOF`;

  };



  const generateGenericData = (type: string) => {

    return `Kardiverse Dashboard Export - ${type}

Generated: ${new Date().toISOString()}



=== OVERVIEW METRICS ===

Total Scans: 5,847

Unique Users: 1,834

Daily Average: 234

Top Location: Nairobi CBD

Success Rate: 99.8%



=== AI RECOMMENDATIONS ===

1. Scale Nairobi CBD campaign - currently outperforming by 156%

2. Optimize content for peak hours (12:00-14:00) to increase engagement by 23%

3. Expand to Uganda and Tanzania markets for 45% growth potential



=== SYSTEM STATUS ===

All systems operational

100 licenses active

Performance optimal

AI Sentinel Active

NeoChain™ Verified`;

  };



  const downloadFile = (content: string, filename: string, mimeType: string) => {

    const blob = new Blob([content], { type: mimeType });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

  };



  const handleViewDetails = (type: string) => {

    setShowDetails(type);

  };



  const handleImplementRecommendation = (recommendation: string) => {

    alert(`Implementing: ${recommendation}`);

  };



  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = Array.from(event.target.files || []);

    setUploadedFiles(files);

  };



  const handleFileUpload = async () => {

    if (uploadedFiles.length === 0) return;

    

    setIsUploading(true);

    setUploadProgress(0);

    

    // Simulate upload progress

    const interval = setInterval(() => {

      setUploadProgress(prev => {

        if (prev >= 100) {

          clearInterval(interval);

          setIsUploading(false);

          alert(`Successfully uploaded ${uploadedFiles.length} file(s)!`);

          setShowUploadDialog(false);

          setUploadedFiles([]);

          return 0;

        }

        return prev + 10;

      });

    }, 200);

  };



  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {

    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);

    setUploadedFiles(files);

  };



  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {

    event.preventDefault();

  };



  // Real-time data fetching simulation

  const fetchRealTimeData = async () => {

    setIsRefreshing(true);

    try {

      // Simulate API call with realistic delays

      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

      

      // Generate realistic real-time data with small variations

      const baseScans = parseInt(selectedDuration) === 7 ? 5847 : parseInt(selectedDuration) === 30 ? 25142 : 75426;

      const baseUsers = parseInt(selectedDuration) === 7 ? 1834 : parseInt(selectedDuration) === 30 ? 7886 : 23658;

      const baseDaily = parseInt(selectedDuration) === 7 ? 234 : parseInt(selectedDuration) === 30 ? 1006 : 3018;

      const baseCards = parseInt(selectedDuration) === 7 ? 4678 : parseInt(selectedDuration) === 30 ? 20114 : 60342;

      

      // Add realistic variations (±5% random change)

      const scanVariation = (Math.random() - 0.5) * 0.1; // ±5%

      const userVariation = (Math.random() - 0.5) * 0.08; // ±4%

      const dailyVariation = (Math.random() - 0.5) * 0.12; // ±6%

      const rateVariation = (Math.random() - 0.5) * 0.02; // ±1%

      

      // Dynamic peak hours based on time of day

      const currentHour = new Date().getHours();

      const peakHours = currentHour >= 12 && currentHour < 14 ? "12:00-14:00" : 

                        currentHour >= 18 && currentHour < 20 ? "18:00-20:00" : "12:00-14:00";

      

      const newData = {

        totalScans: Math.floor(baseScans * (1 + scanVariation)),

        uniqueUsers: Math.floor(baseUsers * (1 + userVariation)),

        dailyAverage: Math.floor(baseDaily * (1 + dailyVariation)),

        successRate: Math.min(100, Math.max(95, 99.8 + (Math.random() - 0.5) * 2)),

        aiAccuracy: Math.min(100, Math.max(95, 97.5 + (Math.random() - 0.5) * 3)),

        totalCards: Math.floor(baseCards * (1 + scanVariation * 0.8)),

        activeDevices: Math.floor((baseUsers * 0.48) * (1 + userVariation)),

        peakHour: peakHours,

        avgEngagement: Math.max(5, Math.min(10, 6.7 + (Math.random() - 0.5) * 1.5)),

        lastUpdate: new Date(),

        isLive: true

      };

      

      setRealTimeData(newData);

    } catch (error) {

      console.error('Failed to fetch real-time data:', error);

      setRealTimeData(prev => ({ ...prev, isLive: false }));

    } finally {

      setIsRefreshing(false);

    }

  };



  // Set up real-time data updates

  useEffect(() => {

    // Initial data fetch

    fetchRealTimeData();

    

    // Set up interval for real-time updates (every 10 seconds)

    const interval = setInterval(fetchRealTimeData, 10000);

    

    // Cleanup interval on component unmount

    return () => clearInterval(interval);

  }, [selectedDuration]); // Re-fetch when duration changes



  // Real-time data for location performance with enhanced variations

  const getRealTimeLocationData = () => {

    const duration = parseInt(selectedDuration);

    const multiplier = duration === 7 ? 1 : duration === 30 ? 4.3 : 12.9;

    

    // Add more realistic real-time variations to location data

    const locations = [

      { name: "Nairobi CBD", baseScans: 2341, color: "primary", trend: "up" },

      { name: "Mombasa", baseScans: 1876, color: "green-500", trend: "stable" },

      { name: "Kisumu", baseScans: 1234, color: "blue-500", trend: "up" },

      { name: "Nakuru", baseScans: 987, color: "purple-500", trend: "down" }

    ];

    

    return locations.map(location => {

      // Add trend-based variations

      const trendFactor = location.trend === "up" ? 1.05 : location.trend === "down" ? 0.95 : 1.0;

      const randomVariation = 0.9 + Math.random() * 0.2; // ±10% variation

      

      return {

        ...location,

        scans: Math.floor(location.baseScans * multiplier * trendFactor * randomVariation),

        // Add percentage change for display

        change: Math.floor((Math.random() - 0.5) * 20) // ±10% change

      };

    });

  };



  // Dynamic data based on selected duration

  const getDurationData = () => {

    const duration = parseInt(selectedDuration);

    const multiplier = duration === 7 ? 1 : duration === 30 ? 4.3 : 12.9;

    

    return {

      totalScans: Math.floor(5847 * multiplier),

      uniqueUsers: Math.floor(1834 * multiplier),

      dailyAverage: Math.floor(234 * multiplier),

      conversionRate: duration === 7 ? 12.8 : duration === 30 ? 11.2 : 9.8,

      customerLTV: duration === 7 ? 247 : duration === 30 ? 289 : 334,

      churnRate: duration === 7 ? 2.1 : duration === 30 ? 1.8 : 1.5,

      npsScore: duration === 7 ? 67 : duration === 30 ? 72 : 78,

      growthForecast: duration === 7 ? 34 : duration === 30 ? 28 : 22,

      confidenceLevel: duration === 7 ? 94.2 : duration === 30 ? 96.8 : 98.5

    };

  };



  const getLocationData = () => {

    const duration = parseInt(selectedDuration);

    const multiplier = duration === 7 ? 1 : duration === 30 ? 4.3 : 12.9;

    

    return [

      { name: "Nairobi CBD", scans: Math.floor(2341 * multiplier), color: "primary" },

      { name: "Mombasa", scans: Math.floor(1876 * multiplier), color: "green-500" },

      { name: "Kisumu", scans: Math.floor(1234 * multiplier), color: "blue-500" },

      { name: "Nakuru", scans: Math.floor(987 * multiplier), color: "purple-500" }

    ];

  };



  // Real-time scan performance data

  const getRealTimeScanPerformanceData = () => {

    const duration = parseInt(selectedDuration);

    const days = duration === 7 ? 7 : duration === 30 ? 30 : 90;

    const data = [];

    

    // Generate realistic time-series data with variations

    for (let i = 0; i < days; i++) {

      // Base value that varies by duration

      const baseValue = duration === 7 ? 200 : duration === 30 ? 150 : 100;

      

      // Add realistic patterns (weekend dips, peak hours, etc.)

      const dayOfWeek = i % 7;

      const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1.0; // Weekend dip

      const trendFactor = 1 + (i / days) * 0.3; // Gradual upward trend

      const randomFactor = 0.8 + Math.random() * 0.4; // ±20% random variation

      

      const value = Math.floor(baseValue * weekendFactor * trendFactor * randomFactor);

      data.push(value);

    }

    

    return data;

  };



  // Generate dynamic chart points for SVG

  const generateChartPoints = (data: number[]) => {

    const maxValue = Math.max(...data);

    const minValue = Math.min(...data);

    const range = maxValue - minValue || 1;

    

    return data.map((value, index) => {

      const x = (index / (data.length - 1)) * 360 + 40; // Spread across chart width

      const y = 180 - ((value - minValue) / range) * 160; // Scale to chart height

      return { x, y, value };

    });

  };



  const getRevenueForecastData = () => {

    const duration = parseInt(selectedDuration);

    const quarters = duration === 7 ? 2 : duration === 30 ? 4 : 8;

    const data = [];

    

    for (let i = 0; i < quarters; i++) {

      const baseValue = 1000000 + (i * 200000) + Math.random() * 100000;

      data.push(Math.floor(baseValue));

    }

    

    return data;

  };



  return (

    <div className="space-y-6 animate-in fade-in duration-500">

      {/* Header Section */}

          <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-foreground neon-text">Sponsor Dashboard</h1>

          <p className="text-lg text-muted-foreground">Overview</p>

          {realTimeData.isLive && (

            <div className="flex items-center gap-2 mt-2">

              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

              <span className="text-sm text-green-500 font-medium">Live Data</span>

              <span className="text-xs text-muted-foreground">

                Last updated: {realTimeData.lastUpdate.toLocaleTimeString()}

              </span>

            </div>

          )}

        </div>

        <div className="flex items-center gap-4">

          <select 

            className="px-3 py-2 bg-card border border-border rounded-md text-sm"

            value={selectedDuration}

            onChange={(e) => setSelectedDuration(e.target.value)}

          >

            <option value="7">Last 7 days</option>

            <option value="30">Last 30 days</option>

            <option value="90">Last 90 days</option>

          </select>

          <Button

            size="sm"

            variant="outline"

            onClick={fetchRealTimeData}

            disabled={isRefreshing}

            className="border-primary/50 text-primary hover:bg-primary/10 disabled:opacity-50"

          >

            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />

            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}

          </Button>

        </div>

      </div>



      {/* Key Metrics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card className="bg-card border-border glow-on-hover neon-border card-glow">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">Total Scans</p>

                <p className="text-3xl font-bold text-foreground text-glow">{realTimeData.totalScans.toLocaleString()}</p>

                <p className="text-sm text-green-500">+23.5% from last period</p>

              </div>

              <div className="flex flex-col items-end">

                <BarChart3 className="h-8 w-8 text-primary icon-glow" />

                {realTimeData.isLive && (

                  <div className="flex items-center gap-1 mt-2">

                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

                    <span className="text-xs text-green-500">LIVE</span>

                  </div>

                )}

              </div>

            </div>

          </CardContent>

        </Card>



        <Card className="bg-card border-border glow-on-hover neon-border card-glow">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">Unique Users</p>

                <p className="text-3xl font-bold text-foreground text-glow">{realTimeData.uniqueUsers.toLocaleString()}</p>

                <p className="text-sm text-green-500">+18.2% from last period</p>

              </div>

              <div className="flex flex-col items-end">

                <Users className="h-8 w-8 text-primary icon-glow" />

                {realTimeData.isLive && (

                  <div className="flex items-center gap-1 mt-2">

                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

                    <span className="text-xs text-green-500">LIVE</span>

                  </div>

                )}

              </div>

            </div>

          </CardContent>

        </Card>



        <Card className="bg-card border-border glow-on-hover neon-border card-glow">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">Daily Average</p>

                <p className="text-3xl font-bold text-foreground text-glow">{realTimeData.dailyAverage.toLocaleString()}</p>

                <p className="text-sm text-muted-foreground">Scans per day</p>

              </div>

              <div className="flex flex-col items-end">

                <Activity className="h-8 w-8 text-primary icon-glow" />

                {realTimeData.isLive && (

                  <div className="flex items-center gap-1 mt-2">

                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

                    <span className="text-xs text-green-500">LIVE</span>

                  </div>

                )}

              </div>

            </div>

          </CardContent>

        </Card>



        <Card className="bg-card border-border glow-on-hover neon-border card-glow">

          <CardContent className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">Top Location</p>

                <p className="text-3xl font-bold text-foreground text-glow">Nairobi CBD</p>

                <p className="text-sm text-muted-foreground">Leading engagement</p>

              </div>

              <MapPin className="h-8 w-8 text-primary icon-glow" />

            </div>

          </CardContent>

        </Card>

      </div>



      {/* Analytics Section */}

      <div className="space-y-6">

        {/* Scan Performance & Location Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Scan Performance Chart */}

          <Card className="bg-card border-border card-glow">

          <CardHeader>

              <CardTitle className="text-lg neon-text">Scan Performance</CardTitle>

              <p className="text-sm text-muted-foreground">Daily scan activity over time</p>

          </CardHeader>

            <CardContent>

              <div className="h-64 bg-gradient-to-t from-primary/10 to-transparent rounded-lg p-4 relative">

                {/* Dynamic Line Graph */}

                <svg className="w-full h-full" viewBox="0 0 400 200">

                  {/* Grid lines */}

                  <defs>

                    <pattern id="grid-basic" width="40" height="40" patternUnits="userSpaceOnUse">

                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>

                    </pattern>

                  </defs>

                  <rect width="100%" height="100%" fill="url(#grid-basic)" className="chart-glow" />



                  {(() => {

                    const data = getRealTimeScanPerformanceData();

                    const points = generateChartPoints(data);

                    const maxValue = Math.max(...data);

                    const minValue = Math.min(...data);

                    

                    return (

                      <>

                        {/* Data points */}

                        {points.map((point, index) => (

                          <circle 

                            key={index}

                            cx={point.x} 

                            cy={point.y} 

                            r="4" 

                            fill="#00ffff"

                            className={realTimeData.isLive ? "animate-pulse" : ""}

                          />

                        ))}



                        {/* Line connecting points */}

                        <path

                          d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}

                          stroke="#00ffff"

                          strokeWidth="3"

                          fill="none"

                          strokeLinecap="round"

                          strokeLinejoin="round"

                        />



                        {/* Gradient fill under line */}

                        <defs>

                          <linearGradient id="gradient-basic" x1="0%" y1="0%" x2="0%" y2="100%">

                            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3"/>

                            <stop offset="100%" stopColor="#00ffff" stopOpacity="0"/>

                          </linearGradient>

                        </defs>

                        <path

                          d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')} L ${points[points.length - 1].x},200 L ${points[0].x},200 Z`}

                          fill="url(#gradient-basic)"

                        />



                        {/* Y-axis labels */}

                        <text x="5" y="25" fontSize="10" fill="currentColor" opacity="0.6">{maxValue}</text>

                        <text x="5" y="65" fontSize="10" fill="currentColor" opacity="0.6">{Math.floor(maxValue * 0.75)}</text>

                        <text x="5" y="105" fontSize="10" fill="currentColor" opacity="0.6">{Math.floor(maxValue * 0.5)}</text>

                        <text x="5" y="145" fontSize="10" fill="currentColor" opacity="0.6">{Math.floor(maxValue * 0.25)}</text>

                        <text x="5" y="185" fontSize="10" fill="currentColor" opacity="0.6">{minValue}</text>

                      </>

                    );

                  })()}

                </svg>

                

                {/* Live indicator */}

                {realTimeData.isLive && (

                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">

                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>

                    <span className="text-xs text-green-500 font-medium">LIVE</span>

              </div>

                )}

              </div>

              <div className="flex justify-between text-xs text-muted-foreground mt-2">

                {(() => {

                  const duration = parseInt(selectedDuration);

                  if (duration === 7) {

                    return (

                      <>

                        <span>Mon</span>

                        <span>Tue</span>

                        <span>Wed</span>

                        <span>Thu</span>

                        <span>Fri</span>

                        <span>Sat</span>

                        <span>Sun</span>

                      </>

                    );

                  } else if (duration === 30) {

                    return (

                      <>

                        <span>Week 1</span>

                        <span>Week 2</span>

                        <span>Week 3</span>

                        <span>Week 4</span>

                      </>

                    );

                  } else {

                    return (

                      <>

                        <span>Month 1</span>

                        <span>Month 2</span>

                        <span>Month 3</span>

                      </>

                    );

                  }

                })()}

              </div>

          </CardContent>

        </Card>



          {/* Location Performance */}

          <Card className="bg-card border-border card-glow">

          <CardHeader>

              <div className="flex items-center justify-between">

                <div>

                  <CardTitle className="text-lg neon-text">Location Performance</CardTitle>

                  <p className="text-sm text-muted-foreground">Scan distribution by location</p>

                </div>

                {realTimeData.isLive && (

                  <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">

                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>

                    <span className="text-xs text-green-500 font-medium">LIVE</span>

                  </div>

                )}

              </div>

          </CardHeader>

            <CardContent>

              <div className="space-y-4">

                {getRealTimeLocationData().map((location, index) => (

                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">

                    <div className="flex items-center gap-3">

                      <div className={`w-3 h-3 bg-${location.color} rounded-full ${realTimeData.isLive ? 'animate-pulse' : ''}`}></div>

                      <span className="font-medium">{location.name}</span>

                    </div>

                    <div className="flex items-center gap-2">

                      <span className={`font-bold text-${location.color}`}>{location.scans.toLocaleString()} scans</span>

                      {realTimeData.isLive && (

                        <div className="flex items-center gap-1">

                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>

                          <span className={`text-xs font-medium ${

                            location.change > 0 ? 'text-green-500' : 

                            location.change < 0 ? 'text-red-500' : 'text-muted-foreground'

                          }`}>

                            {location.change > 0 ? '+' : ''}{location.change}%

                          </span>

                        </div>

                      )}

            </div>

            </div>

                ))}

                

                {/* Live status indicator */}

                {realTimeData.isLive && (

                  <div className="flex items-center justify-center gap-2 pt-2 border-t border-border">

                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

                    <span className="text-xs text-green-500 font-medium">Live Location Data</span>

                    <span className="text-xs text-muted-foreground">

                      Updated: {realTimeData.lastUpdate.toLocaleTimeString()}

                    </span>

            </div>

                )}

            </div>

          </CardContent>

        </Card>

      </div>







      </div>



      {/* Detailed Analytics Tabs */}

      <Tabs defaultValue="metrics" className="w-full">

        <TabsList className="grid w-full grid-cols-3">

          <TabsTrigger value="metrics">Metrics</TabsTrigger>

          <TabsTrigger value="scans">Scans</TabsTrigger>

          <TabsTrigger value="geodata">Geodata</TabsTrigger>

        </TabsList>

        

        <TabsContent value="metrics" className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <Card className="bg-card border-border card-glow">

              <CardContent className="p-4">

                <div className="flex items-center justify-between mb-2">

                  <span className="text-sm font-medium">Total Cards</span>

                  <Target className="h-4 w-4 text-primary icon-glow" />

                </div>

                <div className="text-2xl font-bold">{Math.floor(realTimeData.totalScans * 0.8).toLocaleString()}</div>

                <div className="text-xs text-muted-foreground">Active cards</div>

              </CardContent>

            </Card>

            

            <Card className="bg-card border-border card-glow">

              <CardContent className="p-4">

                <div className="flex items-center justify-between mb-2">

                  <span className="text-sm font-medium">Success Rate</span>

                  <CheckCircle className="h-4 w-4 text-green-500 icon-glow" />

                </div>

                <div className="text-2xl font-bold text-green-500">{getDurationData().confidenceLevel}%</div>

                <div className="text-xs text-muted-foreground">Optimal performance</div>

              </CardContent>

            </Card>

            

            <Card className="bg-card border-border card-glow">

              <CardContent className="p-4">

                <div className="flex items-center justify-between mb-2">

                  <span className="text-sm font-medium">AI Accuracy</span>

                  <Brain className="h-4 w-4 text-primary icon-glow" />

                </div>

                <div className="text-2xl font-bold text-primary">{getDurationData().confidenceLevel}%</div>

                <div className="text-xs text-muted-foreground">Excellent</div>

              </CardContent>

            </Card>

          </div>

        </TabsContent>

        

        <TabsContent value="scans" className="space-y-4">

          <Card className="bg-card border-border card-glow">

            <CardHeader>

              <CardTitle className="text-lg neon-text">Scan Analytics</CardTitle>

            </CardHeader>

            <CardContent>

              <div className="space-y-4">

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">

                  <div className="flex items-center gap-3">

                    <QrCode className="h-5 w-5 text-primary icon-glow" />

                    <span className="font-medium">Total Scans</span>

                  </div>

                  <span className="font-bold text-primary">{realTimeData.totalScans.toLocaleString()}</span>

                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">

                  <div className="flex items-center gap-3">

                    <Users className="h-5 w-5 text-green-500" />

                    <span className="font-medium">Unique Users</span>

                  </div>

                  <span className="font-bold text-green-500">{realTimeData.uniqueUsers.toLocaleString()}</span>

                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">

                  <div className="flex items-center gap-3">

                    <Clock className="h-5 w-5 text-cyan-400" />

                    <span className="font-medium">Peak Hours</span>

                  </div>

                  <span className="font-bold text-cyan-400">12:00-14:00</span>

                </div>

              </div>

            </CardContent>

          </Card>

        </TabsContent>

        

        <TabsContent value="geodata" className="space-y-4">

          <Card className="bg-card border-border card-glow">

        <CardHeader>

              <CardTitle className="text-lg neon-text">Geographic Data</CardTitle>

        </CardHeader>

        <CardContent>

              <div className="space-y-4">

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">

                  <div className="flex items-center gap-3">

                    <Globe className="h-5 w-5 text-primary" />

                    <span className="font-medium">Countries</span>

                  </div>

                  <span className="font-bold text-primary">4</span>

                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">

                  <div className="flex items-center gap-3">

                    <MapPin className="h-5 w-5 text-green-500" />

                    <span className="font-medium">Cities</span>

                  </div>

                  <span className="font-bold text-green-500">12</span>

                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">

                  <div className="flex items-center gap-3">

                    <Activity className="h-5 w-5 text-cyan-400" />

                    <span className="font-medium">Active Regions</span>

                  </div>

                  <span className="font-bold text-cyan-400">8</span>

                </div>

              </div>

            </CardContent>

          </Card>

        </TabsContent>

      </Tabs>



      {/* Upload Dialog */}

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>

        <DialogContent className="sm:max-w-md">

          <DialogHeader>

            <DialogTitle className="flex items-center gap-2">

              <FileImage className="h-5 w-5" />

              Upload Dashboard Data

            </DialogTitle>

          </DialogHeader>

          <div className="space-y-4">

            <div

              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors"

              onDrop={handleDrop}

              onDragOver={handleDragOver}

            >

              <FileImage className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

              <div className="space-y-2">

                <p className="text-sm text-muted-foreground">

                  Drag and drop your data files here, or

                </p>

                <Button

                  variant="outline"

                  onClick={() => fileInputRef.current?.click()}

                  disabled={isUploading}

                >

                  <Upload className="h-4 w-4 mr-2" />

                  Choose Files

                </Button>

              </div>

              <input

                ref={fileInputRef}

                type="file"

                accept=".csv,.json,.xlsx,.pdf"

                multiple

                onChange={handleFileSelect}

                className="hidden"

              />

            </div>



            {uploadedFiles.length > 0 && (

              <div className="space-y-2">

                <Label>Selected Files:</Label>

                {uploadedFiles.map((file, index) => (

                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">

                    <FileImage className="h-4 w-4 text-primary" />

                    <span className="text-sm flex-1 truncate">{file.name}</span>

                    <span className="text-xs text-muted-foreground">

                      {(file.size / 1024).toFixed(1)} KB

                    </span>

                  </div>

                ))}

              </div>

            )}



            {isUploading && (

              <div className="space-y-2">

                <div className="flex items-center gap-2">

                  <CheckCircle className="h-4 w-4 text-primary" />

                  <span className="text-sm">Uploading...</span>

                </div>

                <Progress value={uploadProgress} className="h-2" />

                <p className="text-xs text-muted-foreground text-center">

                  {uploadProgress}% complete

                </p>

            </div>

            )}



            <div className="flex gap-2">

              <Button

                onClick={handleFileUpload}

                disabled={uploadedFiles.length === 0 || isUploading}

                className="flex-1"

              >

                {isUploading ? (

                  <>

                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />

                    Uploading...

                  </>

                ) : (

                  <>

                    <Upload className="h-4 w-4 mr-2" />

                    Upload Data

                  </>

                )}

              </Button>

              <Button

                variant="outline"

                onClick={() => setShowUploadDialog(false)}

                disabled={isUploading}

              >

                Cancel

              </Button>

            </div>

          </div>

        </DialogContent>

      </Dialog>

    </div>

  );

};



export default OverviewTab;
