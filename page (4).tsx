"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Car, ChevronLeft, ChevronRight, Check, Users, CircleUserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const days = ["Пн", "Вт", "Ср", "Чт", "Пт"]
const fullDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"]

type ScheduleEntry = {
  day: number
  driver: string
  time: string
  children: string[]
  carModel: string
  carNumber: string
  isYou: boolean
}

const weeklySchedule: ScheduleEntry[] = [
  { day: 0, driver: "Иванов И.", time: "07:30", children: ["Иванов П.", "Серикова М.", "Петров А.", "Ким Д."], carModel: "Toyota Camry", carNumber: "123 ABC 15", isYou: true },
  { day: 1, driver: "Серикова А.", time: "07:30", children: ["Иванов П.", "Серикова М.", "Ахметова С."], carModel: "Hyundai Tucson", carNumber: "456 DEF 15", isYou: false },
  { day: 2, driver: "Петров К.", time: "07:25", children: ["Иванов П.", "Петров А.", "Ким Д."], carModel: "Kia Sportage", carNumber: "789 GHI 15", isYou: false },
  { day: 3, driver: "Ким С.", time: "07:30", children: ["Иванов П.", "Ким Д.", "Серикова М.", "Ахметова С."], carModel: "Toyota RAV4", carNumber: "012 JKL 15", isYou: false },
  { day: 4, driver: "Иванов И.", time: "07:30", children: ["Иванов П.", "Петров А.", "Серикова М."], carModel: "Toyota Camry", carNumber: "123 ABC 15", isYou: true },
]

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(0)
  const [selectedDay, setSelectedDay] = useState(0)
  const [isDriver, setIsDriver] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasTransport = localStorage.getItem("navli_hasTransport")
      if (hasTransport === "false") setIsDriver(false)
    }
  }, [])

  const getWeekLabel = () => {
    const now = new Date()
    const offset = currentWeek * 7
    const monday = new Date(now)
    monday.setDate(now.getDate() - now.getDay() + 1 + offset)
    const friday = new Date(monday)
    friday.setDate(monday.getDate() + 4)
    return `${monday.getDate()}.${String(monday.getMonth() + 1).padStart(2, "0")} - ${friday.getDate()}.${String(friday.getMonth() + 1).padStart(2, "0")}`
  }

  const schedule = weeklySchedule[selectedDay]

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-4 py-4 lg:px-6">
        <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Расписание поездок</h1>
        <p className="text-sm text-muted-foreground">
          {isDriver ? "ИИ-расписание | Ваши дежурства: Пн, Пт" : "ИИ-расписание | Вы пассажир"}
          {" | 14 мкр - НИШ Актау"}
        </p>
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Week navigation */}
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <Button variant="ghost" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}><ChevronLeft className="h-4 w-4" /></Button>
            <div className="flex items-center gap-2 text-center">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Неделя {getWeekLabel()}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>

          {/* Day selector */}
          <div className="grid grid-cols-5 gap-2">
            {days.map((day, index) => (
              <button key={day} onClick={() => setSelectedDay(index)} className={cn("flex flex-col items-center gap-1 rounded-xl border-2 px-2 py-3 text-center transition-all", selectedDay === index ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30")}>
                <span className="text-xs font-medium text-muted-foreground">{day}</span>
                <span className={cn("text-sm font-bold", selectedDay === index ? "text-primary" : "text-foreground")}>{weeklySchedule[index].time}</span>
                {isDriver && weeklySchedule[index].isYou && (
                  <span className="mt-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">Вы водитель</span>
                )}
              </button>
            ))}
          </div>

          {/* Schedule details */}
          <div className="rounded-2xl border border-border bg-card">
            <div className="border-b border-border p-4">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", schedule.isYou && isDriver ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground")}>
                  {schedule.isYou && isDriver ? <CircleUserRound className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{fullDays[selectedDay]}</h3>
                    {schedule.isYou && isDriver && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Ваше дежурство</span>}
                    {!isDriver && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">Пассажир</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">Водитель: {schedule.driver}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4">
              {/* Driver-specific: what to do */}
              {schedule.isYou && isDriver && (
                <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <CircleUserRound className="h-4 w-4" /> Ваши задачи на этот день
                  </h4>
                  <ul className="space-y-1.5 text-sm text-foreground">
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Забрать {schedule.children.join(", ")}</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Отвезти в НИШ Актау к {schedule.time}</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Обновлять статус в приложении</li>
                  </ul>
                </div>
              )}

              {/* Non-driver: passive info */}
              {!isDriver && (
                <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-accent">Ваш ребенок в этот день</h4>
                  <p className="text-sm text-muted-foreground">Водитель {schedule.driver} заберет вашего ребенка в {schedule.time} и довезет до НИШ Актау. Вы получите уведомления.</p>
                </div>
              )}

              <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Время сбора: {schedule.time}</p>
                  <p className="text-xs text-muted-foreground">14 мкр - НИШ Актау</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
                <Car className="h-4 w-4 text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">{schedule.carModel}</p>
                  <p className="text-xs text-muted-foreground">Госномер: {schedule.carNumber}</p>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">Дети в поездке:</h4>
                <div className="space-y-2">
                  {schedule.children.map((child) => (
                    <div key={child} className="flex items-center gap-3 rounded-xl border border-border p-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">{child.charAt(0)}</div>
                      <span className="text-sm text-foreground">{child}</span>
                      <Check className="ml-auto h-4 w-4 text-success" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Duties summary */}
          {isDriver && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Users className="h-4 w-4 text-primary" /> Ваши дежурства на этой неделе
              </h3>
              <div className="flex flex-wrap gap-2">
                {weeklySchedule.map((entry, i) => (
                  <div key={i} className={cn("flex items-center gap-2 rounded-xl px-3 py-2", entry.isYou ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground")}>
                    <span className="text-sm font-medium">{days[i]}</span>
                    {entry.isYou && <CircleUserRound className="h-3 w-3" />}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Вы дежурите 2 раза на этой неделе. ИИ распределяет справедливо.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
