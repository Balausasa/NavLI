"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, Lock, Eye, Fingerprint, CheckCircle2 } from "lucide-react"

const safetyFeatures = [
  "Верификация личности через ИИН",
  "Face ID через камеру для каждого водителя",
  "Код микрорайона -- данные только для своих",
  "Отслеживание в реальном времени",
  "SOS кнопка для экстренных ситуаций",
  "Оценка поездки детьми -- звездный рейтинг",
  "Школа отмечает прибытие каждого ребенка",
]

export function SafetySection() {
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
    <section id="safety" ref={ref} className="px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className={`grid grid-cols-1 items-center gap-12 transition-all duration-700 lg:grid-cols-2 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Безопасность
            </p>
            <h2
              className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Безопасность на каждом этапе
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Мы создали многоуровневую систему безопасности, чтобы вы были уверены в
              защищенности вашего ребенка на протяжении всего пути.
            </p>

            <ul className="mt-8 space-y-3">
              {safetyFeatures.map((feature, i) => (
                <li
                  key={feature}
                  className={`flex items-center gap-3 transition-all duration-500 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SafetyCard
              icon={<Fingerprint className="h-7 w-7" />}
              title="Face ID"
              description="Камера верификации"
              className="bg-primary text-primary-foreground"
              delay={200}
              isVisible={isVisible}
            />
            <SafetyCard
              icon={<Lock className="h-7 w-7" />}
              title="Шифрование"
              description="Данные под защитой"
              className="bg-card text-foreground border border-border"
              delay={350}
              isVisible={isVisible}
            />
            <SafetyCard
              icon={<Eye className="h-7 w-7" />}
              title="Мониторинг"
              description="Отслеживание 24/7"
              className="bg-card text-foreground border border-border"
              delay={500}
              isVisible={isVisible}
            />
            <SafetyCard
              icon={<Shield className="h-7 w-7" />}
              title="Проверка"
              description="Верификация ИИН"
              className="bg-accent text-accent-foreground"
              delay={650}
              isVisible={isVisible}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function SafetyCard({
  icon,
  title,
  description,
  className,
  delay,
  isVisible,
}: {
  icon: React.ReactNode
  title: string
  description: string
  className: string
  delay: number
  isVisible: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-2xl p-8 text-center transition-all duration-500 hover:scale-105 ${className} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  )
}
