import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Rocket, Zap, Shield, ArrowRight, Code2, Sparkles, CheckCircle2,
  Users, Briefcase, GraduationCap, MessageSquare, Layout, Smartphone,
  Search, PenTool, PlayCircle, Building2
} from "lucide-react";
import MiniApp from "./MiniApp";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-blue-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const AudienceCard = ({ icon: Icon, title, role, tasks }: { icon: any, title: string, role: string, tasks: string[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 transition-all group"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-blue-400 text-sm font-medium uppercase tracking-wider">{role}</p>
      </div>
    </div>
    <div className="space-y-4">
      <p className="text-gray-400 font-medium">Что именно вы можете заказать:</p>
      <ul className="space-y-3">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="relative flex flex-col items-center text-center group">
    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500">
      <span className="text-2xl font-bold text-white">{number}</span>
    </div>
    <h4 className="text-xl font-bold mb-3">{title}</h4>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function App() {
  const [view, setView] = useState<"landing" | "mini">("landing");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "mini") {
      setView("mini");
    }
  }, []);

  if (view === "mini") {
    return <MiniApp />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[70%] h-[70%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <span>Олеся Лиханова<span className="text-blue-500"> | Внедрение AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#who" className="hover:text-white transition-colors">Для кого</a>
          <a href="#how" className="hover:text-white transition-colors">Как работаем</a>
          <a href="#pricing" className="hover:text-white transition-colors">Цены</a>
        </div>
        <button
          onClick={() => setView("mini")}
          className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors font-medium shadow-lg shadow-blue-600/20"
        >
          Начать проект
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" /> Внедряем ИИ-решения в 10 раз быстрее
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Сэкономьте 15 часов в неделю —<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                запустим ИИ за 3 дня
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Перестаньте тонуть в операционке и тратить миллионы на штат.
              Мы создаем умных ИИ-ассистентов, контент-машины и базы знаний за считанные дни.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setView("mini")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20"
              >
                Подобрать решение
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setView("mini")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold"
              >
                Узнать стоимость
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who is this for Section */}
      <section id="who" className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Для кого эта услуга?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мы помогаем тем, кому нужно быстрое и качественное решение без лишней бюрократии и огромных бюджетов.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AudienceCard
            icon={GraduationCap}
            title="Эксперты и Коучи"
            role="Инфобизнес"
            tasks={[
              "AI-ассистенты для прогрева и продаж в Telegram",
              "Автоматическая нарезка Reels из Ваших уроков",
              "Умные базы знаний для Ваших учеников",
              "Автоматизация приема платежей и доступов"
            ]}
          />
          <AudienceCard
            icon={Users}
            title="Блогеры"
            role="Медиа"
            tasks={[
              "Контент-машины для ведения всех соцсетей",
              "AI-боты для общения с аудиторией в комментариях",
              "Автоматизация создания рекламных креативов",
              "Умные рассылки по базе подписчиков"
            ]}
          />
          <AudienceCard
            icon={Briefcase}
            title="Малый бизнес"
            role="Предприниматели"
            tasks={[
              "Цифровые продавцы, работающие 24/7",
              "Автоматизация обработки заявок из всех каналов",
              "AI-аналитика продаж и поведения клиентов",
              "Интеграция ИИ в Ваши текущие бизнес-процессы"
            ]}
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={MessageSquare}
            title="AI-Ассистенты"
            description="Цифровые сотрудники, которые сами ведут диалог и доводят клиента до оплаты 24/7."
          />
          <FeatureCard
            icon={Layout}
            title="Контент-машины"
            description="Автоматическое создание Reels, постов и рассылок в Вашем стиле из одного видео."
          />
          <FeatureCard
            icon={Building2}
            title="Базы знаний"
            description="Умный поиск по всем документам компании. Мгновенные ответы для штата и клиентов."
          />
          <FeatureCard
            icon={Zap}
            title="Автоматизация"
            description="Свяжем все Ваши сервисы в единый механизм, исключая ошибки и операционку."
          />
        </div>
      </section>

      {/* How we work Section */}
      <section id="how" className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Как мы работаем?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Прозрачный процесс от первой идеи до готового продукта.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          <Step
            number="01"
            title="Бриф"
            description="Обсуждаем вашу задачу, цели и пожелания. Составляем план работ."
          />
          <Step
            number="02"
            title="Разработка"
            description="Используем ИИ для создания структуры и кода. Вы видите прогресс в реальном времени."
          />
          <Step
            number="03"
            title="Правки"
            description="Дошлифовываем детали, подключаем платежи и необходимые сервисы."
          />
          <Step
            number="04"
            title="Запуск"
            description="Передаем вам готовый продукт и обучаем, как им пользоваться."
          />
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Результаты в цифрах</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Реальные проекты, реальные клиенты.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { num: "47+", label: "проектов запущено" },
            { num: "3 дня", label: "среднее время сдачи" },
            { num: "15 ч/нед", label: "экономит клиент в среднем" },
            { num: "100%", label: "клиентов возвращаются" },
          ].map((s) => (
            <div key={s.num} className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-4xl font-bold text-blue-400 mb-2">{s.num}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-white/[0.03] border border-white/10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl shrink-0 shadow-lg shadow-blue-500/20">
            О
          </div>
          <div>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              «Меня зовут Олеся. Более 3 лет работаю с нейросетями — внедряю AI-решения для экспертов, малого и среднего бизнеса: от ассистентов и баз знаний до автоматизации процессов и контент-систем. Каждый проект веду лично.»
            </p>
            <p className="text-blue-400 font-semibold">Олеся Лиханова — специалист по внедрению AI</p>
            <a href="https://t.me/makedonskiy" target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors">@makedonskiy в Telegram</a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Цены</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Фиксированная стоимость без скрытых платежей.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Автоматизация", price: "от 15 000 ₽", time: "2–3 дня", desc: "Связываем все ваши сервисы в единый механизм", hot: false },
            { title: "Контент-машина", price: "от 20 000 ₽", time: "2–4 дня", desc: "Reels, посты и рассылки в вашем стиле автоматически", hot: false },
            { title: "AI-Ассистент", price: "от 25 000 ₽", time: "3–5 дней", desc: "Цифровой продавец, который работает 24/7", hot: true },
            { title: "База знаний", price: "от 40 000 ₽", time: "5–7 дней", desc: "Умный поиск по всем документам компании", hot: false },
          ].map((p) => (
            <div key={p.title} className={`relative p-8 rounded-2xl border transition-all ${p.hot ? "bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-600/10" : "bg-white/[0.03] border-white/10"}`}>
              {p.hot && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-xs font-bold uppercase tracking-wider">Популярное</span>}
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-3xl font-bold text-blue-400 mb-1">{p.price}</p>
              <p className="text-xs text-gray-500 mb-4">{p.time}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">Консультация — <span className="text-white font-medium">бесплатно, 15 минут</span>. Без обязательств.</p>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px"}} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Готовы запустить свой <br /> проект уже на этой неделе?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Оставьте заявку сейчас и получите бесплатную консультацию по архитектуре вашего будущего продукта.
            </p>
            <button
              onClick={() => setView("mini")}
              className="px-10 py-5 rounded-2xl bg-white text-blue-600 hover:bg-gray-100 transition-all font-bold text-lg shadow-xl"
            >
              Подобрать ИИ-решение
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
        <div className="flex items-center gap-2 font-bold text-lg text-white">
          <Code2 className="w-5 h-5 text-blue-500" />
          <span>Олеся Лиханова | Внедрение AI</span>
        </div>
        <p>© 2026 Олеся Лиханова | Внедрение AI. Все права защищены.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
        </div>
      </footer>
    </div>
  );
}
