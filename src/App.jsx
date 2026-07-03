import { useEffect, useState } from "react";

const stackItems = [
  { label: "Python / Django / React", value: 95, tone: "from-cyan-300 to-blue-500" },
  { label: "GIS / Spatial Automation", value: 90, tone: "from-cyan-400 to-teal-300" },
  { label: "AutoCAD & Civil 3D", value: 85, tone: "from-violet-400 to-fuchsia-500" },
  { label: "MATLAB & Algorithms", value: 80, tone: "from-purple-400 to-indigo-500" },
];

function Card({ children, className = "" }) {
  return (
    <section
      className={`group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-cyan-400/60 hover:shadow-cyan-500/20 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/8 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-slate-100" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.8-.25.8-.56v-2.02c-3.26.7-3.95-1.4-3.95-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.04 1.79 2.74 1.27 3.42.97.1-.76.4-1.27.74-1.56-2.6-.3-5.34-1.3-5.34-5.78 0-1.28.46-2.32 1.2-3.14-.12-.3-.52-1.5.12-3.1 0 0 .99-.32 3.22 1.2a11.1 11.1 0 0 1 5.86 0c2.23-1.52 3.21-1.2 3.21-1.2.65 1.6.25 2.8.13 3.1.75.82 1.2 1.86 1.2 3.14 0 4.49-2.74 5.48-5.35 5.77.42.37.8 1.08.8 2.18v3.25c0 .31.21.67.81.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-cyan-300" aria-hidden="true">
      <path d="M21.93 4.02a1.05 1.05 0 0 0-1.1-.16L2.7 11.08c-.78.31-.74 1.43.07 1.68l4.58 1.43 1.75 5.45c.25.8 1.28 1 1.82.36l2.55-3.02 4.74 3.5c.66.48 1.6.1 1.75-.71L22.48 5.1c.08-.43-.13-.86-.55-1.08Zm-4.1 4.15-7.8 7.08-.3 2.9-1.08-3.36 9.18-6.62Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-purple-300" aria-hidden="true">
      <path d="M3.75 5h16.5A2.75 2.75 0 0 1 23 7.75v8.5A2.75 2.75 0 0 1 20.25 19H3.75A2.75 2.75 0 0 1 1 16.25v-8.5A2.75 2.75 0 0 1 3.75 5Zm.2 2 7.2 5.24a1.45 1.45 0 0 0 1.7 0L20.05 7H3.95Zm17.05 1.88-6.97 5.07a3.45 3.45 0 0 1-4.06 0L3 8.88v7.37c0 .41.34.75.75.75h16.5c.41 0 .75-.34.75-.75V8.88Z" />
    </svg>
  );
}

function DraftingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-cyan-300" aria-hidden="true">
      <path d="M4 20h16v2H2V4h2v16Zm4.2-2H6l7.3-14.6c.38-.76 1.47-.76 1.84 0L22.45 18h-2.24l-1.5-3H9.7l-1.5 3Zm2.5-5h7l-3.5-7-3.5 7Z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-purple-300" aria-hidden="true">
      <path d="m9 3 6 2.1L21 3v17.9L15 23l-6-2.1L3 23V5.1L9 3Zm1.5 2.56v13.58l3 1.05V6.61l-3-1.05ZM5 6.52v13.66l3.5-1.22V5.3L5 6.52Zm14 10.96V5.82l-3.5 1.22V20.7l3.5-1.22Z" />
    </svg>
  );
}

function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Tehran",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };

    formatTime();
    const timer = setInterval(formatTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-indigo-700/25 blur-3xl" />
        <div className="absolute right-[-8rem] top-1/4 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-purple-700/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl auto-rows-fr grid-cols-1 gap-5 md:grid-cols-3">
        {/* Profile and professional bio */}
        <Card className="md:col-span-2 md:row-span-2">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="w-fit rounded-[2rem] bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-500 p-1 shadow-2xl shadow-cyan-500/25">
                <img
                  src="/profile.jpg"
                  alt="Joseph Babaki"
                  className="h-32 w-32 rounded-[1.75rem] border border-slate-950/70 object-cover sm:h-40 sm:w-40"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
                  Digital Business Card
                </p>
                <h1 className="bg-gradient-to-r from-cyan-200 via-sky-300 to-purple-300 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                  Joseph Babaki
                </h1>
                <p className="mt-3 text-lg font-semibold text-slate-200">
                  Geomatics & Full-Stack Engineer
                </p>
              </div>
            </div>

            <p className="max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
              I’m a developer and engineering student who thrives on automation, clean code, and
              building for the web. My toolkit bridges the gap between heavy engineering software
              (AutoCAD, Civil 3D, Matlab) and full-stack development (Python, Django, React). I
              leverage an AI-augmented workflow to speed up development, optimize complex algorithms,
              and bring ideas to life quickly. Beyond engineering and code, I am a polyglot fluent in
              English, Farsi, and Turkmeni, always looking for the next interesting problem to solve
              or workflow to automate.
            </p>

            <div className="flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" />
              </span>
              STATUS: AUTOMATING THE NEXT WORKFLOW
            </div>
          </div>
        </Card>

        {/* Core engineering and development stack meter */}
        <Card className="md:row-span-2">
          <div className="flex h-full flex-col justify-between gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200/80">
                Stack Meter
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-50">
                System Architecture & Tools
              </h2>
            </div>

            <div className="space-y-6">
              {stackItems.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-200">{item.label}</span>
                    <span className="font-mono text-sm text-cyan-200">{item.value}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-800/90 ring-1 ring-slate-700/60">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${item.tone} shadow-lg shadow-cyan-400/25`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Live local clock widget */}
        <Card>
          <div className="flex h-full flex-col justify-between gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
                Local Time
              </p>
              <div className="mt-5 font-mono text-4xl font-black tracking-normal text-slate-50 sm:text-5xl">
                {time}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-400">Tehran, Iran / UTC+3.5</p>
          </div>
        </Card>

        {/* Automation project showcases */}
        <Card>
          <div className="flex h-full flex-col gap-5">
            <h2 className="text-2xl font-black tracking-tight text-slate-50">
              Automated Solutions
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4">
                <DraftingIcon />
                <div>
                  <p className="font-semibold text-slate-100">Geometric Route Curve Calculator</p>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-200/70">
                    Python
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4">
                <MapIcon />
                <div>
                  <p className="font-semibold text-slate-100">
                    ArcGIS Cost Path to Civil 3D Alignment Pipeline
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-purple-200/70">
                    Spatial Automation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* GitHub integration link */}
        <Card>
          <a
            href="https://github.com/josebbk"
            target="_blank"
            rel="noreferrer"
            className="flex h-full flex-col justify-between gap-8"
          >
            <GithubIcon />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                GitHub
              </p>
              <p className="mt-2 text-3xl font-black tracking-tight text-slate-50">@josebbk</p>
            </div>
          </a>
        </Card>

        {/* Telegram contact hub */}
        <Card>
          <a
            href="https://telegram.me/@josebbk"
            target="_blank"
            rel="noreferrer"
            className="flex h-full flex-col justify-between gap-8"
          >
            <TelegramIcon />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
                Telegram
              </p>
              <p className="mt-2 text-2xl font-black tracking-tight text-slate-50">
                Direct Message / Chat
              </p>
            </div>
          </a>
        </Card>

        {/* Email contact point */}
        <Card>
          <a
            href="mailto:yousefbbk29@gmail.com"
            className="flex h-full flex-col justify-between gap-8"
          >
            <MailIcon />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200/80">
                Email
              </p>
              <p className="mt-2 break-words text-2xl font-black tracking-tight text-slate-50">
                yousefbbk29@gmail.com
              </p>
            </div>
          </a>
        </Card>
      </div>
    </main>
  );
}

export default App;

// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process