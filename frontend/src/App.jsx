import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, RotateCcw, Play, Calculator } from 'lucide-react';

const INITIAL_P1 = { e: 45.6, px: 10.0, py: 5.0, pz: 44.2 };
const INITIAL_P2 = { e: 45.6, px: -10.0, py: -5.0, pz: -44.2 };

function App() {
  const [wasmModule, setWasmModule] = useState(null);
  const [status, setStatus] = useState("Initializing Wasm Environment...");
  
  // State for Inputs
  const [p1, setP1] = useState(INITIAL_P1);
  const [p2, setP2] = useState(INITIAL_P2);
  
  // Results
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Load Wasm
  useEffect(() => {
    const loadWasm = async () => {
      try {
        const script = document.createElement('script');
        script.src = "/wasm/webroot.js";
        script.onload = async () => {
          const Module = await window.WebROOTModule();
          setWasmModule(Module);
          setStatus("System Ready");
        };
        document.body.appendChild(script);
      } catch (err) {
        setStatus("System Error: " + err.message);
      }
    };
    loadWasm();
  }, []);

  const handleInputChange = (particle, field, value) => {
    const setter = particle === 1 ? setP1 : setP2;
    const current = particle === 1 ? p1 : p2;
    setter({ ...current, [field]: parseFloat(value) || 0 });
  };

  const runCalculation = () => {
    if (!wasmModule) return;

    const start = performance.now();
    // Native C++ Execution via Wasm
    const mass = wasmModule.calculateInvariantMass(
      p1.e, p1.px, p1.py, p1.pz,
      p2.e, p2.px, p2.py, p2.pz
    );
    const end = performance.now();

    const newResult = {
      mass: mass,
      time: (end - start).toFixed(4),
      timestamp: new Date().toLocaleTimeString()
    };

    setResult(newResult);
    setHistory(prev => [...prev.slice(-19), { name: prev.length, mass: mass }]);
  };

  const randomize = () => {
    // Generate valid-ish kinematics for Z->ee
    const rand = () => (Math.random() - 0.5) * 20;
    setP1({ e: 45 + Math.random(), px: rand(), py: rand(), pz: 40 + rand() });
    setP2({ e: 45 + Math.random(), px: rand(), py: rand(), pz: -40 + rand() });
  };

  return (
    <div className="min-h-screen p-6 grid gap-6 grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <header className="lg:col-span-12 flex justify-between items-center border-b border-gray-700 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded">
            <Activity className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">WebROOT-X</h1>
            <p className="text-xs text-gray-400 font-mono">Client-Side HEP Analysis / C++17 / WebAssembly</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-700">
          <div className={`w-2 h-2 rounded-full ${wasmModule ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
          <span className="text-xs font-mono text-gray-300">{status}</span>
        </div>
      </header>

      {/* INPUT PANEL */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Kinematics Input (GeV)</h2>
            <button onClick={randomize} className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded flex items-center gap-1 transition">
              <RotateCcw size={12} /> Randomize
            </button>
          </div>

          <div className="space-y-6">
            {/* Particle 1 */}
            <div>
              <label className="text-xs text-blue-400 font-bold mb-2 block">PARTICLE 1 (Electron)</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(p1).map(key => (
                  <div key={`p1-${key}`}>
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">{key}</span>
                    <input type="number" value={p1[key]} onChange={(e) => handleInputChange(1, key, e.target.value)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Particle 2 */}
            <div>
              <label className="text-xs text-red-400 font-bold mb-2 block">PARTICLE 2 (Positron)</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(p2).map(key => (
                  <div key={`p2-${key}`}>
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">{key}</span>
                    <input type="number" value={p2[key]} onChange={(e) => handleInputChange(2, key, e.target.value)} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={runCalculation}
            disabled={!wasmModule}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={18} /> Run Analysis
          </button>
        </div>
      </div>

      {/* RESULTS PANEL */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Main Stat Card */}
        <div className="bg-slate-800 p-8 rounded-xl border border-gray-700 shadow-lg flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Calculated Invariant Mass</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-white mono-number">
                {result ? result.mass.toFixed(4) : "0.0000"}
              </span>
              <span className="text-xl text-gray-500 font-medium">GeV/c²</span>
            </div>
            {result && (
              <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 bg-gray-900/50 rounded border border-gray-700 text-xs text-green-400">
                <Cpu size={12} />
                Computed in {result.time} ms (Client-Side)
              </div>
            )}
          </div>

          <div className="hidden md:block">
             <Calculator size={64} className="text-gray-700" />
          </div>
        </div>

        {/* Charts & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* History Graph */}
          <div className="bg-slate-800 p-6 rounded-xl border border-gray-700 h-64">
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-4">Analysis History</h3>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={history}>
                <XAxis hide />
                <YAxis domain={['auto', 'auto']} stroke="#475569" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                <Line type="monotone" dataKey="mass" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Theory Box */}
          <div className="bg-slate-800 p-6 rounded-xl border border-gray-700 h-64 flex flex-col justify-center">
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Theoretical Target</h3>
            <div className="text-2xl font-bold text-white">Z Boson</div>
            <div className="text-sm text-gray-400 mb-4">Standard Model Particle</div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-gray-700 pb-1">
                <span className="text-gray-500">Mass</span>
                <span className="font-mono text-blue-400">91.1876 GeV</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-1">
                <span className="text-gray-500">Width</span>
                <span className="font-mono text-blue-400">2.4952 GeV</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-500">Decay Mode</span>
                <span className="font-mono text-purple-400">e⁻ + e⁺</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App