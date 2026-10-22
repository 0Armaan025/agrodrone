import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Plus, ArrowRight, Trash2, Compass, Layers, Search } from 'lucide-react'
import { useState } from 'react'

const POSITION = [24.8815, 74.6263]

export default function MapPlanner() {
  const [fields, setFields] = useState([
    { id: 1, name: 'Field Alpha', color: '#4ade80', latlngs: [
      [24.89, 74.62], [24.89, 74.64], [24.87, 74.64], [24.87, 74.62]
    ], area: 45, crop: 'Wheat', health: 'High' },
    { id: 2, name: 'Field Beta', color: '#fbbf24', latlngs: [
      [24.86, 74.60], [24.86, 74.62], [24.84, 74.62], [24.84, 74.60]
    ], area: 32, crop: 'Rice', health: 'Medium' },
  ])
  const [waypoints, setWaypoints] = useState([])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
      {/* Sidebar */}
      <aside className="lg:col-span-3 card flex flex-col gap-4 p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-lg text-ink">Field Map Planner</h3>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-ink-2">Available Fields</h4>
          <div className="space-y-2">
            {fields.map((f) => (
              <div key={f.id} className="flex items-center gap-3 p-3 rounded-xl border border-line bg-surface-2 cursor-pointer hover:bg-accent/5 hover:border-accent transition-all group">
                <div className={`w-3 h-3 rounded-full bg-${f.color === '#4ade80' ? 'accent' : 'accent-2'}`} />
                <div>
                  <span className="font-medium text-ink block">{f.name}</span>
                  <span className="text-xs text-ink-3">{f.crop} · {f.health} health</span>
                </div>
                <span className="ml-auto text-xs font-mono text-accent font-bold">{f.area} ha</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-2 rounded-2xl border border-line p-4">
          <h4 className="text-sm font-semibold text-ink-2 mb-3">Waypoints</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {waypoints.length === 0 ? (
              <p className="text-xs text-ink-3 italic">No waypoints drawn yet</p>
            ) : (
              waypoints.map((w, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg border border-line/50 bg-surface">
                  <span className="text-xs font-mono font-bold text-accent">#{i + 1}</span>
                  <span className="text-xs text-ink-3 flex-1">{w.lat.toFixed(4)}, {w.lng.toFixed(4)}</span>
                  <button className="p-1 text-ink-3 hover:text-accent" onClick={() => setWaypoints(waypoints.filter((_, idx) => idx !== i))}>
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <button className="btn-primary w-full flex items-center justify-center gap-2">
          <ArrowRight className="w-4 h-4" /> Launch Planned Mission
        </button>
      </aside>

      {/* Map */}
      <section className="lg:col-span-9 rounded-3xl border border-line overflow-hidden relative shadow-card">
        <MapContainer
          center={POSITION}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {fields.map((f) => (
            <Polygon key={f.id} positions={f.latlngs} color={f.color} fillColor={f.color} fillOpacity={0.15} weight={2}>
              <Popup>{f.name} — {f.area} ha · {f.crop}</Popup>
            </Polygon>
          ))}
          {waypoints.map((w, i) => (
            <Marker key={i} position={[w.lat, w.lng]}>
              <Popup>{`Waypoint ${i + 1}`}</Popup>
            </Marker>
          ))}
          {waypoints.length > 1 && (
            <Polyline positions={waypoints.map(w => [w.lat, w.lng])} color="#4ade80" weight={2} dashArray="5, 10" />
          )}
          <useMapEvents
            onClick={({ latlng }) => {
              setWaypoints((prev) => [...prev, { lat: latlng.lat, lng: latlng.lng }])
            }}
          />
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <button className="p-3 bg-surface rounded-xl border border-line shadow-card" title="Compass">
              <Compass className="w-5 h-5 text-ink" />
            </button>
            <button className="p-3 bg-surface rounded-xl border border-line shadow-card" title="Layers">
              <Layers className="w-5 h-5 text-ink" />
            </button>
            <button className="p-3 bg-surface rounded-xl border border-line shadow-card" title="Search">
              <Search className="w-5 h-5 text-ink" />
            </button>
          </div>
          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
            <button className="p-3 bg-surface rounded-xl border border-line shadow-card" title="+ Waypoint">
              <Plus className="w-5 h-5 text-ink" />
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2" title="Draw Route">
              <ArrowRight className="w-4 h-4" /> Route
            </button>
          </div>
        </MapContainer>
        <div className="absolute top-4 right-4 z-20 bg-surface border border-line rounded-xl p-3 shadow-card text-right">
          <div className="text-xs font-mono font-bold text-accent">24.8815°N, 74.6263°E</div>
          <div className="text-[10px] text-ink-3">Signal: 92%</div>
        </div>
      </section>
    </div>
  )
}
