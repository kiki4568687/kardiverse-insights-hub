const fs = require('fs');
const path = require('path');

const files = [
  'src/components/dashboard/SystemMonitorTab.tsx',
  'src/components/dashboard/ProofAuditTab.tsx',
  'src/components/dashboard/DataBridgeTab.tsx',
  'src/components/dashboard/LiveBiddingSystemTab.tsx',
  'src/components/dashboard/MediaLibraryTab.tsx',
  'src/components/dashboard/EscrowLedgerTab.tsx',
  'src/components/dashboard/CampaignControlTab.tsx',
  'src/components/dashboard/AIInsightsTab.tsx',
  'src/pages/NotFound.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace main background gradients - use very dark gray/black
    content = content.replace(/bg-gradient-to-br from-slate-900 to-slate-800/g, 'bg-[#0a0a0a]');
    content = content.replace(/bg-gray-900/g, 'bg-[#0a0a0a]');
    
    // Replace card backgrounds - use slightly lighter dark gray
    content = content.replace(/bg-slate-800\/50/g, 'bg-[#1a1a1a]');
    content = content.replace(/bg-gray-800/g, 'bg-[#1a1a1a]');
    content = content.replace(/bg-slate-700/g, 'bg-[#2a2a2a]');
    content = content.replace(/bg-gray-700/g, 'bg-[#2a2a2a]');
    
    // Replace borders
    content = content.replace(/border-slate-700/g, 'border-[#2a2a2a]');
    content = content.replace(/border-gray-700/g, 'border-[#2a2a2a]');
    content = content.replace(/border-slate-600/g, 'border-[#3a3a3a]');
    content = content.replace(/border-gray-600/g, 'border-[#3a3a3a]');
    
    // Replace other slate/gray colors
    content = content.replace(/bg-slate-700\/50/g, 'bg-[#2a2a2a]');
    content = content.replace(/bg-gray-700\/50/g, 'bg-[#2a2a2a]');
    content = content.replace(/hover:bg-slate-700\/50/g, 'hover:bg-[#2a2a2a]');
    content = content.replace(/hover:bg-gray-700/g, 'hover:bg-[#2a2a2a]');
    content = content.replace(/hover:bg-slate-700/g, 'hover:bg-[#2a2a2a]');
    
    // Replace text colors - keep cyan/blue for accent colors
    content = content.replace(/text-slate-300/g, 'text-gray-300');
    content = content.replace(/text-slate-400/g, 'text-gray-400');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('All files updated!');
