"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { User, GraduationCap, School, ArrowLeft, ArrowRight, Check, Camera, Car, CreditCard, X as XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type Role = "parent" | "student" | "school" | null

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role>(null)
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    iin: "",
    fullName: "",
    phone: "",
    neighborhoodCode: "",
    childName: "",
    childClass: "",
    hasTransport: null as boolean | null,
    carModel: "",
    carNumber: "",
    carColor: "",
    email: "",
    password: "",
    schoolName: "",
    position: "",
  })
  const [faceIdVerified, setFaceIdVerified] = useState(false)
  const [faceIdScanning, setFaceIdScanning] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [subscriptionDone, setSubscriptionDone] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)

  const updateField = (field: string, value: string | boolean | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 480, height: 480 } })
      setCameraStream(stream)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setFaceIdScanning(true)
    } catch {
      alert("Не удалось получить доступ к камере. Пожалуйста, разрешите доступ.")
    }
  }, [])

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return
    const canvas = canvasRef.current
    const video = videoRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.drawImage(video, 0, 0)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8)
      setCapturedPhoto(dataUrl)
    }
    // Stop camera
    if (cameraStream) {
      cameraStream.getTracks().forEach((t) => t.stop())
      setCameraStream(null)
    }
    setFaceIdScanning(false)
    // Simulate verification
    setTimeout(() => setFaceIdVerified(true), 1500)
  }, [cameraStream])

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) cameraStream.getTracks().forEach((t) => t.stop())
    }
  }, [cameraStream])

  const handleSubmit = () => {
    // Store role in localStorage so dashboard knows the role
    if (typeof window !== "undefined") {
      localStorage.setItem("navli_role", role || "parent")
      localStorage.setItem("navli_hasTransport", String(formData.hasTransport))
    }
    router.push("/dashboard")
  }

  // Role selection screen
  if (!role) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-border/50 bg-card/80 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Назад</span>
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl">
            <div className="text-center">
              <Image src="/images/navli-logo.jpeg" alt="Navli" width={56} height={56} className="mx-auto mb-4 rounded-xl" />
              <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                Регистрация в <span className="text-accent">nav</span><span className="text-primary">li</span>
              </h1>
              <p className="mt-2 text-muted-foreground">Выберите вашу роль для продолжения</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <RoleCard icon={<User className="h-7 w-7" />} title="Родитель" description="Организуйте поездки для ребенка" onClick={() => { setRole("parent"); setStep(1) }} />
              <RoleCard icon={<GraduationCap className="h-7 w-7" />} title="Ученик" description="Групповой чат с попутчиками" onClick={() => { setRole("student"); setStep(1) }} />
              <RoleCard icon={<School className="h-7 w-7" />} title="Школа" description="Отмечайте прибытие детей" onClick={() => { setRole("school"); setStep(1) }} />
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">Войти</Link>
            </p>
          </div>
        </main>
      </div>
    )
  }

  // Parent registration flow
  if (role === "parent") {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-border/50 bg-card/80 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <button onClick={() => { if (step > 1) setStep(step - 1); else { setRole(null); setStep(0) } }} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Назад</span>
            </button>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="w-full max-w-lg">
            <StepIndicator currentStep={step} totalSteps={5} />

            {/* Step 1: Personal data */}
            {step === 1 && (
              <div className="mt-8 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Личные данные</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Укажите информацию для верификации</p>
                </div>
                <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
                  <FieldBlock label="ИИН" id="iin" placeholder="123456789012" maxLength={12} value={formData.iin} onChange={(v) => updateField("iin", v)} hint="12-значный индивидуальный номер" />
                  <FieldBlock label="ФИО" id="fullName" placeholder="Иванов Иван Иванович" value={formData.fullName} onChange={(v) => updateField("fullName", v)} />
                  <FieldBlock label="Телефон" id="phone" placeholder="+7 (777) 123-45-67" value={formData.phone} onChange={(v) => updateField("phone", v)} />
                  <FieldBlock label="Email" id="email" type="email" placeholder="ivan@example.com" value={formData.email} onChange={(v) => updateField("email", v)} />
                  <FieldBlock label="Пароль" id="password" type="password" placeholder="Минимум 8 символов" value={formData.password} onChange={(v) => updateField("password", v)} />
                </div>
                <Button className="w-full gap-2" onClick={() => setStep(2)}>Продолжить <ArrowRight className="h-4 w-4" /></Button>
              </div>
            )}

            {/* Step 2: Child and neighborhood */}
            {step === 2 && (
              <div className="mt-8 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Данные ребенка</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Укажите информацию о ребенке и микрорайон</p>
                </div>
                <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
                  <FieldBlock label="Код микрорайона" id="neighborhoodCode" placeholder="AKTAU-14" value={formData.neighborhoodCode} onChange={(v) => updateField("neighborhoodCode", v)} hint="Код вашего микрорайона в Актау" />
                  <FieldBlock label="ФИО ребенка" id="childName" placeholder="Иванов Петр Иванович" value={formData.childName} onChange={(v) => updateField("childName", v)} />
                  <FieldBlock label="Класс" id="childClass" placeholder="5А (НИШ Актау)" value={formData.childClass} onChange={(v) => updateField("childClass", v)} />
                </div>
                <Button className="w-full gap-2" onClick={() => setStep(3)}>Продолжить <ArrowRight className="h-4 w-4" /></Button>
              </div>
            )}

            {/* Step 3: Transport */}
            {step === 3 && (
              <div className="mt-8 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Транспорт</h2>
                  <p className="mt-1 text-sm text-muted-foreground">У вас есть личный автомобиль?</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => updateField("hasTransport", true)} className={cn("flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all", formData.hasTransport === true ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30")}>
                    <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl", formData.hasTransport === true ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}><Car className="h-7 w-7" /></div>
                    <span className="text-base font-semibold text-foreground">Есть автомобиль</span>
                    <span className="text-xs text-muted-foreground">Буду дежурным водителем</span>
                  </button>
                  <button onClick={() => updateField("hasTransport", false)} className={cn("flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all", formData.hasTransport === false ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30")}>
                    <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl", formData.hasTransport === false ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}><XIcon className="h-7 w-7" /></div>
                    <span className="text-base font-semibold text-foreground">Нет автомобиля</span>
                    <span className="text-xs text-muted-foreground">Оформлю подписку</span>
                  </button>
                </div>

                {formData.hasTransport === true && (
                  <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
                    <FieldBlock label="Марка и модель" id="carModel" placeholder="Toyota Camry 70" value={formData.carModel} onChange={(v) => updateField("carModel", v)} />
                    <FieldBlock label="Цвет" id="carColor" placeholder="Белый" value={formData.carColor} onChange={(v) => updateField("carColor", v)} />
                    <FieldBlock label="Госномер" id="carNumber" placeholder="123 ABC 15" value={formData.carNumber} onChange={(v) => updateField("carNumber", v)} />
                  </div>
                )}

                {formData.hasTransport === false && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"><CreditCard className="h-6 w-6" /></div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Подписка Navli</h3>
                          <p className="text-sm text-muted-foreground">Ваш ребенок будет ездить с другими родителями</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>10 000</span>
                        <span className="text-sm text-muted-foreground">тг / месяц</span>
                      </div>
                      <Button className="mt-4 w-full gap-2" onClick={() => setSubscriptionDone(true)} disabled={subscriptionDone}>
                        {subscriptionDone ? <><Check className="h-4 w-4" /> Подписка оформлена</> : <><CreditCard className="h-4 w-4" /> Оформить подписку</>}
                      </Button>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <h4 className="mb-3 text-sm font-semibold text-foreground">Сравнение с такси в Актау</h4>
                      <div className="space-y-2">
                        <ComparisonRow label="Navli подписка" price="10 000 тг/мес" highlighted />
                        <ComparisonRow label="Такси (2 поездки/день)" price="~80 000 тг/мес" />
                        <ComparisonRow label="Такси InDrive утро" price="1 500-2 500 тг" />
                        <ComparisonRow label="Такси Яндекс утро" price="2 000-3 000 тг" />
                      </div>
                      <div className="mt-4 rounded-xl bg-primary/10 px-4 py-3">
                        <p className="text-center text-sm font-semibold text-foreground">Экономия с Navli: <span className="text-primary">до 70 000 тг в месяц</span></p>
                      </div>
                    </div>
                  </div>
                )}

                <Button className="w-full gap-2" onClick={() => setStep(4)} disabled={formData.hasTransport === null || (formData.hasTransport === false && !subscriptionDone)}>
                  Продолжить <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Step 4: Real Face ID via Camera */}
            {step === 4 && (
              <div className="mt-8 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Верификация Face ID</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Покажите ваше лицо камере для верификации</p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    {/* Camera viewfinder */}
                    {!faceIdVerified && !capturedPhoto && (
                      <>
                        {faceIdScanning ? (
                          <div className="relative overflow-hidden rounded-2xl border-4 border-primary/50">
                            <video ref={videoRef} autoPlay playsInline muted className="h-64 w-64 object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-44 w-44 rounded-full border-2 border-dashed border-primary/60 animate-pulse" />
                            </div>
                            <canvas ref={canvasRef} className="hidden" />
                          </div>
                        ) : (
                          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                            <Camera className="h-16 w-16" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{faceIdScanning ? "Расположите лицо в круге" : "Верификация Face ID"}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{faceIdScanning ? "Нажмите кнопку для сканирования" : "Необходимо для безопасности детей"}</p>
                        </div>
                        {faceIdScanning ? (
                          <Button onClick={capturePhoto} className="gap-2">
                            <Camera className="h-4 w-4" /> Сделать снимок
                          </Button>
                        ) : (
                          <Button variant="outline" onClick={startCamera} className="gap-2">
                            <Camera className="h-4 w-4" /> Открыть камеру
                          </Button>
                        )}
                      </>
                    )}

                    {/* Captured and verifying */}
                    {capturedPhoto && !faceIdVerified && (
                      <>
                        <div className="relative overflow-hidden rounded-2xl border-4 border-warning">
                          <img src={capturedPhoto} alt="Captured face" className="h-64 w-64 object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                          </div>
                        </div>
                        <p className="text-sm font-medium text-warning">Сканирование лица...</p>
                      </>
                    )}

                    {/* Verified */}
                    {faceIdVerified && capturedPhoto && (
                      <>
                        <div className="relative overflow-hidden rounded-2xl border-4 border-success">
                          <img src={capturedPhoto} alt="Verified face" className="h-64 w-64 object-cover" />
                          <div className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-success text-success-foreground shadow-lg">
                            <Check className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-success">Face ID подтвержден</h3>
                          <p className="mt-1 text-sm text-muted-foreground">Ваша личность успешно верифицирована</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Button className="w-full gap-2" onClick={() => setStep(5)} disabled={!faceIdVerified}>
                  Продолжить <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Step 5: Summary */}
            {step === 5 && (
              <div className="mt-8 space-y-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/20"><Check className="h-8 w-8 text-success" /></div>
                  <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Все готово!</h2>
                  <p className="mt-2 text-muted-foreground">Проверьте данные и завершите регистрацию</p>
                </div>
                <div className="space-y-3">
                  <SummaryItem label="ФИО" value={formData.fullName || "Не указано"} />
                  <SummaryItem label="ИИН" value={formData.iin || "Не указано"} />
                  <SummaryItem label="Телефон" value={formData.phone || "Не указано"} />
                  <SummaryItem label="Микрорайон" value={formData.neighborhoodCode || "Не указано"} />
                  <SummaryItem label="ФИО ребенка" value={formData.childName || "Не указано"} />
                  <SummaryItem label="Класс" value={formData.childClass || "Не указано"} />
                  <SummaryItem label="Транспорт" value={formData.hasTransport ? `${formData.carModel}, ${formData.carColor}, ${formData.carNumber}` : "Подписка Navli (10 000 тг/мес)"} />
                  <SummaryItem label="Face ID" value="Подтвержден" />
                </div>
                <Button className="w-full gap-2" size="lg" onClick={handleSubmit}>Завершить регистрацию <ArrowRight className="h-4 w-4" /></Button>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  // Student registration
  if (role === "student") {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-border/50 bg-card/80 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <button onClick={() => { setRole(null); setStep(0) }} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /><span className="text-sm">Назад</span>
            </button>
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="w-full max-w-lg space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Регистрация ученика</h2>
              <p className="mt-1 text-sm text-muted-foreground">Доступ к групповому чату попутчиков (без ИИ-чата)</p>
            </div>
            <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
              <FieldBlock label="ФИО" id="sName" placeholder="Иванов Петр Иванович" />
              <FieldBlock label="Класс (НИШ Актау)" id="sClass" placeholder="5А" />
              <FieldBlock label="Код микрорайона" id="sCode" placeholder="AKTAU-14" />
              <FieldBlock label="Email" id="sEmail" type="email" placeholder="petr@example.com" />
              <FieldBlock label="Пароль" id="sPass" type="password" placeholder="Минимум 8 символов" />
            </div>
            <Button className="w-full gap-2" size="lg" onClick={() => { if (typeof window !== "undefined") localStorage.setItem("navli_role", "student"); router.push("/dashboard") }}>
              Зарегистрироваться <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // School registration
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border/50 bg-card/80 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <button onClick={() => { setRole(null); setStep(0) }} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /><span className="text-sm">Назад</span>
          </button>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Регистрация сотрудника школы</h2>
            <p className="mt-1 text-sm text-muted-foreground">Отмечайте прибытие детей, без чата</p>
          </div>
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <FieldBlock label="Название школы" id="schName" placeholder="НИШ Актау" />
            <FieldBlock label="ФИО" id="schFullName" placeholder="Серикова Айгуль Мустафаевна" />
            <div className="space-y-2">
              <Label htmlFor="schPosition">Должность <span className="text-destructive">*</span></Label>
              <Input id="schPosition" placeholder="Учитель / Охранник / Администратор" value={formData.position} onChange={(e) => updateField("position", e.target.value)} required />
              <p className="text-xs text-muted-foreground">Обязательно. Укажите вашу должность вручную</p>
            </div>
            <FieldBlock label="Код микрорайона" id="schCode" placeholder="AKTAU-14" />
            <FieldBlock label="Email" id="schEmail" type="email" placeholder="school@nis.edu.kz" />
            <FieldBlock label="Пароль" id="schPass" type="password" placeholder="Минимум 8 символов" />
          </div>
          <Button className="w-full gap-2" size="lg" onClick={() => { if (typeof window !== "undefined") localStorage.setItem("navli_role", "school"); router.push("/dashboard") }} disabled={!formData.position.trim()}>
            Зарегистрироваться <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}

/* Helper components */
function RoleCard({ icon, title, description, onClick }: { icon: React.ReactNode; title: string; description: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-3 rounded-2xl border-2 border-border bg-card p-6 text-center transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-muted-foreground">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  )
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors", s <= currentStep ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
            {s < currentStep ? <Check className="h-4 w-4" /> : s}
          </div>
          {s < totalSteps && <div className={cn("h-0.5 w-6", s < currentStep ? "bg-primary" : "bg-border")} />}
        </div>
      ))}
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

function ComparisonRow({ label, price, highlighted = false }: { label: string; price: string; highlighted?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between rounded-xl px-4 py-3", highlighted ? "bg-primary/10 border border-primary/20" : "bg-secondary/50")}>
      <span className={cn("text-sm", highlighted ? "font-semibold text-foreground" : "text-muted-foreground")}>{label}</span>
      <span className={cn("text-sm font-bold", highlighted ? "text-primary" : "text-destructive")}>{price}</span>
    </div>
  )
}

function FieldBlock({ label, id, placeholder, value, onChange, hint, type = "text", maxLength }: { label: string; id: string; placeholder: string; value?: string; onChange?: (v: string) => void; hint?: string; type?: string; maxLength?: number }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} maxLength={maxLength} value={value} onChange={onChange ? (e) => onChange(e.target.value) : undefined} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
