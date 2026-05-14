/* Main app — wires boot → desktop → windows + tweaks */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

function HevesiOS() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState("");
  const zCounter = useRef(10);
  const winCounter = useRef(0);

  // Tweaks
  const [twValues, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const tw = { values: twValues, setTweak };

  // Apply tweak attributes to body / html
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tw.values.theme);
    document.body.setAttribute("data-cursor", tw.values.cursor);
    document.body.setAttribute("data-scanlines", tw.values.scanlines ? "on" : "off");
    document.body.setAttribute("data-chrome", tw.values.chrome);
    document.body.setAttribute("data-motion", tw.values.motion);
  }, [tw.values]);

  // Clock
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      return `${h}:${m}`;
    };
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  // Open helpers
  const openApp = useCallback((appId, opts = {}) => {
    const app = APPS[appId];
    if (!app) return;
    // If already open, just focus
    setWindows(prev => {
      const existing = prev.find(w => w.appId === appId);
      if (existing) {
        zCounter.current += 1;
        setActiveId(existing.id);
        return prev.map(w => w.id === existing.id ? { ...w, z: zCounter.current, minimized: false } : w);
      }
      winCounter.current += 1;
      zCounter.current += 1;
      const id = `w${winCounter.current}`;
      const w = app.w || 600;
      const h = app.h || 480;
      const margin = 60;
      const maxX = Math.max(margin, window.innerWidth - w - margin);
      const maxY = Math.max(60, window.innerHeight - h - 80);
      const x = opts.x != null ? opts.x : Math.round(margin + Math.random() * Math.max(40, maxX - margin));
      const y = opts.y != null ? opts.y : Math.round(60 + Math.random() * Math.max(20, maxY - 80));
      const newWin = {
        id, appId,
        title: app.title, num: app.num,
        x, y, w, h, z: zCounter.current,
        minimized: false, maximized: false,
      };
      setActiveId(id);
      return [...prev, newWin];
    });
  }, []);

  const closeWin = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minWin = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
    setActiveId(prev => prev === id ? null : prev);
  }, []);

  const maxWin = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));
  }, []);

  const activate = useCallback((id) => {
    setWindows(prev => {
      const w = prev.find(x => x.id === id);
      if (!w) return prev;
      zCounter.current += 1;
      return prev.map(x => x.id === id ? { ...x, z: zCounter.current, minimized: false } : x);
    });
    setActiveId(id);
  }, []);

  const moveWin = useCallback((id, x, y) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  }, []);

  const resizeWin = useCallback((id, w, h) => {
    setWindows(prev => prev.map(win => win.id === id ? { ...win, w, h } : win));
  }, []);

  // Curated initial layout — runs after boot. Pulled out so density tweak can reuse.
  const applyLayout = useCallback((density) => {
    const W = window.innerWidth;
    const H = window.innerHeight - 40; // taskbar
    if (density === "minimal") return;

    const place = (id, x, y) => {
      const app = APPS[id];
      const aw = app.w, ah = app.h;
      const cx = Math.max(150, Math.min(Math.max(W - aw - 20, 150), x));
      const cy = Math.max(20,  Math.min(Math.max(H - ah - 40, 20),  y));
      openApp(id, { x: cx, y: cy });
    };

    // CURATED — one primary project + one small utility overlapping.
    // Outreach is the main hero, README sits as a small calling card.
    place("outreach",   Math.max(380, Math.floor((W - 780) / 2) + 80), 80);
    setTimeout(() => place("readme",     56, 80), 140);

    if (density === "loaded") {
      // Loaded — add saturation + creative tester + signals
      setTimeout(() => place("saturation", 100, Math.max(380, H - 580)), 280);
      setTimeout(() => place("signals",    Math.max(560, W - 720), Math.max(380, H - 580)), 420);
    }
  }, [openApp]);

  useEffect(() => {
    if (!booted) return;
    console.log("[hevesi] boot done — applying layout, density=", tw.values.density);
    const t = setTimeout(() => applyLayout(tw.values.density), 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  // Click empty desktop deselects
  const onDesktopClick = () => {
    setSelectedIcon(null);
    setStartOpen(false);
  };

  const desktopIcons = [
    { id: "outreach",    label: "Outreach.exe",          glyph: "outreach" },
    { id: "saturation",  label: "Saturation.exe",        glyph: "saturation" },
    { id: "social",      label: "SocialSkills.exe",      glyph: "social" },
    { id: "promptlab",   label: "PromptLab.exe",         glyph: "promptlab" },
    { id: "creative",    label: "CreativeTest.exe",      glyph: "creative" },
    { id: "workflowos",  label: "WorkflowOS.exe",        glyph: "workflowos" },
    { id: "skills",      label: "Skills.exe",            glyph: "skills" },
    { id: "readme",      label: "README.txt",            glyph: "readme" },
    { id: "experiments", label: "Experiments",           glyph: "folder" },
    { id: "research",    label: "Research",              glyph: "folder" },
    { id: "systems",     label: "Systems",               glyph: "folder" },
    { id: "signals",    label: "Signals.exe",            glyph: "signals" },
    { id: "kinetic",    label: "KineticCommute.exe",     glyph: "kinetic" },
  ];

  // For taskbar
  const taskbarWindows = useMemo(() => windows.map(w => ({
    id: w.id,
    title: APPS[w.appId].title,
    num: APPS[w.appId].num,
    minimized: w.minimized,
  })), [windows]);

  // Status counts
  const status = {
    runs: 3,
  };

  return (
    <>
      {!booted && <Boot onDone={() => setBooted(true)} />}

      <div className="desktop" onClick={onDesktopClick}>
        <div className="desktop-icons">
          {desktopIcons.map(ic => (
            <DesktopIcon
              key={ic.id}
              appId={ic.id}
              label={ic.label}
              glyph={<IconGlyph kind={ic.glyph} />}
              selected={selectedIcon === ic.id}
              onSelect={setSelectedIcon}
              onOpen={openApp}
            />
          ))}
        </div>

        <AmbientPanel time={time} />

        {/* Windows */}
        {windows.map(w => {
          const app = APPS[w.appId];
          return (
            <Win
              key={w.id}
              win={w}
              app={app}
              active={activeId === w.id}
              onActivate={activate}
              onClose={closeWin}
              onMin={minWin}
              onMax={maxWin}
              onMove={moveWin}
              onResize={resizeWin}
            >
              {app.render({ onOpen: openApp })}
            </Win>
          );
        })}
      </div>

      <Taskbar
        windows={taskbarWindows}
        activeId={activeId}
        onActivate={activate}
        onStart={() => setStartOpen(o => !o)}
        startOpen={startOpen}
        time={time}
        status={status}
      />
      {startOpen && (
        <StartMenu
          onOpen={openApp}
          onClose={() => setStartOpen(false)}
        />
      )}

      {/* Tweaks panel */}
      <TweaksPanel title="Hevesi OS · Tweaks" noDeckControls>
        <TweakSection label="System">
          <TweakRadio
            label="Theme"
            value={tw.values.theme}
            options={[
              { value: "midnight", label: "Midnight" },
              { value: "cream",    label: "Cream" },
              { value: "bone",     label: "Bone" },
            ]}
            onChange={v => tw.setTweak("theme", v)}
          />
          <TweakRadio
            label="Density"
            value={tw.values.density}
            options={[
              { value: "minimal",  label: "Minimal" },
              { value: "curated",  label: "Curated" },
              { value: "loaded",   label: "Loaded" },
            ]}
            onChange={v => {
              tw.setTweak("density", v);
              setWindows([]);
              setTimeout(() => applyLayout(v), 80);
            }}
          />
        </TweakSection>

        <TweakSection label="Chrome">
          <TweakSelect
            label="Window style"
            value={tw.values.chrome}
            options={[
              { value: "editorial", label: "Editorial · classic" },
              { value: "3d",        label: "3D · Win95" },
              { value: "hairline",  label: "Hairline · minimal" },
              { value: "stacked",   label: "Stacked · drop-shadow" },
            ]}
            onChange={v => tw.setTweak("chrome", v)}
          />
          <TweakRadio
            label="Cursor"
            value={tw.values.cursor}
            options={[
              { value: "retro",  label: "Retro" },
              { value: "modern", label: "Modern" },
            ]}
            onChange={v => tw.setTweak("cursor", v)}
          />
        </TweakSection>

        <TweakSection label="Atmosphere">
          <TweakToggle
            label="CRT scanlines"
            value={tw.values.scanlines}
            onChange={v => tw.setTweak("scanlines", v)}
          />
          <TweakRadio
            label="Motion"
            value={tw.values.motion}
            options={[
              { value: "full",    label: "Full" },
              { value: "reduced", label: "Reduced" },
            ]}
            onChange={v => tw.setTweak("motion", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<HevesiOS />);
