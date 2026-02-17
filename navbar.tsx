"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/navli-logo.jpeg"
            alt="Navli"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="text-accent">nav</span>
            <span className="text-primary">li</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#problem" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Проблема
          </Link>
          <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Возможности
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Как это работает
          </Link>
          <Link href="#safety" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Безопасность
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-foreground">
              Войти
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">
              Регистрация
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-border/50 bg-background px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="#problem" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              Проблема
            </Link>
            <Link href="#features" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              Возможности
            </Link>
            <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              Как это работает
            </Link>
            <Link href="#safety" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              Безопасность
            </Link>
            <div className="mt-2 flex flex-col gap-2">
              <Link href="/login">
                <Button variant="outline" className="w-full">Войти</Button>
              </Link>
              <Link href="/register">
                <Button className="w-full">Регистрация</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
