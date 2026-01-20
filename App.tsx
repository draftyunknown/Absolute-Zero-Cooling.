
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Thermometer, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Facebook, 
  FileText, 
  Wind,
  Package, 
  ShieldCheck, 
  ShoppingCart,
  Zap,
  Search,
  Layers,
  BarChart3,
  X,
  MessageCircle,
  Eye,
  Settings,
  Database,
  Calculator,
  ArrowRightLeft,
  Award,
  Snowflake,
  Shield,
  Activity,
  Cpu,
  Truck,
  Globe,
  Bell
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Constants & Types ---
const PHONE = "0705 988888";
const WHATSAPP_LINK = "https://wa.me/254705988888";
const ADDRESS = "Morningside Office Park, Ngong Rd, Nairobi";
const MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.78913411424!2d36.7865715!3d-1.2995547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109033333333%3A0x6b876677f5979c38!2sMorningside%20Office%20Park!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske";

type Category = 'Refrigerant' | 'Chemicals' | 'Components' | 'Tools';
type StockStatus = 'In Stock' | 'Limited' | 'Special Order';

interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  spec: string;
  image: string;
  stockStatus: StockStatus;
  bulkPrice: string;
  currentQty: number;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'iCool R134a Premium', category: 'Refrigerant', description: 'High-purity tetrafluoroethane optimized for equatorial climates. Essential for automotive and high-ambient domestic cooling.', spec: '13.6kg DOT Cylinder', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800', stockStatus: 'In Stock', bulkPrice: 'Contact for Tier 1', currentQty: 450 },
  { id: '2', name: 'iCool R410a Eco-Line', category: 'Refrigerant', description: 'HFC refrigerant with near-zero temperature glide. Preferred for modern inverter AC systems.', spec: '11.3kg DOT Cylinder', image: 'https://images.unsplash.com/photo-1599933310622-9018b2842099?auto=format&fit=crop&q=80&w=800', stockStatus: 'In Stock', bulkPrice: 'Volume Discount', currentQty: 320 },
  { id: '3', name: 'Alkaline Coil Foamer', category: 'Chemicals', description: 'Industrial grade coil cleaner. Safe for aluminum fins, removes deep oxidation.', spec: '5L Industrial Jug', image: 'https://images.unsplash.com/photo-1618576725878-a925d24186f4?auto=format&fit=crop&q=80&w=800', stockStatus: 'In Stock', bulkPrice: 'Wholesale', currentQty: 120 },
  { id: '4', name: 'Vacuum Pump Oil V-100', category: 'Chemicals', description: 'High-viscosity index oil. Ensures deep vacuum capability and pump longevity.', spec: '1L Bottle', image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=800', stockStatus: 'Limited', bulkPrice: 'Standard', currentQty: 15 },
  { id: '5', name: 'LWC Copper Tubing', category: 'Components', description: 'Level Wound Coils, dehydrated and capped. Seamless construction.', spec: '1/4" to 7/8"', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800', stockStatus: 'In Stock', bulkPrice: 'Project Quote', currentQty: 85 },
];

const Badge = ({ children, variant = 'blue' }: { children: React.ReactNode, variant?: 'blue' | 'emerald' | 'amber' | 'slate' | 'cyan' }) => {
  const styles = {
    blue: 'bg-blue-600/10 text-blue-600 border-blue-200/50',
    emerald: 'bg-emerald-600/10 text-emerald-600 border-emerald-200/50',
    amber: 'bg-amber-600/10 text-amber-600 border-amber-200/50',
    slate: 'bg-slate-900/10 text-slate-900 border-slate-200/50',
    cyan: 'bg-cyan-400/10 text-cyan-500 border-cyan-200/30'
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border backdrop-blur-sm ${styles[variant]}`}>
      {children}
    </span>
  );
};

const CalculatorSection = () => {
  const [area, setArea] = useState(25);
  const [ppl, setPpl] = useState(2);
  const btu = useMemo(() => (area * 600) + (ppl * 400), [area, ppl]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl">
      <h3 className="text-2xl font-black text-white italic mb-8 flex items-center gap-3">
        <Calculator className="text-blue-400" /> BTU Logic Estimator
      </h3>
      <div className="space-y-8">
        <div>
          <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest block mb-3">Room Area (sqm): {area}</label>
          <input type="range" min="10" max="200" value={area} onChange={(e) => setArea(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
        <div>
          <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest block mb-3">Occupancy (Persons): {ppl}</label>
          <input type="range" min="1" max="20" value={ppl} onChange={(e) => setPpl(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
        <div className="pt-8 border-t border-white/10 flex justify-between items-end">
          <div>
            <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Recommended Capacity</div>
            <div className="text-4xl font-black text-white tracking-tighter italic">{btu.toLocaleString()} <span className="text-lg text-slate-500">BTU/h</span></div>
          </div>
          <button className="bg-blue-600 p-4 rounded-2xl text-white hover:bg-white hover:text-blue-600 transition-all shadow-xl shadow-blue-600/20">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const runTechnicalAI = async (query: string) => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Expert Industrial Advisor: Recommendation for: ${query}. Context: Kenya HVAC market, Nairobi altitude (1.8km). Provide technical P-T values and safety warnings.`,
        config: { systemInstruction: "You are iCool Technical Hub AI. Provide precise, engineer-grade specifications. Use Markdown formatting." }
      });
      setAiOutput(response.text);
    } catch (e) {
      setAiOutput("System link offline. Please call the 24/7 technical desk.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-200 selection:bg-blue-600 selection:text-white font-['Inter']">
      
      {/* Arctic Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Futuristic Navbar */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-5 group cursor-pointer">
            <div className="w-14 h-14 bg-blue-600 rounded-[22px] flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] group-hover:rotate-90 transition-transform duration-700">
              <Snowflake className="w-8 h-8" />
            </div>
            <div>
              <span className="block font-black text-3xl tracking-tighter leading-none text-white uppercase italic">iCool</span>
              <span className="block text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] leading-tight">Industry Kenya</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12">
            {['Inventory', 'Automation', 'Logistics', 'SDS Hub'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-400 transition-all relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setIsPortalOpen(true)} className="hidden md:flex px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl">Client Portal</button>
            <a href={`tel:${PHONE}`} className="w-14 h-14 bg-blue-600 rounded-[22px] flex items-center justify-center text-white hover:scale-110 transition-all shadow-2xl shadow-blue-600/30"><Phone className="w-6 h-6" /></a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-64 pb-40 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl mb-12 animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Precision Thermal Solutions</span>
            </div>
            <h1 className="text-[90px] font-black text-white leading-[0.85] tracking-tighter mb-12 italic">
              Absolute <br />
              <span className="text-blue-500">Zero</span> <br />
              Cooling.
            </h1>
            <p className="text-xl text-slate-400 font-medium mb-16 leading-relaxed max-w-xl italic">East Africa's premier supply chain for high-purity chemicals and ISO-certified HVAC infrastructure. Engineering excellence since 2012.</p>
            <div className="flex flex-wrap gap-8">
              <button onClick={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 py-7 bg-blue-600 text-white rounded-[28px] font-black text-sm uppercase tracking-[0.3em] shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] hover:scale-105 transition-all">Explore Assets</button>
              <div className="flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/10 rounded-[28px]">
                <ShieldCheck className="text-cyan-400 w-8 h-8" />
                <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight">ISO 9001:2015 <br />Certified Supply</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
             <div className="bg-white/5 p-4 rounded-[60px] border border-white/10 shadow-3xl rotate-2 hover:rotate-0 transition-transform duration-1000 group overflow-hidden">
               <img src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=1200" className="rounded-[50px] w-full h-[650px] object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Industrial Cooling" />
               <div className="absolute top-10 right-10 bg-blue-600 p-6 rounded-[30px] shadow-2xl">
                 <Cpu className="w-10 h-10 text-white" />
               </div>
               <div className="absolute bottom-10 left-10 right-10 p-10 bg-slate-950/80 backdrop-blur-xl rounded-[40px] border border-white/10">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-2">Technical Insight</div>
                 <div className="text-2xl font-black text-white italic">"Maximum Efficiency in High Ambient Heat."</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section id="inventory" className="py-40 bg-white/2">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-0.5 w-16 bg-blue-600"></div>
                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-blue-500">Asset Catalogue</span>
              </div>
              <h2 className="text-7xl font-black text-white tracking-tighter italic">Verified Stock.</h2>
            </div>
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find Refrigerant, Tool, or Chemical..." 
                className="w-full lg:w-[450px] py-7 pl-16 pr-8 bg-white/5 border border-white/10 rounded-3xl text-white font-bold focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {INITIAL_PRODUCTS.map(p => (
              <div key={p.id} className="group bg-white/5 rounded-[48px] border border-white/5 p-4 hover:bg-white/10 transition-all duration-500 flex flex-col h-full hover:border-blue-600/30">
                <div className="relative h-64 overflow-hidden rounded-[40px] mb-8">
                  <img src={p.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" alt={p.name} />
                  <div className="absolute top-6 left-6 flex gap-2">
                    {/* Fixed missing children in Badge usage */}
                    <Badge variant="cyan">{p.category}</Badge>
                  </div>
                </div>
                <div className="px-8 pb-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black text-white mb-4 italic leading-tight">{p.name}</h3>
                  <div className="flex items-center gap-3 mb-6">
                    {/* Fixed missing children in Badge usage */}
                    <Badge variant={p.stockStatus === 'In Stock' ? 'emerald' : 'amber'}>{p.stockStatus}</Badge>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{p.spec}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-10 line-clamp-3 font-medium italic">"{p.description}"</p>
                  <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Pricing Logic</div>
                      <div className="text-sm font-black text-white">{p.bulkPrice}</div>
                    </div>
                    <button 
                      onClick={() => setSelectedProduct(p)}
                      className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-all"
                    >
                      <Eye className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Hub (Calculators & AI) */}
      <section id="automation" className="py-40 relative">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <CalculatorSection />
              <div className="bg-blue-600 rounded-[50px] p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="relative z-10">
                   <h3 className="text-3xl font-black italic mb-6">Automation Request</h3>
                   <p className="text-blue-100 font-medium mb-10 leading-relaxed italic">Switch to iCool automated scheduling and save up to 25% on annual maintenance overheads.</p>
                   <button className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:scale-105 transition-all">Launch Dashboard</button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-24 h-24 bg-cyan-400 rounded-full blur-[80px] absolute -top-10 -left-10 animate-pulse"></div>
              <h2 className="text-7xl font-black text-white tracking-tighter italic mb-12">Technical <br /><span className="text-blue-500">Node AI.</span></h2>
              <p className="text-xl text-slate-400 mb-12 italic leading-relaxed">Consult our engine for thermodynamic modeling and regional installation advice. Instant analysis based on 10+ years of Nairobi field data.</p>
              
              <div className="bg-slate-950 border border-white/10 rounded-[48px] p-10 shadow-3xl">
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-white focus:outline-none focus:border-blue-500 mb-8 min-h-[200px] font-medium" 
                  placeholder="Describe your system requirements (e.g. Chiller charge for R404a)..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  onClick={() => runTechnicalAI(searchTerm)}
                  disabled={isLoading}
                  className="w-full py-6 bg-blue-600 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-blue-500 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Compute Solution'}
                  <Zap className="w-5 h-5" />
                </button>
                {aiOutput && (
                  <div className="mt-12 p-10 bg-white/5 border border-white/10 rounded-[32px] animate-in slide-in-from-bottom-5">
                    <div className="text-slate-300 leading-relaxed text-sm italic whitespace-pre-wrap">{aiOutput}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logistics & Tracking */}
      <section id="logistics" className="py-40 bg-white/2">
        <div className="max-w-[1440px] mx-auto px-8">
           <div className="bg-slate-950 rounded-[80px] p-24 relative overflow-hidden border border-white/5">
              <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
                <div>
                  <h2 className="text-6xl font-black text-white tracking-tighter italic mb-10">Regional <br />Supply Chain.</h2>
                  <div className="space-y-10">
                    <div className="flex gap-8">
                      <div className="w-16 h-16 shrink-0 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><Truck /></div>
                      <div>
                        <div className="text-[11px] font-black uppercase text-blue-400 tracking-widest mb-2">Hub Location</div>
                        <div className="text-xl font-bold text-white italic">{ADDRESS}</div>
                      </div>
                    </div>
                    <div className="flex gap-8">
                      <div className="w-16 h-16 shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white"><Globe /></div>
                      <div>
                        <div className="text-[11px] font-black uppercase text-blue-400 tracking-widest mb-2">Fleet Status</div>
                        <div className="text-xl font-bold text-white italic">Active - 12 Distribution Units</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[600px] rounded-[60px] overflow-hidden border border-white/10">
                  <iframe src={MAP_URL} title="iCool HQ" width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) opacity(0.5)' }} allowFullScreen={true} loading="lazy"></iframe>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-slate-950 py-40 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-4 gap-24 mb-40">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white"><Snowflake className="w-10 h-10" /></div>
                <span className="font-black text-5xl tracking-tighter uppercase italic">iCool</span>
              </div>
              <p className="text-2xl text-slate-500 max-w-lg font-medium italic leading-relaxed">Pioneering cryogenic and chemical distribution logic across East Africa since 2012.</p>
            </div>
            <div>
              <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500 mb-10">B2B Protocols</h5>
              <ul className="space-y-6 text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                <li className="hover:text-blue-400 cursor-pointer">Distribution Matrix</li>
                <li className="hover:text-blue-400 cursor-pointer">SDS Repository</li>
                <li className="hover:text-blue-400 cursor-pointer">Compliance Index</li>
              </ul>
            </div>
            <div>
              <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500 mb-10">Secure Channels</h5>
              <div className="flex gap-6">
                <a href={WHATSAPP_LINK} className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 hover:bg-blue-600 transition-all"><MessageCircle /></a>
                <a href="tel:0705988888" className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 hover:bg-blue-600 transition-all"><Phone /></a>
              </div>
            </div>
          </div>
          <div className="pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.8em] text-slate-700">
            <div>© {new Date().getFullYear()} ICOOL INDUSTRY KENYA LTD • ENGINEERED PRECISION</div>
            <div className="flex gap-12">
              <span>Security</span>
              <span>Privacy</span>
              <span>Trade</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Portal Overlays */}
      {isPortalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setIsPortalOpen(false)}></div>
          <div className="relative w-full max-w-5xl bg-[#1e293b] rounded-[60px] p-16 shadow-3xl border border-white/10 animate-in zoom-in-95 duration-500">
             <button onClick={() => setIsPortalOpen(false)} className="absolute top-10 right-10 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white hover:bg-red-500 transition-all"><X /></button>
             <h2 className="text-4xl font-black text-white italic mb-16 flex items-center gap-6">
               <Shield className="text-blue-400" /> B2B Secure Node
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { label: 'Order Velocity', icon: Activity, val: '84%' },
                 { label: 'Fleet Sync', icon: Truck, val: 'Connected' },
                 { label: 'Credits Status', icon: Award, val: 'Platinum' }
               ].map(stat => (
                 <div key={stat.label} className="p-10 bg-white/5 border border-white/5 rounded-[40px] hover:border-blue-500/30 transition-all">
                    <stat.icon className="w-10 h-10 text-blue-400 mb-8" />
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{stat.label}</div>
                    <div className="text-2xl font-black text-white italic">{stat.val}</div>
                 </div>
               ))}
             </div>
             <div className="mt-16 pt-16 border-t border-white/5 flex justify-end">
               <button className="px-12 py-6 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em]">Launch Full Dashboard</button>
             </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative w-full max-w-6xl bg-[#0f172a] rounded-[80px] shadow-3xl overflow-hidden flex flex-col md:flex-row h-[85vh] animate-in zoom-in-95 duration-500 border border-white/5">
            <div className="md:w-1/2 relative bg-slate-900">
              <img src={selectedProduct.image} className="w-full h-full object-cover opacity-60" alt={selectedProduct.name} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]"></div>
            </div>
            <div className="md:w-1/2 p-24 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-center mb-12">
                {/* Fixed missing children in Badge usage */}
                <Badge variant="cyan">{selectedProduct.category}</Badge>
                <button onClick={() => setSelectedProduct(null)} className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 transition-all"><X /></button>
              </div>
              <h2 className="text-6xl font-black text-white italic tracking-tighter mb-8 leading-none">{selectedProduct.name}</h2>
              <div className="flex items-center gap-6 mb-12">
                <span className="text-blue-400 font-black text-xl uppercase tracking-[0.3em] italic">{selectedProduct.spec}</span>
                {/* Fixed missing children in Badge usage */}
                <Badge variant="emerald">{selectedProduct.stockStatus}</Badge>
              </div>
              <p className="text-xl text-slate-400 leading-relaxed mb-16 italic font-medium">"{selectedProduct.description}"</p>
              
              <div className="grid grid-cols-2 gap-8 mb-16">
                <div className="p-10 bg-white/5 border border-white/5 rounded-[40px]">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Inventory Qty</div>
                  <div className="text-2xl font-black text-white italic">{selectedProduct.currentQty} Units</div>
                </div>
                <div className="p-10 bg-white/5 border border-white/5 rounded-[40px]">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">B2B Base</div>
                  <div className="text-2xl font-black text-white italic">{selectedProduct.bulkPrice}</div>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-8">
                <button className="bg-blue-600 text-white py-8 rounded-[35px] font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 hover:scale-105 transition-all">Procure Assets</button>
                <a href={WHATSAPP_LINK} target="_blank" className="bg-white/5 border border-white/10 text-white py-8 rounded-[35px] font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-blue-600 transition-all">
                  <MessageCircle className="w-5 h-5" /> 24/7 Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
