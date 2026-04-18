import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code2, ChevronRight, Layout, MessageSquare,
  Zap, ArrowLeft, Send, CheckCircle2, Sparkles, Users, Briefcase, GraduationCap, User,
  Building2, Building, Loader2
} from "lucide-react";

type Step = "welcome" | "select-niche" | "select-service" | "details" | "success";

const STEP_NUMBERS: Record<Step, number> = {
  welcome: 1,
  "select-niche": 2,
  "select-service": 3,
  details: 4,
  success: 4,
};
const TOTAL_STEPS = 4;

export default function MiniApp() {
  const [step, setStep] = useState<Step>("welcome");
  const [niche, setNiche] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);

  const [projectName, setProjectName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const niches = [
    { id: "expert", title: "Эксперт / Коуч", icon: GraduationCap },
    { id: "blogger", title: "Блогер", icon: Users },
    { id: "small-biz", title: "Малый бизнес", icon: Briefcase },
    { id: "medium-biz", title: "Средний бизнес", icon: Building },
    { id: "company", title: "Компания / Бренд", icon: Building2 },
    { id: "other", title: "Другое", icon: User },
  ];

  const services = [
    {
      id: "ai-sales",
      title: "AI-Ассистент для продаж",
      desc: "Цифровой сотрудник, который сам ведет диалог, закрывает возражения и доводит клиента до оплаты 24/7",
      icon: MessageSquare,
      price: "от 25к",
      time: "3-5 дней"
    },
    {
      id: "content-machine",
      title: "AI Контент-машина",
      desc: "Автоматическое создание Reels, постов и рассылок в Вашем стиле из одного видео или идеи",
      icon: Layout,
      price: "от 20к",
      time: "2-4 дня"
    },
    {
      id: "ai-knowledge",
      title: "AI База знаний компании",
      desc: "Умный поиск по всем документам и регламентам. Мгновенные ответы для сотрудников и клиентов",
      icon: Building2,
      price: "от 40к",
      time: "5-7 дней"
    },
    {
      id: "auto",
      title: "Системная Автоматизация",
      desc: "Свяжем все Ваши сервисы в единый механизм, исключая ошибки и освобождая Вас от операционки",
      icon: Zap,
      price: "от 15к",
      time: "2-3 дня"
    },
    {
      id: "consult",
      title: "Нужна консультация",
      desc: "Если не знаете, какой ИИ-продукт принесет Вам больше прибыли — подберем решение под Ваш запрос",
      icon: Sparkles,
      price: "Бесплатно",
      time: "15 мин"
    },
  ];

  async function handleSubmit() {
    if (!contact.trim()) {
      setSendError("Укажите Telegram или телефон для связи");
      return;
    }
    setSendError("");
    setSending(true);

    try {
      const res = await fetch("/.netlify/functions/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, service, projectName, taskDesc, contact }),
      });
      if (!res.ok) throw new Error("Send failed");
      setStep("success");
    } catch {
      setSendError("Ошибка отправки. Напишите напрямую: @makedonskiy");
    } finally {
      setSending(false);
    }
  }

  const progressPercent = (STEP_NUMBERS[step] / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-blue-500/30 flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[80px]" />
      </div>

      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-md">
        <button
          onClick={() => setStep("welcome")}
          className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-4 h-4" />
          </div>
          <span>Самостоятельные<span className="text-blue-500">Запуски</span></span>
        </button>
        {step !== "welcome" && step !== "success" && (
          <button
            onClick={() => {
              if (step === "select-niche") setStep("welcome");
              else if (step === "select-service") setStep("select-niche");
              else if (step === "details") setStep("select-service");
            }}
            className="text-gray-400 hover:text-white transition-colors p-2 -mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
      </header>

      {/* Progress bar */}
      {step !== "success" && (
        <div className="relative z-10 h-1 bg-white/5">
          <motion.div
            className="h-full bg-blue-500"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      )}

      <main className="relative z-10 flex-1 px-6 py-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center pt-10"
            >
              <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center mb-8 shadow-lg shadow-blue-600/10">
                <Sparkles className="w-10 h-10 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Приветствую! 👋</h1>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Я помогу Вам рассчитать стоимость и запустить Ваш ИИ-проект за считанные дни.
              </p>
              <button
                onClick={() => setStep("select-niche")}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                Начать подбор решения
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === "select-niche" && (
            <motion.div
              key="select-niche"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-1">Шаг 1 из 3</p>
                <h2 className="text-xl font-bold">К какой категории Вы относитесь?</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {niches.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      setNiche(n.title);
                      setStep("select-service");
                    }}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all text-center group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                      <n.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium">{n.title}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "select-service" && (
            <motion.div
              key="select-service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-1">Шаг 2 из 3</p>
                <h2 className="text-xl font-bold">Какая задача стоит перед Вами?</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setService(s.title);
                      setStep("details");
                    }}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all text-left group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors shrink-0">
                      <s.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm mb-1">{s.title}</h3>
                      <p className="text-xs text-gray-400 leading-snug mb-1">{s.desc}</p>
                      <p className="text-xs text-blue-400/70 font-medium uppercase tracking-wider">{s.time} • {s.price}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs text-gray-500 mb-1">Шаг 3 из 3</p>
                <h2 className="text-xl font-bold mb-3">
                  {service === "Нужна консультация" ? "О чем хотите пообщаться?" : "Расскажите об идее"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/10">Категория: {niche}</span>
                  <span className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">Выбрано: {service}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Название проекта или компании</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Напр: Мой бренд или название услуги"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Описание задачи (что должен делать сайт или бот?)</label>
                  <textarea
                    rows={4}
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    placeholder="Напр: Нужен сайт для продажи курса или бот для записи клиентов..."
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all resize-none text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Ваш Telegram или Телефон <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => { setContact(e.target.value); setSendError(""); }}
                    placeholder="@username или +7..."
                    className={`w-full p-4 rounded-xl bg-white/5 border outline-none transition-all text-base ${sendError ? "border-red-500" : "border-white/10 focus:border-blue-500"}`}
                  />
                  {sendError && <p className="text-xs text-red-400">{sendError}</p>}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={sending}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    Отправить на согласование
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center pt-10"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-8">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Готово! 🚀</h1>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Ваша заявка принята. Чтобы ускорить процесс, Вы можете написать мне напрямую в Telegram.
              </p>
              <div className="space-y-3 w-full">
                <a
                  href="https://t.me/makedonskiy"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  Написать @makedonskiy
                  <MessageSquare className="w-5 h-5" />
                </a>
                <button
                  onClick={() => {
                    setStep("welcome");
                    setNiche(null);
                    setService(null);
                    setProjectName("");
                    setTaskDesc("");
                    setContact("");
                  }}
                  className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all text-gray-400"
                >
                  Вернуться на главную
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 px-6 py-6 text-center">
        <p className="text-xs text-gray-600 uppercase tracking-[0.2em]">
          Powered by AI • Самостоятельные Запуски
        </p>
      </footer>
    </div>
  );
}
