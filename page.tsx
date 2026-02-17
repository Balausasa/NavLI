"use client"

import { useState } from "react"
import { School, Check, X, Clock, Search, UserCheck, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type StudentStatus = "arrived" | "absent" | "pending"

type Student = {
  id: number
  name: string
  className: string
  arrivalTime: string | null
  status: StudentStatus
  driver: string
}

const initialStudents: Student[] = [
  { id: 1, name: "Иванов Петр", className: "5А", arrivalTime: "08:12", status: "arrived", driver: "Петров К." },
  { id: 2, name: "Серикова Мадина", className: "5А", arrivalTime: "08:15", status: "arrived", driver: "Петров К." },
  { id: 3, name: "Петров Артем", className: "5Б", arrivalTime: "08:15", status: "arrived", driver: "Петров К." },
  { id: 4, name: "Ким Данияр", className: "4Б", arrivalTime: null, status: "pending", driver: "Ким С." },
  { id: 5, name: "Ахметова Сауле", className: "6А", arrivalTime: null, status: "pending", driver: "Ким С." },
  { id: 6, name: "Нурланов Алмас", className: "5А", arrivalTime: null, status: "absent", driver: "-" },
  { id: 7, name: "Тасмагамбетова Айнур", className: "4Б", arrivalTime: "08:20", status: "arrived", driver: "Серикова А." },
  { id: 8, name: "Бекенов Диас", className: "6А", arrivalTime: null, status: "pending", driver: "Ким С." },
]

const statusConfig = {
  arrived: { label: "Прибыл", icon: Check, color: "text-success bg-success/10" },
  absent: { label: "Отсутствует", icon: X, color: "text-destructive bg-destructive/10" },
  pending: { label: "Ожидается", icon: Clock, color: "text-warning bg-warning/10" },
}

export default function AttendancePage() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<StudentStatus | "all">("all")

  const toggleStatus = (id: number) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s
        const nextStatus: StudentStatus = s.status === "pending" ? "arrived" : s.status === "arrived" ? "absent" : "pending"
        return {
          ...s,
          status: nextStatus,
          arrivalTime: nextStatus === "arrived" ? new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : null,
        }
      })
    )
  }

  const filtered = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.className.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || s.status === filter
    return matchesSearch && matchesFilter
  })

  const arrivedCount = students.filter((s) => s.status === "arrived").length
  const absentCount = students.filter((s) => s.status === "absent").length
  const pendingCount = students.filter((s) => s.status === "pending").length

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-4 py-4 lg:px-6">
        <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Посещаемость - НИШ Актау
        </h1>
        <p className="text-sm text-muted-foreground">Отметьте прибытие учеников (для сотрудников школы)</p>
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Incoming drivers info */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Водители в пути</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-xl bg-card p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Петров К. - Kia Sportage (789 GHI 15)</p>
                  <p className="text-xs text-muted-foreground">3 ребенка | 14 мкр</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">~5 мин</p>
                  <p className="text-[10px] text-muted-foreground">с учетом пробок</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-card p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Ким С. - Toyota RAV4 (012 JKL 15)</p>
                  <p className="text-xs text-muted-foreground">3 ребенка | 14 мкр</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-warning">~12 мин</p>
                  <p className="text-[10px] text-muted-foreground">пробка на 8 мкр</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <UserCheck className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{arrivedCount}</p>
                <p className="text-xs text-muted-foreground">Прибыли</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Ожидаются</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <UserX className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{absentCount}</p>
                <p className="text-xs text-muted-foreground">Отсутствуют</p>
              </div>
            </div>
          </div>

          {/* Search & filter */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Поиск по имени или классу..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              {(["all", "arrived", "pending", "absent"] as const).map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f)}
                  className="text-xs"
                >
                  {f === "all" ? "Все" : f === "arrived" ? "Прибыли" : f === "pending" ? "Ожидаются" : "Отсутствуют"}
                </Button>
              ))}
            </div>
          </div>

          {/* Student list */}
          <div className="space-y-2">
            {filtered.map((student) => {
              const config = statusConfig[student.status]
              const StatusIcon = config.icon
              return (
                <div
                  key={student.id}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/30"
                >
                  <button
                    onClick={() => toggleStatus(student.id)}
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                      config.color
                    )}
                    aria-label={`Изменить статус ${student.name}`}
                  >
                    <StatusIcon className="h-5 w-5" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{student.name}</p>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{student.className}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Водитель: {student.driver}
                      {student.arrivalTime && ` | Прибыл в ${student.arrivalTime}`}
                    </p>
                  </div>
                  <span className={cn("rounded-full px-3 py-1 text-xs font-medium", config.color)}>
                    {config.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
