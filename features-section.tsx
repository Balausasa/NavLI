"use client"

import { useEffect, useRef, useState } from "react"
import {
  Fingerprint,
  MapPin,
  Calendar,
  MessageCircle,
  Car,
  Bell,
} from "lucide-react"

const features = [
  {
    icon: Fingerprint,
    title: "Face ID верификация",
    description:
      "Каждый водитель проходит верификацию через камеру. Ваш ребенок поедет только с проверенным человеком.",
  },
  {
    icon: MapPin,
    title: "Реальная карта Актау",
    description:
      "Интерактивная карта города с реальными адресами, школами и маршрутами водителей в реальном времени.",
  },
  {
    icon: Calendar,
    title: "ИИ-расписание",
    description:
      "Искусственный интеллект составляет справедливое расписание дежурных водителей на неделю.",
  },
  {
    icon: MessageCircle,
    title: "Умные чаты",
    description:
      "Родители общаются с ИИ-помощником. Дети -- в групповом чате попутчиков по поездке.",
  },
  {
    icon: Car,
    title: "Умное отслеживание",
    description:
      "Водители видят задания на сбор детей. Родители без авто -- статус ребенка в реальном времени.",
  },
  {
    icon: Bell,
    title: "SOS кнопка",
    description:
      "В экстренной ситуации водитель нажимает SOS, и система мгновенно перестраивает расписание.",
  },
]

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={ref} className="px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Возможности
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Все для безопасной поездки
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Navli создан для того, чтобы каждая поездка вашего ребенка в НИШ Актау была
            безопасной, удобной и предсказуемой.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
