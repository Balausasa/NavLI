"use client"

import { useEffect, useRef, useState } from "react"
import { UserPlus, Map, CalendarCheck, Navigation } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Регистрация",
    description:
      "Зарегистрируйтесь как родитель, укажите ИИН, данные ребенка и наличие автомобиля.",
  },
  {
    icon: Map,
    step: "02",
    title: "Укажите адрес",
    description:
      "Отметьте реальный адрес на карте Актау. Система подберет ближайшую группу родителей.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "ИИ составит расписание",
    description:
      "Поделитесь графиком в чате, и ИИ справедливо распределит дежурства водителей на неделю.",
  },
  {
    icon: Navigation,
    step: "04",
    title: "Отслеживайте поездку",
    description:
      "Водители видят задания по сбору. Родители без авто следят за ребенком на карте.",
  },
]

export function HowItWorksSection() {
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
    <section id="how-it-works" ref={ref} className="bg-secondary/50 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Как это работает
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            4 простых шага
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Начните пользоваться Navli за несколько минут
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative flex flex-col items-center text-center transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border lg:block" />
              )}
              <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <step.icon className="h-7 w-7" />
              </div>
              <span className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                {"Шаг"} {step.step}
              </span>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
