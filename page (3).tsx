"use client"

import { useState } from "react"
import { Star, Car, User, MessageCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const pastTrips = [
  { id: 1, date: "14.02.2026", driver: "Петров К.", car: "Kia Sportage", route: "14 мкр - НИШ Актау", rating: 5 },
  { id: 2, date: "13.02.2026", driver: "Серикова А.", car: "Hyundai Tucson", route: "14 мкр - НИШ Актау", rating: 4 },
  { id: 3, date: "12.02.2026", driver: "Ким С.", car: "Toyota RAV4", route: "14 мкр - НИШ Актау", rating: 5 },
]

export default function RatingPage() {
  const [currentRating, setCurrentRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (currentRating > 0) setSubmitted(true)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-4 py-4 lg:px-6">
        <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Оценка поездки
        </h1>
        <p className="text-sm text-muted-foreground">Оцените качество сегодняшней поездки</p>
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Current trip rating */}
          {!submitted ? (
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Car className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  Сегодняшняя поездка
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Водитель: Петров Кайрат | 14 мкр - НИШ Актау
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setCurrentRating(star)}
                    className="transition-transform hover:scale-110"
                    aria-label={`Оценка ${star}`}
                  >
                    <Star
                      className={cn(
                        "h-10 w-10 transition-colors",
                        star <= (hoveredStar || currentRating)
                          ? "fill-primary text-primary"
                          : "text-border"
                      )}
                    />
                  </button>
                ))}
              </div>

              {currentRating > 0 && (
                <p className="mt-2 text-center text-sm font-medium text-primary">
                  {currentRating === 5 ? "Отлично!" : currentRating === 4 ? "Хорошо!" : currentRating === 3 ? "Нормально" : currentRating === 2 ? "Могло быть лучше" : "Плохо"}
                </p>
              )}

              <div className="mt-4">
                <textarea
                  placeholder="Оставьте комментарий (необязательно)..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                />
              </div>

              <Button className="mt-4 w-full gap-2" onClick={handleSubmit} disabled={currentRating === 0}>
                <Star className="h-4 w-4" />
                Отправить оценку
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                Спасибо за оценку!
              </h2>
              <div className="mt-2 flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={cn("h-5 w-5", s <= currentRating ? "fill-primary text-primary" : "text-border")} />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Ваша оценка помогает поддерживать качество поездок в Navli
              </p>
            </div>
          )}

          {/* Driver reviews summary (visible to drivers) */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <h3 className="mb-2 text-sm font-semibold text-foreground">Рейтинг водителя (видно водителю)</h3>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>4.8</span>
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className={cn("h-5 w-5", s <= 4 ? "fill-primary text-primary" : s === 5 ? "fill-primary/50 text-primary/50" : "text-border")} />)}
              </div>
              <span className="text-sm text-muted-foreground">32 оценки</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Водители видят все отзывы и свой средний рейтинг от детей.</p>
          </div>

          {/* Past trip ratings */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">История оценок</h3>
            <div className="space-y-3">
              {pastTrips.map((trip) => (
                <div key={trip.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{trip.driver}</p>
                      <span className="text-xs text-muted-foreground">{trip.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{trip.car} | {trip.route}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={cn("h-3.5 w-3.5", s <= trip.rating ? "fill-primary text-primary" : "text-border")} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
