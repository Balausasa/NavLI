"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, MapPin, Users } from "lucide-react"

const phrases = [
  "безопасным",
  "комфортным",
  "предсказуемым",
  "экономичным",
]

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
        setVisible(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
      {/* Decorative bg shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent/5" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm text-primary">
          <Shield className="h-4 w-4" />
          <span className="font-medium">Школьный карпулинг в Актау</span>
        </div>

        <h1
          className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Сделайте путь ребенка в школу{" "}
          <span
            className={`inline-block text-primary transition-all duration-400 ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          >
            {phrases[phraseIndex]}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
          Navli объединяет родителей Актау в группы по микрорайонам.
          ИИ строит расписание, оптимизирует маршруты и помогает экономить
          до 70 000 тг в месяц на дорогу до школы.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/register">
            <Button size="lg" className="gap-2 px-8 text-base shadow-lg shadow-primary/20">
              Начать бесплатно
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#problem">
            <Button variant="outline" size="lg" className="px-8 text-base">
              Как это работает?
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-xl grid-cols-3 gap-8">
          <StatBlock icon={<Users className="h-5 w-5 text-primary" />} value="2 500+" label="Родителей" />
          <StatBlock icon={<MapPin className="h-5 w-5 text-accent" />} value="НИШ Актау" label="Подключено" />
          <StatBlock icon={<Shield className="h-5 w-5 text-primary" />} value="99.9%" label="Безопасность" />
        </div>
      </div>
    </section>
  )
}

function StatBlock({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {icon}
      <span className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
