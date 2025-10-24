import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  ExternalLink,
  Eye,
  FileText,
  QrCode,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import QRCodeLib from 'qrcode';
import jsPDF from 'jspdf';

const ProofAuditTab = () => {
  const [selectedProof, setSelectedProof] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [proofData, setProofData] = useState([
    {
      uid: "UID-A421",
      block: "Block-#",
      timestamp: "10 Oct 2025",
      geoLocation: "Nairobi (JKIA)",
      hash: "0x8f...b7",
      status: "Verified"
    },
    {
      uid: "UID-B319",
      block: "10 Oct 2025",
      timestamp: "10 Oct 2025",
      geoLocation: "Amsterdam Central",
      hash: "0x7d...9a",
      status: "Pending"
    },
    {
      uid: "UID-C882",
      block: "10 Oct 2025",
      timestamp: "10 Oct 2025",
      geoLocation: "Heathrow T5",
      hash: "0x6a.dd",
      status: "Error"
    }
  ]);

  const [blockchainProofs, setBlockchainProofs] = useState([
    { hash: "d8a2...bff9", timestamp: "10 Oct 2025 08:31" },
    { hash: "0x7d2...9a32", timestamp: "" },
    { hash: "0ac4...dd40", timestamp: "" }
  ]);

  // Real-time data updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (!isLive) return;

      // Update proof data with realistic variations
      setProofData(prevData => {
        return prevData.map(proof => {
          // Random chance to update status (5% chance every 3 seconds)
          if (Math.random() < 0.05) {
            const statuses = ["Verified", "Pending", "Error"];
            const currentIndex = statuses.indexOf(proof.status);
            const newStatus = statuses[(currentIndex + 1) % statuses.length];
            
            return {
              ...proof,
              status: newStatus,
              timestamp: new Date().toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })
            };
          }
          return proof;
        });
      });

      // Update blockchain proofs with new entries
      setBlockchainProofs(prevProofs => {
        // Random chance to add new blockchain proof (3% chance every 5 seconds)
        if (Math.random() < 0.03) {
          const newHash = `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`;
          const newTimestamp = new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          
          return [
            { hash: newHash, timestamp: newTimestamp },
            ...prevProofs.slice(0, 2) // Keep only latest 3
          ];
        }
        return prevProofs;
      });

      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(updateInterval);
  }, [isLive]);

  // Generate QR code when component mounts or proof selection changes
  useEffect(() => {
    generateQRCode();
  }, [selectedProof]);

  // Generate scannable QR code data
  const generateQRData = () => {
    const selectedProofData = proofData[selectedProof];
    const qrData = {
      uid: selectedProofData.uid,
      hash: selectedProofData.hash,
      timestamp: selectedProofData.timestamp,
      location: selectedProofData.geoLocation,
      status: selectedProofData.status,
      blockchainProofs: blockchainProofs,
      signature: "Adv, Myvangi-Kardiverse Notary Chain",
      verificationUrl: `https://kardiverse.com/verify/${selectedProofData.uid}`,
      generatedAt: new Date().toISOString()
    };
    
    return JSON.stringify(qrData, null, 2);
  };

  // Generate real QR code
  const generateQRCode = async () => {
    try {
      const qrData = generateQRData();
      const canvas = canvasRef.current;
      
      if (canvas) {
        // Clear canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        // Generate QR code
        await QRCodeLib.toCanvas(canvas, qrData, {
          width: 128,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        });
        
        // Convert to data URL for display
        const dataURL = canvas.toDataURL('image/png');
        setQrCodeDataURL(dataURL);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-2 h-2 text-white" />
        </div>;
      case "Pending":
        return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>;
      case "Error":
        return <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>;
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full"></div>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified": return "text-green-400";
      case "Pending": return "text-yellow-400";
      case "Error": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const handleVerifyOnBlockchain = () => {
    alert("Verifying proof on blockchain...");
  };

  const handleExportAuditPDF = async () => {
    try {
      const pdf = new jsPDF();
      const selectedProofData = proofData[selectedProof];
      
      // Set up PDF styling
      pdf.setFontSize(20);
      pdf.setTextColor(0, 0, 0);
      
      // Header
      pdf.text('KARDIVERSE PROOF AUDIT REPORT', 20, 30);
      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 40);
      pdf.text(`Report ID: ${selectedProofData.uid}`, 20, 50);
      
      // Draw line separator
      pdf.setDrawColor(0, 0, 0);
      pdf.line(20, 55, 190, 55);
      
      // Proof Details Section
      pdf.setFontSize(16);
      pdf.text('PROOF DETAILS', 20, 70);
      
      pdf.setFontSize(12);
      let yPos = 80;
      const lineHeight = 8;
      
      pdf.text(`UID: ${selectedProofData.uid}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Block: ${selectedProofData.block}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Timestamp: ${selectedProofData.timestamp}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Location: ${selectedProofData.geoLocation}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Hash: ${selectedProofData.hash}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Status: ${selectedProofData.status}`, 20, yPos);
      
      // Blockchain Proofs Section
      yPos += 15;
      pdf.setFontSize(16);
      pdf.text('BLOCKCHAIN PROOFS', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      
      blockchainProofs.forEach((proof, index) => {
        pdf.text(`${index + 1}. ${proof.hash}`, 20, yPos);
        yPos += lineHeight;
        if (proof.timestamp) {
          pdf.text(`   Timestamp: ${proof.timestamp}`, 20, yPos);
          yPos += lineHeight;
        }
      });
      
      // QR Code Section
      yPos += 15;
      pdf.setFontSize(16);
      pdf.text('VERIFICATION QR CODE', 20, yPos);
      
      // Add QR code to PDF
      if (qrCodeDataURL) {
        try {
          // Convert data URL to base64
          const base64Data = qrCodeDataURL.split(',')[1];
          pdf.addImage(base64Data, 'PNG', 20, yPos + 10, 40, 40);
        } catch (error) {
          pdf.setFontSize(10);
          pdf.text('QR Code: Available in digital format', 20, yPos + 30);
        }
      }
      
      // Verification URL
      yPos += 60;
      pdf.setFontSize(12);
      pdf.text('Verification URL:', 20, yPos);
      pdf.setFontSize(10);
      pdf.text(`https://kardiverse.com/verify/${selectedProofData.uid}`, 20, yPos + 8);
      
      // Signature Section
      yPos += 25;
      pdf.setFontSize(16);
      pdf.text('DIGITAL SIGNATURE', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      pdf.text('Signed by: Adv, Myvangi-Kardiverse Notary Chain', 20, yPos);
      yPos += lineHeight;
      pdf.text(`Signature Hash: ${selectedProofData.hash}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Generated At: ${new Date().toISOString()}`, 20, yPos);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('This document is digitally signed and verified by Kardiverse Blockchain System', 20, 280);
      pdf.text('For verification, scan the QR code or visit the verification URL', 20, 285);
      
      // Save the PDF
      const fileName = `audit-report-${selectedProofData.uid}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      alert(`Audit PDF exported successfully as ${fileName}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleExportAllProofs = () => {
    alert("Redirecting to Accounting Dashboard...");
  };

  const handleCopyQRData = async () => {
    try {
      await navigator.clipboard.writeText(generateQRData());
      alert("QR Code data copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy QR data:', err);
      alert("Failed to copy QR data to clipboard");
    }
  };

  const handleDownloadQRCode = () => {
    if (qrCodeDataURL) {
      const link = document.createElement('a');
      link.download = `proof-qr-${proofData[selectedProof].uid}.png`;
      link.href = qrCodeDataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("QR Code downloaded successfully!");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen p-6">
      {/* Header */}
          <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tab 4 - Proof & Audit Monitor</h1>
          {isLive && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-500 font-medium">Live Data</span>
              <span className="text-xs text-slate-400">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
              isLive 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            {isLive ? 'Live Updates' : 'Paused'}
          </button>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          </div>
              </div>
              </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Proof */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white">Proof</CardTitle>
              {isLive && (
                <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">LIVE</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">UID</TableHead>
                    <TableHead className="text-slate-300">Block</TableHead>
                    <TableHead className="text-slate-300">Timestamp</TableHead>
                    <TableHead className="text-slate-300">Geo-Location</TableHead>
                    <TableHead className="text-slate-300">Hash</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proofData.map((proof, index) => (
                    <TableRow 
                      key={index} 
                      className={`border-slate-700 hover:bg-slate-700/50 cursor-pointer ${
                        selectedProof === index ? 'bg-slate-700/30' : ''
                      }`}
                      onClick={() => setSelectedProof(index)}
                    >
                      <TableCell className="text-white font-medium">{proof.uid}</TableCell>
                      <TableCell className="text-white">{proof.block}</TableCell>
                      <TableCell className="text-white">{proof.timestamp}</TableCell>
                      <TableCell className="text-white">{proof.geoLocation}</TableCell>
                      <TableCell className="text-white font-mono text-sm">{proof.hash}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(proof.status)}
                          <span className={`text-sm ${getStatusColor(proof.status)}`}>
                            {proof.status}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-2 h-2 text-white" />
                </div>
                <span className="text-slate-300">Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-300">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
            </div>
                <span className="text-slate-300">Error</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Audit Detail */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Audit Detail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Blockchain Proof Viewer */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Blockchain Proof Viewer</h3>
                {isLive && (
                  <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">LIVE</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {blockchainProofs.map((proof, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-slate-700/50 rounded">
                    <div className={`w-2 h-2 bg-cyan-400 rounded-full ${isLive ? 'animate-pulse' : ''}`}></div>
                    <div className="flex-1">
                      <div className="text-white font-mono text-sm">{proof.hash}</div>
                      {proof.timestamp && (
                        <div className="text-slate-400 text-xs">{proof.timestamp}</div>
                      )}
                    </div>
                    {isLive && index === 0 && (
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">NEW</span>
                      </div>
                    )}
                </div>
                ))}
              </div>
            </div>

            {/* Snapshot Preview */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Snapshot Preview</h3>
              <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded">
                <div className="flex-1">
                  <p className="text-slate-300 text-sm">
                    Signed by Adv, Myvangi-Kardiverse Notary Chain
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    UID: {proofData[selectedProof].uid} | Status: {proofData[selectedProof].status}
                  </p>
                </div>
                <div className="w-16 h-16 bg-white rounded border-2 border-slate-400 flex items-center justify-center relative overflow-hidden">
                  {qrCodeDataURL ? (
                    <img 
                      src={qrCodeDataURL} 
                      alt="QR Code" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <QrCode className="w-8 h-8 text-slate-600" />
                  )}
                </div>
            </div>

              {/* QR Code Data Display */}
              <div className="mt-3 p-3 bg-slate-800/50 rounded text-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-400">QR Code contains:</p>
                    <div className="flex items-center gap-1 bg-cyan-400/20 px-2 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      <span className="text-xs text-cyan-400 font-medium">STATIC</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyQRData}
                      className="h-6 px-2 text-xs border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                    >
                      Copy Data
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleDownloadQRCode}
                      className="h-6 px-2 text-xs border-green-400/50 text-green-400 hover:bg-green-400/10"
                    >
                      Download QR
                    </Button>
                  </div>
                </div>
                <div className="space-y-1 text-slate-300">
                  <div>• Verification URL: https://kardiverse.com/verify/{proofData[selectedProof].uid}</div>
                  <div>• Hash: {proofData[selectedProof].hash}</div>
                  <div>• Location: {proofData[selectedProof].geoLocation}</div>
                  <div>• Timestamp: {proofData[selectedProof].timestamp}</div>
                  <div>• Blockchain Proofs: {blockchainProofs.length} entries</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleVerifyOnBlockchain}
                variant="outline"
                className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                <Shield className="h-4 w-4 mr-2" />
                Verify on Blockchain
              </Button>
              <Button
                onClick={handleExportAuditPDF}
                variant="outline"
                className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Audit PDF
              </Button>
            </div>

            {/* Export All Proofs Link */}
            <div className="pt-4 border-t border-slate-700">
              <button
                onClick={handleExportAllProofs}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Export All Proofs</span>
                <ArrowRight className="h-4 w-4" />
                <span className="text-slate-300">Accounting Dashboard</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hidden canvas for QR code generation */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }} 
        width="128" 
        height="128"
      />
    </div>
  );
};

export default ProofAuditTab;