import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle, MapPin, Compass, Monitor, Crop, Monitor as DroneIcon, Clock } from 'lucide-react'

const STEPS = [
  { key: 'field', label: 'Field', icon: MapPin },
  { key: 'flight', label: 'Flight Path', icon: Compass },
  { key: 'drone', label: 'Drone', icon: DroneIcon },
  { key: 'launch', label: 'Launch', icon: ArrowRight },
]

export default function ConfigureWizard() {
  const [step, setStep] = useState('field')
  const [field, setField] = useState('Field Alpha — North Block (45 ha)')
  const [pattern, setPattern] = useState('Grid')
  const [altitude, setAltitude] = useState(25)
  const [overlap, setOverlap] = useState(70)
  const [speed, setSpeed] = useState(8)
  const [drone, setDrone] = useState('DJI Agras T40')
  const [operator, setOperator] = useState('Carlos Mendez')
  const [schedule, setSchedule] = useState('')
  const [spray, setSpray] = useState(true)
  const [chemical, setChemical] = useState('Pesticide Mix A')
  const stepIndex = STEPS.findIndex((s) => s.key === step)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-ink tracking-tight">Configure Drone Operation</h2>
          <p className="text-ink-3">Plan a new mission for your fields</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 px-2">
        {STEPS.map((s, i) => {
          const isActive = step === s.key
          const isDone = stepIndex > i
          return (
            <div key={s.key} className="flex-1 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${isActive ? 'bg-accent text-accent-ink border-accent shadow-[0_0_15px_rgba(74,222,128,0.4)]' : isDone ? 'bg-accent text-accent-ink border-accent' : 'bg-surface-2 text-ink-3 border-line'}`}>
                  {isDone ? '✓' : i + 1}
                </span>
                <span className={`text-xs font-medium ${isActive ? 'text-accent' : isDone ? 'text-accent' : 'text-ink-3'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`absolute top-3 left-1/2 w-full h-1 bg-line ${isDone ? 'bg-accent' : ''} z-0`} />}
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === 'field' && <FieldStep setField={setField} field={field} />}
          {step === 'flight' && <FlightStep pattern={pattern} setPattern={setPattern} altitude={altitude} setAltitude={setAltitude} overlap={overlap} setOverlap={setOverlap} speed={speed} setSpeed={setSpeed} />}
          {step === 'drone' && <DroneStep drone={drone} setDrone={setDrone} operator={operator} setOperator={setOperator} />}
          {step === 'launch' && <LaunchStep />}
        </div>
        <aside className="lg:col-span-1">
          <MissionSummary step={step} field={field} pattern={pattern} altitude={altitude} overlap={overlap} speed={speed} drone={drone} operator={operator} />
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur border-t border-line p-6 md:px-8 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {step !== 'field' ? (
            <button onClick={() => setStep(STEPS[stepIndex - 1].key)} className="btn-secondary flex-1 md:flex-none"><ArrowLeft className="w-4 h-4 mr-2" /> Back</button>
          ) : <div />}
          {step !== 'launch' ? (
            <button onClick={() => setStep(STEPS[stepIndex + 1].key)} className="btn-primary flex-1 md:flex-none">Continue <ArrowRight className="w-4 h-4 ml-2" /></button>
          ) : (
            <button onClick={() => alert('Mission launched! Demo mode — drone command saved.')} className="btn-primary flex-1 md:flex-none">Launch Mission</button>
          )}
        </div>
      </div>
    </div>
  )
}

function FieldStep({ setField, field }) {
  const fields = [
    { name: 'Field Alpha', subtitle: 'North Block (45 ha)', crop: 'Wheat', health: 'High' },
    { name: 'Field Beta', subtitle: 'East Block (32 ha)', crop: 'Rice', health: 'Medium' },
    { name: 'Field Gamma', subtitle: 'South Paddock (28 ha)', crop: 'Corn', health: 'High' },
    { name: 'Field Delta', subtitle: 'West Orchard (18 ha)', crop: 'Soybean', health: 'Low' },
  ]
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-bold text-lg text-ink mb-2">Select Target Field</h3>
        <p className="text-sm text-ink-3">Choose the field for this drone mission</p>
      </div>
      <div className="space-y-3">
        {fields.map((f) => (
          <button key={f.name} onClick={() => setField(`${f.name} — ${f.subtitle}`)} className={`w-full p-4 rounded-2xl border transition-all hover:border-accent/50 hover:bg-accent/5 text-left ${field === `${f.name} — ${f.subtitle}` ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(74,222,128,0.15)]' : 'border-line bg-surface-2'}`}>
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-ink">{f.name}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">{f.health}</span>
            </div>
            <p className="text-sm text-ink-3">{f.subtitle}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-ink-3"><Crop className="w-3 h-3" /><span>{f.crop}</span></div>
          </button>
        ))}
      </div>
      <div className="pt-4 border-t border-line/50">
        <p className="text-xs font-semibold text-ink-2 uppercase tracking-wider mb-2">What is growing in this field?</p>
        <div className="flex flex-wrap gap-2">
          {['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Sugarcane'].map((c) => (
            <span key={c} className="chip flex-1 justify-center">{c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function FlightStep({ pattern, setPattern, altitude, setAltitude, overlap, setOverlap, speed, setSpeed }) {
  const patterns = ['Grid', 'Double Grid', 'Perimeter', 'Custom Waypoints']
  return (
    <div className="space-y-6">
      <div><h3 className="font-bold text-lg text-ink mb-2">Flight Pattern</h3><p className="text-sm text-ink-3">Define how the drone will cover the field</p></div>
      <div className="space-y-3">
        {patterns.map((p) => (
          <button key={p} onClick={() => setPattern(p)} className={`w-full py-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${pattern === p ? 'bg-accent text-accent-ink border-accent shadow-[0_0_20px_rgba(74,222,128,0.25)]' : 'bg-surface-2 text-ink border-line hover:border-accent/50'}`}>
            <Scissors className="w-5 h-5" /><span className="font-medium">{p}</span>
          </button>
        ))}
      </div>
      <SliderRow label="Flight Altitude" value={altitude} setValue={setAltitude} min={10} max={80} unit="m" />
      <SliderRow label="Scan Overlap" value={overlap} setValue={setOverlap} min={50} max={80} unit="%" />
      <SliderRow label="Flight Speed" value={speed} setValue={setSpeed} min={3} max={15} unit="m/s" />
      <div className="bg-surface rounded-2xl border border-line p-4"><div className="flex items-center justify-between text-xs font-mono text-ink-3"><span>Estimated Mission Stats</span><span>~938 min · 50 ha · 36,000 waypoints</span></div></div>
    </div>
  )
}

function SliderRow({ label, value, setValue, min, max, unit }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center"><span className="text-sm font-medium text-ink">{label}</span><span className="text-xs font-bold font-mono text-accent">{value}{unit}</span></div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-accent" />
    </div>
  )
}

function DroneStep({ drone, setDrone, operator, setOperator }) {
  const drones = [
    { name: 'DJI Agras T40', battery: 87, status: 'Ready', color: '#4ade80' },
    { name: 'DJI Agras T30', battery: 94, status: 'Ready', color: '#4ade80' },
    { name: 'XAG P100 Pro', battery: 61, status: 'Maintenance', color: '#fbbf24' },
  ]
  const operators = ['Carlos Mendez', 'Priya Sharma', 'Ravi Singh']
  return (
    <div className="space-y-6">
      <div><h3 className="font-bold text-lg text-ink mb-2">Available Drones</h3><p className="text-sm text-ink-3">Select equipment for this mission</p></div>
      <div className="space-y-3">
        {drones.map((d) => (
          <button key={d.name} onClick={() => setDrone(d.name)} className={`w-full p-4 rounded-2xl border transition-all text-left ${drone === d.name ? 'bg-accent/10 border-accent shadow-[0_0_20px_rgba(74,222,128,0.2)]' : 'bg-surface-2 border-line hover:border-accent/50'}`}>
            <div className="flex items-center gap-3 mb-3"><Monitor className={`w-5 h-5 ${d.color === '#4ade80' ? 'text-accent' : 'text-accent-2'}`} /><span className="font-bold text-ink">{d.name}</span><span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded ${d.color === '#4ade80' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-accent-2/10 text-accent-2 border border-accent-2/30'}`}>{d.status}</span></div>
            <div className="w-full bg-surface-2 h-2 rounded-full overflow-hidden mb-2"><div className="h-full rounded-full" style={{ width: d.battery + '%', background: d.color === '#4ade80' ? '#4ade80' : '#22c55e' }} /></div>
            <div className="flex justify-between text-xs text-ink-3"><span>Battery {d.battery}%</span><span>{d.battery > 70 ? 'Good' : d.battery > 50 ? 'Fair' : 'Low'}</span></div>
          </button>
        ))}
      </div>
      <div>
        <h4 className="font-semibold text-ink mb-2">Assign Operator</h4>
        <div className="space-y-2">
          {operators.map((o) => (
            <button key={o} onClick={() => setOperator(o)} className={`w-full py-3 rounded-xl border transition-all text-left ${operator === o ? 'bg-accent/10 border-accent' : 'bg-surface-2 border-line hover:border-accent/50'}`}>
              <Truck className="w-4 h-4 text-ink-3 mr-2 inline" />
              <span className="font-medium text-ink">{o}</span>
              <span className="ml-auto text-xs text-ink-3 float-right">Zone 3</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function LaunchStep() {
  return (
    <div className="space-y-6">
      <div><h3 className="font-bold text-lg text-ink mb-2">Mission Summary</h3><p className="text-sm text-ink-3">Set mission time and spray parameters</p></div>
      <div className="bg-surface rounded-2xl border border-line p-5">
        <h4 className="text-xs font-bold text-ink-2 uppercase tracking-wider mb-3">Scheduled Date & Time</h4>
        <input type="datetime-local" className="w-full bg-surface-2 border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-accent" />
      </div>
      <div className="flex items-center justify-between p-4 rounded-2xl border border-line bg-surface-2">
        <div className="flex items-center gap-3"><input type="checkbox" className="w-4 h-4 rounded text-accent focus:ring-accent" /><span className="font-medium text-ink">Enable chemical/water spraying</span></div>
      </div>
      <div>
        <h4 className="text-xs font-bold text-ink-2 uppercase tracking-wider mb-2">Spray Chemical</h4>
        <div className="flex flex-wrap gap-2">
          {['Pesticide Mix A', 'Fungicide B-22', 'Herbicide Clear'].map((c) => (
            <button key={c} className="chip px-4">{c}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

function MissionSummary({ step, field, pattern, altitude, overlap, speed, drone, operator }) {
  const showSummary = step === 'launch'
  return (
    <div className="card h-full sticky top-6">
      <h3 className="font-bold text-lg text-ink mb-4">Mission Summary</h3>
      <div className="bg-surface-2 rounded-2xl border border-line p-4 space-y-4 mb-6">
        <Row label="Field" value={field || 'Select field'} />
        <Row label="Pattern" value={pattern || 'Select pattern'} />
        <Row label="Altitude" value={`${altitude} m`} />
        <Row label="Overlap" value={`${overlap}%`} />
        <Row label="Speed" value={`${speed} m/s`} />
        <Row label="Drone" value={drone || 'Select drone'} />
        <Row label="Operator" value={operator || 'Select operator'} />
      </div>
      {showSummary && (
        <>
          <div className="bg-surface rounded-2xl border border-line p-4 mb-6">
            <h4 className="text-xs font-bold text-ink-2 uppercase tracking-wider mb-3">Schedule</h4>
            <Row label="Date & Time" value="21/10/2026 at 23:11" />
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group"><input type="checkbox" className="w-4 h-4 rounded text-accent" /><span className="text-sm text-ink">Enable chemical/water spraying</span></label>
            <div className="flex gap-2">
              {['Pesticide Mix A', 'Fungicide B-22', 'Herbicide Clear'].map((c) => (<button key={c} className="chip px-4">{c}</button>))}
            </div>
          </div>
          <button onClick={() => alert('Mission launched! Demo mode — drone mission command saved.')} className="btn-primary w-full py-4 text-lg">Launch Mission</button>
        </>
      )}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-line/50 last:border-0">
      <span className="text-xs text-ink-3">{label}</span>
      <span className="text-sm font-medium text-ink font-mono">{value}</span>
    </div>
  )
}