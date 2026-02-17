"use client"

import { useEffect, useRef, useState } from "react"
import { AlertTriangle, Clock, DollarSign, Car, TrendingDown } from "lucide-react"

const problems = [
  {
    icon: Clock,
    title: "30+ минут в пробке",
    stat: "30 мин",
    description: "Каждое утро родители тратят до часа, стоя в заторах у школ Актау.",
  },
  {
    icon: DollarSign,
    title: "80 000 тг на такси",
    stat: "80 000 тг",
    description: "Родители без авто вынуждены ежемесячно платить огромные суммы за такси.",
  },
  {
    icon: AlertTriangle,
    title: "Опасность для детей",
    stat: "3x риск",
    description: "Дети лавируют между машинами в заторах, подвергая себя серьезной опасности.",
  },
  {
    icon: Car,
    title: "Пустые сиденья",
    stat: "75%",
    description: "В большинстве машин утром едет один ребенок, хотя есть 3-4 свободных места.",
  },
]

export function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="problem" ref={sectionRef} className="bg-accent px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <TrendingDown className="h-6 w-6 text-destructive" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Проблема
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Пробки у школ Актау -- ежедневный кошмар
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-accent-foreground/70">
            Каждое утро у школ города образуются огромные заторы.
            Родители опаздывают на работу, дети рискуют здоровьем. Пора это изменить.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, i) => (
            <div
              key={problem.title}
              className={`rounded-2xl border border-accent-foreground/10 bg-card p-6 transition-all duration-500 hover:shadow-lg ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <problem.icon className="h-6 w-6" />
              </div>
              <p
                className="mb-1 text-2xl font-bold text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {problem.stat}
              </p>
              <h3 className="text-base font-semibold text-foreground">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
