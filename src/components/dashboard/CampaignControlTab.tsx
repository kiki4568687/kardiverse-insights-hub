import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { 
  Play, 
  Pause, 
  StopCircle, 
  Download, 
  Upload, 
  Eye, 
  Settings, 
  FileImage, 
  CheckCircle,
  Calendar,
  MapPin,
  Target,
  ArrowRight,
  Smartphone,
  Save,
  Edit
} from "lucide-react";
import { useState, useRef } from "react";

const CampaignControlTab = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Droneshow - Flight Giveaway",
      status: "Active",
      location: "Amsterdam",
      start: "3/10/2024",
      impressions: "920,800",
      ctr: "3.45%",
      version: "50000"
    },
    {
      id: 2,
      name: "OR Hunt - City Teaser",
      status: "Paused",
      location: "2/15/2024",
      start: "2/28/2024",
      impressions: "106,500",
      ctr: "2.15%",
      version: "1.1"
    },
    {
      id: 3,
      name: "AR Pottal - Holiday Promo",
      status: "Draft",
      location: "6/1/2024",
      start: "6/30/2024",
      impressions: "6 km",
      ctr: "-",
      version: "-"
    }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const [campaignForm, setCampaignForm] = useState({
    name: "Droneshow - Flight Giveaway",
    location: "Amsterdam",
    startDate: "2024-03-10",
    endDate: "2024-05-20",
    budget: "50,000",
    orAho: true,
    radius: "3 km",
    arExpre: true
  });

  const [versions, setVersions] = useState([
    { id: "hae27b1f...", name: "Version 1.2" },
    { id: "a402691...", name: "Version 1.1" }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-cyan-400";
      case "Paused": return "bg-yellow-500";
      case "Draft": return "bg-cyan-500";
      case "Ended": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const handleCampaignSelect = (campaign: any) => {
    setSelectedCampaign(campaign);
    setCampaignForm({
      name: campaign.name,
      location: campaign.location,
      startDate: campaign.start.replace(/\//g, '-'),
      endDate: campaign.start.replace(/\//g, '-'),
      budget: campaign.version,
      orAho: true,
      radius: "3 km",
      arExpre: true
    });
  };

  const handleFormChange = (field: string, value: any) => {
    setCampaignForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveVersion = async () => {
    if (!campaignForm.name.trim()) {
      setSaveMessage("Please enter a campaign name");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }

    if (!campaignForm.location.trim()) {
      setSaveMessage("Please enter a location");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }

    if (!campaignForm.budget.trim()) {
      setSaveMessage("Please enter a budget");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    // Simulate save process
    setTimeout(() => {
      // Update the selected campaign with new form data
      const updatedCampaigns = campaigns.map(campaign => 
        campaign.id === selectedCampaign.id 
          ? {
              ...campaign,
              name: campaignForm.name,
              location: campaignForm.location,
              start: campaignForm.startDate,
              version: campaignForm.budget
            }
          : campaign
      );
      
      setCampaigns(updatedCampaigns);
      setSelectedCampaign({
        ...selectedCampaign,
        name: campaignForm.name,
        location: campaignForm.location,
        start: campaignForm.startDate,
        version: campaignForm.budget
      });

      setIsSaving(false);
      setSaveMessage("✅ Campaign saved successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000);
    }, 1500);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    // Generate PDF content
    const pdfContent = generatePDFContent();
    
    // Simulate PDF generation delay
    setTimeout(() => {
      // Create and download PDF
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `campaign-report-${selectedCampaign.name.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
      alert("📄 PDF exported successfully!");
    }, 2000);
  };

  const generatePDFContent = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
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
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
/F2 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
>>
>>
>>
endobj

4 0 obj
<<
/Length ${generatePDFText().length}
>>
stream
${generatePDFText()}
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
${297 + generatePDFText().length}
%%EOF`;
  };

  const generatePDFText = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    return `BT
/F2 18 Tf
50 750 Td
(Kardiverse Campaign Report) Tj
/F1 12 Tf
50 720 Td
(Generated: ${currentDate} at ${currentTime}) Tj

/F2 14 Tf
50 680 Td
(Campaign Details) Tj
/F1 12 Tf
50 660 Td
(Name: ${selectedCampaign.name}) Tj
50 640 Td
(Status: ${selectedCampaign.status}) Tj
50 620 Td
(Location: ${selectedCampaign.location}) Tj
50 600 Td
(Start Date: ${selectedCampaign.start}) Tj
50 580 Td
(Impressions: ${selectedCampaign.impressions}) Tj
50 560 Td
(CTR: ${selectedCampaign.ctr}) Tj
50 540 Td
(Version: ${selectedCampaign.version}) Tj

/F2 14 Tf
50 500 Td
(Form Data) Tj
/F1 12 Tf
50 480 Td
(Campaign Name: ${campaignForm.name}) Tj
50 460 Td
(Location: ${campaignForm.location}) Tj
50 440 Td
(Start Date: ${campaignForm.startDate}) Tj
50 420 Td
(End Date: ${campaignForm.endDate}) Tj
50 400 Td
(Budget: ${campaignForm.budget}) Tj
50 380 Td
(Radius: ${campaignForm.radius}) Tj
50 360 Td
(OR Aho: ${campaignForm.orAho ? 'Enabled' : 'Disabled'}) Tj
50 340 Td
(AR Expre: ${campaignForm.arExpre ? 'Enabled' : 'Disabled'}) Tj

/F2 14 Tf
50 300 Td
(All Campaigns Summary) Tj
/F1 12 Tf
${campaigns.map((campaign, index) => {
      const y = 280 - (index * 20);
      return `50 ${y} Td
(${campaign.name} - ${campaign.status} - ${campaign.impressions} impressions) Tj`;
    }).join('\n')}

/F2 14 Tf
50 100 Td
(Report Information) Tj
/F1 12 Tf
50 80 Td
(This report was generated by the Kardiverse Campaign Control Center) Tj
50 60 Td
(For support, contact: support@kardiverse.com) Tj
50 40 Td
(Report ID: ${Date.now()}) Tj
ET`;
  };

  const [enteringCampaign, setEnteringCampaign] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showStatusDetails, setShowStatusDetails] = useState(false);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const handleEnterNow = async () => {
    setShowPhoneDialog(true);
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber.trim()) {
      alert("Please enter a valid phone number");
      return;
    }

    setEnteringCampaign("preview");
    setShowPhoneDialog(false);
    
    // Simulate loading/redirect process
    setTimeout(() => {
      setEnteringCampaign(null);
      alert(`🎉 Successfully entered ${selectedCampaign.name} campaign!\n\nPhone: ${phoneNumber}\nYou're now participating in the giveaway. Good luck!`);
      setPhoneNumber("");
    }, 1500);
  };

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
    setShowStatusDetails(true);
    
    // Filter campaigns by status
    const filteredCampaigns = campaigns.filter(campaign => campaign.status === status);
    
    if (filteredCampaigns.length > 0) {
      setSelectedCampaign(filteredCampaigns[0]);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Active":
        return {
          count: campaigns.filter(c => c.status === "Active").length,
          description: "Campaigns currently running and collecting impressions",
          color: "blue",
          icon: "▶️"
        };
      case "Paused":
        return {
          count: campaigns.filter(c => c.status === "Paused").length,
          description: "Campaigns temporarily stopped but can be resumed",
          color: "yellow",
          icon: "⏸️"
        };
      case "Draft":
        return {
          count: campaigns.filter(c => c.status === "Draft").length,
          description: "Campaigns in development, not yet launched",
          color: "cyan",
          icon: "📝"
        };
      case "Ended":
        return {
          count: campaigns.filter(c => c.status === "Ended").length,
          description: "Completed campaigns with final results",
          color: "gray",
          icon: "🏁"
        };
      default:
        return { count: 0, description: "", color: "gray", icon: "" };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen p-6">
      {/* Header */}
          <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Campaign Control Center</h1>
          <p className="text-lg text-slate-300">AI</p>
            </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          </div>
          <span className="text-white font-semibold">Kardiverse</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Campaigns Section */}
          <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
              <CardTitle className="text-xl text-white">Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Campaign</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Location</TableHead>
                      <TableHead className="text-slate-300">Start</TableHead>
                      <TableHead className="text-slate-300">Impressions</TableHead>
                      <TableHead className="text-slate-300">CTR</TableHead>
                      <TableHead className="text-slate-300">Version</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow 
                        key={campaign.id} 
                        className={`border-slate-700 hover:bg-slate-700/50 cursor-pointer ${
                          selectedCampaign.id === campaign.id ? 'bg-slate-700/30' : ''
                        }`}
                        onClick={() => handleCampaignSelect(campaign)}
                      >
                        <TableCell className="text-white font-medium">{campaign.name}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white">{campaign.location}</TableCell>
                        <TableCell className="text-white">{campaign.start}</TableCell>
                        <TableCell className="text-white">{campaign.impressions}</TableCell>
                        <TableCell className="text-white">{campaign.ctr}</TableCell>
                        <TableCell className="text-white">{campaign.version}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Legend */}
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-slate-300">Active</span>
              </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-300">Paused</span>
            </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-slate-300">Draft</span>
              </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-slate-300">Ended</span>
            </div>
              </div>
          </CardContent>
        </Card>

          {/* Live Preview Section */}
          <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
              <CardTitle className="text-xl text-white">Live Preview</CardTitle>
          </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                {/* Phone Mockup - Single centered */}
                <div className="relative">
                  <div className="w-32 h-56 bg-cyan-400 rounded-2xl p-4 border-2 border-cyan-400 shadow-lg shadow-cyan-400/50">
                    <div className="h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl p-3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white text-sm font-bold mb-2">Flight Giveaway</h3>
                        <p className="text-blue-100 text-xs">Scan to win a free trip to a surprise destination!</p>
              </div>
                      <Button 
                        className={`text-xs py-2 font-semibold transition-all duration-200 ${
                          enteringCampaign === "preview" 
                            ? "bg-blue-200 text-blue-700 animate-pulse" 
                            : "bg-white hover:bg-cyan-50 text-cyan-600"
                        }`}
                        onClick={() => handleEnterNow()}
                        disabled={enteringCampaign !== null}
                      >
                        {enteringCampaign === "preview" ? "Entering..." : "Enter Now"}
                      </Button>
            </div>
                  </div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                {["Active", "Paused", "Draft", "Ended"].map((status) => {
                  const info = getStatusInfo(status);
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusClick(status)}
                      className={`px-3 py-1 rounded-full transition-all duration-200 hover:scale-105 ${
                        selectedStatus === status
                          ? `bg-${info.color}-500/20 border border-${info.color}-500/50 text-${info.color}-400`
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      <span className="mr-1">{info.icon}</span>
                      {status} ({info.count})
                    </button>
                  );
                })}
              </div>
              
              {/* Entry Status */}
              {enteringCampaign && (
                <div className="mt-3 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-3 py-1 bg-cyan-400/20 border border-blue-500/30 rounded-full">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-cyan-400 text-sm font-medium">
                      Entering {selectedCampaign.name}...
                    </span>
                  </div>
                </div>
              )}
              
              {/* Status Details Panel */}
              {showStatusDetails && selectedStatus && (
                <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span>{getStatusInfo(selectedStatus).icon}</span>
                      {selectedStatus} Campaigns
                    </h3>
                    <button
                      onClick={() => setShowStatusDetails(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="text-slate-300 text-sm mb-4">
                    {getStatusInfo(selectedStatus).description}
                  </p>
                  
                  <div className="space-y-2">
                    {campaigns
                      .filter(campaign => campaign.status === selectedStatus)
                      .map((campaign) => (
                        <div
                          key={campaign.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedCampaign.id === campaign.id
                              ? 'bg-cyan-400/20 border border-blue-500/50'
                              : 'bg-slate-600/50 hover:bg-slate-600/70'
                          }`}
                          onClick={() => setSelectedCampaign(campaign)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-medium">{campaign.name}</h4>
                              <p className="text-slate-400 text-sm">{campaign.location}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white text-sm">{campaign.impressions}</p>
                              <p className="text-slate-400 text-xs">{campaign.ctr}</p>
                </div>
              </div>
                        </div>
                      ))}
            </div>

                  {campaigns.filter(c => c.status === selectedStatus).length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-slate-400">No {selectedStatus.toLowerCase()} campaigns found.</p>
              </div>
                  )}
            </div>
              )}
          </CardContent>
        </Card>
      </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Campaign Editor Section */}
          <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
              <CardTitle className="text-xl text-white">Campaign Editor</CardTitle>
        </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300">Name</Label>
                <Input
                  value={campaignForm.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
            </div>

              <div>
                <Label className="text-slate-300">Location</Label>
                <div className="relative">
                  <Input
                    value={campaignForm.location}
                    onChange={(e) => handleFormChange('location', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white pr-8"
                  />
                  <MapPin className="absolute right-2 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Start Date</Label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={campaignForm.startDate}
                      onChange={(e) => handleFormChange('startDate', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pr-8"
                    />
                    <Calendar className="absolute right-2 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>
                <div>
                  <Label className="text-slate-300">End Date</Label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={campaignForm.endDate}
                      onChange={(e) => handleFormChange('endDate', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pr-8"
                    />
                    <Calendar className="absolute right-2 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Budget</Label>
                <Input
                  value={campaignForm.budget}
                  onChange={(e) => handleFormChange('budget', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
            </div>

              <div className="flex items-center justify-between">
                <Label className="text-slate-300">OR Aho</Label>
                <Switch
                  checked={campaignForm.orAho}
                  onCheckedChange={(checked) => handleFormChange('orAho', checked)}
                />
              </div>

              <div>
                <Label className="text-slate-300">Radius</Label>
                <div className="relative">
                  <Input
                    value={campaignForm.radius}
                    onChange={(e) => handleFormChange('radius', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white pr-8"
                  />
                  <Target className="absolute right-2 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

              <div className="flex items-center justify-between">
                <Label className="text-slate-300">AR Expre</Label>
                <Switch
                  checked={campaignForm.arExpre}
                  onCheckedChange={(checked) => handleFormChange('arExpre', checked)}
                />
              </div>

              <Button 
                onClick={handleSaveVersion}
                disabled={isSaving}
                className={`w-full transition-all duration-200 ${
                  isSaving 
                    ? "bg-blue-400 text-white animate-pulse" 
                    : "bg-cyan-400 hover:bg-cyan-500 text-white"
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Version
                  </>
                )}
              </Button>
              
              {/* Save Message */}
              {saveMessage && (
                <div className={`text-center text-sm p-2 rounded mt-2 ${
                  saveMessage.includes("✅") 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}>
                  {saveMessage}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Proof & Versions Section */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Proof & Versions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {versions.map((version, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                    <div className="text-white font-medium">{version.name}</div>
                    <div className="text-slate-400 text-sm">{version.id}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
          </div>
              ))}
              
              <Button 
                onClick={handleExportPDF}
                disabled={isExporting}
                variant="outline"
                className={`w-full border-slate-600 text-slate-300 hover:bg-slate-700 transition-all duration-200 ${
                  isExporting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Exporting PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </>
                )}
              </Button>
        </CardContent>
      </Card>
                  </div>
                </div>
      
      {/* Phone Number Input Dialog */}
      {showPhoneDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-96 border border-slate-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Enter Phone Number</h3>
              <button
                onClick={() => setShowPhoneDialog(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Phone Number</Label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              
              <div className="bg-cyan-400/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-200 text-sm">
                  📱 We'll send you updates about the <strong>{selectedCampaign.name}</strong> campaign
                </p>
            </div>

              <div className="flex gap-3">
                <Button
                  onClick={handlePhoneSubmit}
                  className="flex-1 bg-cyan-400 hover:bg-cyan-500 text-white"
                >
                  Submit & Enter
                </Button>
                <Button
                  onClick={() => setShowPhoneDialog(false)}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          </div>
      )}
    </div>
  );
};

export default CampaignControlTab;