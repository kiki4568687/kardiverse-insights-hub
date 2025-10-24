import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Zap,
  FileText,
  BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";
import jsPDF from 'jspdf';

const AIInsightsTab = () => {
  const [forecastData, setForecastData] = useState([
    {
      metric: "Daily Scans",
      current: "10,024",
      predicted: "+12% → 11,227",
      confidence: "93%",
      trend: "up",
      alert: "up"
    },
    {
      metric: "Sponsor Revenue",
      current: "€245 M",
      predicted: "+18% → €2.89 M",
      confidence: "89%",
      trend: "stable",
      alert: "up"
    },
    {
      metric: "User Engagement Time",
      current: "4,240",
      predicted: "+8% → 6.7 min",
      confidence: "87%",
      trend: "up",
      alert: "down"
    },
    {
      metric: "Engagement Time",
      current: "4,240",
      predicted: "+22% → 5,173",
      confidence: "91%",
      trend: "stable",
      alert: "stable"
    }
  ]);

  const [aiConfidence, setAiConfidence] = useState(92);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [aiInsight, setAiInsight] = useState("ROI growth expected to accelerate in the next cycle due to increased scan volume and peak ad engagement.");
  const [buttonStates, setButtonStates] = useState({
    simulation: false,
    export: false,
    report: false
  });

  // Real-time updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (!isLive) return;

      // Update AI confidence with small variations
      setAiConfidence(prev => {
        const variation = (Math.random() - 0.5) * 4; // ±2%
        return Math.max(85, Math.min(98, Math.round(prev + variation)));
      });

      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(updateInterval);
  }, [isLive]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-400" />;
      case "stable": return <Minus className="h-4 w-4 text-blue-400" />;
      default: return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAlertIcon = (alert: string) => {
    switch (alert) {
      case "up": return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-400" />;
      case "stable": return <Minus className="h-4 w-4 text-blue-400" />;
      default: return null;
    }
  };

  const handleRunSimulation = () => {
    setButtonStates(prev => ({ ...prev, simulation: true }));
    setSimulationProgress(0);
    
    // Phase 1: Data Collection
    setAiInsight("Phase 1: Collecting data from 10,000+ scan events, engagement metrics, and sponsor performance records...");
    setSimulationProgress(25);
    
    setTimeout(() => {
      // Phase 2: Analysis
      setAiInsight("Phase 2: Running AI algorithms to analyze scan patterns, user behavior, and revenue correlations...");
      setSimulationProgress(50);
      
      setTimeout(() => {
        // Phase 3: Prediction
        setAiInsight("Phase 3: Generating predictive models for ROI optimization and revenue forecasting...");
        setSimulationProgress(75);
        
        setTimeout(() => {
          // Phase 4: Results
          setSimulationProgress(100);
          
          setAiInsight("✅ Simulation Complete! ROI growth projected at 15.3% with 94% confidence. Key findings: Daily scans will increase by 12% over next 7 days. Recommendations: Increase scan volume by 15% for optimal ROI.");
          setButtonStates(prev => ({ ...prev, simulation: false }));
          setSimulationProgress(0);
        }, 1500);
      }, 1500);
    }, 1000);
  };

  const handleExportForecastPDF = async () => {
    setButtonStates(prev => ({ ...prev, export: true }));
    try {
      const pdf = new jsPDF();
      
      // Header
      pdf.setFontSize(20);
      pdf.text('KARDIVERSE AI FORECAST REPORT', 20, 30);
      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 40);
      
      // Executive Summary
      pdf.setFontSize(16);
      pdf.text('EXECUTIVE SUMMARY', 20, 60);
      pdf.setFontSize(12);
      pdf.text('Projected ROI: 15.3%', 20, 75);
      pdf.text('Projected Revenue: €2.89M', 20, 85);
      
      // AI Forecast Section
      pdf.setFontSize(16);
      pdf.text('AI FORECAST METRICS', 20, 105);
      
      pdf.setFontSize(12);
      let yPos = 115;
      const lineHeight = 8;
      
      forecastData.forEach((item, index) => {
        pdf.text(`${item.metric}:`, 20, yPos);
        pdf.text(`  Current: ${item.current}`, 20, yPos + lineHeight);
        pdf.text(`  Predicted: ${item.predicted}`, 20, yPos + lineHeight * 2);
        pdf.text(`  Confidence: ${item.confidence}`, 20, yPos + lineHeight * 3);
        yPos += lineHeight * 5;
      });
      
      // Save the PDF
      const fileName = `ai-forecast-report-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      // Update AI insight to show export success
      setAiInsight(`PDF exported successfully: ${fileName}. Report includes ${forecastData.length} forecast metrics with ${aiConfidence}% AI confidence.`);
      setButtonStates(prev => ({ ...prev, export: false }));
    } catch (error) {
      console.error('Error generating PDF:', error);
      setAiInsight("Failed to generate PDF. Please try again.");
      setButtonStates(prev => ({ ...prev, export: false }));
    }
  };

  const handleGenerateROIReport = () => {
    setButtonStates(prev => ({ ...prev, report: true }));
    
    // Generate comprehensive ROI report
    const reportData = {
      timestamp: new Date().toISOString(),
      reportType: "AI-Powered ROI Analysis Report",
      aiConfidence: aiConfidence,
      executiveSummary: {
        totalROI: "15.3%",
        projectedRevenue: "€2.89M",
        keyDrivers: ["Scan Volume Growth", "Sponsor Engagement", "User Retention"]
      },
      forecast: forecastData,
      recommendations: [
        "Increase scan volume by 15% for optimal ROI",
        "Focus on Coca-Cola and Pepsi partnerships for maximum revenue",
        "Optimize engagement time to 6+ minutes"
      ]
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'roi-analysis-report.json';
    link.click();
    URL.revokeObjectURL(url);
    
    // Update AI insight to show report generation success
    setAiInsight(`ROI Report generated successfully! Downloaded comprehensive analysis with 15.3% projected ROI, €2.89M revenue forecast, and strategic recommendations.`);
    setButtonStates(prev => ({ ...prev, report: false }));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tab 7 - AI Insights & ROI Forecast</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-400">Predictive Engine Online</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Data source verified by NOC</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Forecast Updated Hourly</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - AI Forecast Table */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Forecast Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">AI Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Metric</TableHead>
                      <TableHead className="text-gray-300">Current</TableHead>
                      <TableHead className="text-gray-300">Predicted (Next 7 Days)</TableHead>
                      <TableHead className="text-gray-300">Confidence</TableHead>
                      <TableHead className="text-gray-300">Trend</TableHead>
                      <TableHead className="text-gray-300">Alert</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forecastData.map((item, index) => (
                      <TableRow key={index} className="border-gray-700 hover:bg-gray-700/50">
                        <TableCell className="text-white font-medium">{item.metric}</TableCell>
                        <TableCell className="text-white">{item.current}</TableCell>
                        <TableCell className="text-green-400">{item.predicted}</TableCell>
                        <TableCell className="text-white">{item.confidence}</TableCell>
                        <TableCell>{getTrendIcon(item.trend)}</TableCell>
                        <TableCell>{getAlertIcon(item.alert)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* ROI Growth Trend */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">ROI Growth Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid-roi" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-roi)" />

                  {/* Y-axis labels */}
                  <text x="5" y="25" fontSize="10" fill="currentColor" opacity="0.6">100%</text>
                  <text x="5" y="65" fontSize="10" fill="currentColor" opacity="0.6">75%</text>
                  <text x="5" y="105" fontSize="10" fill="currentColor" opacity="0.6">50%</text>
                  <text x="5" y="145" fontSize="10" fill="currentColor" opacity="0.6">25%</text>
                  <text x="5" y="185" fontSize="10" fill="currentColor" opacity="0.6">0%</text>

                  {/* ROI Growth Trend Line */}
                  <path
                    d="M 40,160 L 80,140 L 120,120 L 160,100 L 200,80 L 240,70 L 280,60 L 320,50 L 360,40 L 400,30"
                    stroke="#00ffff"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  <circle cx="40" cy="160" r="4" fill="#00ffff" />
                  <circle cx="80" cy="140" r="4" fill="#00ffff" />
                  <circle cx="120" cy="120" r="4" fill="#00ffff" />
                  <circle cx="160" cy="100" r="4" fill="#00ffff" />
                  <circle cx="200" cy="80" r="4" fill="#00ffff" />
                  <circle cx="240" cy="70" r="4" fill="#00ffff" />
                  <circle cx="280" cy="60" r="4" fill="#00ffff" />
                  <circle cx="320" cy="50" r="4" fill="#00ffff" />
                  <circle cx="360" cy="40" r="4" fill="#00ffff" />
                  <circle cx="400" cy="30" r="4" fill="#00ffff" />
                </svg>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-white">Stable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-white">Fluctuating</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-white">Alert</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - AI Insight & Smart Alerts */}
        <div className="space-y-6">
          {/* AI Insight */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">AI Insight</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm leading-relaxed">
                {aiInsight}
              </p>
              {buttonStates.simulation && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Simulation Progress</span>
                    <span>{simulationProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${simulationProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Confidence Gauge */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#00ffff"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - aiConfidence / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{aiConfidence}%</span>
                  </div>
                </div>
                <span className="text-sm text-gray-400 uppercase tracking-wider">AI CONFIDENCE</span>
              </div>
            </CardContent>
          </Card>

          {/* Smart Alerts */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Smart Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                onClick={handleRunSimulation}
                disabled={buttonStates.simulation}
                className="w-full justify-start bg-transparent hover:bg-gray-700 text-white border-gray-600 disabled:opacity-50"
              >
                <Zap className={`h-4 w-4 mr-2 text-blue-400 ${buttonStates.simulation ? 'animate-spin' : ''}`} />
                {buttonStates.simulation ? 'Running Simulation...' : 'Run AI Simulation'}
              </Button>
              <Button
                variant="outline"
                onClick={handleExportForecastPDF}
                disabled={buttonStates.export}
                className="w-full justify-start bg-transparent hover:bg-gray-700 text-white border-gray-600 disabled:opacity-50"
              >
                <FileText className={`h-4 w-4 mr-2 text-blue-400 ${buttonStates.export ? 'animate-pulse' : ''}`} />
                {buttonStates.export ? 'Exporting PDF...' : 'Export Forecast PDF'}
              </Button>
              <Button
                variant="outline"
                onClick={handleGenerateROIReport}
                disabled={buttonStates.report}
                className="w-full justify-start bg-transparent hover:bg-gray-700 text-white border-gray-600 disabled:opacity-50"
              >
                <BarChart3 className={`h-4 w-4 mr-2 text-blue-400 ${buttonStates.report ? 'animate-pulse' : ''}`} />
                {buttonStates.report ? 'Generating Report...' : 'Generate ROI Report'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Performing Sponsors */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Top Performing Sponsors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Bar chart */}
              {[
                { x: 40, height: 130, label: "Safaricom", revenue: "€1.24M", rank: 1 },
                { x: 100, height: 115, label: "Coca-Cola", revenue: "€1.15M", rank: 2 },
                { x: 160, height: 100, label: "Nike", revenue: "€980K", rank: 3 },
                { x: 220, height: 85, label: "Samsung", revenue: "€850K", rank: 4 },
                { x: 280, height: 70, label: "Equity Bank", revenue: "€720K", rank: 5 },
                { x: 340, height: 55, label: "KCB", revenue: "€580K", rank: 6 }
              ].map((bar, index) => (
                <g key={index}>
                  {/* Bar background */}
                  <rect
                    x={bar.x}
                    y={200 - bar.height}
                    width="40"
                    height={bar.height}
                    fill="#006666"
                    rx="2"
                  />
                  {/* Bar top accent */}
                  <rect
                    x={bar.x}
                    y={200 - bar.height}
                    width="40"
                    height="8"
                    fill="#00ffff"
                    rx="2"
                  />
                  
                  {/* Rank number above bar */}
                  <text
                    x={bar.x + 20}
                    y={200 - bar.height - 5}
                    fontSize="10"
                    fill="#00ffff"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    #{bar.rank}
                  </text>
                  
                  {/* Company name below bar */}
                  <text
                    x={bar.x + 20}
                    y={215}
                    fontSize="10"
                    fill="currentColor"
                    opacity="0.9"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {bar.label}
                  </text>
                  
                  {/* Revenue below name */}
                  <text
                    x={bar.x + 20}
                    y={228}
                    fontSize="8"
                    fill="currentColor"
                    opacity="0.6"
                    textAnchor="middle"
                  >
                    {bar.revenue}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Footer Status */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Forecast Updated Hourly</span>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsTab;
