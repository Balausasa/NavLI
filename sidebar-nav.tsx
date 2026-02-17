"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Map, Calendar, MessageCircle, Navigation, User, LogOut, Menu, X, School, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

type NavItem = { href: string; label: string; icon: typeof Map }

const parentDriverNav: NavItem[] = [
  { href: "/dashboard", label: "Карта Актау", icon: Map },
  { href: "/dashboard/schedule", label: "Расписание", icon: Calendar },
  { href: "/dashboard/chat", label: "ИИ-чат", icon: MessageCircle },
  { href: "/dashboard/tracking", label: "Отслеживание", icon: Navigation },
  { href: "/dashboard/profile", label: "Профиль", icon: User },
]

const parentPassengerNav: NavItem[] = [
  { href: "/dashboard", label: "Карта Актау", icon: Map },
  { href: "/dashboard/schedule", label: "Расписание", icon: Calendar },
  { href: "/dashboard/chat", label: "ИИ-чат", icon: MessageCircle },
  { href: "/dashboard/tracking", label: "Отслеживание", icon: Navigation },
  { href: "/dashboard/profile", label: "Профиль", icon: User },
]

const studentNav: NavItem[] = [
  { href: "/dashboard", label: "Карта Актау", icon: Map },
  { href: "/dashboard/chat", label: "Чат попутчиков", icon: MessageCircle },
  { href: "/dashboard/rating", label: "Оценка поездки", icon: Star },
  { href: "/dashboard/profile", label: "Профиль", icon: User },
]

const schoolNav: NavItem[] = [
  { href: "/dashboard", label: "Карта Актау", icon: Map },
  { href: "/dashboard/attendance", label: "Посещаемость", icon: School },
  { href: "/dashboard/profile", label: "Профиль", icon: User },
]

export function SidebarNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [role, setRole] = useState<string>("parent")
  const [navItems, setNavItems] = useState<NavItem[]>(parentDriverNav)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const r = localStorage.getItem("navli_role") || "parent"
      const hasTransport = localStorage.getItem("navli_hasTransport")
      setRole(r)
      if (r === "student") setNavItems(studentNav)
      else if (r === "school") setNavItems(schoolNav)
      else if (hasTransport === "false") setNavItems(parentPassengerNav)
      else setNavItems(parentDriverNav)
    }
  }, [])

  const roleLabel = role === "student" ? "Ученик" : role === "school" ? "Школа" : "Родитель"

  return (
    <>
      {/* Mobile header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/navli-logo.jpeg" alt="Navli" width={32} height={32} className="rounded-lg" />
          <span className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="text-accent">nav</span><span className="text-primary">li</span>
          </span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground" aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-b border-border bg-card p-4 lg:hidden">
          <div className="mb-2 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground text-center">{roleLabel}</div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>
                <item.icon className="h-4 w-4" />{item.label}
              </Link>
            ))}
            <Link href="/" className="mt-2 flex items-center gap-3 rounded-lg border-t border-border px-3 py-2.5 pt-4 text-sm font-medium text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />Выйти
            </Link>
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar lg:flex">
        <div className="flex items-center gap-2.5 border-b border-sidebar-border px-6 py-4">
          <Image src="/images/navli-logo.jpeg" alt="Navli" width={32} height={32} className="rounded-lg" />
          <span className="text-lg font-bold text-sidebar-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            <span>nav</span><span className="text-sidebar-primary">li</span>
          </span>
        </div>

        <div className="mx-4 mt-4 rounded-lg bg-sidebar-accent px-3 py-1.5 text-center text-xs font-medium text-sidebar-foreground/70">{roleLabel}</div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", pathname === item.href ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground")}>
              <item.icon className="h-4 w-4" />{item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3 px-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">ИИ</div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Иванов Иван</p>
              <p className="text-xs text-sidebar-foreground/60">НИШ Актау, AKTAU-14</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground">
            <LogOut className="h-4 w-4" />Выйти
          </Link>
        </div>
      </aside>
    </>
  )
}
