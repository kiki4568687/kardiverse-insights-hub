import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, TrendingUp, Brain, Zap, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

const LiveBiddingSystemTab = () => {
  const [timeLeft, setTimeLeft] = useState(204); // 3:24 in seconds
  const [bidData, setBidData] = useState([
    {
      blockTime: "08:00–12:00",
      location: "Nairobi Airport",
      currentBidder: "Coca-Cola",
      bidAmount: "15,000 pts",
      minBid: "10,000",
      slotsLeft: "010",
      status: "active",
      bidderId: "coca-cola"
    },
    {
      blockTime: "12:00–16:00",
      location: "JKIA Terminal 2",
      currentBidder: "Pepsi Max",
      bidAmount: "12,600 pts",
      minBid: "10,000",
      slotsLeft: "10",
      status: "ending",
      bidderId: "pepsi-max"
    },
    {
      blockTime: "16:00–20:00",
      location: "Amsterdam Central",
      currentBidder: "Nike",
      bidAmount: "9,800 pts",
      minBid: "3,000",
      slotsLeft: "300",
      status: "active",
      bidderId: "nike"
    },
    {
      blockTime: "20:00–00:00",
      location: "Mombasa City",
      currentBidder: "Adidas",
      bidAmount: "11,500 pts",
      minBid: "2,000",
      slotsLeft: "042",
      status: "ending",
      bidderId: "adidas"
    }
  ]);
  const [boostingIndex, setBoostingIndex] = useState<number | null>(null);
  const [boostAmount, setBoostAmount] = useState(1000);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [aiInsights, setAiInsights] = useState([
    { company: "Adidas", prediction: "85%", timeframe: "5 minutes", trend: "+12%", status: "high" },
    { company: "Pepsi", prediction: "72%", timeframe: "3 minutes", trend: "+8%", status: "medium" },
    { company: "Toyota", prediction: "45%", timeframe: "7 minutes", trend: "stable", status: "low" }
  ]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          return 1440; // Reset to 24 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Real-time bid updates
  useEffect(() => {
    const bidUpdateInterval = setInterval(() => {
      if (!isLive) return;

      setBidData(prevBids => {
        return prevBids.map((bid, index) => {
          // Random chance for automatic bid changes (10% chance every 3 seconds)
          if (Math.random() < 0.1 && boostingIndex !== index) {
            const currentBid = parseInt(bid.bidAmount.replace(/[,\s]/g, ''));
            const randomIncrease = Math.floor(Math.random() * 2000) + 100; // 100-2100 increase
            const newBid = currentBid + randomIncrease;
            
            // Reduce slots slightly
            const currentSlots = parseInt(bid.slotsLeft);
            const newSlots = Math.max(0, currentSlots - Math.floor(Math.random() * 2));
            
            return {
              ...bid,
              bidAmount: `${newBid.toLocaleString()} pts`,
              slotsLeft: newSlots.toString().padStart(3, '0'),
              status: newSlots <= 5 ? 'ending' : bid.status
            };
          }
          return bid;
        });
      });

      setLastUpdate(new Date());
    }, 3000); // Update every 3 seconds

    return () => clearInterval(bidUpdateInterval);
  }, [isLive, boostingIndex]);

  // Auto-refresh slots and status
  useEffect(() => {
    const slotRefreshInterval = setInterval(() => {
      if (!isLive) return;

      setBidData(prevBids => {
        return prevBids.map(bid => {
          const currentSlots = parseInt(bid.slotsLeft);
          // Occasionally add slots back (rare, 2% chance)
          if (Math.random() < 0.02 && currentSlots < 50) {
            return {
              ...bid,
              slotsLeft: (currentSlots + 1).toString().padStart(3, '0'),
              status: currentSlots + 1 > 5 ? 'active' : bid.status
            };
          }
          return bid;
        });
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(slotRefreshInterval);
  }, [isLive]);

  // Real-time AI insights updates
  useEffect(() => {
    const aiUpdateInterval = setInterval(() => {
      if (!isLive) return;

      setAiInsights(prevInsights => {
        return prevInsights.map(insight => {
          // Random chance to update AI predictions (15% chance every 4 seconds)
          if (Math.random() < 0.15) {
            const newPrediction = Math.floor(Math.random() * 40) + 50; // 50-90%
            const newTrend = Math.random() < 0.5 ? `+${Math.floor(Math.random() * 20) + 1}%` : "stable";
            const newTimeframe = `${Math.floor(Math.random() * 8) + 1} minutes`;
            
            return {
              ...insight,
              prediction: `${newPrediction}%`,
              timeframe: newTimeframe,
              trend: newTrend,
              status: newPrediction > 80 ? "high" : newPrediction > 60 ? "medium" : "low"
            };
          }
          return insight;
        });
      });
    }, 4000); // Update every 4 seconds

    return () => clearInterval(aiUpdateInterval);
  }, [isLive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "ending": return "bg-orange-500";
      case "closed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleBoost = (index: number) => {
    setBoostingIndex(index);
    
    // Simulate boost processing with delay
    setTimeout(() => {
      const newBidData = [...bidData];
      const currentBid = parseInt(newBidData[index].bidAmount.replace(/[,\s]/g, ''));
      const newBid = currentBid + boostAmount;
      
      // Update bid amount
      newBidData[index].bidAmount = `${newBid.toLocaleString()} pts`;
      
      // Reduce slots left
      const currentSlots = parseInt(newBidData[index].slotsLeft);
      if (currentSlots > 0) {
        newBidData[index].slotsLeft = (currentSlots - 1).toString().padStart(3, '0');
      }
      
      // Update status if slots are running low
      if (parseInt(newBidData[index].slotsLeft) <= 5) {
        newBidData[index].status = "ending";
      }
      
      setBidData(newBidData);
      setBoostingIndex(null);
      
      // Show success feedback
      alert(`Boost successful! ${newBidData[index].currentBidder} bid increased to ${newBidData[index].bidAmount}`);
    }, 1500);
  };

  const handleQuickBoost = (index: number, amount: number) => {
    setBoostingIndex(index);
    
    setTimeout(() => {
      const newBidData = [...bidData];
      const currentBid = parseInt(newBidData[index].bidAmount.replace(/[,\s]/g, ''));
      const newBid = currentBid + amount;
      
      newBidData[index].bidAmount = `${newBid.toLocaleString()} pts`;
      
      const currentSlots = parseInt(newBidData[index].slotsLeft);
      if (currentSlots > 0) {
        newBidData[index].slotsLeft = (currentSlots - 1).toString().padStart(3, '0');
      }
      
      if (parseInt(newBidData[index].slotsLeft) <= 5) {
        newBidData[index].status = "ending";
      }
      
      setBidData(newBidData);
      setBoostingIndex(null);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Bidding System</h1>
          <p className="text-lg text-slate-300">Boost to Top</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          </div>
          <span className="text-white font-bold text-lg">KARDIVERSE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Bid Activity Table */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Bid Activity</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-slate-300">Boost Amount:</label>
                    <select 
                      value={boostAmount} 
                      onChange={(e) => setBoostAmount(parseInt(e.target.value))}
                      className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                    >
                      <option value={500}>500 pts</option>
                      <option value={1000}>1,000 pts</option>
                      <option value={2000}>2,000 pts</option>
                      <option value={5000}>5,000 pts</option>
                      <option value={10000}>10,000 pts</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsLive(!isLive)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                        isLive 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                      {isLive ? 'Live Bidding' : 'Paused'}
                    </button>
                    <span className="text-xs text-slate-400">
                      Last update: {lastUpdate.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Block Time</TableHead>
                      <TableHead className="text-slate-300">Location</TableHead>
                      <TableHead className="text-slate-300">Current Top Bidder</TableHead>
                      <TableHead className="text-slate-300">Bid Amount</TableHead>
                      <TableHead className="text-slate-300">Min Bid</TableHead>
                      <TableHead className="text-slate-300">Slots Left</TableHead>
                      <TableHead className="text-slate-300">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bidData.map((bid, index) => (
                      <TableRow key={index} className="border-slate-700 hover:bg-slate-700/50">
                        <TableCell className="text-white font-medium">{bid.blockTime}</TableCell>
                        <TableCell className="text-white">{bid.location}</TableCell>
                        <TableCell className="text-white">{bid.currentBidder}</TableCell>
                        <TableCell className="text-white font-semibold">
                          <div className="flex items-center gap-2">
                            <span>{bid.bidAmount}</span>
                            {isLive && (
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-green-400">LIVE</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300">{bid.minBid}</TableCell>
                        <TableCell className="text-white">
                          <div className="flex items-center gap-2">
                            <span>{bid.slotsLeft}</span>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(bid.status)} ${isLive ? 'animate-pulse' : ''}`}></div>
                            {isLive && (
                              <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-green-400">LIVE</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <Button 
                              size="sm" 
                              className={`bg-cyan-400 hover:bg-cyan-500 text-white transition-all duration-200 ${
                                boostingIndex === index ? 'animate-pulse bg-blue-400' : ''
                              }`}
                              onClick={() => handleBoost(index)}
                              disabled={boostingIndex === index}
                            >
                              {boostingIndex === index ? (
                                <>
                                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                  Boosting...
                                </>
                              ) : (
                                <>
                                  <Zap className="h-3 w-3 mr-1" />
                                  Boost +{boostAmount.toLocaleString()}
                                </>
                              )}
                            </Button>
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs px-2 py-1 border-blue-400 text-blue-400 hover:bg-blue-400/10"
                                onClick={() => handleQuickBoost(index, 500)}
                                disabled={boostingIndex === index}
                              >
                                +500
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs px-2 py-1 border-green-400 text-green-400 hover:bg-green-400/10"
                                onClick={() => handleQuickBoost(index, 2000)}
                                disabled={boostingIndex === index}
                              >
                                +2K
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs px-2 py-1 border-purple-400 text-purple-400 hover:bg-purple-400/10"
                                onClick={() => handleQuickBoost(index, 5000)}
                                disabled={boostingIndex === index}
                              >
                                +5K
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Boost Statistics */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">
                    {bidData.reduce((sum, bid) => sum + parseInt(bid.bidAmount.replace(/[,\s]/g, '')), 0).toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-300">Total Bids</div>
                </div>
                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-lg font-bold text-green-400">
                    {bidData.filter(bid => bid.status === 'active').length}
                  </div>
                  <div className="text-xs text-slate-300">Active Slots</div>
                </div>
                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-lg font-bold text-orange-400">
                    {bidData.reduce((sum, bid) => sum + parseInt(bid.slotsLeft), 0)}
                  </div>
                  <div className="text-xs text-slate-300">Slots Remaining</div>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-300">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-slate-300">Ending Soon</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-slate-300">Closed</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="mt-8 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-slate-300 text-sm mb-2">Next block closes</p>
                  <div className="relative w-24 h-24 mx-auto">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - timeLeft / 1440)}`}
                        className="text-cyan-400 transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Bid Activity Graph */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">Bid Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 200 100">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8"/>
                      <stop offset="50%" stopColor="#00ff88" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#00ffff" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10,80 Q 30,60 50,70 T 90,50 T 130,40 T 170,30 T 190,20"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="80" r="2" fill="#00ffff" />
                  <circle cx="50" cy="70" r="2" fill="#00ff88" />
                  <circle cx="90" cy="50" r="2" fill="#00ffff" />
                  <circle cx="130" cy="40" r="2" fill="#00ff88" />
                  <circle cx="170" cy="30" r="2" fill="#00ffff" />
                  <circle cx="190" cy="20" r="2" fill="#00ffff" />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* AI Insight Card */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-cyan-400" />
                  AI Insight
                </div>
                {isLive && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">LIVE</span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    insight.status === 'high' ? 'bg-cyan-400/10 border-cyan-400/20' :
                    insight.status === 'medium' ? 'bg-green-500/10 border-green-500/20' :
                    'bg-purple-500/10 border-purple-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${
                      insight.status === 'high' ? 'text-slate-300' :
                      insight.status === 'medium' ? 'text-slate-300' :
                      'text-slate-300'
                    }`}>
                      <span className="font-semibold">{insight.company}</span> has an <span className={`font-semibold ${
                        insight.status === 'high' ? 'text-blue-400' :
                        insight.status === 'medium' ? 'text-green-400' :
                        'text-purple-400'
                      }`}>{insight.prediction}</span> chance to overtake next block in <span className={`font-semibold ${
                        insight.status === 'high' ? 'text-blue-400' :
                        insight.status === 'medium' ? 'text-green-400' :
                        'text-purple-400'
                      }`}>{insight.timeframe}</span>
                    </p>
                    {isLive && (
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">LIVE</span>
                      </div>
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${
                    insight.status === 'high' ? 'text-blue-300' :
                    insight.status === 'medium' ? 'text-green-300' :
                    'text-purple-300'
                  }`}>
                    Trend: <span className="font-semibold">{insight.trend}</span> in last 10 min.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveBiddingSystemTab;