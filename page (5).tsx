"use client"

import { useState } from "react"
import { MapPin, School, Search, ChevronRight, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const schools = [
  { id: 1, name: "НИШ Актау", address: "14 мкр, Актау", distance: "1.8 км", students: 56, lat: 43.6535, lng: 51.1575 },
  { id: 2, name: "Школа-гимназия №2", address: "4 мкр, Актау", distance: "2.4 км", students: 38, lat: 43.6580, lng: 51.1470 },
  { id: 3, name: "Школа №7", address: "8 мкр, Актау", distance: "3.1 км", students: 42, lat: 43.6620, lng: 51.1620 },
]

const nearbyParents = [
  { id: 1, name: "Серикова А.", distance: "300м", hasCar: true },
  { id: 2, name: "Петров К.", distance: "500м", hasCar: true },
  { id: 3, name: "Ахметова Д.", distance: "150м", hasCar: false },
  { id: 4, name: "Ким С.", distance: "700м", hasCar: true },
]

export default function DashboardMapPage() {
  const [address, setAddress] = useState("")
  const [addressSet, setAddressSet] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<number | null>(null)

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-4 py-4 lg:px-6">
        <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Карта Актау
        </h1>
        <p className="text-sm text-muted-foreground">Укажите адрес и выберите школу на карте</p>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Real Map via iframe */}
        <div className="relative flex-1">
          <iframe
            title="Карта Актау"
            src="https://www.openstreetmap.org/export/embed.html?bbox=51.10%2C43.63%2C51.19%2C43.67&layer=mapnik&marker=43.6535%2C51.1575"
            className="h-full w-full min-h-[400px] border-0"
            allowFullScreen
          />

          {/* Search overlay */}
          <div className="absolute left-4 right-4 top-4 z-10 sm:left-4 sm:right-auto sm:w-80">
            <div className="rounded-xl border border-border bg-card p-3 shadow-lg">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Введите адрес в Актау..." className="pl-9" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <Button size="sm" onClick={() => setAddressSet(true)} className="shrink-0">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
              {addressSet && (
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{address || "14 мкр, дом 45, кв. 14, Актау"}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="w-full border-t border-border bg-card lg:w-80 lg:border-l lg:border-t-0">
          <div className="h-full overflow-auto">
            {/* Schools section */}
            <div className="border-b border-border p-4">
              <div className="mb-3 flex items-center gap-2">
                <School className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Школы Актау</h2>
              </div>
              <div className="space-y-2">
                {schools.map((school) => (
                  <button
                    key={school.id}
                    onClick={() => setSelectedSchool(school.id)}
                    className={`group flex w-full cursor-pointer items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                      selectedSchool === school.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30 hover:bg-secondary/50"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      selectedSchool === school.id ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}>
                      <School className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{school.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{school.address}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{school.distance}</span>
                        <span>{school.students} учеников</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>

            {/* Nearby parents */}
            <div className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <h2 className="text-sm font-semibold text-foreground">Родители рядом</h2>
              </div>
              <div className="space-y-2">
                {nearbyParents.map((parent) => (
                  <div key={parent.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                      {parent.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{parent.name}</p>
                      <p className="text-xs text-muted-foreground">{parent.distance}</p>
                    </div>
                    {parent.hasCar && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Авто</span>
                    )}
                  </div>
                ))}
              </div>

              <Button className="mt-4 w-full" variant="outline" size="sm">
                ИИ создал вашу группу
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
