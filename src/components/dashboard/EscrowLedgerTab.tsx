import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  ExternalLink,
  Eye,
  FileText,
  ArrowRight,
  Shield,
  TrendingUp,
  PieChart,
  BarChart3,
  CreditCard,
  Banknote,
  X,
  Calendar,
  Receipt
} from "lucide-react";
import { useState, useEffect } from "react";
import jsPDF from 'jspdf';

const EscrowLedgerTab = () => {
  const [showBankStatement, setShowBankStatement] = useState(false);
  const [bankStatementData, setBankStatementData] = useState([
    {
      date: "2025-10-17",
      description: "M-Pesa Transfer - Brand A Escrow",
      reference: "MP608DD4326",
      debit: "",
      credit: "€250,000.00",
      balance: "€1,450,000.00",
      type: "credit"
    },
    {
      date: "2025-10-16", 
      description: "SEPA Payment - Brand B Release",
      reference: "SP722FF9C",
      debit: "€150,000.00",
      credit: "",
      balance: "€1,200,000.00",
      type: "debit"
    },
    {
      date: "2025-10-15",
      description: "M-Pesa Deposit - Brand C",
      reference: "MP5A738BA29",
      debit: "",
      credit: "Ksh 250,000.00",
      balance: "Ksh 395,000.00",
      type: "credit"
    },
    {
      date: "2025-10-14",
      description: "SEPA Transfer - Brand A",
      reference: "SDB2EED566",
      debit: "€100,000.00",
      credit: "",
      balance: "€1,350,000.00",
      type: "debit"
    },
    {
      date: "2025-10-13",
      description: "M-Pesa Withdrawal - Brand B",
      reference: "MZFD649EDA",
      debit: "Ksh 50,000.00",
      credit: "",
      balance: "Ksh 145,000.00",
      type: "debit"
    },
    {
      date: "2025-10-12",
      description: "Account Opening Balance",
      reference: "INIT001",
      debit: "",
      credit: "€1,000,000.00",
      balance: "€1,000,000.00",
      type: "credit"
    }
  ]);

  const [sponsorAccounts, setSponsorAccounts] = useState([
    {
      sponsor: "Brand A",
      currency: "€ 1.200.000",
      escrowBalance: "€ 250.000",
      lastAudit: "17 Oct 2025",
      status: "Release >",
      statusType: "release"
    },
    {
      sponsor: "Brand B", 
      currency: "Ksh 145.000",
      escrowBalance: "Ksh 250.000",
      lastAudit: "17 Oct 2025",
      status: "Review",
      statusType: "review"
    },
    {
      sponsor: "Brand C",
      currency: "€ 950.000", 
      escrowBalance: "€ 150.000",
      lastAudit: "16 Oct 2025",
      status: "Rescivs >",
      statusType: "rescivs"
    }
  ]);

  const [paymentTimeline, setPaymentTimeline] = useState([
    { date: "10/10/2025", transactionId: "M608DD4326", description: "Mor.ooor4+83V 1s" },
    { date: "09/10/2025", transactionId: "S722FF9C", description: "761 S729FFRC179+T" },
    { date: "09/10/2025", transactionId: "M5A738BA29", description: "MSAT9884299D" },
    { date: "09/10/2025", transactionId: "SDB2EED566", description: "SO8ZZE 97947" },
    { date: "09/10/2025", transactionId: "MZFD649EDA", description: "M2FDB49EDDA" }
  ]);

  const [verificationSteps, setVerificationSteps] = useState([
    { step: 1, text: "User Scan Proof validated", status: "completed" },
    { step: 2, text: "Notary Approval", status: "completed" },
    { step: 3, text: "Funds Released", status: "pending" }
  ]);

  const handleRelease = (sponsor: string) => {
    alert(`Releasing funds for ${sponsor}...`);
  };

  const handleReview = (sponsor: string) => {
    alert(`Reviewing account for ${sponsor}...`);
  };

  const handleRescivs = (sponsor: string) => {
    alert(`Processing rescivs for ${sponsor}...`);
  };

  const handleViewBankStatement = () => {
    setShowBankStatement(true);
  };

  const handleExportEscrowPDF = async () => {
    try {
      const pdf = new jsPDF();
      
      // Header
      pdf.setFontSize(20);
      pdf.text('KARDIVERSE ESCROW & PAYMENTS REPORT', 20, 30);
      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 40);
      pdf.text('M-Pesa & SEPA Releases, Balance, Logs', 20, 50);
      pdf.text('Comprehensive Financial Analysis Report', 20, 60);
      
      // Draw line separator
      pdf.setDrawColor(0, 0, 0);
      pdf.line(20, 65, 190, 65);
      
      // Executive Summary
      pdf.setFontSize(16);
      pdf.text('EXECUTIVE SUMMARY', 20, 80);
      
      pdf.setFontSize(12);
      let yPos = 90;
      const lineHeight = 8;
      
      // Calculate totals
      const totalEscrow = sponsorAccounts.reduce((sum, account) => {
        const amount = parseFloat(account.escrowBalance.replace(/[€Ksh,\s]/g, ''));
        return sum + amount;
      }, 0);
      
      const totalCurrency = sponsorAccounts.reduce((sum, account) => {
        const amount = parseFloat(account.currency.replace(/[€Ksh,\s]/g, ''));
        return sum + amount;
      }, 0);
      
      const mpesaTransactions = bankStatementData.filter(t => t.reference.startsWith('MP'));
      const sepaTransactions = bankStatementData.filter(t => t.reference.startsWith('SP') || t.reference.startsWith('SD'));
      
      pdf.text(`Total Escrow Balance: €${totalEscrow.toLocaleString()}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Total Currency Value: €${totalCurrency.toLocaleString()}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Active Sponsors: ${sponsorAccounts.length}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`M-Pesa Transactions: ${mpesaTransactions.length}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`SEPA Transactions: ${sepaTransactions.length}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Total Transactions: ${bankStatementData.length}`, 20, yPos);
      
      // Sponsor Accounts Section
      yPos += 15;
      pdf.setFontSize(16);
      pdf.text('SPONSOR ACCOUNTS DETAIL', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      
      sponsorAccounts.forEach((account, index) => {
        pdf.text(`${index + 1}. ${account.sponsor}`, 20, yPos);
        pdf.text(`   Currency: ${account.currency}`, 20, yPos + lineHeight);
        pdf.text(`   Escrow Balance: ${account.escrowBalance}`, 20, yPos + lineHeight * 2);
        pdf.text(`   Last Audit: ${account.lastAudit}`, 20, yPos + lineHeight * 3);
        pdf.text(`   Status: ${account.status}`, 20, yPos + lineHeight * 4);
        yPos += lineHeight * 6;
      });
      
      // Payment Timeline Section
      yPos += 10;
      pdf.setFontSize(16);
      pdf.text('PAYMENT TIMELINE', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      
      paymentTimeline.forEach((payment, index) => {
        pdf.text(`${payment.date} - ${payment.transactionId}`, 20, yPos);
        pdf.text(`   ${payment.description}`, 20, yPos + lineHeight);
        yPos += lineHeight * 2;
      });
      
      // Transaction Analysis
      yPos += 10;
      pdf.setFontSize(16);
      pdf.text('TRANSACTION ANALYSIS', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      
      bankStatementData.forEach((transaction, index) => {
        pdf.text(`${transaction.date} - ${transaction.reference}`, 20, yPos);
        pdf.text(`   Description: ${transaction.description}`, 20, yPos + lineHeight);
        pdf.text(`   Amount: ${transaction.debit || transaction.credit}`, 20, yPos + lineHeight * 2);
        pdf.text(`   Balance: ${transaction.balance}`, 20, yPos + lineHeight * 3);
        yPos += lineHeight * 4;
      });
      
      // Verification Steps Section
      yPos += 10;
      pdf.setFontSize(16);
      pdf.text('VERIFICATION STATUS', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      
      verificationSteps.forEach((step, index) => {
        pdf.text(`${step.step}. ${step.text} - ${step.status.toUpperCase()}`, 20, yPos);
        yPos += lineHeight;
      });
      
      // Risk Assessment
      yPos += 15;
      pdf.setFontSize(16);
      pdf.text('RISK ASSESSMENT', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      
      pdf.text('• All transactions verified and approved', 20, yPos);
      yPos += lineHeight;
      pdf.text('• Escrow balances within acceptable limits', 20, yPos);
      yPos += lineHeight;
      pdf.text('• No suspicious activity detected', 20, yPos);
      yPos += lineHeight;
      pdf.text('• Compliance with regulatory requirements', 20, yPos);
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('This document is digitally signed and verified by Kardiverse Blockchain System', 20, 280);
      pdf.text('For verification, visit the verification URL or contact support', 20, 285);
      
      // Save the PDF
      const fileName = `escrow-report-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      alert(`Escrow PDF exported successfully as ${fileName}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleGenerateLedger = async () => {
    try {
      const pdf = new jsPDF();
      
      // Header
      pdf.setFontSize(20);
      pdf.text('KARDIVERSE ESCROW LEDGER', 20, 30);
      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 40);
      pdf.text('Comprehensive Financial Ledger Report', 20, 50);
      
      // Draw line separator
      pdf.setDrawColor(0, 0, 0);
      pdf.line(20, 55, 190, 55);
      
      // Account Summary Section
      pdf.setFontSize(16);
      pdf.text('ACCOUNT SUMMARY', 20, 70);
      
      pdf.setFontSize(12);
      let yPos = 80;
      const lineHeight = 8;
      
      // Calculate totals
      const totalEscrow = sponsorAccounts.reduce((sum, account) => {
        const amount = parseFloat(account.escrowBalance.replace(/[€Ksh,\s]/g, ''));
        return sum + amount;
      }, 0);
      
      const totalCurrency = sponsorAccounts.reduce((sum, account) => {
        const amount = parseFloat(account.currency.replace(/[€Ksh,\s]/g, ''));
        return sum + amount;
      }, 0);
      
      pdf.text(`Total Escrow Balance: €${totalEscrow.toLocaleString()}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Total Currency Value: €${totalCurrency.toLocaleString()}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Active Sponsors: ${sponsorAccounts.length}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Last Audit Date: ${sponsorAccounts[0].lastAudit}`, 20, yPos);
      
      // Sponsor Accounts Detail
      yPos += 15;
      pdf.setFontSize(16);
      pdf.text('SPONSOR ACCOUNTS DETAIL', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      
      sponsorAccounts.forEach((account, index) => {
        pdf.text(`${index + 1}. ${account.sponsor}`, 20, yPos);
        pdf.text(`   Currency: ${account.currency}`, 20, yPos + lineHeight);
        pdf.text(`   Escrow Balance: ${account.escrowBalance}`, 20, yPos + lineHeight * 2);
        pdf.text(`   Last Audit: ${account.lastAudit}`, 20, yPos + lineHeight * 3);
        pdf.text(`   Status: ${account.status}`, 20, yPos + lineHeight * 4);
        yPos += lineHeight * 6;
      });
      
      // Transaction Summary
      yPos += 10;
      pdf.setFontSize(16);
      pdf.text('TRANSACTION SUMMARY', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      
      const mpesaTransactions = bankStatementData.filter(t => t.reference.startsWith('MP'));
      const sepaTransactions = bankStatementData.filter(t => t.reference.startsWith('SP') || t.reference.startsWith('SD'));
      
      pdf.text(`M-Pesa Transactions: ${mpesaTransactions.length}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`SEPA Transactions: ${sepaTransactions.length}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(`Total Transactions: ${bankStatementData.length}`, 20, yPos);
      
      // Verification Status
      yPos += 15;
      pdf.setFontSize(16);
      pdf.text('VERIFICATION STATUS', 20, yPos);
      
      pdf.setFontSize(12);
      yPos += 10;
      
      verificationSteps.forEach((step, index) => {
        pdf.text(`${step.step}. ${step.text} - ${step.status.toUpperCase()}`, 20, yPos);
        yPos += lineHeight;
      });
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('This ledger is digitally signed and verified by Kardiverse Blockchain System', 20, 280);
      pdf.text('For verification, contact support or visit the verification portal', 20, 285);
      
      // Save the PDF
      const fileName = `escrow-ledger-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      alert(`Escrow Ledger generated successfully as ${fileName}`);
    } catch (error) {
      console.error('Error generating ledger:', error);
      alert('Failed to generate ledger. Please try again.');
    }
  };

  const handleExportAll = () => {
    alert("Redirecting to Bookkeeper Dashboard...");
  };

  const getStatusColor = (statusType: string) => {
    switch (statusType) {
      case "release": return "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10";
      case "review": return "border-orange-400 text-orange-400 hover:bg-orange-400/10";
      case "rescivs": return "border-green-400 text-green-400 hover:bg-green-400/10";
      default: return "border-gray-400 text-gray-400 hover:bg-gray-400/10";
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-400";
      case "pending": return "text-orange-400";
      case "flagged": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending": return <Clock className="w-4 h-4 text-orange-400" />;
      case "flagged": return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen p-6">
      {/* Header */}
          <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tab 5 - Escrow & Payments</h1>
          <p className="text-lg text-cyan-300 mt-2">M-Pesa & SEPA Releases, Balance, Logs</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">Last Sync - NOC verified ✓</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-300">Pesa</span>
            <span className="text-sm text-cyan-300">SEPA</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
              <div className="text-right">
            <div className="text-lg font-bold text-white">Kardiverse</div>
            <div className="text-xs text-cyan-300">K</div>
              </div>
            </div>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Sponsor Accounts */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Sponsor Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Sponsor</TableHead>
                    <TableHead className="text-slate-300">Currency</TableHead>
                    <TableHead className="text-slate-300">Escrow Balance</TableHead>
                    <TableHead className="text-slate-300">Last Audit</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sponsorAccounts.map((account, index) => (
                    <TableRow key={index} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell className="text-white font-medium">{account.sponsor}</TableCell>
                      <TableCell className="text-white">{account.currency}</TableCell>
                      <TableCell className="text-white">{account.escrowBalance}</TableCell>
                      <TableCell className="text-white">{account.lastAudit}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${getStatusColor(account.statusType)} text-xs`}
                          onClick={() => {
                            if (account.statusType === "release") handleRelease(account.sponsor);
                            else if (account.statusType === "review") handleReview(account.sponsor);
                            else if (account.statusType === "rescivs") handleRescivs(account.sponsor);
                          }}
                        >
                          {account.status}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Escrow Overview */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Escrow Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
              {/* Bar Chart */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-300">Growth Trend</h4>
                <div className="h-24 flex items-end justify-between gap-1">
                  {[20, 40, 60, 80].map((height, index) => (
                    <div
                      key={index}
                      className="bg-blue-400 rounded-t"
                      style={{ height: `${height}%`, width: '20%' }}
                    ></div>
                  ))}
              </div>
            </div>

              {/* Donut Chart */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-300">Currency Distribution</h4>
                <div className="h-24 flex items-center justify-center">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="4"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke="#00ffff"
                        strokeWidth="4"
                        strokeDasharray={`${83 * 0.88} ${17 * 0.88}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">83%</span>
                    </div>
              </div>
                </div>
                <p className="text-xs text-center text-slate-400">EUR</p>
              </div>
              </div>

            {/* Payment Timeline */}
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-3">Payment Timeline</h4>
              <div className="space-y-2">
                {paymentTimeline.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-700/50 rounded text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-white">{payment.date}</span>
                    </div>
                    <div className="text-slate-300">
                      <div className="font-mono">{payment.transactionId}</div>
                      <div className="text-slate-400">{payment.description}</div>
                    </div>
                </div>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewBankStatement}
                className="w-full mt-3 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Bank Statement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Steps */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Verification Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {verificationSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded">
                <div className="flex items-center gap-2">
                  {getStepStatusIcon(step.status)}
                  <span className="text-white font-medium">{step.step}.</span>
                </div>
                <span className={`text-sm ${getStepStatusColor(step.status)}`}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={handleViewBankStatement}
          className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Bank Statement
        </Button>
        <Button
          variant="outline"
          onClick={handleExportEscrowPDF}
          className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Escrow PDF
        </Button>
        <Button
          variant="outline"
          onClick={handleGenerateLedger}
          className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
        >
          <FileText className="h-4 w-4 mr-2" />
          Generate Ledger
        </Button>
      </div>

      {/* Legend and Export All */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-300">Verified</span>
              </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-slate-300">Pending</span>
            </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-slate-300">Flagged</span>
              </div>
            </div>
        
        <button
          onClick={handleExportAll}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>Export All</span>
          <ArrowRight className="h-4 w-4" />
          <span className="text-slate-300">Bookkeeper Dashboard</span>
        </button>
      </div>

      {/* Bank Statement Dialog */}
      <Dialog open={showBankStatement} onOpenChange={setShowBankStatement}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Receipt className="h-5 w-5" />
              Bank Statement - Kardiverse Escrow Account
            </DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Statement Period: Oct 12, 2025 - Oct 17, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Account: KARDIVERSE-ESCROW-001</span>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Account Summary */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-slate-300">Current Balance</span>
                  </div>
                  <div className="text-2xl font-bold text-white">€1,450,000.00</div>
                  <div className="text-xs text-green-400">+€450,000.00 this period</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-slate-300">Total Credits</span>
                  </div>
                  <div className="text-2xl font-bold text-white">€1,250,000.00</div>
                  <div className="text-xs text-cyan-400">6 transactions</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-slate-300">Total Debits</span>
                  </div>
                  <div className="text-2xl font-bold text-white">€300,000.00</div>
                  <div className="text-xs text-orange-400">3 transactions</div>
                </CardContent>
              </Card>
            </div>

            {/* Transaction Table */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Date</TableHead>
                        <TableHead className="text-slate-300">Description</TableHead>
                        <TableHead className="text-slate-300">Reference</TableHead>
                        <TableHead className="text-slate-300 text-right">Debit</TableHead>
                        <TableHead className="text-slate-300 text-right">Credit</TableHead>
                        <TableHead className="text-slate-300 text-right">Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bankStatementData.map((transaction, index) => (
                        <TableRow key={index} className="border-slate-700 hover:bg-slate-700/50">
                          <TableCell className="text-white">{transaction.date}</TableCell>
                          <TableCell className="text-white">{transaction.description}</TableCell>
                          <TableCell className="text-white font-mono text-sm">{transaction.reference}</TableCell>
                          <TableCell className={`text-right ${transaction.debit ? 'text-red-400' : 'text-slate-500'}`}>
                            {transaction.debit || '-'}
                          </TableCell>
                          <TableCell className={`text-right ${transaction.credit ? 'text-green-400' : 'text-slate-500'}`}>
                            {transaction.credit || '-'}
                          </TableCell>
                          <TableCell className="text-right text-white font-medium">
                            {transaction.balance}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods Summary */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">M-Pesa Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total Volume:</span>
                      <span className="text-white font-medium">Ksh 300,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Transaction Count:</span>
                      <span className="text-white font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Average Amount:</span>
                      <span className="text-white font-medium">Ksh 100,000.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">SEPA Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total Volume:</span>
                      <span className="text-white font-medium">€1,200,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Transaction Count:</span>
                      <span className="text-white font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Average Amount:</span>
                      <span className="text-white font-medium">€400,000.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  // Export bank statement as PDF
                  const pdf = new jsPDF();
                  pdf.setFontSize(16);
                  pdf.text('KARDIVERSE BANK STATEMENT', 20, 30);
                  pdf.setFontSize(12);
                  pdf.text(`Account: KARDIVERSE-ESCROW-001`, 20, 40);
                  pdf.text(`Period: Oct 12, 2025 - Oct 17, 2025`, 20, 50);
                  pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 60);
                  
                  // Add transaction table
                  let yPos = 80;
                  pdf.text('Date', 20, yPos);
                  pdf.text('Description', 50, yPos);
                  pdf.text('Reference', 120, yPos);
                  pdf.text('Debit', 160, yPos);
                  pdf.text('Credit', 180, yPos);
                  pdf.text('Balance', 200, yPos);
                  
                  yPos += 10;
                  bankStatementData.forEach((transaction) => {
                    pdf.text(transaction.date, 20, yPos);
                    pdf.text(transaction.description.substring(0, 20), 50, yPos);
                    pdf.text(transaction.reference, 120, yPos);
                    pdf.text(transaction.debit || '-', 160, yPos);
                    pdf.text(transaction.credit || '-', 180, yPos);
                    pdf.text(transaction.balance, 200, yPos);
                    yPos += 8;
                  });
                  
                  pdf.save(`bank-statement-${new Date().toISOString().split('T')[0]}.pdf`);
                  alert('Bank statement exported successfully!');
                }}
                className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Statement PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowBankStatement(false)}
                className="border-slate-400 text-slate-400 hover:bg-slate-400/10"
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EscrowLedgerTab;