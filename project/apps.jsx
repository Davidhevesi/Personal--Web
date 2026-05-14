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
            CREATIVE TECHNOLOGIST · MARKETING SYSTEMS · ATLANTA / REMOTE
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
        <li><span className="ll-k">EMAIL</span><a href="mailto:davidhevesi@protonmail.com" className="ll-v">davidhevesi@protonmail.com →</a></li>
        <li><span className="ll-k">LINKEDIN</span><a href="https://www.linkedin.com/in/dhevesi/" target="_blank" className="ll-v">/in/dhevesi →</a></li>
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

      <div className="section-title">
        <span className="st-l">— STACK</span>
        <span className="st-r">WORKFLOW · RESEARCH · OPERATIONS</span>
      </div>
      <div className="tags" style={{marginBottom: 14}}>
        <span className="tag accent"><span className="tag-dot"/>Claude</span>
        <span className="tag"><span className="tag-dot"/>Vibe Prospecting</span>
        <span className="tag"><span className="tag-dot"/>Notion</span>
        <span className="tag"><span className="tag-dot"/>Gmail Drafts</span>
        <span className="tag"><span className="tag-dot"/>Apify</span>
      </div>
      <p>Used for lead sourcing, hotel research, personalized outreach drafting, workflow organization, and campaign experimentation.</p>

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

      <div style={{marginTop: 22}}>
        <a href="https://www.youtube.com/watch?v=xPRY1Tt_8Ek" target="_blank" className="btn-action primary">WATCH VIDEO →</a>
      </div>
    </div>
  );
}

/* ─── SaturationScan ───────────────────────────────────── */
function SaturationApp() {
  return (
    <div className="app-content">
      <div className="app-eyebrow">SYSTEM · CONTENT STRATEGY · LIVE</div>
      <h2>The Content Saturation System</h2>
      <p className="lede">
        A simple workflow that analyzes what everyone in your niche is already
        posting so you can create content that actually stands out.
      </p>

      <p>Instead of guessing what to post, this system helps you:</p>
      <ul className="checklist">
        <li data-i="—">Identify overused content angles</li>
        <li data-i="—">See what audiences are tired of</li>
        <li data-i="—">Find gaps nobody is talking about</li>
        <li data-i="—">Turn those insights into better content ideas</li>
      </ul>
      <p>Built for creators, brands, and marketers who want clearer positioning and stronger content strategy.</p>

      <div className="section-title">
        <span className="st-l">— STEP 1</span>
        <span className="st-r">AUDIT THE MARKET</span>
      </div>
      <p>Analyze recent content in your niche to see:</p>
      <ul className="checklist">
        <li data-i="—">Repeated hooks</li>
        <li data-i="—">Common messaging</li>
        <li data-i="—">Overused perspectives</li>
        <li data-i="—">Saturated content angles</li>
      </ul>
      <p>You get a clear map of what everyone is already saying.</p>

      <div className="section-title">
        <span className="st-l">— STEP 2</span>
        <span className="st-r">IDENTIFY REPEATED PATTERNS</span>
      </div>
      <p>Break down the talking points creators repeat most often and understand why they became popular. This helps reveal why certain content now feels generic.</p>

      <div className="section-title">
        <span className="st-l">— STEP 3</span>
        <span className="st-r">CREATE BETTER ANGLES</span>
      </div>
      <p>Rewrite saturated ideas into sharper, more grounded perspectives that feel more honest, specific, and expert-driven.</p>
      <p>Not fake controversy. Not clickbait. Just stronger positioning.</p>

      <div className="section-title">
        <span className="st-l">— STEP 4</span>
        <span className="st-r">FIND THE GAPS</span>
      </div>
      <p>Discover topics, perspectives, and emotional angles that almost nobody in your niche is covering. This is where differentiation happens.</p>

      <div className="section-title">
        <span className="st-l">— STEP 5</span>
        <span className="st-r">TURN INSIGHTS INTO CONTENT</span>
      </div>
      <p>Convert the strongest ideas into:</p>
      <ul className="checklist">
        <li data-i="—">Hooks</li>
        <li data-i="—">Reels</li>
        <li data-i="—">Talking-head videos</li>
        <li data-i="—">Carousel concepts</li>
        <li data-i="—">Execution-ready post ideas</li>
      </ul>
      <p>Everything should feel native to modern social platforms.</p>

      <div className="section-title">
        <span className="st-l">— WHY THIS EXISTS</span>
        <span className="st-r">CONTEXT</span>
      </div>
      <p>Most content is not bad. It is just interchangeable. The same hooks, the same messaging, and the same "insights" get repeated until audiences stop noticing them.</p>
      <p>This system helps you see the landscape clearly so you can make intentional creative decisions instead of repeating what already exists.</p>

      <div className="section-title">
        <span className="st-l">— SETUP</span>
        <span className="st-r">REQUIREMENTS</span>
      </div>
      <p>This workflow uses live social media data through:</p>
      <ul className="checklist">
        <li data-i="—">Manus Instagram Connector</li>
        <li data-i="—">ChatGPT + Apify</li>
        <li data-i="—">Instagram / TikTok / YouTube scraping workflows</li>
      </ul>
      <p>Install a connector first, then run the workflow in order from Step 1 to Step 5.</p>

      <div className="pullquote">
        The edge is not volume. The edge is naming patterns clearly.
      </div>

      <div style={{marginTop: 22}}>
        <a href="https://marketsaturationanalyzer.netlify.app" target="_blank" className="btn-action primary">OPEN TOOL →</a>
      </div>
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

/* ─── (removed: WorkflowOS, Folders, Signals) ─────────── */

/* ─── Process note block ───────────────────────────────── */
function ProcNote({ prompt, notes, compact }) {
  return (
    <div className={"proc-note" + (compact ? " compact" : "")}>
      <div className="proc-note-label">Process Notes · Prompt Direction</div>
      <p className="proc-note-prompt">{prompt}</p>
      <ul>
        {notes.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </div>
  );
}

/* ─── KineticCommute case study ────────────────────────── */
function KineticApp() {
  const imgs = [
    {
      f: "CC4DAFBB-6F68-43EC-B291-846E62ACBC0A.webp",
      cap: "Urban Activewear Portrait",
      prompt: "Young woman in layered activewear — hoodie, high-waisted shorts, white low-top trainers — at a city crosswalk. Overcast natural daylight. Kodak Color 200 film grade. Street-level angle, shallow depth of field, pedestrian blur in background. Fabric in slight motion.",
      notes: [
        "Primary continuity anchor — skin tone, wardrobe palette, and light quality locked from this frame.",
        "Crosswalk location referenced across later frames for environmental cohesion.",
        "Film grain and grade set here; not renegotiated in subsequent iterations.",
      ],
    },
    {
      f: "E0E33788-7A12-4CB8-A62F-EF9E518B96F1.webp",
      cap: "Rooftop Structure",
      prompt: "Same subject, same wardrobe. Wide shot on a rooftop parking structure — concrete deck, steel railings, pale overcast sky. Figure relatively small in frame. City implied in background, out of focus. Transitional stance: not posing, about to move.",
      notes: [
        "Environmental anchor for the rooftop sequence; sky and concrete tones matched against frame 01.",
        "Figure deliberately scaled back — building geometry and sky carry the composition.",
        "Railing tested as geometric counterpoint to the organic shapes of activewear.",
      ],
    },
    {
      f: "9E04C8C5-F5CD-405E-A765-749137AAB596.webp",
      cap: "Jump Sequence",
      prompt: "Same subject, rooftop location. Camera low to concrete, shooting upward. Mid-jump — soft overcast sky as backdrop. Motion blur on lower legs and trainers; face and torso held sharp. No fill, natural light only.",
      notes: [
        "First motion-blur test; blur localised to feet and lower limbs, face and core held legible.",
        "Upward angle preserves the visual grammar established in the portrait frames.",
        "Jump height kept realistic — brief explicitly rejected acrobatic or staged athleticism.",
      ],
    },
    {
      f: "257C1E1D-8416-4EAD-A57E-46EC858FD130.webp",
      cap: "Court Stretch",
      prompt: "Same subject, consistent wardrobe. Seated forward fold on a painted basketball court — hands extended past feet. Low angle, eye-level with court surface. Painted court lines as foreground geometry. Even diffused daylight, no strong shadows.",
      notes: [
        "Location shift to painted concrete introduces a distinct texture without additional set dressing.",
        "Pacing beat in the sequence — a deliberate rest frame after the rooftop action shots.",
        "Court lines used as graphic foreground element; no props or additional styling required.",
      ],
    },
    {
      f: "A20147DA-2A3D-42F1-BFE6-B5D0966F09E4.webp",
      cap: "Low Angle Portrait",
      prompt: "Close portrait, camera at ground level, shooting upward. Subject standing, looking past camera. Pronounced perspective distortion — trainers large in foreground, face receding toward upper frame. Overcast sky backdrop. Hoodie relaxed, fabric loose.",
      notes: [
        "Most extreme angle in the set — perspective distortion used as deliberate creative tool, not corrected.",
        "Overcast sky backdrop reinstated to match the exposure reference from frame 01.",
        "Trainer detail held sharp; this frame directly informed the brief for the shoe-detail shot.",
      ],
    },
    {
      f: "97CF5E4D-08B8-4B52-9AFA-261CC3C24ADE.webp",
      cap: "Motion Frame",
      prompt: "Running mid-stride with directional pan blur. Subject arms pumping, fabric in motion. Urban environment, background streaked from camera movement. Natural light, warm-cool split at horizon. Face partially obscured by motion.",
      notes: [
        "Pan blur applied to background and limbs; face kept at minimum recognisable threshold.",
        "First warm-cool grade split in the sequence — deliberate departure from the flat overcast of earlier frames.",
        "Arm position and stride reviewed against activewear reference; gym-ad stylisation explicitly avoided.",
      ],
    },
    {
      f: "4C2939CA-4E25-41A3-9138-8F40B7906E49.webp",
      cap: "Editorial Portrait",
      prompt: "Outdoor editorial portrait. Subject seated on concrete steps, direct calm eye contact. Tight vertical crop. High fidelity — skin texture, fabric weave, natural hair. Available light only. Clean background, no styling.",
      notes: [
        "Character anchor after the action sequence — model identity re-established before the final product frame.",
        "Highest skin and fabric fidelity in the set; skin tone sampled here for all consistency corrections.",
        "Eyeline specified as direct but not confrontational — brief called for quiet confidence, not aggression.",
      ],
    },
    {
      f: "AA7DE374-5467-4A72-A1E8-7E8100045806.webp",
      cap: "Shoe Detail",
      prompt: "Macro-adjacent detail. White low-top trainer on a painted urban surface — court line or textured concrete. Foot at rest or mid-step. Shallow depth of field, surface texture sharp. Ankle fabric consistent with wardrobe from reference frame.",
      notes: [
        "Final product anchor — designed to work as a standalone social asset or paid ad crop.",
        "Court-painted surface chosen to close the location loop opened in the court stretch frame.",
        "Ankle wardrobe continuity confirmed against frame 01 before this shot was finalised.",
      ],
    },
  ];

  const refLock = `CONTINUITY ANCHOR — established at iteration 01 and not revised.

subject ···· young woman · athletic build · natural skin · relaxed posture
wardrobe ··· muted navy hoodie · high-waisted shorts · white low-top trainers · no accessories
light ······ overcast natural daylight · no artificial fill · no hard shadows
grade ······ Kodak Color 200 simulation — warm skin · muted blue-grey wardrobe · light grain
location ··· urban only — streets · rooftop structures · painted courts · no gyms · no studios
tone ······· cinematic lifestyle · movement as daily life · not workout content · not performance

carry all values into every subsequent frame.
note explicit corrections in process notes below each image.`;

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

      {/* Base Reference Lock */}
      <div className="ref-lock">
        <div className="ref-lock-label">Base Reference Lock · Continuity Anchor</div>
        <div className="ref-lock-body">{refLock}</div>
      </div>

      {/* Hero image */}
      <div className="case-hero">
        <img src={`Images/${imgs[0].f}`} alt={imgs[0].cap} className="case-hero-img"/>
        <div className="case-cap">{imgs[0].cap}</div>
      </div>
      <ProcNote prompt={imgs[0].prompt} notes={imgs[0].notes} />

      <div className="section-title" style={{marginTop: 8}}>
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
      <ProcNote prompt={imgs[1].prompt} notes={imgs[1].notes} />

      <div className="section-title" style={{marginTop: 8}}>
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
            <ProcNote prompt={img.prompt} notes={img.notes} compact />
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
            <ProcNote prompt={img.prompt} notes={img.notes} compact />
          </div>
        ))}
      </div>

      {/* Consistency Corrections */}
      <div className="section-title" style={{marginTop: 36}}>
        <span className="st-l">— CONSISTENCY CORRECTIONS</span><span className="st-r">ITERATIVE REFINEMENT</span>
      </div>
      <p>Three recurring drift patterns were identified and corrected across the full generation run. These are not failures — they are the normal cost of working with AI image generation at this level of visual specificity. Each correction was written as a prompt addition, not a restart.</p>
      <ul className="checklist">
        <li data-i="01">Skin tone drift — Overcast frames pushed toward blue-shifted or desaturated skin. Corrected by referencing frame 07 and adding an explicit grade instruction to each subsequent motion prompt.</li>
        <li data-i="02">Fabric silhouette — Hoodie and shorts defaulted to a fitted, gym-specific cut. Brief revised to specify "relaxed fit, not performance fit" after frame 02; applied to all iterations from that point forward.</li>
        <li data-i="03">Environment creep — Early iterations introduced gym flooring or fitness studio surfaces. Brief reinforced with "urban only — streets, concrete, architectural surfaces" after frame 03. No studio frames made the final set.</li>
      </ul>

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

      <div className="section-title" style={{marginTop: 36}}>
        <span className="st-l">— SOCIAL APPLICATION</span><span className="st-r">INSTAGRAM</span>
      </div>
      <div className="case-hero">
        <img src="Images/Instagram.PNG" alt="Instagram mockup" className="case-hero-img"/>
        <div className="case-cap">Instagram Mockup · Campaign Application</div>
      </div>

      <p className="mono" style={{marginTop: 24, fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.16em", textTransform: "uppercase"}}>
        // spec concept · personal project · ai-assisted creative direction · 2026
      </p>
    </div>
  );
}

/* ─── Master registry ──────────────────────────────────── */
const APPS = {
  readme:     { title: "README.TXT",          num: "001", w: 400, h: 500, render: () => <ReadmeApp /> },
  outreach:   { title: "OUTREACH.EXE",        num: "002", w: 780, h: 600, render: () => <OutreachApp /> },
  saturation: { title: "SATURATIONSCAN.EXE", num: "003", w: 560, h: 540, render: () => <SaturationApp /> },
  social:     { title: "SOCIALSKILLS.EXE",   num: "004", w: 620, h: 520, render: () => <SocialApp /> },
  skills:     { title: "SKILLS.EXE",         num: "007", w: 700, h: 500, render: () => <SkillsApp /> },
  kinetic:    { title: "KINETICCOMMUTE.EXE", num: "013", w: 820, h: 660, render: () => <KineticApp /> },
};

Object.assign(window, { APPS });
