import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Upload, 
  Download, 
  Play,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Image,
  Video,
  QrCode,
  FileImage,
  Eye,
  ExternalLink,
  Shield,
  Activity,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import ReactPlayer from 'react-player';

const MediaLibraryTab = () => {
  const [mediaFolders, setMediaFolders] = useState([
    {
      system: "DroneShow",
      type: "Video",
      files: "24",
      updated: "18 Oct 12:50",
      integrity: "100%",
      status: "verified",
      icon: "drone"
    },
    {
      system: "Billboard",
      type: "Image",
      files: "120",
      updated: "18 Oct 11:50",
      integrity: "99%",
      status: "verified",
      icon: "billboard"
    },
    {
      system: "QR Proof Hashes",
      type: "",
      files: "2,304",
      updated: "18 Oct 11:47",
      integrity: "99%",
      status: "verified",
      icon: "qr"
    },
    {
      system: "Sponsor Logos",
      type: "PDF",
      files: "",
      updated: "18 Oct 10:30",
      integrity: "Pending",
      status: "pending",
      icon: "document"
    },
    {
      system: "Press Releases",
      type: "",
      files: "312 K",
      updated: "18 Oct 10:03",
      integrity: "Published",
      status: "published",
      icon: "document"
    }
  ]);

  const [integrityScore, setIntegrityScore] = useState(99);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [videoUrls, setVideoUrls] = useState<{[key: string]: string}>({
    "DroneShow": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "Billboard": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "QR Proof Hashes": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "Sponsor Content": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "Campaign Assets": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "User Generated": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "Analytics Data": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "Backup Archive": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  });

  // Real-time updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (!isLive) return;

      // Update integrity score with small variations
      setIntegrityScore(prev => {
        const variation = (Math.random() - 0.5) * 2; // ±1%
        return Math.max(95, Math.min(100, Math.round(prev + variation)));
      });

      // Update media folders with realistic variations
      setMediaFolders(prevFolders => {
        return prevFolders.map(folder => {
          if (folder.status === "verified") {
            const currentIntegrity = parseInt(folder.integrity.replace('%', ''));
            const variation = (Math.random() - 0.5) * 2; // ±1%
            const newIntegrity = Math.max(95, Math.min(100, Math.round(currentIntegrity + variation)));
            
            return {
              ...folder,
              integrity: `${newIntegrity}%`
            };
          }
          return folder;
        });
      });

      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(updateInterval);
  }, [isLive]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <div className="w-3 h-3 bg-teal-400 rounded-full"></div>;
      case "pending": return <div className="w-3 h-3 bg-orange-400 rounded-full"></div>;
      case "published": return <div className="w-3 h-3 bg-green-400 rounded-full"></div>;
      case "error": return <div className="w-3 h-3 bg-red-400 rounded-full"></div>;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
    }
  };

  const getIntegrityColor = (integrity: string) => {
    if (integrity.includes('%')) {
      const value = parseInt(integrity.replace('%', ''));
      if (value >= 99) return "text-green-400";
      if (value >= 95) return "text-yellow-400";
      return "text-red-400";
    }
    if (integrity === "Pending") return "text-orange-400";
    if (integrity === "Published") return "text-green-400";
    return "text-gray-400";
  };

  const getSystemIcon = (icon: string) => {
    switch (icon) {
      case "drone": return <Activity className="h-5 w-5 text-cyan-400" />;
      case "billboard": return <Image className="h-5 w-5 text-green-400" />;
      case "qr": return <QrCode className="h-5 w-5 text-purple-400" />;
      case "document": return <FileText className="h-5 w-5 text-orange-400" />;
      default: return <FileImage className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleUploadNewProof = () => {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.jpeg,.png,.mp4,.mov,.avi,.pdf,.txt';
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        // Simulate upload process
        const uploadPromises = files.map((file, index) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              // Add new media folder to the list
              const newFolder = {
                system: `Upload_${Date.now()}_${index}`,
                type: file.type.startsWith('image/') ? 'Image' : 
                      file.type.startsWith('video/') ? 'Video' : 'Document',
                files: '1',
                updated: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0, 5),
                integrity: '100%',
                status: 'verified',
                icon: file.type.startsWith('image/') ? 'image' : 
                      file.type.startsWith('video/') ? 'video' : 'document'
              };
              
              setMediaFolders(prev => [newFolder, ...prev]);
              resolve(file.name);
            }, 1000 + index * 500); // Staggered upload simulation
          });
        });
        
        Promise.all(uploadPromises).then((fileNames) => {
          alert(`Successfully uploaded ${fileNames.length} files: ${fileNames.join(', ')}`);
        });
      }
    };
    
    input.click();
  };

  const handleMediaClick = (mediaType: string) => {
    setSelectedMedia(mediaType);
    setShowMediaDialog(true);
  };

  const handleExportMetadata = async () => {
    try {
      const pdf = new jsPDF();
      
      // Header
      pdf.setFontSize(20);
      pdf.text('KARDIVERSE MEDIA METADATA REPORT', 20, 30);
      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 40);
      pdf.text('Media & Proof Library Analysis', 20, 50);
      
      // Draw line separator
      pdf.setDrawColor(0, 0, 0);
      pdf.line(20, 55, 190, 55);
      
      // Media Folders Section
      pdf.setFontSize(16);
      pdf.text('MEDIA FOLDERS & TAGS', 20, 70);
      
      pdf.setFontSize(12);
      let yPos = 80;
      const lineHeight = 8;
      
      mediaFolders.forEach((folder, index) => {
        pdf.text(`${folder.system}:`, 20, yPos);
        pdf.text(`  Type: ${folder.type || 'N/A'}`, 20, yPos + lineHeight);
        pdf.text(`  Files: ${folder.files || 'N/A'}`, 20, yPos + lineHeight * 2);
        pdf.text(`  Updated: ${folder.updated}`, 20, yPos + lineHeight * 3);
        pdf.text(`  Integrity: ${folder.integrity}`, 20, yPos + lineHeight * 4);
        yPos += lineHeight * 6;
      });
      
      // Integrity Summary
      yPos += 10;
      pdf.setFontSize(16);
      pdf.text('INTEGRITY SUMMARY', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      pdf.text(`Overall Integrity Score: ${integrityScore}%`, 20, yPos);
      pdf.text('All media verified against ProofHashes', 20, yPos + lineHeight);
      pdf.text('No tampering detected', 20, yPos + lineHeight * 2);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('This document is digitally signed and verified by Kardiverse Media System', 20, 280);
      pdf.text('For verification, contact support or visit the media library portal', 20, 285);
      
      // Save the PDF
      const fileName = `media-metadata-report-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      // Update media folders to show export activity
      setMediaFolders(prev => prev.map(folder => ({
        ...folder,
        updated: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0, 5)
      })));
      
      alert(`Media metadata exported successfully as ${fileName}. Report includes ${mediaFolders.length} media folders with integrity verification.`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleOpenInPlayer = () => {
    // Create a comprehensive media player data structure
    const mediaPlayerData = {
      timestamp: new Date().toISOString(),
      playerVersion: "Kardiverse Media Player v2.1",
      totalMediaItems: mediaFolders.reduce((total, folder) => total + parseInt(folder.files.replace(',', '')), 0),
      mediaFolders: mediaFolders.map(folder => ({
        name: folder.system,
        type: folder.type,
        fileCount: folder.files,
        integrity: folder.integrity,
        lastUpdated: folder.updated,
        status: folder.status,
        videoUrl: videoUrls[folder.system] || null,
        previewUrl: `https://kardiverse-media.com/preview/${folder.system.toLowerCase().replace(/\s+/g, '-')}`,
        downloadUrl: `https://kardiverse-media.com/download/${folder.system.toLowerCase().replace(/\s+/g, '-')}`,
        metadata: {
          resolution: folder.type === 'Video' ? '1920x1080' : folder.type === 'Image' ? '4K' : 'N/A',
          duration: folder.type === 'Video' ? '2:30' : 'N/A',
          fileSize: folder.type === 'Video' ? '45.2 MB' : folder.type === 'Image' ? '12.8 MB' : '2.1 MB',
          format: folder.type === 'Video' ? 'MP4' : folder.type === 'Image' ? 'PNG' : 'PDF'
        }
      })),
      playerSettings: {
        autoPlay: false,
        quality: 'auto',
        subtitles: true,
        fullscreen: true
      },
      analytics: {
        totalViews: 15420,
        uniqueViewers: 8920,
        averageWatchTime: '1:45',
        completionRate: '78%'
      }
    };
    
    // Create a new window/tab with media player interface
    const playerWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
    if (playerWindow) {
      playerWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Kardiverse Media Player</title>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/react-player@2.16.0/dist/ReactPlayer.standalone.js"></script>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0; 
              padding: 20px; 
              background: #0f172a; 
              color: white; 
            }
            .header { 
              background: #1e293b; 
              padding: 20px; 
              border-radius: 8px; 
              margin-bottom: 20px; 
            }
            .media-grid { 
              display: grid; 
              grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); 
              gap: 20px; 
            }
            .media-item { 
              background: #1e293b; 
              padding: 15px; 
              border-radius: 8px; 
              border: 1px solid #334155; 
            }
            .media-item h3 { 
              margin: 0 0 10px 0; 
              color: #60a5fa; 
            }
            .media-info { 
              font-size: 14px; 
              color: #94a3b8; 
              margin: 5px 0; 
            }
            .play-button { 
              background: #00ffff; 
              color: white; 
              border: none; 
              padding: 8px 16px; 
              border-radius: 4px; 
              cursor: pointer; 
              margin-top: 10px; 
              margin-right: 10px;
            }
            .video-player {
              width: 100%;
              height: 200px;
              margin-top: 10px;
              border-radius: 8px;
              overflow: hidden;
            }
            .stats { 
              background: #1e293b; 
              padding: 15px; 
              border-radius: 8px; 
              margin-top: 20px; 
            }
            .hidden { display: none; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎬 Kardiverse Media Player</h1>
            <p>Total Media Items: ${mediaPlayerData.totalMediaItems} | Player Version: ${mediaPlayerData.playerVersion}</p>
          </div>
          
          <div class="media-grid">
            ${mediaPlayerData.mediaFolders.map(folder => `
              <div class="media-item">
                <h3>${folder.name}</h3>
                <div class="media-info">Type: ${folder.type}</div>
                <div class="media-info">Files: ${folder.fileCount}</div>
                <div class="media-info">Integrity: ${folder.integrity}</div>
                <div class="media-info">Updated: ${folder.lastUpdated}</div>
                <div class="media-info">Resolution: ${folder.metadata.resolution}</div>
                <div class="media-info">Format: ${folder.metadata.format}</div>
                ${folder.videoUrl ? `
                  <button class="play-button" onclick="toggleVideo('${folder.name}')">▶ Play Video</button>
                  <div id="player-${folder.name}" class="video-player hidden">
                    <div id="react-player-${folder.name}"></div>
                  </div>
                ` : `
                  <button class="play-button" onclick="playMedia('${folder.name}')">▶ Play</button>
                `}
              </div>
            `).join('')}
          </div>
          
          <div class="stats">
            <h3>📊 Analytics</h3>
            <div class="media-info">Total Views: ${mediaPlayerData.analytics.totalViews.toLocaleString()}</div>
            <div class="media-info">Unique Viewers: ${mediaPlayerData.analytics.uniqueViewers.toLocaleString()}</div>
            <div class="media-info">Average Watch Time: ${mediaPlayerData.analytics.averageWatchTime}</div>
            <div class="media-info">Completion Rate: ${mediaPlayerData.analytics.completionRate}</div>
          </div>
          
          <script>
            const mediaData = ${JSON.stringify(mediaPlayerData)};
            
            function toggleVideo(folderName) {
              const playerDiv = document.getElementById('player-' + folderName);
              const isHidden = playerDiv.classList.contains('hidden');
              
              if (isHidden) {
                playerDiv.classList.remove('hidden');
                const videoUrl = mediaData.mediaFolders.find(f => f.name === folderName).videoUrl;
                
                // Create React Player
                const playerElement = document.getElementById('react-player-' + folderName);
                const player = React.createElement(ReactPlayer.default, {
                  url: videoUrl,
                  controls: true,
                  width: '100%',
                  height: '200px',
                  playing: true
                });
                
                ReactDOM.render(player, playerElement);
              } else {
                playerDiv.classList.add('hidden');
                const playerElement = document.getElementById('react-player-' + folderName);
                ReactDOM.unmountComponentAtNode(playerElement);
              }
            }
            
            function playMedia(mediaName) {
              alert('Playing: ' + mediaName + '\\n\\nThis would open the media in the integrated player with full controls, quality options, and analytics tracking.');
            }
          </script>
        </body>
        </html>
      `);
      playerWindow.document.close();
      
      alert(`Media Player opened in new window! Available ${mediaPlayerData.totalMediaItems} media items across ${mediaPlayerData.mediaFolders.length} folders. Click "Play Video" to watch MP4 content!`);
    } else {
      alert("Unable to open media player. Please allow popups for this site and try again.");
    }
  };

  const handleExportAllProofs = () => {
    alert("Redirecting to Audit Monitor (Tab 4)... This will open the proof audit system for comprehensive verification.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white neon-text">Tab 8 - Media & Proof Library</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <ChevronDown className="h-4 w-4 text-cyan-400 icon-glow" />
              <span className="text-sm text-cyan-400 text-glow">Library Synced</span>
            </div>
            <span className="text-sm text-slate-400 text-glow">24 Active Campaigns</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Media Folders & Tags */}
        <div className="lg:col-span-2 space-y-6">
          {/* Media Folders & Tags Table */}
          <Card className="bg-card border-border card-glow border border-cyan-400/20">
            <CardHeader>
              <CardTitle className="text-xl text-white neon-text">Media Folders & Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">System</TableHead>
                      <TableHead className="text-slate-300">Type</TableHead>
                      <TableHead className="text-slate-300">Files</TableHead>
                      <TableHead className="text-slate-300">Updated</TableHead>
                      <TableHead className="text-slate-300">Integrity</TableHead>
                      <TableHead className="text-slate-300"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mediaFolders.map((folder, index) => (
                      <TableRow key={index} className="border-slate-700 hover:bg-slate-700/50 glow-on-hover">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {getSystemIcon(folder.icon)}
                            <span className="text-white font-medium text-glow">{folder.system}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{folder.type || '-'}</TableCell>
                        <TableCell className="text-white">{folder.files || '-'}</TableCell>
                        <TableCell className="text-white">{folder.updated}</TableCell>
                        <TableCell>
                          <span className={`font-medium text-glow ${getIntegrityColor(folder.integrity)}`}>
                            {folder.integrity}
                          </span>
                        </TableCell>
                        <TableCell>
                          <ChevronDown className="h-4 w-4 text-slate-400 cursor-pointer hover:text-white icon-glow" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Media Previews */}
          <Card className="bg-card border-border card-glow border border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-xl text-white neon-text">Media Previews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {/* Media A */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-24 h-24 bg-slate-700 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden media-card-glow cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleMediaClick('Media A')}
                  >
                    <Play className="h-8 w-8 text-cyan-400 icon-glow relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-cyan-400/30 animate-pulse"></div>
                    </div>
                  </div>
                  <span className="text-sm text-white text-glow text-center">Media A</span>
                </div>

                {/* Media B */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-24 h-24 bg-slate-700 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden media-card-glow cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleMediaClick('Media B')}
                  >
                    <QrCode className="h-8 w-8 text-white icon-glow relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/10 rounded-lg"></div>
                    </div>
                  </div>
                  <span className="text-sm text-white text-glow text-center">Media B</span>
                </div>

                {/* Media C */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-24 h-24 bg-slate-700 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden media-card-glow cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleMediaClick('Media C')}
                  >
                    <span className="text-2xl font-bold text-white text-glow relative z-10">0991</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg"></div>
                  </div>
                  <span className="text-sm text-white text-glow text-center">Media C</span>
                </div>
              </div>

              {/* AI Media Inspector Legend */}
              <div className="mt-6 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-400 rounded-full icon-glow"></div>
                  <span className="text-sm text-white text-glow">Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full icon-glow"></div>
                  <span className="text-sm text-white text-glow">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full icon-glow"></div>
                  <span className="text-sm text-white text-glow">Error</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - AI Media Inspector */}
        <div className="space-y-6">
          {/* Integrity Gauge */}
          <Card className="bg-card border-border card-glow border border-green-400/20">
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
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - integrityScore / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white neon-text">{integrityScore}%</span>
                  </div>
                </div>
                <span className="text-sm text-white uppercase tracking-wide text-glow">Integrity</span>
              </div>
            </CardContent>
          </Card>

          {/* Status Text */}
          <Card className="bg-card border-border card-glow border border-blue-400/20">
            <CardContent className="p-4">
              <div className="space-y-2 text-center">
                <p className="text-sm text-slate-300 text-glow">All media verified against</p>
                <p className="text-sm text-cyan-400 font-medium neon-text">ProofHashes</p>
                <p className="text-sm text-green-400 text-glow">No tampering detected</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="bg-card border-border card-glow border border-orange-400/20">
            <CardContent className="space-y-3">
              <Button
                onClick={handleUploadNewProof}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white button-glow glow-on-hover"
              >
                <Upload className="h-4 w-4 mr-2 icon-glow" />
                Upload New Proof
              </Button>
              <Button
                variant="outline"
                onClick={handleExportMetadata}
                className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 button-glow glow-on-hover"
              >
                <Download className="h-4 w-4 mr-2 icon-glow" />
                Export Metadata
              </Button>
              <Button
                variant="outline"
                onClick={handleOpenInPlayer}
                className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 button-glow glow-on-hover"
              >
                <Play className="h-4 w-4 mr-2 icon-glow" />
                Open in Player
              </Button>
            </CardContent>
          </Card>

          {/* Export All Proofs Link */}
          <div className="text-center">
            <button
              onClick={handleExportAllProofs}
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mx-auto glow-on-hover"
            >
              <span className="text-glow">Export All Proofs</span>
              <ExternalLink className="h-4 w-4 icon-glow" />
              <span className="text-glow">→ Audit Monitor (Tab 4)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Media Preview Dialog */}
      <Dialog open={showMediaDialog} onOpenChange={setShowMediaDialog}>
        <DialogContent className="sm:max-w-2xl bg-card border-border card-glow">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl neon-text">Media Preview: {selectedMedia}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMediaDialog(false)}
                className="hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="mt-4">
            {selectedMedia === 'Media A' && (
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <Play className="h-16 w-16 text-cyan-400 icon-glow cursor-pointer" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Video Content</p>
                  <p className="text-xs text-muted-foreground">Duration: 2m 34s | Resolution: 1080p</p>
                </div>
              </div>
            )}
            {selectedMedia === 'Media B' && (
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <QrCode className="h-32 w-32 text-white icon-glow" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">QR Code Preview</p>
                  <p className="text-xs text-muted-foreground">Size: 512x512 | Format: SVG</p>
                </div>
              </div>
            )}
            {selectedMedia === 'Media C' && (
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-6xl font-bold text-white text-glow">0991</span>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Media ID: 0991</p>
                  <p className="text-xs text-muted-foreground">Status: Active | Type: Image Asset</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaLibraryTab;
