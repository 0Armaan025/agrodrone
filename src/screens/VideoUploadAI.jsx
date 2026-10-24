import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Upload, Play, Scan, Sparkles, Shield, Send, CheckCircle2, AlertCircle, X as XIcon,
  Bot, Key, Video, Sprout, Leaf, Droplets, Wrench, Waves, Monitor, TrendingUp, Droplet
} from 'lucide-react'
import { useToast } from '../components/useToast'
import { Skeleton } from '../components/Skeleton'

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

const MOCK_ANALYSIS = {
  altitude: 24,
  fertilizer: 'N-P-K 12-12-17 + Micronutrients',
  sprayElevationChange: 2,
  droneModel: 'DJI Agras T40',
  batteryEstimate: 78,
  coverageEstimate: 44,
  anomalies: 'Mild nutrient deficiency detected in northwest quadrant. Recommend 10% increase in nitrogen spray for next pass.',
  confidenceScore: 92,
  recommendations: {
    pesticide: 'Proceed with caution — soil analysis shows low pest pressure (<5%) but fungal spores detected in zone 3. Apply organic pyrethrin at 15L/ha if moisture >60% for 3+ days.',
    fertilizer: 'Proceed — apply N-P-K 12-12-17 + micronutrients. Raise spray nozzle +2m to avoid crop contact.',
    sprayElevation: 'Raise spray elevation by +2m to avoid crop damage. Adjust drone speed to 6.5 m/s for uniform coverage.',
  },
  soilAnalysis: {
    ph: 6.4,
    nitrogen: 'Low — 1.2 mg/kg',
    phosphorus: 'Medium — 18 mg/kg',
    potassium: 'Medium — 145 mg/kg',
    moisture: '58% — near threshold',
    organicMatter: '3.8%',
    fungalSpores: 'Detected in Zone 3 (low density)',
    pestPressure: 'Low (<5%)',
    weedDensity: 'Medium — 12 plants/m²',
    salinity: 'Low — 0.3 dS/m',
    temperature: '28°C surface',
    pHRecommendation: 'Adjust to 6.8 with lime for next season',
    pesticideNeed: 'Conditional — only if moisture exceeds 60% for 3 consecutive days',
  },
}

export default function VideoUploadAI() {
  const { add: addToast } = useToast()
  const [videoFile, setVideoFile] = useState(null)
  const [frames, setFrames] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [approvalPending, setApprovalPending] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [apiKeySet, setApiKeySet] = useState(false)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)
  const [demoMode, setDemoMode] = useState(true)
  const [simulatedFrames, setSimulatedFrames] = useState([])
  const [showSimVideo, setShowSimVideo] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (demoMode && !videoFile && !simulatedFrames.length) {
      const newFrames = Array.from({ length: 6 }, (_, i) => ({
        src: `https://picsum.photos/seed/agrodrone${i}/400/225`,
        label: `Frame ${i + 1}`,
      }))
      setSimulatedFrames(newFrames)
    }
  }, [demoMode, videoFile, simulatedFrames.length])

  const extractFrames = () => {
    if (!videoFile && demoMode) {
      setFrames(simulatedFrames.map((f) => ({ ...f, src: f.src })))
      setShowSimVideo(true)
      return
    }
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx || !video) return
    const duration = video.duration || 10
    const frameCount = Math.min(12, Math.max(3, Math.floor(duration / 2)))
    const newFrames = []
    for (let i = 0; i < frameCount; i++) {
      const time = (duration / (frameCount - 1)) * i
      video.currentTime = time
      canvas.width = 640
      canvas.height = 360
      ctx.drawImage(video, 0, 0, 640, 360)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
      newFrames.push({ src: dataUrl, label: `Frame ${i + 1}` })
    }
    setFrames(newFrames)
  }

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file.')
      return
    }
    setVideoFile(file)
    setError(null)
    setAnalysis(null)
    setSent(false)
    setFrames([])
    setShowSimVideo(false)
    const url = URL.createObjectURL(file)
    if (videoRef.current) videoRef.current.src = url
  }

  const runAnalysis = async () => {
    if (demoMode && !showSimVideo && simulatedFrames.length > 0) {
      setShowSimVideo(true)
      setFrames(simulatedFrames.map((f) => ({ ...f, src: f.src })))
    }
    if (!apiKeySet && !demoMode) {
      setError('Please enter your Gemini API key or enable demo mode.')
      return
    }
    if (frames.length === 0 && (!simulatedFrames.length || (!videoFile && !demoMode))) {
      setError('No frames extracted yet. Click "Extract Frames" or use Demo Mode.')
      return
    }
    setIsProcessing(true)
    setError(null)
    setSent(false)

    try {
      let analysisData
      if (apiKeySet && videoFile) {
        const prompt = `Analyze these frames from an agricultural drone operation video. Extract drone and mission stats AND 15 field criteria: altitude (m), fertilizer recommendation, spray elevation change (m), drone model, battery estimate (%), coverage estimate (ha), anomalies, confidenceScore (0-100). Also analyze soil conditions: pH, nitrogen, phosphorus, potassium, moisture (%), organic matter (%), fungal spores presence, pest pressure (%), weed density (plants/m²), salinity (dS/m), surface temperature (°C), and whether pesticide is needed based on soil/moisture conditions. Provide recommendations for pesticide, fertilizer, and spray elevation. Return valid JSON only with all fields.`
        const parts = frames.map((f) => ({
          inlineData: { mimeType: 'image/jpeg', data: f.src.split(',')[1] },
        }))
        const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }, ...parts] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
          }),
        })
        if (!response.ok) throw new Error(`Gemini API error: ${response.status}`)
        const data = await response.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null
        analysisData = { ...MOCK_ANALYSIS, ...parsed }
      } else {
        await new Promise((r) => setTimeout(r, 2000))
        analysisData = MOCK_ANALYSIS
      }
      setAnalysis(analysisData)
      setApprovalPending(true)
      addToast({ title: 'Analysis Complete', message: 'AI has processed ' + frames.length + ' frames with ' + MOCK_ANALYSIS.confidenceScore + '% confidence.', type: 'success' })
    } catch (err) {
      setError(err.message || 'Analysis failed.')
      const analysisData = MOCK_ANALYSIS
      setAnalysis(analysisData)
      setApprovalPending(true)
      addToast({ title: 'Analysis Failed', message: 'Falling back to demo data.', type: 'error' })
    } finally {
      setIsProcessing(false)
    }
  }

  const approveAndSend = async () => {
    if (!analysis) return
    setIsProcessing(true)
    try {
      await new Promise((r) => setTimeout(r, 1500))
      setSent(true)
      setApprovalPending(false)
      addToast({ title: 'Sent to Operator', message: 'AI recommendations delivered to Carlos Mendez — Zone 3.', type: 'success' })
    } catch (e) {
      setError('Failed to send to drone operator.')
    } finally {
      setIsProcessing(false)
    }
  }

  const toggleOption = (opt) => {
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    )
  }

  const toggleDemo = () => {
    setDemoMode(!demoMode)
    if (!demoMode) {
      setApiKeySet(false)
      setAnalysis(null)
      setFrames([])
      setSent(false)
      setApprovalPending(false)
      setShowSimVideo(false)
    }
  }

  const startDemoWithSimVideo = () => {
    setVideoFile(null)
    setFrames([])
    setAnalysis(null)
    setSent(false)
    setApprovalPending(false)
    setShowSimVideo(true)
    setFrames(simulatedFrames.map((f) => ({ ...f })))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in delay-100">
        <div>
          <h2 className="section-title">Video → AI Stats</h2>
          <p className="section-subtitle">Upload a drone video. Extract frames and analyze altitude, fertilizer, spray elevation — then send to your operator.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={toggleDemo}
            className={`px-4 py-2.5 rounded-xl border border-line bg-surface-2 text-sm font-medium hover:text-ink transition-all flex items-center gap-2 ${demoMode ? 'bg-accent text-accent-ink border-accent shadow-[0_0_15px_rgba(74,222,128,0.3)]' : ''}`}
          >
            <Bot className="w-4 h-4" /> {demoMode ? 'Demo AI On' : 'Demo AI Off'}
          </button>
          {!demoMode && (
            <button
              onClick={() => { if (apiKey.trim()) { setApiKeySet(true); setError(null) } }}
              className="btn-ghost"
            >
              <Shield className="w-4 h-4" /> Enable Live AI
            </button>
          )}
        </div>
      </div>

      {!apiKeySet && !demoMode && (
        <div className="card-glass p-6 animate-in delay-200">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-accent" />
              <span className="font-medium text-ink">Gemini API Key Required (or enable Demo AI above)</span>
            </div>
            <p className="text-sm text-ink-3">Get a free API key from Google AI Studio. The free tier supports Gemini 1.5 Flash.</p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <input type="password" placeholder="Enter Gemini API key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="flex-1 input-field text-sm" />
              <button onClick={() => { if (apiKey.trim()) { setApiKeySet(true); setError(null) } }} className="btn-primary flex-1 sm:flex-none">Enable AI</button>
            </div>
          </div>
        </div>
      )}

      {demoMode && (
        <div className="card p-6 bg-gradient-to-r from-accent/5 to-transparent border-accent/20 animate-in delay-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h4 className="font-bold text-ink">Demo Mode Active</h4>
              <p className="text-xs text-ink-3 mt-0.5">No real video needed — full AI flow simulated.</p>
            </div>
          </div>
          <button onClick={startDemoWithSimVideo} className="btn-primary w-full text-sm">
            <Video className="w-4 h-4 mr-2" /> Run Demo Video + AI Analysis
          </button>
        </div>
      )}

      <div className="card p-6 sm:p-8 text-center animate-in delay-300">
        <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" id="video-input" />
        <div
          className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-line rounded-3xl p-8 hover:border-accent/50 hover:bg-accent/5 transition-colors cursor-pointer"
          onClick={() => document.getElementById('video-input')?.click()}
        >
          <Upload className="w-10 h-10 text-ink-3" />
          <div>
            <span className="font-bold text-ink text-base block">Upload Drone Video</span>
            <span className="text-xs text-ink-3">MP4, MOV, AVI · Max 200MB</span>
          </div>
        </div>
        {videoFile && (
          <div className="flex items-center gap-3 bg-surface-2 rounded-2xl border border-line p-3 mt-4 max-w-xs mx-auto">
            <span className="text-xs text-ink-3 font-mono truncate max-w-[150px]">{videoFile.name}</span>
            <span className="text-[10px] text-accent font-mono">{Math.round(videoFile.size / 1024 / 1024)} MB</span>
            <button onClick={() => { setVideoFile(null); setFrames([]); setAnalysis(null); setSent(false); setShowSimVideo(false); }} className="p-1 text-ink-3 hover:text-accent ml-auto"><XIcon className="w-4 h-4" /></button>
          </div>
        )}
        {!videoFile && demoMode && showSimVideo && (
          <div className="flex items-center gap-3 bg-surface-2 rounded-2xl border border-accent/20 p-3 mt-4 max-w-xs mx-auto">
            <span className="text-xs text-ink-3 font-mono truncate">simulated-drone-flight.mp4</span>
            <span className="text-[10px] text-accent font-mono">Demo</span>
            <button onClick={() => { setFrames([]); setShowSimVideo(false); setAnalysis(null); }} className="p-1 text-ink-3 hover:text-accent ml-auto"><XIcon className="w-4 h-4" /></button>
          </div>
        )}
      </div>

      {(videoFile || (demoMode && showSimVideo)) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in delay-400">
          <div className="lg:col-span-1 card p-4">
            <div className="aspect-video bg-surface-2 rounded-2xl border border-line overflow-hidden relative">
              {videoFile ? (
                <video ref={videoRef} autoPlay muted playsInline controls className="w-full h-full object-cover" />
              ) : (
                <img src={simulatedFrames[0]?.src || 'https://picsum.photos/seed/agrodrone/640/360'} alt="Demo video" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center shadow-[0_0_25px_rgba(74,222,128,0.5)]">
                  <Play className="w-5 h-5 text-accent-ink ml-0.5" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={extractFrames} disabled={isProcessing} className="flex-1 py-3 rounded-xl border border-line bg-surface-2 text-ink-3 font-medium hover:border-accent hover:text-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
                <Scan className="w-4 h-4" /> Extract Frames
              </button>
              <button onClick={runAnalysis} disabled={isProcessing || (!frames.length && !simulatedFrames.length)} className="flex-1 py-3 rounded-xl border border-line bg-accent text-accent-ink font-medium hover:bg-accent-2 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(74,222,128,0.25)]">
                <Sparkles className="w-4 h-4" /> Analyze with AI
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-ink">Extracted Frames ({frames.length || simulatedFrames.length})</h3>
              <span className="text-[10px] text-ink-3">Analyzed by AI</span>
            </div>
            {(frames.length > 0 || simulatedFrames.length > 0) ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {(frames.length ? frames : simulatedFrames).map((f, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-xl overflow-hidden border border-line bg-surface relative group"
                  >
                    <img src={f.src || f} alt={`Frame ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 text-white px-1.5 py-0.5 rounded">#{i + 1}</span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-ink-3 text-center py-8">Click "Extract Frames" to begin AI analysis.</div>
            )}
          </div>
        </div>
      )}

      {isProcessing && !analysis && (
        <div className="card p-6 animate-in fade-in duration-500">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-lg text-ink">AI Analysis Results</h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent/10 text-accent border border-accent/20 animate-pulse">Processing...</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {['Altitude', 'Fertilizer', 'Spray Elevation', 'Drone Model', 'Battery', 'Coverage'].map((label, i) => (
              <div key={label} className="p-4 rounded-2xl border border-line bg-surface-2 animate-pulse">
                <div className="text-[11px] font-bold text-ink-2 uppercase tracking-wider mb-1 w-1/3">{label}</div>
                <div className="h-8 w-full bg-surface-2 rounded-xl" />
              </div>
            ))}
          </div>
          <div className="mt-4 p-5 rounded-3xl border border-line bg-gradient-to-br from-surface-2 to-surface animate-pulse">
            <h4 className="font-bold text-lg text-ink mb-4 flex items-center gap-2">
              <Skeleton w="w-5" h="h-5" className="mr-2" /> Soil & Field Analysis — 15 Criteria
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="p-3 rounded-xl border border-line bg-surface-2 animate-pulse">
                  <div className="text-[9px] font-extrabold text-ink-2 uppercase tracking-wider mb-0.5 w-3/4" />
                  <div className="h-6 w-full bg-surface-2 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {analysis && (
        <div className="card p-6 animate-in fade-in duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-ink">AI Analysis Results</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${analysis.confidenceScore >= 80 ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/30'}`}>Confidence: {analysis.confidenceScore}%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Altitude', value: `${analysis.altitude ?? '—'} m` },
              { label: 'Fertilizer', value: analysis.fertilizer ?? '—' },
              { label: 'Spray Elevation', value: `${analysis.sprayElevationChange ?? '—'} m` },
              { label: 'Drone Model', value: analysis.droneModel ?? '—' },
              { label: 'Battery', value: `${analysis.batteryEstimate ?? '—'}%` },
              { label: 'Coverage', value: `${analysis.coverageEstimate ?? '—'} ha` },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-2xl border border-line bg-surface-2">
                <div className="text-[11px] font-bold text-ink-2 uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-xl font-bold font-mono text-ink">{item.value}</div>
              </div>
            ))}
          </div>

          {analysis.soilAnalysis && (
            <div className="mt-4 p-5 rounded-3xl border border-accent/20 bg-accent/5 mb-6">
              <h4 className="font-bold text-lg text-ink mb-4 flex items-center gap-2">
                <Droplet className="w-5 h-5 text-accent" /> Soil & Field Analysis — 15 Criteria
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { label: 'Soil pH', value: analysis.soilAnalysis.ph ?? '—', note: analysis.soilAnalysis.pHRecommendation || '' },
                  { label: 'Nitrogen', value: analysis.soilAnalysis.nitrogen ?? '—', note: '' },
                  { label: 'Phosphorus', value: analysis.soilAnalysis.phosphorus ?? '—', note: '' },
                  { label: 'Potassium', value: analysis.soilAnalysis.potassium ?? '—', note: '' },
                  { label: 'Moisture', value: analysis.soilAnalysis.moisture ?? '—', note: '' },
                  { label: 'Organic Matter', value: analysis.soilAnalysis.organicMatter ?? '—', note: '' },
                  { label: 'Fungal Spores', value: analysis.soilAnalysis.fungalSpores ?? '—', note: '' },
                  { label: 'Pest Pressure', value: analysis.soilAnalysis.pestPressure ?? '—', note: '' },
                  { label: 'Weed Density', value: analysis.soilAnalysis.weedDensity ?? '—', note: '' },
                  { label: 'Salinity', value: analysis.soilAnalysis.salinity ?? '—', note: '' },
                  { label: 'Surface Temp', value: analysis.soilAnalysis.temperature ?? '—', note: '' },
                  { label: 'Pesticide Need?', value: analysis.soilAnalysis.pesticideNeed ?? '—', note: 'Critical decision point', highlight: true },
                  { label: 'Nitrogen Status', value: 'Low — needs supplement', note: 'Based on soil test', highlight: true },
                  { label: 'Spray Recommendation', value: 'Conditional', note: 'Only if moisture >60% for 3 days', highlight: true },
                  { label: 'Drone Adjustment', value: '+2m elevation', note: 'Avoid crop contact', highlight: true },
                ].map((stat) => (
                  <div key={stat.label} className={`p-3 rounded-xl border ${stat.highlight ? 'border-accent/30 bg-accent/5' : 'border-line bg-surface-2'}`}>
                    <div className="text-[9px] font-extrabold text-ink-2 uppercase tracking-wider mb-0.5">{stat.label}</div>
                    <div className="text-sm font-bold text-ink">{stat.value}</div>
                    {stat.note && <div className={`text-[9px] ${stat.highlight ? 'text-accent' : 'text-ink-3'} mt-0.5 font-medium`}>{stat.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis.soilAnalysis && (
            <div className="mt-4 p-5 rounded-2xl border border-[#fbbf24]/40 bg-[#fbbf24]/5 mb-6">
              <h4 className="font-extrabold text-base text-[#fbbf24] mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Should I Send Pesticide Request?
              </h4>
              <p className="text-sm text-ink-3 mb-3">
                <strong>Soil Condition:</strong> {analysis.soilAnalysis.moisture} moisture · {analysis.soilAnalysis.pestPressure} pest pressure · {analysis.soilAnalysis.fungalSpores}.
              </p>
              <p className="text-sm text-ink font-medium mb-4">
                AI Verdict: <span className="text-accent font-bold">Pesticide application is CONDITIONAL.</span> Only send the request if moisture exceeds 60% for 3+ consecutive days, which would trigger fungal growth. Currently at 58% — monitor closely but do not spray yet.
              </p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => { toggleOption('pesticide'); }} className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${selectedOptions.includes('pesticide') ? 'bg-accent text-accent-ink border-accent' : 'bg-surface-2 text-ink-3 border-line hover:border-accent'}`}>
                  <Sprout className="w-3.5 h-3.5" /> Confirm Pesticide Request
                </button>
                <span className="text-[10px] text-ink-3 self-center">Select this to send the pesticide request to drone operator.</span>
              </div>
            </div>
          )}

          {analysis.anomalies && (
            <div className="mt-4 p-4 rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/5 mb-6">
              <h4 className="text-xs font-bold text-[#fbbf24] uppercase tracking-wider mb-2">Anomalies Observed</h4>
              <p className="text-sm text-ink-3">{analysis.anomalies}</p>
            </div>
          )}

          {analysis.recommendations && (
            <div className="mt-4 p-4 rounded-2xl border border-accent/20 bg-accent/5 mb-6">
              <h4 className="font-bold text-lg text-ink mb-3">AI Recommendations (Select for Drone Operator)</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { key: 'pesticide', label: 'Pesticide Action', icon: Sprout },
                  { key: 'fertilizer', label: 'Fertilizer / Spray', icon: Leaf },
                  { key: 'sprayElevation', label: 'Spray Elevation', icon: Waves },
                ].map((opt) => {
                  const isActive = selectedOptions.includes(opt.key)
                  return (
                    <button
                      key={opt.key}
                      onClick={() => toggleOption(opt.key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${isActive ? 'bg-accent text-accent-ink border-accent shadow-[0_0_10px_rgba(74,222,128,0.2)]' : 'bg-surface-2 text-ink-3 border-line hover:text-ink hover:border-accent/50'}`}
                    >
                      <opt.icon className="w-3.5 h-3.5" />
                      {opt.label}
                      {isActive && <CheckCircle2 className="w-3 h-3" />}
                    </button>
                  )
                })}
              </div>
              <div className="space-y-2">
                {selectedOptions.map((opt) => (
                  <div key={opt} className="text-xs text-ink-3 bg-surface rounded-lg px-3 py-2 border border-line">
                    <span className="font-bold text-accent">{opt === 'pesticide' ? 'Pesticide' : opt === 'fertilizer' ? 'Fertilizer' : 'Spray Elevation'}:</span> {analysis.recommendations[opt] || 'Proceed per AI analysis.'}
                  </div>
                ))}
                {selectedOptions.length === 0 && (
                  <p className="text-xs text-ink-3 italic">Select an option above to include it in the operator request.</p>
                )}
              </div>
            </div>
          )}

          {approvalPending && (
            <div className="mt-6 pt-6 border-t border-line/50">
              <div className="bg-surface rounded-2xl border border-line p-6">
                <h4 className="font-bold text-lg text-ink mb-3">Send to Drone Operator?</h4>
                <p className="text-sm text-ink-3 mb-5">The AI has extracted stats and recommendations from your video. Confirm which actions to send to your assigned drone operator (Carlos Mendez — Zone 3).</p>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <button onClick={approveAndSend} disabled={isProcessing} className="flex-1 btn-primary py-3 text-sm">
                    {isProcessing ? <span className="flex items-center justify-center gap-2"><Send className="w-4 h-4 animate-pulse" /> Sending...</span> : <span className="flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Send to Operator</span>}
                  </button>
                  <button onClick={() => setApprovalPending(false)} className="flex-1 px-4 py-3 rounded-xl border border-line text-left text-ink-3 hover:bg-surface-2 transition-colors text-sm">Dismiss</button>
                </div>
              </div>
              {sent && (
                <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span className="font-medium text-ink">Notification sent to drone operator</span>
                  </div>
                  <p className="text-xs text-ink-3 mt-1">Analysis + selected recommendations delivered to Carlos Mendez — Zone 3. The drone will adjust according to your confirmed options.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="card p-4 border border-red-500/30 bg-red-900/10 animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-sm text-red-300">{error}</span>
          </div>
        </div>
      )}
    </div>
  )
}
