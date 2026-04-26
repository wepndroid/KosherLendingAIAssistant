// Centralized mock data for KosherLending AI Content OS

export const BRAND = {
  name: "KosherLending",
  product: "AI Content OS",
  creator: "Jeffrey Ben-Davis",
  website: "KosherLending.com",
  nmls: "#320841",
  voice: "Authoritative, educational, direct, research-backed, practical",
  compliance: "Jeffrey Ben-Davis | NMLS #320841 | KosherLending.com | Equal Housing Lender",
};

export type DocStatus = "Uploaded" | "Processing" | "Indexed" | "Failed";
export type SourceType = "Book" | "Strategy Doc" | "Content Calendar" | "DM Deliverable" | "Transcript";

export interface KnowledgeDoc {
  id: string;
  name: string;
  type: string;
  category: SourceType;
  uploaded: string;
  status: DocStatus;
  chunks: number;
  summary: string;
  pillars: string[];
}

export const KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  {
    id: "kb-1",
    name: "kosherlending_master_strategy_bible.docx",
    type: "DOCX",
    category: "Strategy Doc",
    uploaded: "2025-03-12",
    status: "Indexed",
    chunks: 412,
    summary: "Master strategy bible covering all 7 content pillars, voice, hooks, CTA frameworks and posting cadence.",
    pillars: ["Psychology", "Negotiation", "Financing Strategy"],
  },
  {
    id: "kb-2",
    name: "kosherlending_DM Hook_deliverables_FINAL.docx",
    type: "DOCX",
    category: "DM Deliverable",
    uploaded: "2025-03-14",
    status: "Indexed",
    chunks: 287,
    summary: "Definitive list of 77 DM deliverables and their keyword mappings with response copy.",
    pillars: ["Negotiation", "Financing Strategy", "Geographic"],
  },
  {
    id: "kb-3",
    name: "Claudes Distribution Matrix and advice.docx",
    type: "DOCX",
    category: "Strategy Doc",
    uploaded: "2025-03-15",
    status: "Indexed",
    chunks: 96,
    summary: "Distribution matrix per platform with cadence, hook style, and CTA mapping.",
    pillars: ["All Pillars"],
  },
  {
    id: "kb-4",
    name: "Year 1 Content Calendar.docx",
    type: "DOCX",
    category: "Content Calendar",
    uploaded: "2025-03-18",
    status: "Indexed",
    chunks: 365,
    summary: "Day-by-day Year 1 content calendar with pillar rotation and seasonal hooks.",
    pillars: ["All Pillars"],
  },
  {
    id: "kb-5",
    name: "Year 2 Content Calendar.docx",
    type: "DOCX",
    category: "Content Calendar",
    uploaded: "2025-03-19",
    status: "Processing",
    chunks: 0,
    summary: "Year 2 calendar — focused on geographic intelligence and authority pillar deepening.",
    pillars: ["Geographic", "Authority"],
  },
  {
    id: "kb-6",
    name: "Thinking Fast and Slow.pdf",
    type: "PDF",
    category: "Book",
    uploaded: "2025-02-28",
    status: "Indexed",
    chunks: 1240,
    summary: "Kahneman's foundational work on System 1/2 thinking, anchoring, loss aversion.",
    pillars: ["Psychology"],
  },
  {
    id: "kb-7",
    name: "Never Split the Difference.pdf",
    type: "PDF",
    category: "Book",
    uploaded: "2025-02-28",
    status: "Indexed",
    chunks: 980,
    summary: "Chris Voss tactical empathy, mirroring, labeling, calibrated questions.",
    pillars: ["Negotiation"],
  },
  {
    id: "kb-8",
    name: "Influence - Cialdini.pdf",
    type: "PDF",
    category: "Book",
    uploaded: "2025-03-01",
    status: "Indexed",
    chunks: 870,
    summary: "Six universal principles of persuasion applied to buyer behavior.",
    pillars: ["Psychology", "Negotiation"],
  },
  {
    id: "kb-9",
    name: "Predictably Irrational.pdf",
    type: "PDF",
    category: "Book",
    uploaded: "2025-03-02",
    status: "Failed",
    chunks: 0,
    summary: "OCR pass failed on scanned chapters — re-upload required.",
    pillars: ["Psychology"],
  },
];

export const PILLARS = [
  "Psychology & Behavioral Economics",
  "Negotiation Tactics",
  "Jefferson Fisher Communication",
  "Geographic Market Intelligence",
  "Financing Strategy",
  "Wealth & Life Philosophy",
  "Myth-Bust / Story",
];

export const PLATFORMS = [
  "TikTok",
  "Instagram Reels",
  "YouTube Shorts",
  "Facebook Reels",
  "LinkedIn",
  "X/Twitter",
];

export const DURATIONS = ["30 seconds", "45 seconds", "60 seconds"];

export const SOURCE_BOOKS = [
  "Thinking Fast and Slow",
  "Never Split the Difference",
  "Influence",
  "Predictably Irrational",
  "Nudge",
  "Start With No",
  "Keld Jensen Negotiation Essentials",
  "Jefferson Fisher Communication",
];

export const DM_KEYWORDS_LIST = [
  "BRAIN", "BIAS", "LOSS", "ANCHOR", "SCRIPT", "MIRROR",
  "VALUE", "BUYDOWN", "OFFER", "CREDIT", "DTI", "APR",
  "FL", "TX", "AZ", "CA",
];

export const CONTENT_GOALS = [
  "Generate lead",
  "Educate buyer",
  "Build authority",
  "Create save/share content",
  "Support realtor referral",
  "Repurpose existing content",
];

export interface DMKeyword {
  keyword: string;
  category: string;
  deliverable: string;
  pillars: string[];
  intent: "High Intent" | "Medium Intent" | "Low Intent";
  ghl: "Ready" | "Pending" | "Not Connected";
  usage: number;
  lastUsed: string;
  status: "Active" | "Draft";
  summary: string;
  cta: string;
}

export const DM_KEYWORDS: DMKeyword[] = [
  { keyword: "BRAIN", category: "Psychology", deliverable: "Buyer Psychology Field Guide", pillars: ["Psychology"], intent: "Medium Intent", ghl: "Ready", usage: 42, lastUsed: "2025-04-22", status: "Active", summary: "12-page guide on buyer cognitive biases.", cta: "Comment BRAIN and I'll DM you the field guide." },
  { keyword: "BUYDOWN", category: "Financing", deliverable: "2-1 Buydown Calculator", pillars: ["Financing Strategy"], intent: "High Intent", ghl: "Ready", usage: 58, lastUsed: "2025-04-23", status: "Active", summary: "Interactive 2-1 buydown calculator with seller contribution scenarios.", cta: "Comment BUYDOWN for the calculator." },
  { keyword: "SCRIPT", category: "Negotiation", deliverable: "Negotiation Script Library", pillars: ["Negotiation"], intent: "Medium Intent", ghl: "Ready", usage: 31, lastUsed: "2025-04-20", status: "Active", summary: "30+ scripts for offers, counters, and inspection negotiations.", cta: "Comment SCRIPT for the library." },
  { keyword: "FL", category: "Geographic", deliverable: "Florida Buyer Intelligence Guide", pillars: ["Geographic"], intent: "High Intent", ghl: "Ready", usage: 27, lastUsed: "2025-04-21", status: "Active", summary: "Florida insurance, HOA, and market intelligence.", cta: "Comment FL for the Florida guide." },
  { keyword: "CREDIT", category: "Financing", deliverable: "90-Day Credit Optimization Guide", pillars: ["Financing Strategy"], intent: "High Intent", ghl: "Ready", usage: 49, lastUsed: "2025-04-22", status: "Active", summary: "90-day plan to lift score 40+ points.", cta: "Comment CREDIT for the 90-day plan." },
  { keyword: "DTI", category: "Financing", deliverable: "DTI Optimization Guide", pillars: ["Financing Strategy"], intent: "High Intent", ghl: "Ready", usage: 22, lastUsed: "2025-04-19", status: "Active", summary: "Reduce DTI to qualify for more home.", cta: "Comment DTI for the guide." },
  { keyword: "APR", category: "Financing", deliverable: "APR vs Rate True Cost Tool", pillars: ["Financing Strategy"], intent: "High Intent", ghl: "Ready", usage: 18, lastUsed: "2025-04-18", status: "Active", summary: "Tool comparing APR vs note rate true cost.", cta: "Comment APR for the cost tool." },
  { keyword: "BIAS", category: "Psychology", deliverable: "Cognitive Bias Cheatsheet", pillars: ["Psychology"], intent: "Medium Intent", ghl: "Pending", usage: 14, lastUsed: "2025-04-15", status: "Active", summary: "One-page bias cheatsheet for buyers.", cta: "Comment BIAS for the cheatsheet." },
  { keyword: "MIRROR", category: "Negotiation", deliverable: "Chris Voss Mirroring Cards", pillars: ["Negotiation"], intent: "Medium Intent", ghl: "Ready", usage: 19, lastUsed: "2025-04-17", status: "Active", summary: "Pocket cards for mirroring & labeling.", cta: "Comment MIRROR for the cards." },
  { keyword: "OFFER", category: "Negotiation", deliverable: "Winning Offer Template Pack", pillars: ["Negotiation"], intent: "High Intent", ghl: "Ready", usage: 36, lastUsed: "2025-04-22", status: "Active", summary: "Template pack for competitive offers.", cta: "Comment OFFER for the templates." },
  { keyword: "LOSS", category: "Psychology", deliverable: "Loss Aversion Buyer Guide", pillars: ["Psychology"], intent: "Medium Intent", ghl: "Pending", usage: 11, lastUsed: "2025-04-10", status: "Active", summary: "Why buyers overpay when they fear losing a house.", cta: "Comment LOSS for the guide." },
  { keyword: "ANCHOR", category: "Psychology", deliverable: "Anchoring Playbook", pillars: ["Psychology"], intent: "Medium Intent", ghl: "Ready", usage: 9, lastUsed: "2025-04-08", status: "Active", summary: "Anchoring tactics for list price negotiations.", cta: "Comment ANCHOR for the playbook." },
];

export type ContentStatus = "Draft" | "Needs Review" | "Approved" | "Exported" | "Scheduled";

export interface GeneratedContent {
  id: string;
  topic: string;
  pillar: string;
  platform: string;
  duration: string;
  wordCount: number;
  status: ContentStatus;
  hook: string;
  script: string;
  onScreen: string;
  productionBrief: string;
  caption: string;
  cta: string;
  dmKeyword: string;
  deliverable: string;
  hashtags: string[];
  sourceBook: string;
  framework: string;
  sourceReason: string;
  duplicateRisk: "Low" | "Medium" | "High";
  createdAt: string;
  scheduledFor?: string;
  scheduledTime?: string;
}

export const GENERATED_CONTENT: GeneratedContent[] = [
  {
    id: "gc-1",
    topic: "Why buyers overpay when they fear losing a house",
    pillar: "Psychology & Behavioral Economics",
    platform: "Instagram Reels",
    duration: "45 seconds",
    wordCount: 108,
    status: "Needs Review",
    hook: "Losing a house feels twice as bad as winning one feels good. That's why you overpay.",
    script: "When two buyers want the same home, the one who fears losing it more pays the highest price. Daniel Kahneman proved we feel losses about 2x as strongly as equivalent gains. So the second you imagine your kids in that backyard — you're not negotiating anymore, you're protecting a memory you don't have yet. Here's the fix: write down your walk-away number BEFORE you tour. Tape it to your dashboard. When emotion spikes, the number doesn't move. That's how you stop overpaying. Comment LOSS and I'll DM the buyer guide.",
    onScreen: "LOSS HURTS 2X AS MUCH AS WINNING / WRITE YOUR WALK-AWAY NUMBER FIRST",
    productionBrief: "Open on Jeffrey to-camera in office. B-roll: house exterior, dashboard with sticky note. Bold text overlays. Cut every 1.5 sec. End on CTA card.",
    caption: "Loss aversion is the #1 reason offers go over asking. Save this before your next showing. ↓",
    cta: "Comment LOSS for the buyer guide.",
    dmKeyword: "LOSS",
    deliverable: "Loss Aversion Buyer Guide",
    hashtags: ["#homebuyer", "#mortgagetips", "#realestate", "#firsttimehomebuyer", "#kosherlending"],
    sourceBook: "Thinking Fast and Slow",
    framework: "Loss Aversion",
    sourceReason: "Directly relevant to buyer fear, urgency, and overpaying behavior.",
    duplicateRisk: "Low",
    createdAt: "2025-04-24",
    scheduledFor: "2025-04-25",
    scheduledTime: "12:00 PM",
  },
  {
    id: "gc-2",
    topic: "2-1 buydown when seller pays the points",
    pillar: "Financing Strategy",
    platform: "TikTok",
    duration: "30 seconds",
    wordCount: 78,
    status: "Approved",
    hook: "The seller will literally pay your mortgage for 2 years. You just have to ask right.",
    script: "A 2-1 buydown means your rate is 2% lower year one, 1% lower year two, then back to normal. On a $400k loan, that's about $9,000 in savings. And here's the trick — sellers will fund it instead of dropping price, because it doesn't lower their comp. Ask for a buydown credit, not a price cut. Comment BUYDOWN for the calculator.",
    onScreen: "2-1 BUYDOWN = SELLER PAYS YOUR RATE / ASK FOR CREDIT, NOT PRICE CUT",
    productionBrief: "Calculator on screen. Numbers animate. Closing CTA.",
    caption: "The negotiation move every buyer should know in 2025.",
    cta: "Comment BUYDOWN for the calculator.",
    dmKeyword: "BUYDOWN",
    deliverable: "2-1 Buydown Calculator",
    hashtags: ["#mortgage", "#buydown", "#homebuyer", "#interestrates"],
    sourceBook: "Never Split the Difference",
    framework: "Calibrated Asks",
    sourceReason: "Frame the ask in seller's interest — calibrated negotiation.",
    duplicateRisk: "Low",
    createdAt: "2025-04-23",
    scheduledFor: "2025-04-25",
    scheduledTime: "9:00 AM",
  },
  {
    id: "gc-3",
    topic: "Florida insurance shock — what nobody tells buyers",
    pillar: "Geographic Market Intelligence",
    platform: "YouTube Shorts",
    duration: "60 seconds",
    wordCount: 132,
    status: "Approved",
    hook: "Your Florida dream home costs $4,000 more per year than the listing says.",
    script: "Florida home insurance has tripled in three years. The pre-approval you got? It assumed an insurance estimate that's 60% too low. So when underwriting pulls the real bind quote, your DTI explodes and the deal dies at week 4. Here's what to do: BEFORE you write an offer, get a real bind quote from Citizens or a private carrier. Same address, same coverage. If it comes back over $6k, restructure your offer with a buydown to absorb the hit. I've saved 11 deals this quarter using this exact playbook. Comment FL for the Florida buyer intelligence guide.",
    onScreen: "FL INSURANCE = +$4K/YR HIDDEN / GET BIND QUOTE BEFORE OFFER",
    productionBrief: "Map of FL, news clips of insurance crisis, on-screen calculations.",
    caption: "Florida buyers — read this before you write your next offer.",
    cta: "Comment FL for the guide.",
    dmKeyword: "FL",
    deliverable: "Florida Buyer Intelligence Guide",
    hashtags: ["#floridarealestate", "#floridahomebuyer", "#mortgage", "#insurance"],
    sourceBook: "Master Strategy Bible",
    framework: "Geographic Authority",
    sourceReason: "FL pillar deliverable mapped to geographic intelligence cadence.",
    duplicateRisk: "Low",
    createdAt: "2025-04-22",
    scheduledFor: "2025-04-25",
    scheduledTime: "3:00 PM",
  },
  {
    id: "gc-4",
    topic: "Chris Voss mirroring on the listing agent",
    pillar: "Negotiation Tactics",
    platform: "LinkedIn",
    duration: "60 seconds",
    wordCount: 128,
    status: "Draft",
    hook: "I won a $620k house with one sentence. The listing agent didn't see it coming.",
    script: "When the listing agent said 'we have multiple offers' — I didn't counter, I didn't panic. I mirrored. 'Multiple offers?' Three words. Then I shut up. She filled the silence: 'Well, two are contingent, and one is below ask.' Now I knew the entire competition. We won the house at $7k under list. That's Chris Voss tactical empathy. Mirror the last 3 words. Stay quiet. Let the other side talk you to a better deal. Comment MIRROR and I'll send the negotiation cards I use on every deal.",
    onScreen: "MIRROR THE LAST 3 WORDS / SILENCE = INTEL",
    productionBrief: "LinkedIn-style talking head, professional tone, slightly slower pacing.",
    caption: "One negotiation move I use on every offer. From Chris Voss.",
    cta: "Comment MIRROR for the cards.",
    dmKeyword: "MIRROR",
    deliverable: "Chris Voss Mirroring Cards",
    hashtags: ["#negotiation", "#realestate", "#leadership"],
    sourceBook: "Never Split the Difference",
    framework: "Mirroring",
    sourceReason: "Direct application of Voss mirroring to listing agent dynamic.",
    duplicateRisk: "Medium",
    createdAt: "2025-04-24",
  },
  {
    id: "gc-5",
    topic: "Pre-approval vs pre-qualification — myth bust",
    pillar: "Myth-Bust / Story",
    platform: "Instagram Reels",
    duration: "30 seconds",
    wordCount: 74,
    status: "Exported",
    hook: "Your 'pre-approval' is fake. Here's how to spot it.",
    script: "If your lender didn't pull your credit, verify income, and run automated underwriting — you have a pre-QUALIFICATION. Sellers throw those out. A real pre-approval has a credit pull, AUS findings, and your loan officer's direct number on the letter. Anything less and your offer goes to the bottom of the pile.",
    onScreen: "PRE-QUAL ≠ PRE-APPROVAL / DEMAND AUS FINDINGS",
    productionBrief: "Side-by-side comparison graphic.",
    caption: "Don't let a weak pre-approval letter cost you the house.",
    cta: "Comment APPROVE for the real letter checklist.",
    dmKeyword: "VALUE",
    deliverable: "Real Pre-Approval Checklist",
    hashtags: ["#preapproval", "#homebuyer", "#mortgagetips"],
    sourceBook: "Master Strategy Bible",
    framework: "Myth-Bust Format",
    sourceReason: "High-engagement myth-bust format from strategy bible.",
    duplicateRisk: "Low",
    createdAt: "2025-04-20",
    scheduledFor: "2025-04-24",
    scheduledTime: "6:00 PM",
  },
  {
    id: "gc-6",
    topic: "Anchoring on list price — Cialdini",
    pillar: "Psychology & Behavioral Economics",
    platform: "Facebook Reels",
    duration: "45 seconds",
    wordCount: 102,
    status: "Needs Review",
    hook: "List price is a magic trick your brain falls for every time.",
    script: "The first number you see becomes the gravity for every number after it. Cialdini calls it anchoring. So when a house is listed at $599k, your brain rejects $540k as 'lowball' even if comps say $530k. Here's the counter: bring your own anchor. Walk in with three pulled comps, lay them on the table, and say 'this is the data.' Now YOU set gravity. The listing agent has to argue against your number, not theirs. Comment ANCHOR for the playbook.",
    onScreen: "BRING YOUR OWN ANCHOR / DATA BEATS LIST PRICE",
    productionBrief: "Visual: scale tipping. Comps overlay.",
    caption: "Stop letting list price control your offer.",
    cta: "Comment ANCHOR for the playbook.",
    dmKeyword: "ANCHOR",
    deliverable: "Anchoring Playbook",
    hashtags: ["#realestate", "#negotiation", "#psychology"],
    sourceBook: "Influence",
    framework: "Anchoring",
    sourceReason: "Cialdini anchoring principle applied to list-price psychology.",
    duplicateRisk: "Low",
    createdAt: "2025-04-24",
    scheduledFor: "2025-04-26",
    scheduledTime: "6:00 AM",
  },
];

export const POSTING_TIMES = ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];

export const RECENT_ACTIVITY = [
  { time: "2 min ago", text: "Master Strategy Bible indexed", icon: "check" },
  { time: "14 min ago", text: "Year 1 Calendar imported", icon: "calendar" },
  { time: "1 hr ago", text: "BUYDOWN keyword mapped to deliverable", icon: "key" },
  { time: "2 hr ago", text: "Instagram Reel package generated", icon: "sparkles" },
  { time: "3 hr ago", text: "Script length validation completed", icon: "check" },
  { time: "Yesterday", text: "Content batch exported to Word", icon: "download" },
];

export const TEAM = [
  { name: "Jeffrey Ben-Davis", role: "Admin", email: "jeffrey@kosherlending.com" },
  { name: "Sarah Chen", role: "Content Manager", email: "sarah@kosherlending.com" },
  { name: "Marcus Rivera", role: "Editor", email: "marcus@kosherlending.com" },
  { name: "Priya Patel", role: "Viewer", email: "priya@kosherlending.com" },
];

export const EXPORTS = [
  { id: "ex-1", name: "Week 17 Instagram Pack", type: "Word", date: "2025-04-22", posts: 35, status: "Ready" },
  { id: "ex-2", name: "April Calendar Master", type: "CSV", date: "2025-04-20", posts: 120, status: "Downloaded" },
  { id: "ex-3", name: "BUYDOWN Campaign", type: "Google Docs", date: "2025-04-18", posts: 12, status: "Ready" },
  { id: "ex-4", name: "Editor Production Brief — TikTok", type: "Word", date: "2025-04-17", posts: 28, status: "Downloaded" },
  { id: "ex-5", name: "GHL Keyword Map", type: "CSV", date: "2025-04-15", posts: 77, status: "Ready" },
  { id: "ex-6", name: "Q2 Geographic Pack", type: "Word", date: "2025-04-12", posts: 45, status: "Preparing" },
];

export const INTEGRATIONS = [
  { name: "Supabase database", status: "Not Connected", category: "Database" },
  { name: "Vector database", status: "Not Connected", category: "Database" },
  { name: "Claude API", status: "Not Connected", category: "AI" },
  { name: "Gemini API", status: "Not Connected", category: "AI" },
  { name: "Perplexity API", status: "Not Connected", category: "AI" },
  { name: "Google Docs export", status: "Not Connected", category: "Workflow" },
  { name: "GoHighLevel", status: "Not Connected", category: "CRM" },
  { name: "Social media posting", status: "Future Phase", category: "Distribution" },
];
