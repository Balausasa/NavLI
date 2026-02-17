"use client"

import { useState, useRef, useEffect } from "react"
import { Send, AlertTriangle, Bot, User, Clock, Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Message = {
  id: number
  sender: string
  text: string
  time: string
  isMe: boolean
  isSystem: boolean
  isAI: boolean
}

const parentMessages: Message[] = [
  { id: 1, sender: "Navli ИИ", text: "Добро пожаловать в группу AKTAU-14! Я ИИ-помощник Navli. Отправьте ваш график и расписание уроков ребенка в НИШ Актау, чтобы я составил расписание поездок.", time: "09:00", isMe: false, isSystem: false, isAI: true },
  { id: 2, sender: "Серикова А.", text: "Здравствуйте! Мой график: пн-пт 08:00-17:00. У дочери уроки с 08:30 до 14:00.", time: "09:15", isMe: false, isSystem: false, isAI: false },
  { id: 3, sender: "Петров К.", text: "Добрый день! Работаю с 09:00, могу утром отвозить. Сын учится с 08:30 до 13:30.", time: "09:22", isMe: false, isSystem: false, isAI: false },
  { id: 4, sender: "Вы", text: "Привет! Мой график гибкий. Ребенок: 08:30-14:30, 5А класс.", time: "09:30", isMe: true, isSystem: false, isAI: false },
  { id: 5, sender: "Navli ИИ", text: "Спасибо! Расписание готово: Иванов И. - Пн, Пт; Серикова А. - Вт; Петров К. - Ср; Ким С. - Чт. Подробности в разделе \"Расписание\".", time: "09:50", isMe: false, isSystem: false, isAI: true },
]

const studentMessages: Message[] = [
  { id: 1, sender: "Система", text: "Добро пожаловать в групповой чат попутчиков! Здесь вы можете общаться с детьми из вашей поездки.", time: "08:00", isMe: false, isSystem: true, isAI: false },
  { id: 2, sender: "Серикова Мадина", text: "Привет всем! Кто сегодня в машине?", time: "07:25", isMe: false, isSystem: false, isAI: false },
  { id: 3, sender: "Ким Данияр", text: "Я! Мы уже выехали из 14 микрорайона", time: "07:28", isMe: false, isSystem: false, isAI: false },
  { id: 4, sender: "Вы", text: "Привет! Я тоже еду. Скоро заедут за мной.", time: "07:30", isMe: true, isSystem: false, isAI: false },
]

export default function ChatPage() {
  const [role, setRole] = useState<string>("parent")
  const [messages, setMessages] = useState<Message[]>(parentMessages)
  const [input, setInput] = useState("")
  const [sosActive, setSosActive] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const r = localStorage.getItem("navli_role") || "parent"
      setRole(r)
      if (r === "student") setMessages(studentMessages)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "Вы",
      text: input,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
      isSystem: false,
      isAI: false,
    }
    setMessages([...messages, newMsg])
    setInput("")

    // AI response only for parents
    if (role === "parent") {
      setTimeout(() => {
        const aiMsg: Message = {
          id: messages.length + 2,
          sender: "Navli ИИ",
          text: "Принято! Я обновлю расписание с учетом вашего сообщения. Маршрут до НИШ Актау оптимизирован.",
          time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
          isMe: false,
          isSystem: false,
          isAI: true,
        }
        setMessages((prev) => [...prev, aiMsg])
      }, 1500)
    }
  }

  const handleSOS = () => {
    setSosActive(true)
    const sosMsg: Message = {
      id: messages.length + 1,
      sender: "СИСТЕМА",
      text: "SOS! Иванов И. не может выполнить дежурство сегодня. ИИ перестраивает расписание...",
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      isMe: false,
      isSystem: true,
      isAI: false,
    }
    setMessages([...messages, sosMsg])

    setTimeout(() => {
      const resolved: Message = {
        id: messages.length + 2,
        sender: "Navli ИИ",
        text: "Расписание обновлено! Дежурство переходит к Петрову К. Все родители уведомлены.",
        time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        isMe: false,
        isSystem: false,
        isAI: true,
      }
      setMessages((prev) => [...prev, resolved])
      setSosActive(false)
    }, 3000)
  }

  // School has no chat
  if (role === "school") {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4">
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h2 className="mt-4 text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Чат недоступен</h2>
          <p className="mt-2 text-sm text-muted-foreground">У сотрудников школы нет доступа к чату. Используйте раздел "Посещаемость".</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              {role === "student" ? "Чат попутчиков" : "ИИ-чат для родителей"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {role === "student" ? "Общение с детьми из вашей поездки" : "AKTAU-14 | Только для родителей"}
            </p>
          </div>
          {role === "parent" && (
            <Button variant="destructive" size="sm" className="gap-2" onClick={handleSOS} disabled={sosActive}>
              <AlertTriangle className="h-4 w-4" />SOS
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground">
              {role === "student" ? "Это групповой чат с попутчиками. ИИ-чат доступен только родителям." : "Этот чат доступен только для родителей. Ученики общаются в групповом чате попутчиков."}
            </p>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.isMe ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                msg.isSystem ? "border-2 border-destructive bg-destructive/10"
                  : msg.isAI ? "border border-primary/30 bg-primary/5"
                  : msg.isMe ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card"
              )}>
                {!msg.isMe && (
                  <div className="mb-1 flex items-center gap-2">
                    {msg.isAI ? <Bot className="h-3.5 w-3.5 text-primary" /> : msg.isSystem ? <AlertTriangle className="h-3.5 w-3.5 text-destructive" /> : <User className="h-3.5 w-3.5 text-muted-foreground" />}
                    <span className={cn("text-xs font-semibold", msg.isSystem ? "text-destructive" : msg.isAI ? "text-primary" : "text-foreground")}>{msg.sender}</span>
                  </div>
                )}
                <p className={cn("text-sm leading-relaxed", msg.isMe ? "text-primary-foreground" : msg.isSystem ? "text-destructive" : "text-foreground")}>{msg.text}</p>
                <p className={cn("mt-1 text-right text-[10px]", msg.isMe ? "text-primary-foreground/70" : "text-muted-foreground")}>{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick actions for parents only */}
      {role === "parent" && (
        <div className="border-t border-border bg-card px-4 py-2">
          <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto">
            <button onClick={() => setInput("Мой график: пн-пт 08:00-17:00")} className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
              <Clock className="h-3 w-3" />Отправить график
            </button>
            <button onClick={() => setInput("Расписание уроков НИШ: 08:30-14:00")} className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
              <Calendar className="h-3 w-3" />Расписание НИШ
            </button>
          </div>
        </div>
      )}

      <div className="border-t border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-3xl gap-2">
          <Input placeholder="Введите сообщение..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1" />
          <Button onClick={sendMessage} size="sm" className="shrink-0"><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  )
}
