/* Animated workflow diagrams — exported to window */
const { useState, useEffect, useRef } = React;

/* ─── OutreachWorkflow ────────────────────────────────────
   6-node pipeline: SOURCE → ENRICH → SCORE → PERSONALIZE → DISPATCH → REPLY
   Animated tokens flow along the polyline path.
*/
function OutreachWorkflow() {
  const nodes = [
    { x: 60,  y: 70,  label: "SOURCE",       sub: "scrape.io" },
    { x: 200, y: 70,  label: "ENRICH",       sub: "+ firmographics" },
    { x: 340, y: 70,  label: "SCORE",        sub: "fit · 0–100" },
    { x: 480, y: 70,  label: "PERSONALIZE",  sub: "llm · gpt-4o" },
    { x: 620, y: 70,  label: "DISPATCH",     sub: "smtp · warmed" },
    { x: 760, y: 70,  label: "REPLY",        sub: "intent · classify" },
  ];

  // Branches off "SCORE" — unqualified bucket
  const branchY = 150;

  // Animated tokens — each token has its own staggered start
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      setT(((now - start) / 4200) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 6 tokens phased across the pipeline
  const tokens = [0, 0.16, 0.32, 0.5, 0.66, 0.82].map(phase => {
    const p = (t + phase) % 1;
    const idx = Math.floor(p * (nodes.length - 1));
    const local = (p * (nodes.length - 1)) - idx;
    const a = nodes[idx];
    const b = nodes[idx + 1] || nodes[idx];
    return { x: a.x + (b.x - a.x) * local + 32, y: a.y, opacity: 0.7 + Math.sin(p * Math.PI) * 0.3 };
  });

  return (
    <div className="workflow">
      <div className="wf-cap"><span className="wf-num">FIG.01</span> &nbsp;·&nbsp; OUTREACH PIPELINE — INSTANCE 0xA12</div>
      <svg viewBox="0 0 820 220" className="wf-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arr-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/>
          </marker>
          <marker id="arr-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--ink-mute)"/>
          </marker>
        </defs>

        {/* connecting lines between nodes */}
        {nodes.slice(0, -1).map((n, i) => (
          <line
            key={i}
            x1={n.x + 50} y1={n.y}
            x2={nodes[i+1].x + 14} y2={nodes[i+1].y}
            stroke="var(--ink-mute)"
            strokeWidth="1"
            strokeDasharray="3 3"
            markerEnd="url(#arr-ink)"
          />
        ))}

        {/* branch: SCORE → REJECT bucket */}
        <path
          d={`M ${nodes[2].x + 32} ${nodes[2].y + 14} Q ${nodes[2].x + 32} ${branchY - 10}, ${nodes[2].x + 100} ${branchY}`}
          fill="none"
          stroke="var(--ink-mute)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <g>
          <rect x={nodes[2].x + 100} y={branchY - 12} width="120" height="26" fill="none" stroke="var(--ink-mute)" strokeWidth="1"/>
          <text x={nodes[2].x + 110} y={branchY + 4} fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-mute)" letterSpacing="2">
            ← UNQUALIFIED · 41%
          </text>
        </g>

        {/* feedback loop from REPLY back to PERSONALIZE */}
        <path
          d={`M ${nodes[5].x + 30} ${nodes[5].y - 14} Q ${nodes[5].x + 30} 20, ${nodes[3].x + 30} 20 Q ${nodes[3].x + 30} 20, ${nodes[3].x + 30} ${nodes[3].y - 14}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arr-amber)"
          opacity="0.7"
        />
        <text x={nodes[3].x + 60} y={14} fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent)" letterSpacing="2">
          REPLY FEEDBACK → TONE WEIGHTS
        </text>

        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <rect
              x={n.x} y={n.y - 16}
              width="64" height="32"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <text
              x={n.x + 32} y={n.y - 2}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="9"
              fill="var(--ink)"
              letterSpacing="1.4"
            >{n.label}</text>
            <text
              x={n.x + 32} y={n.y + 10}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="7.5"
              fill="var(--ink-mute)"
              letterSpacing="0.6"
            >{n.sub}</text>
            <text
              x={n.x + 32} y={n.y + 36}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="8"
              fill="var(--accent)"
              letterSpacing="1.8"
            >{`0${i + 1}`}</text>
          </g>
        ))}

        {/* flowing tokens */}
        {tokens.map((tk, i) => (
          <circle key={i} cx={tk.x} cy={tk.y} r="2.6" fill="var(--accent)" opacity={tk.opacity}/>
        ))}

        {/* baseline label */}
        <text x="0" y="200" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-mute)" letterSpacing="2">
          INPUT: 12,400 lodging properties · UK + EU
        </text>
        <text x="820" y="200" textAnchor="end" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-mute)" letterSpacing="2">
          OUTPUT: 4,318 personalized sends · 22.6% reply
        </text>
      </svg>
    </div>
  );
}

/* ─── SaturationWorkflow ─────────────────────────────────
   SC-01 → ... → SC-05 sequential, with a small phosphor sweep.
*/
function SaturationWorkflow() {
  const steps = [
    { id: "SC-01", label: "AUDIT",       desc: "scan 30–50 posts" },
    { id: "SC-02", label: "NAME",        desc: "what everyone says" },
    { id: "SC-03", label: "FLIP",        desc: "contrarian rewrite" },
    { id: "SC-04", label: "GAP",         desc: "find the missing" },
    { id: "SC-05", label: "EXECUTE",     desc: "5 content ideas" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % steps.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="workflow" style={{padding: "26px 18px 18px"}}>
      <div className="wf-cap"><span className="wf-num">FIG.02</span> &nbsp;·&nbsp; SATURATION CHAIN</div>
      <svg viewBox="0 0 500 110" className="wf-svg">
        <defs>
          <marker id="arr-sat" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--ink-mute)"/>
          </marker>
        </defs>
        {steps.map((s, i) => {
          const x = 30 + i * 95;
          const isActive = i === active;
          return (
            <g key={s.id}>
              {i < steps.length - 1 && (
                <line
                  x1={x + 60} y1={40}
                  x2={x + 90} y2={40}
                  stroke={i < active ? "var(--accent)" : "var(--ink-mute)"}
                  strokeWidth="1"
                  markerEnd="url(#arr-sat)"
                  opacity={i < active ? 1 : 0.5}
                />
              )}
              <rect
                x={x} y={20}
                width="60" height="40"
                fill={isActive ? "var(--accent)" : "var(--paper)"}
                stroke={isActive ? "var(--accent)" : "var(--ink)"}
                strokeWidth="1"
                style={{transition: "all 400ms ease"}}
              />
              <text
                x={x + 30} y={36}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fill={isActive ? "var(--ink)" : "var(--accent)"}
                letterSpacing="1.4"
              >{s.id}</text>
              <text
                x={x + 30} y={50}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="8"
                fill={isActive ? "var(--ink)" : "var(--ink)"}
                letterSpacing="1.4"
              >{s.label}</text>
              <text
                x={x + 30} y={78}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="7.5"
                fill="var(--ink-mute)"
                letterSpacing="0.6"
              >{s.desc}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── SkillsRadar ─────────────────────────────────────────
   A small radar/spider chart for AI Marketing Skills Framework.
*/
function SkillsRadar() {
  const axes = [
    "PROMPT DESIGN",
    "WORKFLOW OPS",
    "DATA SCRAPING",
    "ANALYTICS",
    "CREATIVE STRAT",
    "AUTOMATION",
    "VISUAL SYSTEMS",
    "COPY SYSTEMS",
  ];
  // Values 0..1 — these animate in
  const targets = [0.92, 0.88, 0.74, 0.70, 0.84, 0.86, 0.78, 0.82];

  const [vals, setVals] = useState(targets.map(() => 0));
  useEffect(() => {
    const t = setTimeout(() => setVals(targets), 80);
    return () => clearTimeout(t);
  }, []);

  const cx = 160, cy = 160, R = 120;
  const angle = i => (-Math.PI / 2) + (i / axes.length) * Math.PI * 2;
  const pt = (i, r) => [cx + Math.cos(angle(i)) * R * r, cy + Math.sin(angle(i)) * R * r];

  return (
    <div className="workflow" style={{padding: "20px"}}>
      <div className="wf-cap"><span className="wf-num">FIG.03</span> &nbsp;·&nbsp; SKILL SURFACE</div>
      <svg viewBox="0 0 320 320" className="wf-svg" style={{maxHeight: 280}}>
        {/* concentric rings */}
        {[0.25, 0.5, 0.75, 1].map((r, i) => (
          <polygon
            key={i}
            points={axes.map((_, j) => pt(j, r).join(",")).join(" ")}
            fill="none"
            stroke="var(--rule)"
            strokeWidth="0.7"
            strokeDasharray={i === 3 ? "" : "2 3"}
          />
        ))}
        {/* axis spokes */}
        {axes.map((a, i) => {
          const [x, y] = pt(i, 1);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--rule)" strokeWidth="0.6"/>;
        })}
        {/* value polygon */}
        <polygon
          points={vals.map((v, i) => pt(i, v).join(",")).join(" ")}
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeWidth="1.2"
          style={{transition: "all 1200ms cubic-bezier(0.2, 0.7, 0.2, 1)"}}
        />
        {/* points */}
        {vals.map((v, i) => {
          const [x, y] = pt(i, v);
          return <circle key={i} cx={x} cy={y} r="2.2" fill="var(--accent)" style={{transition: "all 1200ms cubic-bezier(0.2, 0.7, 0.2, 1)"}}/>;
        })}
        {/* labels */}
        {axes.map((a, i) => {
          const [x, y] = pt(i, 1.18);
          const anchor = Math.abs(Math.cos(angle(i))) < 0.2 ? "middle" : (Math.cos(angle(i)) < 0 ? "end" : "start");
          return (
            <text
              key={i}
              x={x} y={y}
              textAnchor={anchor}
              fontFamily="var(--font-mono)"
              fontSize="8"
              fill="var(--ink-mute)"
              letterSpacing="1.4"
              dominantBaseline="middle"
            >{a}</text>
          );
        })}
      </svg>
    </div>
  );
}

Object.assign(window, { OutreachWorkflow, SaturationWorkflow, SkillsRadar });
