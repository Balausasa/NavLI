"use client"

import { User, Car, GraduationCap, MapPin, Phone, Mail, Shield, Edit2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-4 py-4 lg:px-6">
        <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Профиль
        </h1>
        <p className="text-sm text-muted-foreground">Управление вашими данными</p>
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              ИИ
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">Иванов Иван Иванович</h2>
              <p className="text-sm text-muted-foreground">Родитель</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                  <Check className="h-3 w-3" /> Face ID подтвержден
                </div>
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  <Shield className="h-3 w-3" /> Верифицирован
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Edit2 className="h-3 w-3" /> Изменить
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Личные данные</h3>
              </div>
            </div>
            <div className="space-y-3 p-6">
              <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value="ivan@example.com" />
              <InfoRow icon={<Phone className="h-4 w-4" />} label="Телефон" value="+7 (777) 123-45-67" />
              <InfoRow icon={<MapPin className="h-4 w-4" />} label="Микрорайон" value="AKTAU-14" />
              <InfoRow icon={<Shield className="h-4 w-4" />} label="ИИН" value="850612*****" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Данные ребенка</h3>
              </div>
            </div>
            <div className="space-y-3 p-6">
              <InfoRow icon={<User className="h-4 w-4" />} label="ФИО" value="Иванов Петр Иванович" />
              <InfoRow icon={<GraduationCap className="h-4 w-4" />} label="Класс" value="5А" />
              <InfoRow icon={<MapPin className="h-4 w-4" />} label="Школа" value="НИШ Актау" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Автомобиль</h3>
              </div>
            </div>
            <div className="space-y-3 p-6">
              <InfoRow icon={<Car className="h-4 w-4" />} label="Марка" value="Toyota Camry 70" />
              <InfoRow icon={<Car className="h-4 w-4" />} label="Цвет" value="Белый" />
              <InfoRow icon={<Car className="h-4 w-4" />} label="Госномер" value="123 ABC 15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-secondary/30 px-4 py-3">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className="ml-auto text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}
