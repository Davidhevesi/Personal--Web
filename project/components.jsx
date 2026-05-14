/* Shared components: Boot, DesktopIcon, Window, Taskbar, StartMenu, AmbientPanel */
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC, useCallback: useCallbackC } = React;

/* ─── Boot screen ────────────────────────────────────── */
function Boot({ onDone }) {
  const lines = [
    "HEVESI OS  v2.6.1    \u00b7    AI MARKETING SYSTEMS LAB",
    "\u00a9 2026  D. HEVESI \u2014 archival creative workstation",
    "",
    "memory test ............................ 65536  ok",
    "studio core ..............................  ready",
    "neural co-processor .....................  online",
    "loading  /sys/workflows.ini ............... done",
    "loading  /sys/prompts.ini   ............... done",
    "loading  /sys/desktop.ini   ............... done",
    "mounting /var/experiments  ........... 271 items",
    "init windowing subsystem  ................. ok",
    "\u2014 ready.",
  ];
  const [visible, setVisible] = useStateC(0);
  const [fading, setFading] = useStateC(false);

  useEffectC(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= lines.length) {
        clearInterval(id);
        setTimeout(() => setFading(true), 450);
        setTimeout(() => onDone && onDone(), 880);
      }
    }, 130);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`boot ${fading ? "fade-out" : ""}`}>
      {lines.map((l, i) => (
        <div key={i} className={`boot-line ${i < visible ? "show" : ""}`}>{l}</div>
      ))}
      {visible >= lines.length && <span className="boot-cursor"/>}
    </div>
  );
}

/* ─── Desktop icon ───────────────────────────────────── */
function DesktopIcon({ appId, label, glyph, selected, onSelect, onOpen }) {
  return (
    <div
      className={`icon ${selected ? "selected" : ""}`}
      onClick={(e) => { e.stopPropagation(); onSelect(appId); }}
      onDoubleClick={(e) => { e.stopPropagation(); onOpen(appId); }}
      role="button"
    >
      <div className="icon-glyph">{glyph}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
}

/* Icon glyphs — small SVGs that hint at the app */
function IconGlyph({ kind }) {
  switch (kind) {
    case "outreach": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="3" y="7" width="22" height="14" />
        <path d="M3 7 L14 15 L25 7" />
        <circle cx="22" cy="20" r="3" fill="var(--accent)" stroke="none"/>
      </svg>
    );
    case "saturation": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M3 22 L9 16 L13 19 L19 11 L25 14" />
        <path d="M3 25 L25 25" />
        <circle cx="19" cy="11" r="2" fill="var(--accent)" stroke="none"/>
      </svg>
    );
    case "social": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="14" cy="14" r="9" />
        <circle cx="14" cy="14" r="5" />
        <circle cx="14" cy="14" r="1.4" fill="currentColor" stroke="none"/>
      </svg>
    );
    case "promptlab": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="5" y="4" width="18" height="20"/>
        <path d="M8 9 L20 9 M8 13 L18 13 M8 17 L16 17 M8 21 L14 21"/>
        <path d="M3 6 L7 6 M3 22 L7 22" stroke="var(--accent)"/>
      </svg>
    );
    case "creative": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="3" y="14" width="4" height="10"/>
        <rect x="9" y="9" width="4" height="15"/>
        <rect x="15" y="4" width="4" height="20" fill="var(--accent)" stroke="var(--accent)"/>
        <rect x="21" y="11" width="4" height="13"/>
      </svg>
    );
    case "workflowos": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="5" cy="14" r="2"/>
        <circle cx="14" cy="6" r="2"/>
        <circle cx="14" cy="22" r="2"/>
        <circle cx="23" cy="14" r="2" fill="var(--accent)" stroke="var(--accent)"/>
        <path d="M7 14 L21 14 M14 8 L14 20 M6.5 12.5 L12.5 7.5 M15.5 7.5 L21.5 12.5 M6.5 15.5 L12.5 20.5 M15.5 20.5 L21.5 15.5"/>
      </svg>
    );
    case "skills": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <polygon points="14,3 24,10 20,22 8,22 4,10"/>
        <polygon points="14,8 20,11 18,19 10,19 8,11" fill="var(--accent)" stroke="var(--accent)" opacity="0.7"/>
      </svg>
    );
    case "readme": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M6 3 L18 3 L22 7 L22 25 L6 25 Z"/>
        <path d="M18 3 L18 7 L22 7"/>
        <path d="M9 12 L19 12 M9 16 L19 16 M9 20 L15 20" />
      </svg>
    );
    case "signals": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M3 18 L7 18 L9 12 L12 22 L15 8 L18 16 L21 14 L25 14" strokeLinejoin="round" strokeLinecap="round"/>
        <circle cx="15" cy="8" r="1.5" fill="var(--accent)" stroke="none"/>
      </svg>
    );
    case "folder": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M3 8 L11 8 L13 6 L25 6 L25 22 L3 22 Z"/>
        <path d="M3 11 L25 11"/>
      </svg>
    );
    case "kinetic": return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="17" cy="5" r="2.2"/>
        <path d="M17 7.2 L15 13 L10 18" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 13 L20 17 L24 15" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 18 L8 24 M11.5 17.5 L14 23" strokeLinecap="round"/>
        <circle cx="14" cy="23" r="1.2" fill="var(--accent)" stroke="none"/>
      </svg>
    );
    default: return null;
  }
}

/* ─── Window ─────────────────────────────────────────── */
function Win({ win, app, active, onActivate, onClose, onMin, onMax, onMove, onResize, children }) {
  const [closing, setClosing] = useStateC(false);
  const [minimizing, setMinimizing] = useStateC(false);
  const dragRef = useRefC(null);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(win.id), 170);
  };
  const handleMin = () => {
    setMinimizing(true);
    setTimeout(() => { setMinimizing(false); onMin(win.id); }, 220);
  };

  const onTitlebarPointerDown = (e) => {
    if (e.target.closest(".tb-btn")) return;
    if (win.maximized) return;
    onActivate(win.id);
    const start = { x: e.clientX, y: e.clientY, wx: win.x, wy: win.y };
    e.preventDefault();
    const move = (me) => {
      const nx = Math.max(-200, Math.min(window.innerWidth - 80, start.wx + (me.clientX - start.x)));
      const ny = Math.max(0, Math.min(window.innerHeight - 80, start.wy + (me.clientY - start.y)));
      onMove(win.id, nx, ny);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const onResizePointerDown = (e) => {
    if (win.maximized) return;
    onActivate(win.id);
    const start = { x: e.clientX, y: e.clientY, w: win.w, h: win.h };
    e.preventDefault();
    e.stopPropagation();
    const move = (me) => {
      const nw = Math.max(320, start.w + (me.clientX - start.x));
      const nh = Math.max(220, start.h + (me.clientY - start.y));
      onResize(win.id, nw, nh);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  if (win.minimized) return null;

  return (
    <div
      ref={dragRef}
      className={`win ${active ? "active" : "inactive"} ${closing ? "closing" : ""} ${minimizing ? "minimizing" : ""} ${win.maximized ? "maximized" : ""}`}
      style={{
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
      }}
      onPointerDown={() => onActivate(win.id)}
    >
      <div className="titlebar" onPointerDown={onTitlebarPointerDown} onDoubleClick={() => onMax(win.id)}>
        <span className="tb-num">[{app.num}]</span>
        <span className="tb-title">{app.title}</span>
        <div className="tb-buttons">
          <button className="tb-btn" onClick={handleMin} title="Minimize">_</button>
          <button className="tb-btn" onClick={() => onMax(win.id)} title="Maximize">{win.maximized ? "❐" : "□"}</button>
          <button className="tb-btn tb-close" onClick={handleClose} title="Close">×</button>
        </div>
      </div>
      <div className="win-content">
        {children}
      </div>
      <div className="win-statusbar">
        <span>READY</span>
        <span className="sb-sep">|</span>
        <span>{app.title}</span>
        <span className="sb-spacer"/>
        <span>{win.w}×{win.h}</span>
        <span className="sb-sep">|</span>
        <span>UTF-8</span>
      </div>
      {!win.maximized && <div className="win-resize" onPointerDown={onResizePointerDown}/>}
    </div>
  );
}

/* ─── Taskbar ────────────────────────────────────────── */
function Taskbar({ windows, activeId, onActivate, onStart, startOpen, time, status }) {
  return (
    <div className="taskbar">
      <button className={`tb-start ${startOpen ? "active" : ""}`} onClick={onStart}>
        <span className="tb-start-mark"/>
        <span>Start</span>
      </button>
      <div className="tb-apps">
        {windows.map(w => (
          <button
            key={w.id}
            className={`tb-app ${activeId === w.id && !w.minimized ? "active" : ""} ${w.minimized ? "minimized" : ""}`}
            onClick={() => onActivate(w.id)}
            title={w.title}
          >
            <span style={{opacity: 0.6}}>[{w.num}]</span>
            <span>{w.title}</span>
          </button>
        ))}
      </div>
      <div className="tb-tray">
        <span className="tt-item"><span className="tt-dot"/>{status.runs} RUNS LIVE</span>
        <span className="tt-item"><span className="tt-dot green"/>NEURAL OK</span>
        <span className="tt-item">{time}</span>
      </div>
    </div>
  );
}

/* ─── Start menu ─────────────────────────────────────── */
function StartMenu({ onOpen, onClose }) {
  const items = [
    { id: "outreach",    label: "Outreach.exe" },
    { id: "saturation",  label: "SaturationScan.exe" },
    { id: "social",      label: "SocialSkills.exe" },
    { id: "promptlab",   label: "PromptLab.exe" },
    { id: "creative",    label: "CreativeTesting.exe" },
    { id: "skills",      label: "Skills.exe" },
    { id: "workflowos",  label: "WorkflowOS.exe" },
    null,
    { id: "experiments", label: "Experiments\\" },
    { id: "research",    label: "Research\\" },
    { id: "systems",     label: "Systems\\" },
    null,
    { id: "readme",      label: "README.txt" },
    { id: "signals",     label: "Signals.exe" },
    { id: "kinetic",     label: "KineticCommute.exe" },
  ];
  return (
    <>
      <div style={{position: "fixed", inset: 0, zIndex: 8400}} onClick={onClose}/>
      <div className="start-menu" onClick={(e) => e.stopPropagation()}>
        <div className="sm-side">HEVESI <em>os</em></div>
        <div style={{flex: 1, display: "flex", flexDirection: "column"}}>
          <div className="sm-list">
            {items.map((it, i) => {
              if (it === null) return <div key={i} className="sm-sep"/>;
              const isFolder = it.label.endsWith("\\");
              return (
                <div
                  key={it.id}
                  className="sm-item"
                  onClick={() => { onOpen(it.id); onClose(); }}
                >
                  <span className="sm-glyph">{isFolder ? "▸" : "▪"}</span>
                  <span>{it.label}</span>
                </div>
              );
            })}
          </div>
          <div className="sm-foot">
            <span>v2.6.1</span>
            <span>david@hevesi.studio</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Ambient (system status) panel ───────────────────── */
function AmbientPanel({ time }) {
  const [tick, setTick] = useStateC(0);
  useEffectC(() => {
    const id = setInterval(() => setTick(t => t + 1), 2200);
    return () => clearInterval(id);
  }, []);
  const sends = 4318 + (tick * 3);
  const cost = (0.038 * sends).toFixed(2);
  const replyRate = (22.6 + Math.sin(tick * 0.3) * 0.4).toFixed(1);

  return (
    <div className="ambient-panel">
      <div className="ap-title">
        <span>SYSTEM STATUS</span>
        <span><span className="live-dot"/>LIVE</span>
      </div>
      <div className="ap-row"><span className="ap-k">UPTIME</span><span className="ap-v ok">163d 04h</span></div>
      <div className="ap-row"><span className="ap-k">RUNS LIVE</span><span className="ap-v live">3</span></div>
      <div className="ap-row"><span className="ap-k">SENDS THIS WEEK</span><span className="ap-v">{sends.toLocaleString()}</span></div>
      <div className="ap-row"><span className="ap-k">REPLY RATE</span><span className="ap-v">{replyRate}%</span></div>
      <div className="ap-row"><span className="ap-k">LLM SPEND ·  $</span><span className="ap-v">${cost}</span></div>
      <div className="ap-row"><span className="ap-k">EXPERIMENTS</span><span className="ap-v">5 of 12</span></div>
      <div className="ap-row"><span className="ap-k">LOCAL</span><span className="ap-v">{time}</span></div>
    </div>
  );
}

Object.assign(window, { Boot, DesktopIcon, IconGlyph, Win, Taskbar, StartMenu, AmbientPanel });
