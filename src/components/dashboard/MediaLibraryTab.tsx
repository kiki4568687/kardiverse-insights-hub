import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image, Upload, Download, Tag } from "lucide-react";

const MediaLibraryTab = () => {
  const mediaItems = [
    { id: 1, type: "image", name: "Campaign_001.jpg", date: "20 Oct 2025", tags: ["Coca-Cola", "Nairobi"], size: "2.4 MB" },
    { id: 2, type: "image", name: "Proof_Scan_283.jpg", date: "20 Oct 2025", tags: ["Safaricom", "NFC"], size: "1.8 MB" },
    { id: 3, type: "video", name: "Droneshow_082.mp4", date: "19 Oct 2025", tags: ["Event", "AR"], size: "24.5 MB" },
    { id: 4, type: "image", name: "QR_Code_Verification.png", date: "19 Oct 2025", tags: ["Audit", "AEI"], size: "0.9 MB" },
    { id: 5, type: "image", name: "Sponsor_Logo_KFC.svg", date: "18 Oct 2025", tags: ["KFC", "Branding"], size: "0.3 MB" },
    { id: 6, type: "image", name: "Heat_Map_Analytics.jpg", date: "18 Oct 2025", tags: ["Analytics", "FOMO"], size: "3.1 MB" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <Card className="border-2 border-primary/50 bg-gradient-to-br from-card to-navy shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Image className="h-6 w-6 text-primary" />
              Media & Proof Library
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
              <Badge className="bg-teal/20 text-teal border-teal/30">
                AI AUTO-TAGGING ACTIVE
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-muted-foreground mt-1">Across all campaigns</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">983</div>
            <p className="text-xs text-success mt-1">+42 this week</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">156</div>
            <p className="text-xs text-success mt-1">+8 this week</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal">24.7 GB</div>
            <p className="text-xs text-muted-foreground mt-1">of 100 GB</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Tagging Info */}
      <Card className="border-2 border-teal/30 bg-card/80">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="h-5 w-5 text-teal" />
            AI Auto-Tagging System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">1,089</div>
              <div className="text-sm text-muted-foreground">Files auto-tagged</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-teal mb-1">98.4%</div>
              <div className="text-sm text-muted-foreground">Accuracy rate</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-secondary mb-1">42</div>
              <div className="text-sm text-muted-foreground">Active tag categories</div>
            </div>
          </div>
          <p className="text-xs text-teal mt-4">
            AI automatically detects sponsors, locations, event types, and campaign elements in uploaded media
          </p>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <Card className="border-border bg-card/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Media</CardTitle>
            <Button size="sm" variant="outline" className="border-primary">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems.map((item) => (
              <div key={item.id} className="group relative bg-muted rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all">
                {/* Media Preview */}
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <Image className="h-12 w-12 text-muted-foreground/30" />
                </div>

                {/* Media Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.date} • {item.size}</p>
                    </div>
                    <Badge variant="outline" className="border-primary text-primary text-xs shrink-0">
                      {item.type}
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-teal/50 text-teal">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Quick View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="border-border bg-card/80">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="text-teal font-semibold">Smart Organization:</span> All media automatically categorized by sponsor, campaign, date, and event type
            </div>
            <Button size="sm" variant="outline" className="border-primary">
              <Download className="h-3 w-3 mr-2" />
              Bulk Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaLibraryTab;
