import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-accent px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/navli-logo.jpeg" alt="Navli" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold text-accent-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                <span>nav</span><span className="text-primary">li</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-accent-foreground/70">
              Безопасные совместные поездки детей в школу в Актау. Объединяем родителей для комфортного карпулинга.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-foreground">Продукт</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#features" className="text-sm text-accent-foreground/70 hover:text-accent-foreground">Возможности</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-accent-foreground/70 hover:text-accent-foreground">Как это работает</Link></li>
              <li><Link href="#safety" className="text-sm text-accent-foreground/70 hover:text-accent-foreground">Безопасность</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-foreground">Для пользователей</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/register" className="text-sm text-accent-foreground/70 hover:text-accent-foreground">Регистрация</Link></li>
              <li><Link href="/login" className="text-sm text-accent-foreground/70 hover:text-accent-foreground">Вход</Link></li>
              <li><Link href="/dashboard" className="text-sm text-accent-foreground/70 hover:text-accent-foreground">Личный кабинет</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-foreground">Поддержка</h3>
            <ul className="mt-4 space-y-3">
              <li><span className="text-sm text-accent-foreground/70">help@navli.kz</span></li>
              <li><span className="text-sm text-accent-foreground/70">+7 (777) 123-45-67</span></li>
              <li><span className="text-sm text-accent-foreground/70">г. Актау, Казахстан</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-accent-foreground/10 pt-8 text-center">
          <p className="text-sm text-accent-foreground/60">
            2026 Navli. Все права защищены. Актау, Казахстан.
          </p>
        </div>
      </div>
    </footer>
  )
}
