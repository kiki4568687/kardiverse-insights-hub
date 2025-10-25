const fs = require('fs');

const files = [
  'src/components/dashboard/SystemMonitorTab.tsx',
  'src/components/dashboard/ProofAuditTab.tsx',
  'src/components/dashboard/DataBridgeTab.tsx',
  'src/components/dashboard/LiveBiddingSystemTab.tsx',
  'src/components/dashboard/MediaLibraryTab.tsx',
  'src/components/dashboard/EscrowLedgerTab.tsx',
  'src/components/dashboard/CampaignControlTab.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/className="bg-slate-800\/50 border-slate-700"/g, 'className="bg-slate-800/50 border-slate-700 card-glow"');
    content = content.replace(/className="bg-gray-800 border-gray-700"/g, 'className="bg-gray-800 border-gray-700 card-glow"');
    content = content.replace(/className="bg-gray-900 border-gray-700"/g, 'className="bg-gray-900 border-gray-700 card-glow"');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('All files updated!');
