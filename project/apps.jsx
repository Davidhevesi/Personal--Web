/* App window content — each app exports a render fn returning JSX */
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

/* ─── SatBar — small bar used in Saturation results ─────── */
function SatBar({ label, pct, sev }) {
  const [w, setW] = useStateA(0);
  useEffectA(() => { const t = setTimeout(() => setW(pct), 100); return () => clearTimeout(t); }, [pct]);
  return (
    <div className="sat-row" data-sev={sev}>
      <div className="sat-label">{label}</div>
      <div className="sat-bar"><i style={{width: w + "%"}}/></div>
      <div className="sat-val">{pct}%</div>
    </div>
  );
}

/* ─── README / About ────────────────────────────────────── */
function ReadmeApp() {
  return (
    <div className="app-content" style={{padding: "32px 34px 36px"}}>
      <div className="app-eyebrow">README · v2.6.1 · LAST MODIFIED 13 MAY 2026</div>

      <div style={{display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 18}}>
        <div className="about-portrait">DH</div>
        <div style={{flex: 1, paddingTop: 4}}>
          <h2 style={{fontSize: 30, marginBottom: 6}}>David Hevesi</h2>
          <div className="t-label" style={{fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--ink-mute)", textTransform: "uppercase"}}>
            CREATIVE TECHNOLOGIST · MARKETING SYSTEMS · LONDON / REMOTE
          </div>
        </div>
      </div>

      <p className="lede" style={{fontSize: 17}}>
        I build AI-assisted workflows, creative automation, and scalable content
        operations — blending visual storytelling, prompt systems, workflow design
        and marketing strategy to prototype new ways creative teams research,
        produce, test and personalize campaigns faster.
      </p>

      <div className="section-title">
        <span className="st-l">— CURRENT FOCUS</span>
        <span className="st-r">2026 · Q2</span>
      </div>
      <ul className="checklist">
        <li data-i="01">Designing prompt systems for content saturation analysis and angle generation.</li>
        <li data-i="02">Prototyping AI outreach pipelines for hospitality and boutique brands.</li>
        <li data-i="03">Building skills frameworks that map AI capability onto marketing operations.</li>
        <li data-i="04">Investigating how creative teams test, version and personalize visual campaigns at scale.</li>
      </ul>

      <div className="section-title">
        <span className="st-l">— CONTACT</span>
        <span className="st-r">RESPONSE &lt; 24H</span>
      </div>
      <ul className="link-list">
        <li><span className="ll-k">EMAIL</span><a href="mailto:david@hevesi.studio" className="ll-v">david@hevesi.studio →</a></li>
        <li><span className="ll-k">LINKEDIN</span><a href="#" className="ll-v">/in/davidhevesi →</a></li>
        <li><span className="ll-k">CALENDAR</span><a href="#" className="ll-v">cal.com/hevesi →</a></li>
        <li><span className="ll-k">CV</span><a href="#" className="ll-v">hevesi-cv.pdf →</a></li>
      </ul>

      <p className="mono" style={{marginTop: 18, fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.16em", textTransform: "uppercase"}}>
        // double-click any desktop icon to open a project · drag windows freely
      </p>
    </div>
  );
}

/* ─── Outreach (HERO) ──────────────────────────────────── */
function OutreachApp() {
  return (
    <div className="app-content">
      <div className="app-eyebrow">CASE.001 · HOSPITALITY · 2025–26 · LIVE</div>
      <h2>AI-Assisted Hospitality Outreach System</h2>
      <p className="lede">
        A six-stage personalization pipeline that scrapes boutique lodging
        properties, scores fit, drafts a property-specific opener, dispatches
        through warmed inboxes, and routes replies back into the model's tone
        weights. We rebuilt the outbound function as a closed-loop system,
        not a list.
      </p>

      <div className="tags">
        <span className="tag accent"><span className="tag-dot"/>LIVE DEPLOYMENT</span>
        <span className="tag">PYTHON · GPT-4o · CLAUDE</span>
        <span className="tag">APIFY · INSTANTLY</span>
        <span className="tag">REPLY FEEDBACK LOOP</span>
      </div>

      <div className="stat-row">
        <div>
          <div className="stat-k">PROPERTIES SCANNED</div>
          <div className="stat-v">12,400</div>
        </div>
        <div>
          <div className="stat-k">QUALIFIED &amp; SENT</div>
          <div className="stat-v">4,318</div>
        </div>
        <div>
          <div className="stat-k">POSITIVE REPLY</div>
          <div className="stat-v">22.6<small>%</small></div>
        </div>
      </div>

      <h3>The architecture</h3>
      <p>
        Public-source data flows in from APIs and scrapers; we firmographically
        enrich each property, score it on a 0–100 fit model, then hand qualified
        records to an LLM step that drafts a single opener referencing one
        verifiable detail. Dispatch happens through warmed inboxes with realistic
        cadence. Crucially, replies are classified and the tone weights of
        winning drafts are routed back into the prompt — the system gets
        sharper as it runs.
      </p>

      <OutreachWorkflow />

      <div className="section-title">
        <span className="st-l">— RESULT</span>
        <span className="st-r">8 MONTHS · CONTINUOUS</span>
      </div>

      <div className="pullquote">
        "We went from one cold-outreach campaign every six weeks to a system
        that ships seven personalized variants a day — and the variants get
        sharper, not flatter, the longer it runs."
        <cite>— Internal review, March 2026</cite>
      </div>

      <h3>What I designed</h3>
      <ul className="checklist">
        <li data-i="01">The full prompt chain — sourcing brief, scoring rubric, drafting prompt, classifier, feedback writer.</li>
        <li data-i="02">A reply taxonomy with five intent classes routed to four destinations (book a call, nurture, dead, blacklist, escalate).</li>
        <li data-i="03">A weekly "tone audit" loop where five winning drafts are read back into the model as positive examples.</li>
        <li data-i="04">Operator console: every send is one keystroke from a human-reviewable record. No black boxes.</li>
        <li data-i="05">Cost ceiling: full pipeline runs at $0.038 per qualified send including LLM, scraping, and infra.</li>
      </ul>

      <div className="section-title">
        <span className="st-l">— STACK</span>
        <span className="st-r">SHIPPED · DOCUMENTED</span>
      </div>
      <p className="mono">
        python · fastapi · postgres · apify · openai gpt-4o · anthropic claude
        sonnet · instantly · slack · linear · notion. infra on render +
        cloudflare. operator dashboard in next.js.
      </p>

      <div style={{display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap"}}>
        <button className="btn-action primary">OPEN FULL CASE STUDY</button>
        <button className="btn-action">VIEW PROMPT CHAIN</button>
        <button className="btn-action">DOWNLOAD PDF</button>
      </div>
    </div>
  );
}

/* ─── SaturationScan ───────────────────────────────────── */
function SaturationApp() {
  return (
    <div className="app-content">
      <div className="app-eyebrow">CASE.002 · INTERNAL TOOLING · LIVE</div>
      <h2>Content Saturation Analysis</h2>
      <p className="lede">
        Five chained prompts that scan a niche, name what everybody is already
        saying, flip those angles into expert contrarian takes, find the gaps
        no one is occupying — and only then translate the survivors into shoot-able
        content briefs.
      </p>

      <div className="tags">
        <span className="tag accent"><span className="tag-dot"/>INTERNAL · DAILY USE</span>
        <span className="tag">PROMPT CHAIN</span>
        <span className="tag">APIFY MCP</span>
        <span className="tag">MANUS · CHATGPT</span>
      </div>

      <SaturationWorkflow />

      <div className="section-title">
        <span className="st-l">— SAMPLE OUTPUT</span>
        <span className="st-r">NICHE: BOUTIQUE HOTELS · IG</span>
      </div>

      <h3 style={{fontSize: 16, marginTop: 14}}>Top angles by saturation</h3>
      <div style={{marginTop: 10}}>
        <SatBar label="ROOM TOUR REELS" pct={92} sev="critical" />
        <SatBar label="BREAKFAST AESTHETIC" pct={84} sev="critical" />
        <SatBar label="FOUNDER STORY" pct={71} sev="high" />
        <SatBar label="GUEST UGC RESHARE" pct={58} sev="high" />
        <SatBar label="OPERATIONS POV" pct={22} sev="ok" />
        <SatBar label="SOURCING / SUPPLIER" pct={11} sev="ok" />
      </div>

      <h3 style={{marginTop: 22}}>Recommended angles (SC-04 output)</h3>
      <ul className="checklist">
        <li data-i="01">Maintenance routines as identity — what gets fixed at 6am tells you what the brand actually values.</li>
        <li data-i="02">The economics of a small property — honest revenue mix, occupancy reality, what a great month looks like.</li>
        <li data-i="03">Sourcing portraits — the linen mill, the bread baker, the gardener. Geographic specificity over generic "local".</li>
      </ul>

      <p className="mono" style={{marginTop: 18}}>
        // edge is not volume. edge is naming patterns clearly.
      </p>
    </div>
  );
}

/* ─── Social Skills ────────────────────────────────────── */
function SocialApp() {
  return (
    <div className="app-content">
      <div className="app-eyebrow">CASE.003 · FRAMEWORK · 2025</div>
      <h2>Social Media Skills System</h2>
      <p className="lede">
        A modular skills map that takes the soft term "good at social" and
        breaks it into nine measurable capabilities — research, scripting,
        editing, posting cadence, comment ops, audience listening, analytics,
        experimentation, and platform-specific craft.
      </p>

      <div className="tags">
        <span className="tag">DELIVERABLE: NOTION</span>
        <span className="tag">USED BY: 4 STUDIOS</span>
        <span className="tag gold">9 CAPABILITIES</span>
        <span className="tag">5 LEVELS EACH</span>
      </div>

      <h3>How it works</h3>
      <p>
        Each capability has five levels — from "can describe it" to "can run
        it as a system with measurable feedback loops". Teams self-assess on
        every axis, then run quarterly reviews against the same grid.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        margin: "18px 0",
        border: "1px solid var(--rule)",
      }}>
        {[
          ["RESEARCH", "trend, niche, competitor"],
          ["SCRIPTING", "hooks, beats, payoff"],
          ["EDITING", "rhythm, captions, sound"],
          ["CADENCE", "post · respond · iterate"],
          ["COMMENT OPS", "first hour signal"],
          ["LISTENING", "DMs, replies, sentiment"],
          ["ANALYTICS", "watch time, save rate"],
          ["EXPERIMENTS", "A/B, formats, hooks"],
          ["PLATFORM CRAFT", "native ≠ portable"],
        ].map(([k, v], i) => (
          <div key={i} style={{padding: "14px 12px", borderRight: i % 3 < 2 ? "1px solid var(--rule)" : "none", borderBottom: i < 6 ? "1px solid var(--rule)" : "none"}}>
            <div style={{fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--accent)", marginBottom: 4}}>0{i+1} · {k}</div>
            <div style={{fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4}}>{v}</div>
          </div>
        ))}
      </div>

      <p>
        The grid replaces vague hiring conversations ("are they good at TikTok?")
        with structured ones ("they're a 4 in scripting, 2 in experiments —
        we need to pair them with someone strong on level-3 analytics").
      </p>
    </div>
  );
}

/* ─── Prompt Lab ───────────────────────────────────────── */
function PromptLabApp() {
  return (
    <div className="app-content">
      <div className="app-eyebrow">LAB · PROMPT CHAINS · v1.4</div>
      <h2>Prompt Lab</h2>
      <p className="lede">
        A working library of prompts I've designed, deployed, and revised.
        Every one is named, versioned, and paired with the system it runs in.
      </p>

      <div className="prompt-card">
        <div className="pc-head">
          <span className="pc-id">SC-01 · v3</span>
          <span className="pc-title">Angle Saturation Audit</span>
        </div>
        <div className="pc-body">{`you are auditing social media content in a specific niche.

inputs:
- niche
- platform (instagram, tiktok, youtube)

tasks:
- gather 30 to 50 recent pieces of content
- extract: core message · hook · perspective
- cluster by: angle · emotional frame · viewpoint
- identify: top 5 most repeated · saturated · still credible

output:
- saturated angles list
- moderately used angles
- rare or underused angles
- clear explanation of why`}</div>
      </div>

      <div className="prompt-card">
        <div className="pc-head">
          <span className="pc-id">OUT-04 · v7</span>
          <span className="pc-title">Property Opener Drafter</span>
        </div>
        <div className="pc-body">{`you are writing a single 4-sentence opener to a boutique hotel owner.

inputs:
- property dossier (name, location, founding story, hero image)
- one verifiable detail (must be cited in the email)

constraints:
- no superlatives
- no claim of having "stayed there"
- no generic flattery
- one concrete observation, one offer, one ask

output:
- subject line (≤ 6 words)
- body (≤ 90 words)
- a follow-up if no reply in 5 days`}</div>
      </div>

      <div className="prompt-card">
        <div className="pc-head">
          <span className="pc-id">EXP-02 · v2</span>
          <span className="pc-title">Creative Test Plan Generator</span>
        </div>
        <div className="pc-body">{`you generate a 2-week creative test plan for a single hypothesis.

inputs:
- hypothesis (one sentence)
- channel
- budget ceiling

output:
- 5 variant briefs
- success metric and decision rule (kill / scale / iterate)
- production checklist`}</div>
      </div>

      <p className="mono" style={{marginTop: 18}}>
        // full library: 34 prompts across 6 systems. open a prompt to see
        // the test fixtures, eval scores and known failure modes.
      </p>
    </div>
  );
}

/* ─── Creative Testing ─────────────────────────────────── */
function CreativeTestingApp() {
  // small live "experiment monitor"
  const [tick, setTick] = useStateA(0);
  useEffectA(() => {
    const id = setInterval(() => setTick(t => t + 1), 1800);
    return () => clearInterval(id);
  }, []);
  const variants = [
    { id: "V1", name: "Maintenance POV", ctr: 4.1, save: 0.084, hyp: "ops realism beats lifestyle" },
    { id: "V2", name: "Founder voice — quiet", ctr: 3.4, save: 0.071, hyp: "low-energy lasts longer" },
    { id: "V3", name: "Sourcing portrait", ctr: 5.8, save: 0.112, hyp: "specificity over polish" },
    { id: "V4", name: "Hotel-as-object", ctr: 2.9, save: 0.052, hyp: "frame the building as artifact" },
    { id: "V5", name: "Front-desk Q&A", ctr: 3.7, save: 0.063, hyp: "lateral, not direct, answers" },
  ];
  // tiny noise so it feels live
  const noise = i => (Math.sin((tick + i) * 0.7) * 0.06).toFixed(3);

  return (
    <div className="app-content">
      <div className="app-eyebrow">CASE.004 · EXPERIMENT · RUN_0271</div>
      <h2>AI Creative Experimentation Workflow</h2>
      <p className="lede">
        Five hypotheses, five variants, two weeks, one decision rule. Every
        creative test ships with an explicit kill/scale gate up front — so
        we never argue about "is it working" after the fact.
      </p>

      <div className="tags">
        <span className="tag accent"><span className="tag-dot"/>EXPERIMENT LIVE · DAY 9/14</span>
        <span className="tag">5 VARIANTS</span>
        <span className="tag">PRE-COMMITTED RULES</span>
        <span className="tag gold">META · TIKTOK</span>
      </div>

      <h3 style={{marginTop: 18}}>Variant monitor</h3>
      <div style={{
        border: "1px solid var(--rule)",
        marginTop: 10,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "44px 1fr 80px 80px 80px",
          gap: 0,
          padding: "8px 14px",
          borderBottom: "1px solid var(--rule)",
          background: "var(--bg)",
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.2em",
          color: "var(--ink-mute)",
          textTransform: "uppercase",
        }}>
          <span>ID</span><span>HYPOTHESIS</span><span style={{textAlign: "right"}}>CTR%</span><span style={{textAlign: "right"}}>SAVE</span><span style={{textAlign: "right"}}>VERDICT</span>
        </div>
        {variants.map((v, i) => {
          const adj = parseFloat(noise(i));
          const ctr = (v.ctr + adj).toFixed(2);
          const verdict = v.ctr >= 4.5 ? "SCALE" : (v.ctr < 3.0 ? "KILL" : "HOLD");
          return (
            <div key={v.id} style={{
              display: "grid",
              gridTemplateColumns: "44px 1fr 80px 80px 80px",
              padding: "10px 14px",
              borderBottom: i < variants.length - 1 ? "1px dashed var(--rule)" : "none",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              alignItems: "baseline",
            }}>
              <span style={{color: "var(--accent)", letterSpacing: "0.1em"}}>{v.id}</span>
              <span style={{color: "var(--ink)"}}>
                <em style={{fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, marginRight: 6}}>{v.name}</em>
                <span style={{color: "var(--ink-mute)", fontSize: 10}}>— {v.hyp}</span>
              </span>
              <span style={{textAlign: "right", color: "var(--ink)"}}>{ctr}</span>
              <span style={{textAlign: "right", color: "var(--ink-mute)"}}>{v.save.toFixed(3)}</span>
              <span style={{
                textAlign: "right",
                color: verdict === "SCALE" ? "var(--accent)" : verdict === "KILL" ? "var(--ink-mute)" : "var(--gold)",
                letterSpacing: "0.18em",
              }}>{verdict}</span>
            </div>
          );
        })}
      </div>

      <div className="pullquote">
        "Kill criteria up front is the only honest way to run creative tests.
        Otherwise you're just collecting screenshots of things you already
        wanted to believe."
      </div>

      <h3>Decision rule (set on day 0)</h3>
      <ul className="checklist">
        <li data-i="01">Scale if CTR &gt; 4.5% and save rate &gt; 0.09 by day 10.</li>
        <li data-i="02">Kill if CTR &lt; 3.0% by day 7 or save rate &lt; 0.04 ever.</li>
        <li data-i="03">Iterate (one element only) if either metric is within ±0.4 of threshold.</li>
        <li data-i="04">No qualitative override without a written hypothesis for the next run.</li>
      </ul>
    </div>
  );
}

/* ─── Skills Framework ─────────────────────────────────── */
function SkillsApp() {
  return (
    <div className="app-content">
      <div className="app-eyebrow">FRAMEWORK · INTERNAL · v2.1</div>
      <h2>AI Marketing Skills Framework</h2>
      <p className="lede">
        A map of where AI capability actually lives inside a marketing function
        — eight axes, scored honestly, used as a hiring and capability-planning
        instrument.
      </p>

      <div className="cols-2">
        <SkillsRadar />
        <div>
          <h3 style={{marginTop: 0}}>What it answers</h3>
          <ul className="checklist">
            <li data-i="01">Where on the AI spectrum is this team strongest, and where is it pretending?</li>
            <li data-i="02">Which axes compound and which are commodity?</li>
            <li data-i="03">If we hired one person tomorrow, which axis moves the team most?</li>
          </ul>

          <h3>Used for</h3>
          <ul className="checklist">
            <li data-i="01">Quarterly team audits.</li>
            <li data-i="02">Role design and JD authoring.</li>
            <li data-i="03">Project triage — which projects this team is staffed to actually finish.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Workflow OS ──────────────────────────────────────── */
function WorkflowOSApp() {
  return (
    <div className="app-content">
      <div className="app-eyebrow">META · OPERATING NOTES</div>
      <h2>How I build things</h2>
      <p className="lede">
        Most marketing AI work fails because people treat prompts as recipes
        and ignore the system around them. The prompt is 10%. The other 90%
        is the inputs, the operator, the eval loop, and the kill switch.
      </p>

      <div className="section-title">
        <span className="st-l">— PRINCIPLES</span>
        <span className="st-r">06 OF 12 SHOWN</span>
      </div>
      <ul className="checklist">
        <li data-i="01">Every system has an operator. Design for them first.</li>
        <li data-i="02">Kill criteria go in before launch, not after the screenshots.</li>
        <li data-i="03">One concrete observation beats four generic flattery lines.</li>
        <li data-i="04">If you can't name what everyone else is saying, you can't say something different.</li>
        <li data-i="05">Feedback loops are not optional. A system that doesn't get sharper is a script.</li>
        <li data-i="06">Cost ceiling per useful output, set on day one, in dollars not credits.</li>
      </ul>

      <div className="pullquote">
        "I'm interested in the systems around the prompt. The prompt is the
        easy part."
      </div>

      <h3>Working with me</h3>
      <p>
        I scope tightly, ship operating systems not artifacts, and document
        everything for handoff. If you're a marketing leader trying to figure
        out what AI actually changes in your function — start with one of the
        case studies, then book a call.
      </p>

      <div style={{display: "flex", gap: 10, marginTop: 18}}>
        <button className="btn-action primary">BOOK INTRO CALL</button>
        <button className="btn-action">SEND BRIEF</button>
      </div>
    </div>
  );
}

/* ─── Folder windows ───────────────────────────────────── */
function FolderApp({ folderId }) {
  const data = {
    experiments: {
      title: "EXPERIMENTS",
      sub: "Active and archived creative experiments",
      items: [
        ["RUN_0271", "Boutique hotel · 5 variants", "DAY 9/14", "RUNNING"],
        ["RUN_0260", "Hospitality outreach · openers", "WON", "ARCHIVE"],
        ["RUN_0258", "Founder voice — quiet vs loud", "LOST", "ARCHIVE"],
        ["RUN_0254", "Sourcing portrait format", "SCALED", "PRODUCTION"],
        ["RUN_0241", "Maintenance POV reels", "WON", "ARCHIVE"],
        ["RUN_0233", "Hotel-as-object framing", "LOST", "ARCHIVE"],
        ["RUN_0227", "Front-desk Q&A column", "ITERATING", "DRAFT"],
        ["RUN_0219", "Sub-30s reel vs 60s", "WON", "ARCHIVE"],
      ],
      cols: ["ID", "EXPERIMENT", "VERDICT", "STATE"],
    },
    research: {
      title: "RESEARCH",
      sub: "Field notes, audits, and reading",
      items: [
        ["NOTE_018", "Why creators repeat each other", "12KB", "FIELDNOTE"],
        ["AUDIT_004", "Boutique hospitality IG · Q1 2026", "84KB", "AUDIT"],
        ["NOTE_017", "Manus connector setup — gotchas", "6KB", "FIELDNOTE"],
        ["NOTE_016", "Apify cost-per-scrape ladder", "9KB", "FIELDNOTE"],
        ["READING", "March 2026 · 14 papers", "—", "INDEX"],
        ["NOTE_015", "Reply intent taxonomy (v3)", "11KB", "FIELDNOTE"],
        ["AUDIT_003", "Sourcing content gaps · UK lodgings", "62KB", "AUDIT"],
      ],
      cols: ["ID", "TITLE", "SIZE", "TYPE"],
    },
    systems: {
      title: "SYSTEMS",
      sub: "Shipped and documented systems",
      items: [
        ["SYS_006", "AI Outreach Pipeline · hospitality", "LIVE", "DEPLOYED"],
        ["SYS_005", "Saturation Analysis (5-prompt)", "LIVE", "DEPLOYED"],
        ["SYS_004", "Creative Test Harness", "LIVE", "DEPLOYED"],
        ["SYS_003", "Reply Intent Classifier", "LIVE", "DEPLOYED"],
        ["SYS_002", "Skills Framework (v2.1)", "DOC", "INTERNAL"],
        ["SYS_001", "Operator Console · base kit", "DOC", "INTERNAL"],
      ],
      cols: ["ID", "SYSTEM", "STATUS", "VISIBILITY"],
    },
  }[folderId];

  if (!data) return <div className="app-content">Folder not found.</div>;

  return (
    <div className="app-content" style={{padding: 0}}>
      <div style={{padding: "20px 22px 8px"}}>
        <div className="app-eyebrow">DIR · {data.title}</div>
        <h2 style={{fontSize: 28, marginBottom: 4}}>{data.title.toLowerCase()}/</h2>
        <p style={{fontSize: 13, color: "var(--ink-mute)", marginBottom: 6}}>{data.sub} · {data.items.length} items</p>
      </div>
      <ul className="folder-list">
        <li className="fl-head">
          <span></span>
          {data.cols.map((c, i) => i === 0 ? <span key={i}>{c}</span> : <span key={i} className={i === 2 ? "fl-size" : "fl-type"}>{c}</span>)}
        </li>
        {data.items.map((row, i) => (
          <li key={i}>
            <span className="fl-icon">{row[0].slice(0, 2)}</span>
            <span className="fl-name">{row[0]}<span style={{color: "var(--ink-mute)", marginLeft: 12, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14}}>{row[1]}</span></span>
            <span className="fl-size">{row[2]}</span>
            <span className="fl-type">{row[3]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Signals dashboard ────────────────────────────────
   Replaces the terminal — a calm observatory of live runs,
   recent events, and ambient anomalies. Reads as instruments,
   not commands.
*/
function Sparkline({ values, accent }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const W = 140, H = 24;
  const stepX = W / (values.length - 1);
  const pts = values.map((v, i) => {
    const y = max === min ? H/2 : H - 2 - ((v - min) / (max - min)) * (H - 4);
    return `${(i * stepX).toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="sig-spark">
      <polyline
        points={pts}
        fill="none"
        stroke={accent ? "var(--accent)" : "var(--ink-soft)"}
        strokeWidth="1"
        opacity={accent ? 0.85 : 0.55}
      />
    </svg>
  );
}

function SignalsApp() {
  const [tick, setTick] = useStateA(0);
  useEffectA(() => {
    const id = setInterval(() => setTick(t => t + 1), 2400);
    return () => clearInterval(id);
  }, []);

  // Stable signal definitions; values evolve subtly
  const signals = [
    { name: "OUT-04",     desc: "Hospitality outreach \u2014 personalized opener queue",  state: "ok",
      base: [42, 44, 41, 46, 48, 50, 47, 51, 53, 52, 55, 54], unit: "/h", val: 54 },
    { name: "SC-01",      desc: "Saturation audit \u2014 IG boutique hotels, weekly",     state: "ok",
      base: [12, 14, 13, 15, 17, 16, 18, 17, 19, 18, 20, 19], unit: "runs", val: 19 },
    { name: "RUN-0271",   desc: "Creative test \u2014 5 variants, kill rule armed",       state: "watch",
      base: [3.1, 3.4, 3.0, 3.6, 4.0, 4.1, 4.3, 4.5, 4.6, 4.4, 4.7, 4.8], unit: "ctr%", val: 4.8 },
    { name: "REPLY-CLS",  desc: "Reply intent classifier \u2014 nightly retrain",         state: "ok",
      base: [0.91, 0.92, 0.90, 0.93, 0.94, 0.93, 0.94, 0.95, 0.94, 0.95, 0.95, 0.96], unit: "f1", val: 0.96 },
    { name: "TONE-FB",    desc: "Tone-feedback loop \u2014 winning drafts \u2192 weights", state: "alert",
      base: [0.6, 0.5, 0.7, 0.8, 0.9, 0.85, 0.92, 0.88, 0.91, 0.95, 0.93, 0.97], unit: "drift", val: 0.97 },
  ];

  const t = tick * 0.1;
  const ts = (offset) => {
    const m = (tick + offset) % 60;
    const h = (20 + Math.floor((tick + offset) / 60)) % 24;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  return (
    <div className="app-content">
      <div className="app-eyebrow">SIGNALS · LIVE · {ts(0)}</div>
      <h2 style={{marginBottom: 12}}>Active signals</h2>
      <p className="lede" style={{marginBottom: 14}}>
        A calm view of what is running, what is drifting, and what
        deserves attention this hour.
      </p>

      <div className="signals-grid">
        {signals.map((s, i) => {
          // Slight live wiggle on the last value
          const drift = Math.sin((tick + i) * 0.4) * 0.04;
          const values = s.base.map((v, idx) => v + (idx === s.base.length - 1 ? v * drift : 0));
          return (
            <div key={s.name} className="signal-row" data-state={s.state}>
              <div className="sig-name">{s.name}</div>
              <div className="sig-desc">{s.desc}</div>
              <Sparkline values={values} accent={s.state === "alert"} />
              <div className="sig-val">
                {typeof s.val === "number" && s.val < 10 ? s.val.toFixed(2) : s.val}
                <small>{s.unit}</small>
              </div>
            </div>
          );
        })}
      </div>

      <div className="section-title">
        <span className="st-l">— RECENT EVENTS</span>
        <span className="st-r">LAST 30 MIN</span>
      </div>

      <ul className="events-log">
        <li>
          <span className="ev-ts">{ts(-2)}</span>
          <span className="ev-src">OUT-04</span>
          <span className="ev-msg">Dispatched <em>54</em> personalized openers \u2014 cohort: UK boutique lodgings.</span>
        </li>
        <li>
          <span className="ev-ts">{ts(-5)}</span>
          <span className="ev-src">TONE-FB</span>
          <span className="ev-msg">Drift threshold reached. <em>5 winning drafts</em> queued for tone audit.</span>
        </li>
        <li>
          <span className="ev-ts">{ts(-11)}</span>
          <span className="ev-src">RUN-0271</span>
          <span className="ev-msg">Variant 03 (<em>Sourcing portrait</em>) crossed the scale threshold.</span>
        </li>
        <li>
          <span className="ev-ts">{ts(-17)}</span>
          <span className="ev-src">SC-01</span>
          <span className="ev-msg">Audit run complete for <em>@boutique-hotels-ig</em>. 47 posts clustered into 6 angles.</span>
        </li>
        <li>
          <span className="ev-ts">{ts(-24)}</span>
          <span className="ev-src">REPLY-CLS</span>
          <span className="ev-msg">Retrained on <em>2,184</em> labelled replies. F1 lifted by 0.012.</span>
        </li>
      </ul>

      <p className="mono" style={{marginTop: 18, fontSize: 11, color: "var(--ink-mute)"}}>
        // signals never page you. they sit here until you decide to look.
      </p>
    </div>
  );
}

/* ─── KineticCommute case study ────────────────────────── */
function KineticApp() {
  const imgs = [
    { f: "CC4DAFBB-6F68-43EC-B291-846E62ACBC0A.webp", cap: "Urban Activewear Portrait" },
    { f: "E0E33788-7A12-4CB8-A62F-EF9E518B96F1.webp",  cap: "Rooftop Structure" },
    { f: "9E04C8C5-F5CD-405E-A765-749137AAB596.webp",  cap: "Jump Sequence" },
    { f: "257C1E1D-8416-4EAD-A57E-46EC858FD130.webp",  cap: "Court Stretch" },
    { f: "A20147DA-2A3D-42F1-BFE6-B5D0966F09E4.webp",  cap: "Low Angle Portrait" },
    { f: "97CF5E4D-08B8-4B52-9AFA-261CC3C24ADE.webp",  cap: "Motion Frame" },
    { f: "4C2939CA-4E25-41A3-9138-8F40B7906E49.webp",  cap: "Editorial Portrait" },
    { f: "AA7DE374-5467-4A72-A1E8-7E8100045806.webp",  cap: "Shoe Detail" },
  ];
  return (
    <div className="app-content" style={{padding: "38px 40px 48px"}}>
      <div className="app-eyebrow">CASE.013 · SPEC CAMPAIGN · AI-ASSISTED CREATIVE DIRECTION · 2026</div>
      <h2>Kinetic Commute</h2>
      <p className="lede">
        A personal spec campaign concept for emerging women's activewear brands.
        The core idea: athleticism as part of daily life. Movement happens through
        the city — not only in gyms or staged workout spaces.
      </p>

      <div className="tags" style={{marginBottom: 28}}>
        <span className="tag accent"><span className="tag-dot"/>Creative Direction</span>
        <span className="tag"><span className="tag-dot"/>Art Direction</span>
        <span className="tag"><span className="tag-dot"/>Visual System</span>
        <span className="tag"><span className="tag-dot"/>AI-Assisted Concepting</span>
        <span className="tag"><span className="tag-dot"/>Campaign Strategy</span>
        <span className="tag"><span className="tag-dot"/>Photo / Video Direction</span>
      </div>

      {/* Hero image */}
      <div className="case-hero">
        <img src={`Images/${imgs[0].f}`} alt={imgs[0].cap} className="case-hero-img"/>
        <div className="case-cap">{imgs[0].cap}</div>
      </div>

      <div className="section-title" style={{marginTop: 36}}>
        <span className="st-l">— THE PROBLEM</span><span className="st-r">BRIEF</span>
      </div>
      <p>Most activewear campaigns feel repetitive: gym scenes, polished workout poses,
        studio lighting, or generic running content. This concept explores how activewear
        can feel premium, realistic, cinematic, and wearable in everyday city movement.</p>

      {/* Second full-width */}
      <div className="case-hero" style={{marginTop: 22}}>
        <img src={`Images/${imgs[1].f}`} alt={imgs[1].cap} className="case-hero-img"/>
        <div className="case-cap">{imgs[1].cap}</div>
      </div>

      <div className="section-title" style={{marginTop: 36}}>
        <span className="st-l">— CREATIVE DIRECTION</span><span className="st-r">CONCEPT</span>
      </div>
      <p>The city becomes the environment for movement: rooftop parking structures,
        concrete architecture, crosswalks, stairs, wind, shadows, and transitional
        moments. The campaign focuses on motion, texture, preparation, and everyday
        athleticism.</p>

      {/* 2-col grid: images 2–5 */}
      <div className="case-grid" style={{marginTop: 20}}>
        {imgs.slice(2, 6).map((img, i) => (
          <div key={i} className="case-cell">
            <img src={`Images/${img.f}`} alt={img.cap} className="case-cell-img"/>
            <div className="case-cap">{img.cap}</div>
          </div>
        ))}
      </div>

      <div className="section-title" style={{marginTop: 36}}>
        <span className="st-l">— FILM TREATMENT</span><span className="st-r">VISUAL GRADE</span>
      </div>
      <div className="cols-2" style={{gap: 28}}>
        <div>
          <div className="app-eyebrow" style={{marginBottom: 10}}>Colour Treatment</div>
          <p>Kodak Color 200 inspired film grade — warm skin tones, muted navy wardrobe,
            dusty blue sky, soft concrete, slight film grain, natural daylight, faded
            commercial look.</p>
        </div>
        <div>
          <div className="app-eyebrow" style={{marginBottom: 10}}>B&amp;W Treatment</div>
          <p>Soft editorial monochrome with grain, natural contrast, and subtle motion
            blur. Heightens physical intensity without distracting from the product.</p>
        </div>
      </div>

      <div className="section-title" style={{marginTop: 36}}>
        <span className="st-l">— VISUAL SYSTEM</span><span className="st-r">DESIGN LANGUAGE</span>
      </div>
      <ul className="checklist">
        <li data-i="01">Motion blur with sharp subject focus</li>
        <li data-i="02">Low-angle compositions — ground and upward perspectives</li>
        <li data-i="03">Wide environmental frames with architectural context</li>
        <li data-i="04">Cropped detail shots — shoes, hands, fabric texture</li>
        <li data-i="05">Realistic skin and fabric — no over-retouching</li>
        <li data-i="06">Layered activewear styling: hoodie, shorts, bra combinations</li>
        <li data-i="07">City textures — concrete, metal, glass, shadow, diffused light</li>
      </ul>

      {/* Last 2 images */}
      <div className="case-grid case-grid--2" style={{marginTop: 28}}>
        {imgs.slice(6).map((img, i) => (
          <div key={i} className="case-cell">
            <img src={`Images/${img.f}`} alt={img.cap} className="case-cell-img"/>
            <div className="case-cap">{img.cap}</div>
          </div>
        ))}
      </div>

      <div className="pullquote" style={{marginTop: 36}}>
        The city is not background. It's the workout.
        <cite>Kinetic Commute · Spec Campaign Concept · 2026</cite>
      </div>

      <div className="section-title">
        <span className="st-l">— VIDEO DIRECTION</span><span className="st-r">CAMPAIGN FILM</span>
      </div>
      <p>The campaign film uses tracking shots, footsteps on concrete, low angles,
        quick editorial cuts, ambient city sound, fabric movement, and fast pacing.
        Works as a 15–30 second campaign film for social, paid ads, or a website hero.
        Shot in the same locations as stills — one urban route, natural light, photo
        and video captured together.</p>

      <div className="section-title" style={{marginTop: 36}}>
        <span className="st-l">— WHY IT MATTERS</span><span className="st-r">BRAND VALUE</span>
      </div>
      <p>Emerging activewear brands need more than product images. They need a world
        around the product. This concept shows how a small brand can look more
        established, premium, and intentional through creative direction — before
        production.</p>

      <div className="section-title" style={{marginTop: 36}}>
        <span className="st-l">— REAL SHOOT POTENTIAL</span><span className="st-r">PRODUCTION</span>
      </div>
      <p>This concept could be produced with one model, one urban route, one rooftop
        location, two wardrobe looks, natural light, and photo and video captured
        together in a single day.</p>

      <div className="section-title" style={{marginTop: 36}}>
        <span className="st-l">— DELIVERABLES</span><span className="st-r">OUTPUT</span>
      </div>
      <ul className="checklist">
        <li data-i="—">15–25 edited campaign images</li>
        <li data-i="—">1 short campaign film (15–30 sec)</li>
        <li data-i="—">3–5 social reels</li>
        <li data-i="—">Website hero images</li>
        <li data-i="—">Paid ad crops</li>
        <li data-i="—">Product detail images</li>
        <li data-i="—">Social carousel assets</li>
      </ul>

      <p className="mono" style={{marginTop: 24, fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.16em", textTransform: "uppercase"}}>
        // spec concept · personal project · ai-assisted creative direction · 2026
      </p>
    </div>
  );
}

/* ─── Master registry ──────────────────────────────────── */
const APPS = {
  readme:      { title: "README.TXT",            num: "001", w: 400,  h: 500, render: () => <ReadmeApp /> },
  outreach:    { title: "OUTREACH.EXE",          num: "002", w: 780,  h: 600, render: () => <OutreachApp /> },
  saturation:  { title: "SATURATIONSCAN.EXE",    num: "003", w: 560,  h: 540, render: () => <SaturationApp /> },
  social:      { title: "SOCIALSKILLS.EXE",      num: "004", w: 620,  h: 520, render: () => <SocialApp /> },
  promptlab:   { title: "PROMPTLAB.EXE",         num: "005", w: 540,  h: 560, render: () => <PromptLabApp /> },
  creative:    { title: "CREATIVETESTING.EXE",   num: "006", w: 660,  h: 540, render: () => <CreativeTestingApp /> },
  skills:      { title: "SKILLS.EXE",            num: "007", w: 700,  h: 500, render: () => <SkillsApp /> },
  workflowos:  { title: "WORKFLOWOS.EXE",        num: "008", w: 540,  h: 520, render: () => <WorkflowOSApp /> },
  experiments: { title: "EXPERIMENTS\\",         num: "009", w: 620,  h: 440, render: () => <FolderApp folderId="experiments" /> },
  research:    { title: "RESEARCH\\",            num: "010", w: 620,  h: 420, render: () => <FolderApp folderId="research" /> },
  systems:     { title: "SYSTEMS\\",             num: "011", w: 620,  h: 400, render: () => <FolderApp folderId="systems" /> },
  signals:     { title: "SIGNALS.EXE",           num: "012", w: 620,  h: 540, render: () => <SignalsApp /> },
  kinetic:     { title: "KINETICCOMMUTE.EXE",    num: "013", w: 820,  h: 660, render: () => <KineticApp /> },
};

Object.assign(window, { APPS });
