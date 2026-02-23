import { useState, useEffect, useRef } from "react";

/*
  INVICTUS ELITE PERFORMANCE — Homepage
  ─────────────────────────────────────
  Structure  : Kontrek template (section-for-section adaptation)
  Palette    : #060608 black · #F0EBE1 bone · #A8000F red
  Font       : Barlow Condensed (display/UI) + DM Sans (body)
  Sections   :
    Nav → Hero → Ticker → Pillars (Safety&Quality equiv) →
    Logos strip → Split About → Stats bar → Services split →
    Process → Testimonial → Transformations → CTA → Footer
*/

// ── fonts ────────────────────────────────────────────────────
const FONTS =
  "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap";

// ── palette tokens ───────────────────────────────────────────
const T = {
  black:   "#060608",
  black2:  "#0A0A0C",
  black3:  "#111116",
  bone:    "#F0EBE1",
  bone2:   "#E8E2D6",
  boneDim: "rgba(240,235,225,0.48)",
  boneFaint:"rgba(240,235,225,0.1)",
  red:     "#A8000F",
  redHov:  "#C41020",
  redGlow: "rgba(168,0,15,0.2)",
  bdrD:    "rgba(240,235,225,0.08)", // border on dark bg
  bdrL:    "rgba(6,6,8,0.10)",       // border on light bg
};

// ── intersection reveal ───────────────────────────────────────
function useReveal(t = 0.12) {
  const ref = useRef(null);
  const [on, set] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { set(true); obs.disconnect(); } },
      { threshold: t }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, on];
}

// ── counter ───────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
  const [n, set] = useState(0);
  const [ref, on] = useReveal(0.5);
  useEffect(() => {
    if (!on) return;
    const end = parseInt(to), steps = 70;
    let c = 0;
    const id = setInterval(() => {
      c += end / steps;
      if (c >= end) { set(end); clearInterval(id); } else set(Math.floor(c));
    }, 2000 / steps);
    return () => clearInterval(id);
  }, [on, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ── Arrow icon ────────────────────────────────────────────────
const ArrowRight = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ArrowDiag = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2">
    <path d="M7 17L17 7M17 17V7H7" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
// GLOBAL CSS
// ══════════════════════════════════════════════════════════════
function GlobalCSS() {
  return (
    <style>{`
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth;font-size:16px}
      body{background:${T.black};color:${T.bone};
           font-family:'DM Sans',sans-serif;
           -webkit-font-smoothing:antialiased;overflow-x:hidden}
      a{text-decoration:none;color:inherit}
      button{font-family:inherit;cursor:pointer;border:none;background:none}
      ::selection{background:${T.red};color:#fff}
      ::-webkit-scrollbar{width:3px}
      ::-webkit-scrollbar-track{background:${T.black}}
      ::-webkit-scrollbar-thumb{background:${T.red}}

      /* ── animations ── */
      @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

      /* ── reveal utility ── */
      .rv  {opacity:0;transform:translateY(28px);
            transition:opacity .8s cubic-bezier(.16,1,.3,1),
                       transform .8s cubic-bezier(.16,1,.3,1)}
      .rvL {opacity:0;transform:translateX(-28px);
            transition:opacity .8s cubic-bezier(.16,1,.3,1),
                       transform .8s cubic-bezier(.16,1,.3,1)}
      .rvR {opacity:0;transform:translateX(28px);
            transition:opacity .8s cubic-bezier(.16,1,.3,1),
                       transform .8s cubic-bezier(.16,1,.3,1)}
      .on  {opacity:1!important;transform:none!important}

      /* ── btn-red ── */
      .btn-r{display:inline-flex;align-items:center;gap:10px;
             background:${T.red};color:#fff;padding:14px 32px;
             font-family:'Barlow Condensed',sans-serif;font-size:12px;
             font-weight:700;letter-spacing:2.5px;text-transform:uppercase;
             transition:background .25s,transform .25s,box-shadow .25s}
      .btn-r:hover{background:${T.redHov};transform:translateY(-2px);
                   box-shadow:0 8px 28px ${T.redGlow}}

      /* ── btn-outline variants ── */
      .btn-od{display:inline-flex;align-items:center;gap:10px;
              border:1px solid ${T.bdrD};color:${T.boneDim};padding:13px 30px;
              font-family:'Barlow Condensed',sans-serif;font-size:12px;
              font-weight:700;letter-spacing:2.5px;text-transform:uppercase;
              transition:border-color .25s,color .25s,transform .25s}
      .btn-od:hover{border-color:${T.bone};color:${T.bone};transform:translateY(-2px)}

      .btn-ol{display:inline-flex;align-items:center;gap:10px;
              border:1px solid ${T.bdrL};color:${T.black};padding:13px 30px;
              font-family:'Barlow Condensed',sans-serif;font-size:12px;
              font-weight:700;letter-spacing:2.5px;text-transform:uppercase;
              transition:all .25s}
      .btn-ol:hover{background:${T.black};color:${T.bone};border-color:${T.black}}

      /* ── nav link underline ── */
      .nl{position:relative;font-family:'Barlow Condensed',sans-serif;
          font-size:13px;font-weight:600;letter-spacing:2px;
          text-transform:uppercase;color:${T.boneDim};
          transition:color .25s;padding-bottom:3px}
      .nl::after{content:'';position:absolute;bottom:0;left:0;
                 width:0;height:1px;background:${T.red};transition:width .3s}
      .nl:hover{color:${T.bone}}
      .nl:hover::after{width:100%}

      /* ── section label ── */
      .lbl{display:inline-flex;align-items:center;gap:12px;
           font-family:'Barlow Condensed',sans-serif;font-size:11px;
           font-weight:700;letter-spacing:3.5px;text-transform:uppercase;
           color:${T.red};margin-bottom:18px}
      .lbl::before,.lbl::after{content:'';display:block;width:26px;
                                height:1px;background:${T.red}}

      /* ── service / tier row ── */
      .srow{border-bottom:1px solid ${T.bdrL};
            transition:background .2s;cursor:pointer}
      .srow:hover{background:rgba(6,6,8,.04)}
      .srow:hover .sarrow{transform:translate(4px,-4px)}
      .sarrow{transition:transform .3s}

      /* ── project card ── */
      .pc:hover .po{opacity:1!important}
      .pc:hover .pv{transform:scale(1) translateX(-50%) translateY(-50%)!important;
                    opacity:1!important}

      /* ── blog card ── */
      .bc{transition:box-shadow .3s}
      .bc:hover{box-shadow:0 12px 40px rgba(0,0,0,.25)}
      .bc:hover .ba{transform:translate(4px,-4px)!important}
      .ba{transition:transform .3s}

      /* ── responsive ── */
      @media(max-width:960px){
        .dn{display:none!important}
        .df{display:flex!important}
        .g2{grid-template-columns:1fr!important}
        .g3{grid-template-columns:1fr!important}
        .g4s{grid-template-columns:repeat(2,1fr)!important}
      }
    `}</style>
  );
}

// ══════════════════════════════════════════════════════════════
// NAV  (Kontrek: logo left · links center · CTA button right)
// ══════════════════════════════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Coaching","About","Blog","Resources"];

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:300,
      background: scrolled ? `rgba(6,6,8,.96)` : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.bdrD}` : "none",
      transition:"all .4s ease",
    }}>
      <div style={{maxWidth:1360,margin:"0 auto",padding:"0 40px",
                   display:"flex",alignItems:"center",
                   justifyContent:"space-between",height:78}}>

        {/* Wordmark */}
        <a href="/" style={{display:"flex",flexDirection:"column",gap:1}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                        fontSize:22,fontWeight:900,letterSpacing:4,
                        color:T.bone,lineHeight:1}}>INVICTUS</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                        fontSize:8,fontWeight:700,letterSpacing:5,
                        color:T.red,textTransform:"uppercase"}}>ELITE PERFORMANCE</span>
        </a>

        {/* Desktop links */}
        <div className="dn" style={{display:"flex",alignItems:"center",gap:40}}>
          {links.map(l => (
            <a key={l} href={`/${l.toLowerCase()}`} className="nl">{l}</a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="/apply" className="btn-r dn"
           style={{display:"inline-flex",padding:"12px 28px",fontSize:11}}>
          Apply Now <ArrowRight size={13}/>
        </a>

        {/* Mobile hamburger */}
        <button className="df" onClick={() => setOpen(!open)}
          style={{display:"none",flexDirection:"column",gap:6,padding:4}}>
          {[0,1,2].map(i => (
            <span key={i} style={{display:"block",width:26,height:2,
              background:T.bone,transition:"all .3s",
              transform: i===0&&open ? "rotate(45deg) translate(5px,6px)"
                       : i===2&&open ? "rotate(-45deg) translate(5px,-6px)"
                       : "none",
              opacity: i===1&&open ? 0 : 1}}/>
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{background:`rgba(6,6,8,.98)`,
                     borderTop:`1px solid ${T.bdrD}`,
                     padding:"28px 40px 32px",
                     display:"flex",flexDirection:"column",gap:24}}>
          {links.map(l => (
            <a key={l} href={`/${l.toLowerCase()}`}
               style={{fontFamily:"'Barlow Condensed',sans-serif",
                       fontSize:16,fontWeight:700,letterSpacing:3,
                       textTransform:"uppercase",color:T.bone}}>{l}</a>
          ))}
          <a href="/apply" className="btn-r"
             style={{justifyContent:"center"}}>
            Apply Now <ArrowRight size={14}/>
          </a>
        </div>
      )}
    </nav>
  );
}

// ══════════════════════════════════════════════════════════════
// HERO  (Kontrek: full-bleed image · text bottom-anchored ·
//        small subtext bottom-left · headline bottom-right)
// Dark textured background — no photo
// ══════════════════════════════════════════════════════════════
function Hero() {
  const [rdy, set] = useState(false);
  useEffect(() => { const t = setTimeout(() => set(true), 60); return () => clearTimeout(t); }, []);
  const anim = (d) => ({
    opacity: rdy ? 1 : 0,
    transform: rdy ? "none" : "translateY(24px)",
    transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${d}s,
                 transform .9s cubic-bezier(.16,1,.3,1) ${d}s`,
  });

  return (
    <section style={{position:"relative",minHeight:"100vh",
                     display:"flex",flexDirection:"column",
                     background:T.black,overflow:"hidden"}}>

      {/* ── textured dark bg ───────────────────────────────── */}
      <div style={{position:"absolute",inset:0,
                   background:`
                     radial-gradient(ellipse 80% 60% at 70% 40%,
                       rgba(168,0,15,.07) 0%, transparent 60%),
                     radial-gradient(ellipse 50% 80% at 20% 80%,
                       rgba(240,235,225,.02) 0%, transparent 60%),
                     linear-gradient(160deg,#0a0a10 0%,#060608 50%,#080810 100%)
                   `}}/>

      {/* subtle grid lines */}
      <div style={{position:"absolute",inset:0,
                   backgroundImage:`
                     linear-gradient(${T.bdrD} 1px,transparent 1px),
                     linear-gradient(90deg,${T.bdrD} 1px,transparent 1px)
                   `,
                   backgroundSize:"100px 100px",opacity:.35,
                   pointerEvents:"none"}}/>

      {/* vertical accent rule — left third */}
      <div style={{position:"absolute",top:0,left:"33%",
                   width:1,height:"100%",
                   background:`linear-gradient(to bottom,
                     transparent,${T.bdrD} 20%,${T.red} 50%,
                     ${T.bdrD} 80%,transparent)`,
                   opacity:.5}}/>

      {/* bottom fade */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",
                   background:`linear-gradient(to top,${T.black},transparent)`,
                   pointerEvents:"none"}}/>

      {/* ── nav spacer ─────────────────────────────────────── */}
      <div style={{flex:1,display:"flex",flexDirection:"column",
                   justifyContent:"flex-end",
                   maxWidth:1360,margin:"0 auto",
                   width:"100%",padding:"100px 40px 80px",
                   position:"relative",zIndex:2}}>

        {/* top row — eyebrow left · credential right */}
        <div style={{display:"flex",justifyContent:"space-between",
                     alignItems:"center",marginBottom:48,...anim(.1)}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{display:"block",width:8,height:8,
                          background:T.red,
                          animation:"pulse 2s ease infinite"}}/>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                          fontSize:11,fontWeight:600,letterSpacing:4,
                          textTransform:"uppercase",color:T.red}}>
              National-Level Athlete · Elite Coach
            </span>
          </div>
          <span className="dn"
                style={{fontFamily:"'Barlow Condensed',sans-serif",
                        fontSize:11,fontWeight:600,letterSpacing:3,
                        textTransform:"uppercase",color:T.boneDim}}>
            10+ Years · Multiple Overall Wins
          </span>
        </div>

        {/* headline block */}
        <div style={{...anim(.2),marginBottom:52}}>
          {/* "We provide…" style subtext — Kontrek top-left of headline */}
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,
                     fontWeight:300,color:T.boneDim,lineHeight:1.8,
                     maxWidth:360,marginBottom:32}}>
            Evidence-based coaching for competitive bodybuilders
            and serious enhanced athletes. You bring the work —
            I bring the system.
          </p>

          {/* Massive headline — Kontrek style, bottom-right feel */}
          <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",
                      fontSize:"clamp(72px,14vw,210px)",
                      fontWeight:900,lineHeight:.86,
                      letterSpacing:"-2px",textTransform:"uppercase",
                      color:"#fff"}}>
            ENGINEERING
          </h1>
          <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",
                      fontSize:"clamp(72px,14vw,210px)",
                      fontWeight:900,lineHeight:.86,
                      letterSpacing:"-2px",textTransform:"uppercase",
                      color:"transparent",
                      WebkitTextStroke:`2px ${T.boneDim}`}}>
            ELITE
          </h1>
          <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",
                      fontSize:"clamp(72px,14vw,210px)",
                      fontWeight:900,lineHeight:.86,
                      letterSpacing:"-2px",textTransform:"uppercase",
                      color:T.red}}>
            PHYSIQUES
          </h1>
        </div>

        {/* bottom row — scroll indicator left · CTAs right */}
        <div style={{display:"flex",justifyContent:"space-between",
                     alignItems:"flex-end",flexWrap:"wrap",
                     gap:24,...anim(.4)}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:36,height:1,background:T.bdrD}}/>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                          fontSize:9,fontWeight:600,letterSpacing:4,
                          textTransform:"uppercase",color:T.boneDim}}>
              Scroll to explore
            </span>
          </div>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <a href="/apply" className="btn-r">
              Apply to Work With Me <ArrowRight size={14}/>
            </a>
            <a href="/coaching" className="btn-od">
              View Coaching
            </a>
          </div>
        </div>
      </div>

      {/* floating stat badge — bottom right */}
      <div style={{
        position:"absolute",bottom:120,right:60,
        background:T.black2,border:`1px solid ${T.bdrD}`,
        padding:"22px 28px",zIndex:3,
        boxShadow:`0 20px 60px rgba(0,0,0,.6)`,
        animation:"float 7s ease-in-out infinite",
        opacity:rdy?1:0,transition:"opacity 1s ease 1.1s",
      }}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                     fontSize:52,fontWeight:900,color:"#fff",
                     lineHeight:1,letterSpacing:-2}}>
          200<span style={{color:T.red}}>+</span>
        </div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                     fontSize:9,fontWeight:700,letterSpacing:3.5,
                     textTransform:"uppercase",color:T.boneDim,
                     marginTop:6}}>
          Athletes Coached
        </div>
      </div>

      {/* slide nav dots — Kontrek left edge */}
      <div style={{position:"absolute",left:18,top:"50%",
                   transform:"translateY(-50%)",
                   display:"flex",flexDirection:"column",gap:8,
                   zIndex:3,opacity:rdy?1:0,
                   transition:"opacity 1s ease 1.3s"}}>
        {[1,2,3].map((n,i) => (
          <div key={n} style={{fontFamily:"'Barlow Condensed',sans-serif",
                               fontSize:9,fontWeight:700,
                               color:i===0?T.bone:T.boneFaint,
                               writing: "vertical-rl",
                               letterSpacing:1}}>
            0{n}
          </div>
        ))}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// TICKER  (red strip · marquee text)
// ══════════════════════════════════════════════════════════════
function Ticker() {
  const items = [
    "10+ Years Competing","National-Level Athlete",
    "Multiple Overall Wins","Evidence-Based Protocols",
    "Enhanced Athlete Transparency","Harm Reduction First",
    "200+ Athletes Coached","No Bullshit. Only Results.",
  ];
  const all = [...items,...items];
  return (
    <div style={{background:T.red,overflow:"hidden",
                 padding:"13px 0",
                 borderTop:"1px solid rgba(255,255,255,.08)"}}>
      <div style={{display:"flex",whiteSpace:"nowrap",
                   animation:"ticker 30s linear infinite"}}>
        {all.map((t,i) => (
          <span key={i} style={{
            flexShrink:0,display:"inline-flex",
            alignItems:"center",gap:36,padding:"0 36px",
            fontFamily:"'Barlow Condensed',sans-serif",
            fontSize:12,fontWeight:700,letterSpacing:3.5,
            textTransform:"uppercase",color:"rgba(255,255,255,.92)"}}>
            {t}
            <span style={{fontSize:5,color:"rgba(255,255,255,.35)"}}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PILLARS  (Kontrek: "Safety & Quality" — dark bg ·
//           centered heading · 3 columns below)
// ══════════════════════════════════════════════════════════════
function Pillars() {
  const [hRef,hOn] = useReveal();
  const items = [
    {
      n:"01",
      title:"Evidence-Based Protocols",
      body:"Every program and protocol is grounded in science and refined through real-world application with competitive athletes. No bro-science. No guesswork. Just what works.",
    },
    {
      n:"02",
      title:"Enhanced Athlete Transparency",
      body:"Open, honest conversations about PED use, harm reduction, and what actually performs at the elite level. Zero judgment. This space is built specifically for you.",
    },
    {
      n:"03",
      title:"Relentless Accountability",
      body:"Coaching is a two-way commitment. You show up with the work ethic — I show up with the system. I only take athletes I know I can deliver real results with.",
    },
  ];

  return (
    <section style={{background:T.black2,padding:"100px 40px"}}>
      <div style={{maxWidth:1360,margin:"0 auto"}}>

        {/* centered heading — Kontrek style */}
        <div ref={hRef} className={`rv ${hOn?"on":""}`}
             style={{textAlign:"center",marginBottom:72}}>
          <div className="lbl" style={{justifyContent:"center"}}>
            Our Approach
          </div>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",
                      fontSize:"clamp(32px,4.5vw,60px)",
                      fontWeight:900,textTransform:"uppercase",
                      lineHeight:.92,letterSpacing:-1,color:T.bone,
                      maxWidth:700,margin:"0 auto 20px"}}>
            QUALITY COACHING YOU CAN TRUST<br/>
            <span style={{color:T.red}}>EVERY STEP OF THE WAY</span>
          </h2>
          {/* down arrow circle — Kontrek's scroll cue */}
          <div style={{width:52,height:52,borderRadius:"50%",
                       border:`1px solid ${T.bdrD}`,
                       display:"flex",alignItems:"center",
                       justifyContent:"center",margin:"32px auto 0",
                       cursor:"pointer",transition:"border-color .25s",}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=T.red}
            onMouseLeave={e=>e.currentTarget.style.borderColor=T.bdrD}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke={T.boneDim} strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>

        {/* 3-col grid */}
        <div className="g3" style={{display:"grid",
                                     gridTemplateColumns:"repeat(3,1fr)",
                                     gap:1}}>
          {items.map((it,i) => {
            const [r,on] = useReveal(.08);
            return (
              <div key={i} ref={r}
                   className={`rv ${on?"on":""}`}
                   style={{
                     padding:"48px 40px",
                     borderRight:i<2?`1px solid ${T.bdrD}`:"none",
                     transitionDelay:`${i*.12}s`,
                   }}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                             fontSize:11,fontWeight:700,letterSpacing:3,
                             color:T.red,marginBottom:20}}>{it.n}</div>
                <h3 style={{fontFamily:"'Barlow Condensed',sans-serif",
                             fontSize:22,fontWeight:800,
                             textTransform:"uppercase",letterSpacing:.5,
                             color:T.bone,marginBottom:16,lineHeight:1.1}}>
                  {it.title}
                </h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",
                           fontSize:14,fontWeight:300,
                           color:T.boneDim,lineHeight:1.85}}>
                  {it.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* credential logos strip — Kontrek's partner logos */}
      <div style={{maxWidth:1360,margin:"56px auto 0",
                   padding:"0 40px",
                   borderTop:`1px solid ${T.bdrD}`,
                   paddingTop:40}}>
        <div style={{display:"flex",alignItems:"center",
                     justifyContent:"space-between",
                     flexWrap:"wrap",gap:32}}>
          {["NPC","IFBB","Natural Alternative","Harm Reduction Coalition",
            "Evidence-Based Fitness"].map((label,i) => (
            <span key={i}
                  style={{fontFamily:"'Barlow Condensed',sans-serif",
                          fontSize:13,fontWeight:700,letterSpacing:3,
                          textTransform:"uppercase",color:T.boneFaint,
                          transition:"color .25s",cursor:"default"}}
              onMouseEnter={e=>e.currentTarget.style.color=T.boneDim}
              onMouseLeave={e=>e.currentTarget.style.color=T.boneFaint}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// ABOUT SPLIT  (Kontrek: "Our Strengths" white bg ·
//              left image with stat badge · right service list)
// ══════════════════════════════════════════════════════════════
function AboutSplit() {
  const [lRef,lOn] = useReveal();
  const [rRef,rOn] = useReveal();

  const services = [
    "Structural Reinforcement of Athletic Foundation",
    "Custom Nutrition & Macro Architecture",
    "PED / AAS Protocol Consulting",
    "Contest Prep & Peak Week Coaching",
    "Bloodwork Review & Harm Reduction",
    "Off-Season to Competition Transition",
  ];

  return (
    <section style={{background:T.bone,padding:"100px 0"}}>
      <div className="g2" style={{maxWidth:1360,margin:"0 auto",
                                   padding:"0 40px",display:"grid",
                                   gridTemplateColumns:"1fr 1fr",
                                   gap:80,alignItems:"center"}}>

        {/* LEFT — image placeholder + floating stat */}
        <div ref={lRef} className={`rvL ${lOn?"on":""}`}
             style={{position:"relative"}}>
          {/* image box */}
          <div style={{aspectRatio:"4/5",
                       background:`linear-gradient(135deg,
                         #0e0e16 0%,#060608 100%)`,
                       border:`1px solid ${T.bdrL}`,
                       position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,
                         display:"flex",flexDirection:"column",
                         alignItems:"center",justifyContent:"center",
                         gap:12,opacity:.06}}>
              <svg width="48" height="48" viewBox="0 0 24 24"
                   fill="none" stroke={T.bone} strokeWidth=".5">
                <rect x="3" y="3" width="18" height="18" rx="1"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                            fontSize:9,letterSpacing:4,color:T.bone,
                            textTransform:"uppercase"}}>Athlete Photo</span>
            </div>
            {/* red accent strip bottom */}
            <div style={{position:"absolute",bottom:0,left:0,right:0,
                         height:4,background:T.red}}/>
          </div>

          {/* overlapping customer satisfaction badge — Kontrek style */}
          <div style={{position:"absolute",bottom:60,right:-28,
                       background:T.bone2,
                       border:`1px solid rgba(6,6,8,.12)`,
                       padding:"18px 24px",
                       boxShadow:"0 16px 48px rgba(0,0,0,.18)",
                       display:"flex",alignItems:"center",gap:16,
                       animation:"float 8s ease-in-out infinite"}}>
            <div style={{display:"flex"}}>
              {["#A8000F","#060608","#F0EBE1"].map((c,i)=>(
                <div key={i} style={{width:32,height:32,borderRadius:"50%",
                                     background:c,
                                     border:`2px solid ${T.bone2}`,
                                     marginLeft:i>0?-10:0}}/>
              ))}
            </div>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                           fontSize:16,fontWeight:900,color:T.black,
                           letterSpacing:-0.5}}>
                98% Client Retention
              </div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                           fontSize:9,fontWeight:600,letterSpacing:3,
                           textTransform:"uppercase",
                           color:"rgba(6,6,8,.4)",marginTop:2}}>
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — heading + service list */}
        <div ref={rRef} className={`rvR ${rOn?"on":""}`}>
          <div className="lbl" style={{
            "--before-bg":T.red,
            color:T.red,
          }}>Quality Standards</div>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",
                      fontSize:"clamp(36px,4.5vw,60px)",
                      fontWeight:900,textTransform:"uppercase",
                      lineHeight:.9,letterSpacing:-1,
                      color:T.black,marginBottom:32}}>
            TURNING ATHLETES INTO<br/>
            <span style={{color:T.red}}>ELITE COMPETITORS</span>
          </h2>

          {/* service rows — Kontrek accordion style */}
          <div style={{marginBottom:36}}>
            {services.map((s,i) => (
              <div key={i} className="srow"
                   style={{display:"flex",alignItems:"center",
                           justifyContent:"space-between",
                           padding:"16px 0",gap:16}}>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                                fontSize:10,fontWeight:700,letterSpacing:2.5,
                                color:T.red,minWidth:24}}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                                fontSize:16,fontWeight:700,
                                textTransform:"uppercase",letterSpacing:.5,
                                color:T.black}}>
                    {s}
                  </span>
                </div>
                <ArrowDiag size={16} color={T.red}/>
              </div>
            ))}
          </div>

          <a href="/coaching" className="btn-r">
            Explore Coaching <ArrowRight size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// STATS BAR  (Kontrek: 4-col grid over a photo —
//             here: dark bg with full-width layout)
// ══════════════════════════════════════════════════════════════
function StatsBar() {
  const [ref,on] = useReveal();
  const stats = [
    {n:"10",s:"+",label:"Years Competing"},
    {n:"2", s:"", label:"National Shows"},
    {n:"200",s:"+",label:"Athletes Coached"},
    {n:"98",s:"%",label:"Client Retention"},
  ];
  return (
    <section style={{background:T.black,
                     borderTop:`1px solid ${T.bdrD}`,
                     borderBottom:`1px solid ${T.bdrD}`}}>
      <div ref={ref} className="g4s"
           style={{maxWidth:1360,margin:"0 auto",
                   display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
        {stats.map((s,i) => (
          <div key={i} style={{
            padding:"56px 48px",
            borderRight:i<3?`1px solid ${T.bdrD}`:"none",
            opacity:on?1:0,transform:on?"none":"translateY(20px)",
            transition:`opacity .8s cubic-bezier(.16,1,.3,1) ${i*.1}s,
                        transform .8s cubic-bezier(.16,1,.3,1) ${i*.1}s`,
          }}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                         fontSize:"clamp(52px,5vw,80px)",
                         fontWeight:900,color:"#fff",
                         lineHeight:1,letterSpacing:-2}}>
              <Counter to={s.n} suffix={s.s}/>
            </div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                         fontSize:10,fontWeight:700,letterSpacing:4,
                         textTransform:"uppercase",
                         color:T.boneDim,marginTop:8}}>
              {s.label}
            </div>
            <div style={{width:28,height:3,
                         background:T.red,marginTop:16}}/>
          </div>
        ))}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// SERVICES / TIERS  (Kontrek: "Building Smarter" white section ·
//                   left image · right expandable service rows)
// ══════════════════════════════════════════════════════════════
function Tiers() {
  const [open, setOpen] = useState(1);
  const [hRef,hOn] = useReveal();

  const tiers = [
    {
      n:"01",name:"Essentials",tag:"Foundation",
      ped:false,
      body:"Structured custom programming and macro targets for the dedicated lifter ready to commit to a real system.",
      includes:["Custom Training Program","Macro Coaching",
                "Monthly Check-In","Email Support — 48hr response"],
    },
    {
      n:"02",name:"Performance",tag:"Most Popular",
      ped:true,
      body:"Full-stack coaching for the serious enhanced athlete. Custom programming, full nutrition, and PED/AAS protocol consulting.",
      includes:["Fully Custom Training + Nutrition",
                "Bi-Weekly Check-Ins + 1 Mid-Cycle Adjustment",
                "WhatsApp Communication — 24hr response",
                "PED / AAS Protocol Consulting",
                "Bloodwork Review","Optional Monthly Call",
                "Contest Prep Available"],
    },
    {
      n:"03",name:"Elite",tag:"Maximum Access",
      ped:true,
      body:"For competitive bodybuilders who want me in their corner full-time. Maximum access, maximum results.",
      includes:["Everything in Performance",
                "Weekly Check-Ins + Unlimited Adjustments",
                "Same-Day Response",
                "Proactive Bloodwork Monitoring",
                "Peak Week Coaching","Bi-Weekly Calls"],
    },
  ];

  return (
    <section style={{background:T.bone2,padding:"100px 0"}}>
      <div style={{maxWidth:1360,margin:"0 auto",padding:"0 40px"}}>

        {/* section label + heading */}
        <div ref={hRef} className={`g2 rv ${hOn?"on":""}`}
             style={{display:"grid",gridTemplateColumns:"1fr 1fr",
                     gap:60,marginBottom:64,alignItems:"flex-end"}}>
          <div>
            <div className="lbl" style={{
              "WebkitTextFillColor":T.red,
            }}>Coaching Tiers</div>
            <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",
                        fontSize:"clamp(36px,5vw,68px)",
                        fontWeight:900,textTransform:"uppercase",
                        lineHeight:.9,letterSpacing:-1,color:T.black}}>
              BUILDING ELITE<br/>PHYSIQUES WITH<br/>
              <span style={{color:T.red}}>MODERN PROTOCOLS</span>
            </h2>
          </div>
          <p style={{fontFamily:"'DM Sans',sans-serif",
                     fontSize:14,fontWeight:300,
                     color:"rgba(6,6,8,.55)",lineHeight:1.9}}>
            Every tier is built entirely around you — your body, your goals,
            your competition schedule. No templates, no generic advice.
            Pricing is discussed after your application is reviewed and accepted.
          </p>
        </div>

        {/* Tier accordion rows */}
        <div style={{background:T.bone,
                     border:`1px solid ${T.bdrL}`,
                     marginBottom:3}}>
          {tiers.map((t,i) => (
            <div key={i} className="srow"
                 onClick={() => setOpen(open===i?-1:i)}
                 style={{borderBottom:i<tiers.length-1
                           ?`1px solid ${T.bdrL}`:"none"}}>

              {/* row header */}
              <div style={{display:"flex",alignItems:"center",
                           padding:"26px 36px",gap:24,flexWrap:"wrap"}}>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                              fontSize:11,fontWeight:700,letterSpacing:3,
                              color:T.red,minWidth:28}}>{t.n}</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                              fontSize:"clamp(18px,2.5vw,28px)",
                              fontWeight:900,textTransform:"uppercase",
                              letterSpacing:.5,color:T.black,flex:1}}>
                  {t.name}
                </span>
                {t.ped && (
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                                fontSize:9,fontWeight:700,letterSpacing:3,
                                textTransform:"uppercase",
                                color:"#fff",background:T.red,
                                padding:"4px 12px"}}>
                    PED / AAS
                  </span>
                )}
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                              fontSize:9,fontWeight:600,letterSpacing:3,
                              textTransform:"uppercase",
                              color:"rgba(6,6,8,.35)",
                              display:"flex",alignItems:"center",gap:10}}>
                  {t.tag}
                  <svg className="sarrow" width="18" height="18"
                       viewBox="0 0 24 24" fill="none"
                       stroke={open===i?T.red:"rgba(6,6,8,.3)"}
                       strokeWidth="2"
                       style={{transform:open===i?"rotate(90deg)":"none",
                               transition:"transform .3s, stroke .3s"}}>
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </span>
              </div>

              {/* expanded panel */}
              {open===i && (
                <div className="g2"
                     style={{display:"grid",
                             gridTemplateColumns:"1fr 1fr",gap:48,
                             padding:"0 36px 36px",
                             borderTop:`1px solid ${T.bdrL}`,
                             paddingTop:28}}>
                  <div>
                    <p style={{fontFamily:"'DM Sans',sans-serif",
                               fontSize:14,fontWeight:300,
                               color:"rgba(6,6,8,.6)",lineHeight:1.9,
                               marginBottom:28}}>
                      {t.body}
                    </p>
                    <a href="/apply" className="btn-r"
                       style={{fontSize:11}}>
                      Apply for {t.name} <ArrowRight size={12}/>
                    </a>
                  </div>
                  <ul style={{listStyle:"none",padding:0,
                              display:"flex",flexDirection:"column",
                              gap:12}}>
                    {t.includes.map((inc,j) => (
                      <li key={j}
                          style={{display:"flex",alignItems:"flex-start",
                                  gap:14}}>
                        <div style={{width:16,height:16,
                                     background:T.red,flexShrink:0,
                                     display:"flex",alignItems:"center",
                                     justifyContent:"center",marginTop:2}}>
                          <svg width="8" height="8" viewBox="0 0 24 24"
                               fill="none" stroke="#fff" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        </div>
                        <span style={{fontFamily:"'DM Sans',sans-serif",
                                      fontSize:13,fontWeight:300,
                                      color:"rgba(6,6,8,.65)",
                                      lineHeight:1.5}}>
                          {inc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* add-ons dark strip */}
        <div style={{background:T.black,padding:"22px 36px",
                     display:"flex",alignItems:"center",
                     justifyContent:"space-between",
                     flexWrap:"wrap",gap:16}}>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                         fontSize:9,fontWeight:700,letterSpacing:3.5,
                         textTransform:"uppercase",
                         color:T.boneDim,marginBottom:8}}>
              Add-On Services
            </div>
            <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>
              {["Standalone PED/AAS Consult",
                "Off-Season → Prep Transition",
                "Bloodwork Review Only"].map((a,i) => (
                <span key={i}
                      style={{fontFamily:"'Barlow Condensed',sans-serif",
                              fontSize:12,fontWeight:600,letterSpacing:2,
                              textTransform:"uppercase",color:T.bone,
                              display:"flex",alignItems:"center",gap:8}}>
                  <span style={{width:4,height:4,background:T.red,
                                display:"inline-block"}}/>
                  {a}
                </span>
              ))}
            </div>
          </div>
          <a href="/coaching"
             style={{fontFamily:"'Barlow Condensed',sans-serif",
                     fontSize:10,fontWeight:700,letterSpacing:3,
                     textTransform:"uppercase",
                     color:T.boneDim,
                     display:"flex",alignItems:"center",gap:8,
                     transition:"color .25s"}}
            onMouseEnter={e=>e.currentTarget.style.color=T.bone}
            onMouseLeave={e=>e.currentTarget.style.color=T.boneDim}>
            Full Coaching Details <ArrowRight size={12}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// PROCESS  (Kontrek: numbered plan/build/deliver button rows ·
//           left: steps · right: image + stat badge)
// ══════════════════════════════════════════════════════════════
function Process() {
  const [lRef,lOn] = useReveal();
  const [rRef,rOn] = useReveal();

  const steps = [
    {n:"01",title:"Apply — Tell Me Your Goals & History",
     sub:"Fill out the application with your training background, experience, and what you want to achieve. I review every application personally."},
    {n:"02",title:"Discovery Call — We Find Out If We're a Fit",
     sub:"A direct conversation about your goals, your current situation, and how I coach. I only take athletes I know I can get results with."},
    {n:"03",title:"Onboard — Your Custom Plan is Built",
     sub:"Your program, nutrition, and protocol is engineered from scratch based on everything we covered. No templates. No copy-paste."},
  ];

  return (
    <section style={{background:T.bone2,padding:"100px 0"}}>
      <div className="g2" style={{maxWidth:1360,margin:"0 auto",
                                   padding:"0 40px",display:"grid",
                                   gridTemplateColumns:"1fr 1fr",
                                   gap:80,alignItems:"center"}}>

        {/* LEFT — numbered step rows (Kontrek's plan/build/deliver) */}
        <div ref={lRef} className={`rvL ${lOn?"on":""}`}>
          <div className="lbl">The Process</div>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",
                      fontSize:"clamp(32px,4.5vw,58px)",
                      fontWeight:900,textTransform:"uppercase",
                      lineHeight:.9,letterSpacing:-1,
                      color:T.black,marginBottom:40}}>
            HOW WE BUILD<br/>
            <span style={{color:T.red}}>YOUR SYSTEM</span>
          </h2>

          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {steps.map((s,i) => (
              <div key={i}
                   style={{background:i===0?T.black:"rgba(6,6,8,.05)",
                           padding:"20px 24px",
                           transition:"background .25s",cursor:"default"}}
                onMouseEnter={e=>e.currentTarget.style.background=T.black}
                onMouseLeave={e=>e.currentTarget.style.background=
                  i===0?T.black:"rgba(6,6,8,.05)"}>
                <div style={{display:"flex",alignItems:"flex-start",
                             gap:16}}>
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                                fontSize:11,fontWeight:700,letterSpacing:3,
                                color:i===0?T.red:"rgba(6,6,8,.35)",
                                minWidth:28,marginTop:2}}>
                    {s.n}
                  </span>
                  <div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                                 fontSize:15,fontWeight:800,
                                 textTransform:"uppercase",letterSpacing:.5,
                                 color:i===0?T.bone:T.black,
                                 marginBottom:4}}>
                      {s.title}
                    </div>
                    <p style={{fontFamily:"'DM Sans',sans-serif",
                               fontSize:12,fontWeight:300,lineHeight:1.7,
                               color:i===0
                                 ?"rgba(240,235,225,.5)"
                                 :"rgba(6,6,8,.45)"}}>
                      {s.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — image with overlapping stat */}
        <div ref={rRef} className={`rvR ${rOn?"on":""}`}
             style={{position:"relative"}}>
          <div style={{aspectRatio:"1/1",
                       background:`linear-gradient(135deg,
                         #0e0e16,#060608)`,
                       border:`1px solid ${T.bdrL}`,
                       position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,
                         display:"flex",alignItems:"center",
                         justifyContent:"center",opacity:.05}}>
              <svg width="48" height="48" viewBox="0 0 24 24"
                   fill="none" stroke={T.bone} strokeWidth=".5">
                <rect x="3" y="3" width="18" height="18" rx="1"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
            </div>
          </div>

          {/* overlapping stat badge — Kontrek style */}
          <div style={{position:"absolute",bottom:36,left:-28,
                       background:"#fff",
                       border:`1px solid ${T.bdrL}`,
                       padding:"20px 24px",
                       boxShadow:"0 16px 48px rgba(0,0,0,.18)",
                       animation:"float 7s ease-in-out infinite .5s"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                         fontSize:48,fontWeight:900,
                         color:T.black,lineHeight:1,letterSpacing:-2}}>
              02<span style={{color:T.red}}>K+</span>
            </div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                         fontSize:9,fontWeight:700,letterSpacing:3.5,
                         textTransform:"uppercase",
                         color:"rgba(6,6,8,.4)",marginTop:6}}>
              Complete Projects
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// TESTIMONIAL  (Kontrek: centered single quote · white bg ·
//               nav arrows)
// ══════════════════════════════════════════════════════════════
function Testimonial() {
  const [idx, set] = useState(0);
  const [hRef,hOn] = useReveal();

  const quotes = [
    {q:"Zack doesn't just hand you a program — he builds you a complete system. My stage conditioning improved more in one prep cycle than the two before it combined.",
     name:"Client Name",role:"Competitive Bodybuilder"},
    {q:"The level of transparency around PED protocols is unlike anything I've experienced from a coach. Evidence-based, zero guessing, and he proactively stays on top of my bloodwork.",
     name:"Client Name",role:"NPC Competitor"},
    {q:"Three months in and I'm more dialed than I've ever been. The weekly check-ins keep me sharp and every adjustment has been exactly what I needed.",
     name:"Client Name",role:"Enhanced Recreational Athlete"},
  ];

  const prev = () => set((idx-1+quotes.length)%quotes.length);
  const next = () => set((idx+1)%quotes.length);

  return (
    <section style={{background:T.bone,padding:"100px 40px"}}>
      <div ref={hRef} className={`rv ${hOn?"on":""}`}
           style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>

        {/* avatar placeholder */}
        <div style={{width:80,height:80,borderRadius:"50%",
                     background:`linear-gradient(135deg,${T.black},${T.black3})`,
                     border:`2px solid ${T.bdrL}`,
                     margin:"0 auto 24px",
                     display:"flex",alignItems:"center",
                     justifyContent:"center"}}>
          <div style={{width:28,height:28,borderRadius:"50%",
                       background:T.red,opacity:.5}}/>
        </div>

        {/* name + role */}
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                     fontSize:11,fontWeight:700,letterSpacing:3.5,
                     textTransform:"uppercase",
                     color:"rgba(6,6,8,.4)",marginBottom:32,
                     display:"flex",alignItems:"center",
                     justifyContent:"center",gap:12}}>
          <span style={{width:24,height:1,
                        background:`rgba(6,6,8,.2)`,
                        display:"inline-block"}}/>
          {quotes[idx].name}, {quotes[idx].role}
          <span style={{width:24,height:1,
                        background:`rgba(6,6,8,.2)`,
                        display:"inline-block"}}/>
        </div>

        {/* quote */}
        <p key={idx}
           style={{fontFamily:"'Barlow Condensed',sans-serif",
                   fontSize:"clamp(20px,3vw,34px)",
                   fontWeight:700,textTransform:"uppercase",
                   lineHeight:1.2,letterSpacing:.5,
                   color:T.black,marginBottom:48,
                   animation:"fadeUp .5s ease both"}}>
          " {quotes[idx].q} "
        </p>

        {/* nav arrows — Kontrek left/right */}
        <div style={{display:"flex",alignItems:"center",
                     justifyContent:"center",gap:16}}>
          <button onClick={prev}
                  style={{width:48,height:48,
                          border:`1px solid ${T.bdrL}`,
                          display:"flex",alignItems:"center",
                          justifyContent:"center",
                          background:"none",cursor:"pointer",
                          transition:"all .25s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=T.black;e.currentTarget.style.borderColor=T.black}}
            onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor=T.bdrL}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke={T.black} strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          {quotes.map((_,i) => (
            <button key={i} onClick={() => set(i)}
                    style={{width:i===idx?28:7,height:7,
                            background:i===idx?T.red:"rgba(6,6,8,.15)",
                            border:"none",cursor:"pointer",
                            transition:"all .35s ease"}}/>
          ))}
          <button onClick={next}
                  style={{width:48,height:48,
                          border:`1px solid ${T.bdrL}`,
                          display:"flex",alignItems:"center",
                          justifyContent:"center",
                          background:"none",cursor:"pointer",
                          transition:"all .25s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=T.black;e.currentTarget.style.borderColor=T.black}}
            onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor=T.bdrL}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke={T.black} strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// TRANSFORMATIONS  (Kontrek: "Showcase Real Work" —
//                  left: label + description + CTA ·
//                  right: 3 cards with "RESULTS" ghost word)
// ══════════════════════════════════════════════════════════════
function Transformations() {
  const [lRef,lOn] = useReveal();
  const [rRef,rOn] = useReveal();

  const cards = [
    {label:"Competitive Prep",   sub:"NPC Bodybuilder"},
    {label:"Stage Conditioning", sub:"IFBB Competitor"},
    {label:"Off-Season Build",   sub:"Enhanced Athlete"},
  ];

  return (
    <section style={{background:T.bone2,padding:"100px 0"}}>
      <div style={{maxWidth:1360,margin:"0 auto",padding:"0 40px"}}>

        {/* header row — Kontrek split heading + ghost word */}
        <div style={{display:"flex",justifyContent:"space-between",
                     alignItems:"flex-end",marginBottom:56,
                     flexWrap:"wrap",gap:16}}>
          <div ref={lRef} className={`rvL ${lOn?"on":""}`}>
            <div className="lbl">Showcase Real Work</div>
            <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",
                        fontSize:"clamp(32px,5vw,68px)",
                        fontWeight:900,textTransform:"uppercase",
                        lineHeight:.9,letterSpacing:-1,color:T.black}}>
              REAL ATHLETES.<br/>REAL RESULTS.
            </h2>
          </div>
          {/* ghost word — Kontrek signature */}
          <div ref={rRef} className={`rvR ${rOn?"on":""}`}
               style={{fontFamily:"'Barlow Condensed',sans-serif",
                       fontSize:"clamp(60px,10vw,140px)",
                       fontWeight:900,textTransform:"uppercase",
                       letterSpacing:-4,lineHeight:1,userSelect:"none",
                       color:"transparent",
                       WebkitTextStroke:`2px rgba(6,6,8,.1)`}}>
            RESULTS
          </div>
        </div>

        {/* content: left text · right 3 cards */}
        <div className="g2" style={{display:"grid",
                                     gridTemplateColumns:"1fr 2fr",
                                     gap:60,alignItems:"start"}}>
          {/* left */}
          <div>
            <p style={{fontFamily:"'DM Sans',sans-serif",
                       fontSize:14,fontWeight:300,
                       color:"rgba(6,6,8,.55)",lineHeight:1.9,
                       marginBottom:32}}>
              We deliver real, measurable transformations backed
              by science, structured coaching, and relentless
              consistency. Every result earned.
            </p>
            <a href="/apply" className="btn-r">
              Apply Now <ArrowRight size={14}/>
            </a>
          </div>

          {/* right — 3 cards with "VIEW" circle on hover */}
          <div className="g3" style={{display:"grid",
                                       gridTemplateColumns:"repeat(3,1fr)",
                                       gap:3}}>
            {cards.map((c,i) => {
              const [cr,con] = useReveal(.08);
              return (
                <div key={i} ref={cr} className="pc"
                     style={{
                       position:"relative",overflow:"hidden",
                       aspectRatio:"2/3",
                       background:`linear-gradient(160deg,
                         #0e0e18,#06060a)`,
                       border:`1px solid ${T.bdrL}`,
                       cursor:"pointer",
                       opacity:con?1:0,
                       transform:con?"none":"translateY(24px)",
                       transition:`opacity .8s cubic-bezier(.16,1,.3,1) ${i*.1}s,
                                   transform .8s cubic-bezier(.16,1,.3,1) ${i*.1}s`,
                     }}>
                  {/* placeholder */}
                  <div style={{position:"absolute",inset:0,
                               display:"flex",alignItems:"center",
                               justifyContent:"center",opacity:.06}}>
                    <svg width="32" height="32" viewBox="0 0 24 24"
                         fill="none" stroke={T.bone} strokeWidth=".8">
                      <rect x="3" y="3" width="18" height="18" rx="1"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="m21 15-5-5L5 21"/>
                    </svg>
                  </div>
                  {/* hover overlay */}
                  <div className="po"
                       style={{position:"absolute",inset:0,
                               background:`linear-gradient(to top,
                                 rgba(6,6,8,.92) 0%,
                                 rgba(6,6,8,.3) 50%,
                                 transparent 100%)`,
                               opacity:0,transition:"opacity .35s"}}/>
                  {/* VIEW circle — Kontrek */}
                  <div className="pv"
                       style={{position:"absolute",
                               top:"50%",left:"50%",
                               transform:"translate(-50%,-50%) scale(.5)",
                               opacity:0,
                               transition:"transform .35s cubic-bezier(.16,1,.3,1), opacity .35s",
                               width:72,height:72,borderRadius:"50%",
                               background:T.red,
                               display:"flex",alignItems:"center",
                               justifyContent:"center"}}>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                                  fontSize:10,fontWeight:700,
                                  letterSpacing:2.5,textTransform:"uppercase",
                                  color:"#fff"}}>View</span>
                  </div>
                  {/* label */}
                  <div style={{position:"absolute",
                               bottom:18,left:18,right:18}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                                 fontSize:15,fontWeight:800,
                                 textTransform:"uppercase",
                                 letterSpacing:.5,color:"#fff"}}>
                      {c.label}
                    </div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                                 fontSize:9,fontWeight:600,
                                 letterSpacing:3,textTransform:"uppercase",
                                 color:T.red,marginTop:3}}>
                      {c.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// BLOG PREVIEW  (Kontrek style: label left · ghost BLOG right ·
//               3 cards below)
// ══════════════════════════════════════════════════════════════
function Blog() {
  const [hRef,hOn] = useReveal();
  const posts = [
    {cat:"PED / Harm Reduction",
     title:"Understanding Bloodwork: What Every Enhanced Athlete Must Monitor",
     date:"Feb 2025",read:"8 min"},
    {cat:"Contest Prep",
     title:"Peak Week Protocols: What Works, What Doesn't, and Why",
     date:"Jan 2025",read:"12 min"},
    {cat:"Training",
     title:"Progressive Overload for Advanced Athletes: Beyond Adding Weight",
     date:"Dec 2024",read:"6 min"},
  ];
  return (
    <section style={{background:T.black,padding:"100px 40px"}}>
      <div style={{maxWidth:1360,margin:"0 auto"}}>

        {/* header */}
        <div ref={hRef} className={`rv ${hOn?"on":""}`}
             style={{display:"flex",justifyContent:"space-between",
                     alignItems:"flex-end",marginBottom:56,
                     flexWrap:"wrap",gap:16}}>
          <div>
            <div className="lbl">From The Blog</div>
            <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",
                        fontSize:"clamp(32px,5vw,68px)",
                        fontWeight:900,textTransform:"uppercase",
                        lineHeight:.9,letterSpacing:-1,color:T.bone}}>
              LATEST ARTICLES
            </h2>
          </div>
          <div style={{display:"flex",alignItems:"flex-end",gap:24}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                         fontSize:"clamp(60px,8vw,120px)",
                         fontWeight:900,textTransform:"uppercase",
                         letterSpacing:-4,lineHeight:1,userSelect:"none",
                         color:"transparent",
                         WebkitTextStroke:`2px ${T.boneFaint}`}}>
              BLOG
            </div>
            <a href="/blog" className="btn-r"
               style={{marginBottom:8,fontSize:11}}>
              All Articles <ArrowRight size={12}/>
            </a>
          </div>
        </div>

        {/* cards */}
        <div className="g3" style={{display:"grid",
                                     gridTemplateColumns:"repeat(3,1fr)",
                                     gap:3}}>
          {posts.map((p,i) => {
            const [pr,pon] = useReveal(.08);
            return (
              <a key={i} href="/blog" ref={pr}
                 className="bc"
                 style={{display:"block",
                         background:T.black2,
                         border:`1px solid ${T.bdrD}`,
                         textDecoration:"none",overflow:"hidden",
                         opacity:pon?1:0,
                         transform:pon?"none":"translateY(24px)",
                         transition:`opacity .8s cubic-bezier(.16,1,.3,1) ${i*.1}s,
                                     transform .8s cubic-bezier(.16,1,.3,1) ${i*.1}s,
                                     box-shadow .3s`}}>
                {/* img placeholder */}
                <div style={{height:200,
                             background:`linear-gradient(135deg,
                               #0e0e18,#060608)`,
                             display:"flex",alignItems:"center",
                             justifyContent:"center",
                             position:"relative",
                             borderBottom:`1px solid ${T.bdrD}`}}>
                  <svg width="24" height="24" viewBox="0 0 24 24"
                       fill="none" stroke={T.boneFaint} strokeWidth=".8">
                    <rect x="3" y="3" width="18" height="18" rx="1"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="m21 15-5-5L5 21"/>
                  </svg>
                  <div style={{position:"absolute",top:14,left:14,
                               background:T.red,padding:"4px 10px"}}>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                                  fontSize:8,fontWeight:700,letterSpacing:3,
                                  textTransform:"uppercase",color:"#fff"}}>
                      {p.cat}
                    </span>
                  </div>
                </div>
                {/* content */}
                <div style={{padding:"24px 24px 28px"}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                               fontSize:17,fontWeight:800,
                               textTransform:"uppercase",letterSpacing:.5,
                               color:T.bone,lineHeight:1.2,
                               marginBottom:20}}>
                    {p.title}
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",
                               alignItems:"center"}}>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                                  fontSize:9,fontWeight:600,letterSpacing:3,
                                  textTransform:"uppercase",
                                  color:T.boneDim}}>
                      {p.date} · {p.read} read
                    </span>
                    <ArrowDiag size={15} color={T.red}/>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// FINAL CTA  (Kontrek footer-adjacent CTA — dark half ·
//             CTA text left · contact/social right)
// ══════════════════════════════════════════════════════════════
function CTA() {
  const [ref,on] = useReveal();
  return (
    <section style={{background:T.black2,
                     borderTop:`1px solid ${T.bdrD}`,
                     padding:"100px 40px"}}>
      <div ref={ref} className={`g2 rv ${on?"on":""}`}
           style={{maxWidth:1360,margin:"0 auto",
                   display:"grid",gridTemplateColumns:"1fr 1fr",
                   gap:80,alignItems:"center"}}>

        {/* left */}
        <div>
          <div className="lbl">Limited Spots Available</div>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",
                      fontSize:"clamp(48px,7vw,100px)",
                      fontWeight:900,textTransform:"uppercase",
                      lineHeight:.86,letterSpacing:-2,
                      color:T.bone,marginBottom:32}}>
            BUILDING ELITE<br/>PHYSIQUES FOR<br/>
            <span style={{color:T.red}}>DEDICATED<br/>ATHLETES</span>
          </h2>
          <a href="/apply" className="btn-r"
             style={{padding:"16px 44px",fontSize:13}}>
            Apply to Work With Me <ArrowRight size={15}/>
          </a>
        </div>

        {/* right — Kontrek contact info style */}
        <div style={{borderLeft:`1px solid ${T.bdrD}`,
                     paddingLeft:64}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",
                     fontSize:14,fontWeight:300,
                     color:T.boneDim,lineHeight:1.9,
                     marginBottom:40,maxWidth:380}}>
            Applications are reviewed personally. I only take
            athletes I know I can deliver real results with.
            Fill out the form — let's find out if we're a fit.
          </p>

          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            {[
              {label:"Instagram",val:"@zackprior",
               href:"https://instagram.com/zackprior"},
              {label:"Application",val:"Apply via form",href:"/apply"},
              {label:"Booking",val:"Calendly — post-application",href:"#"},
            ].map((item,i) => (
              <div key={i} style={{borderBottom:`1px solid ${T.bdrD}`,
                                   paddingBottom:20}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                             fontSize:9,fontWeight:700,letterSpacing:3.5,
                             textTransform:"uppercase",
                             color:T.boneDim,marginBottom:6}}>
                  {item.label}
                </div>
                <a href={item.href}
                   target={item.href.startsWith("http")?"_blank":undefined}
                   rel="noopener noreferrer"
                   style={{fontFamily:"'Barlow Condensed',sans-serif",
                           fontSize:16,fontWeight:700,
                           textTransform:"uppercase",letterSpacing:.5,
                           color:T.bone,
                           display:"flex",alignItems:"center",gap:10,
                           transition:"color .25s"}}
                  onMouseEnter={e=>e.currentTarget.style.color=T.red}
                  onMouseLeave={e=>e.currentTarget.style.color=T.bone}>
                  {item.val}
                  <ArrowDiag size={14} color="currentColor"/>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// FOOTER  (Kontrek: dark split — left tagline · right links)
// ══════════════════════════════════════════════════════════════
function Footer() {
  const cols = [
    {h:"Coaching", links:["Essentials","Performance","Elite","Apply Now"]},
    {h:"Content",  links:["Blog","Resources","About"]},
    {h:"Legal",    links:["Disclaimer","Terms of Service","Privacy Policy"]},
  ];
  return (
    <footer style={{background:`#030304`,
                    borderTop:`1px solid ${T.bdrD}`,
                    padding:"72px 40px 40px"}}>
      <div style={{maxWidth:1360,margin:"0 auto"}}>

        {/* top row */}
        <div className="g2" style={{display:"grid",
                                     gridTemplateColumns:"1.5fr 1fr 1fr 1fr",
                                     gap:48,marginBottom:64}}>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                         fontSize:28,fontWeight:900,letterSpacing:3,
                         color:T.bone,lineHeight:1,marginBottom:4}}>
              INVICTUS
            </div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                         fontSize:9,fontWeight:700,letterSpacing:5,
                         color:T.red,textTransform:"uppercase",
                         marginBottom:20}}>
              ELITE PERFORMANCE
            </div>
            <p style={{fontFamily:"'DM Sans',sans-serif",
                       fontSize:13,fontWeight:300,
                       color:T.boneDim,lineHeight:1.8,
                       maxWidth:280,marginBottom:28}}>
              Elite coaching for competitive bodybuilders
              and serious enhanced athletes. No bullshit.
              Just results.
            </p>
            <a href="https://instagram.com/zackprior"
               target="_blank" rel="noopener noreferrer"
               style={{display:"inline-flex",alignItems:"center",
                       gap:10,fontFamily:"'Barlow Condensed',sans-serif",
                       fontSize:10,fontWeight:700,letterSpacing:3.5,
                       textTransform:"uppercase",color:T.boneDim,
                       transition:"color .25s"}}
              onMouseEnter={e=>e.currentTarget.style.color=T.bone}
              onMouseLeave={e=>e.currentTarget.style.color=T.boneDim}>
              <svg width="13" height="13" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>
              </svg>
              @zackprior
            </a>
          </div>

          {cols.map((col,i) => (
            <div key={i}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",
                           fontSize:9,fontWeight:700,letterSpacing:4,
                           textTransform:"uppercase",color:T.boneDim,
                           marginBottom:20,paddingBottom:12,
                           borderBottom:`1px solid ${T.bdrD}`}}>
                {col.h}
              </div>
              <ul style={{listStyle:"none",padding:0,
                          display:"flex",flexDirection:"column",gap:14}}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#"
                       style={{fontFamily:"'Barlow Condensed',sans-serif",
                               fontSize:13,fontWeight:600,
                               letterSpacing:1.5,textTransform:"uppercase",
                               color:T.boneDim,transition:"color .25s"}}
                      onMouseEnter={e=>e.target.style.color=T.bone}
                      onMouseLeave={e=>e.target.style.color=T.boneDim}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* disclaimer */}
        <div style={{borderTop:`1px solid ${T.bdrD}`,
                     paddingTop:28,marginBottom:20}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",
                     fontSize:11,fontWeight:300,
                     color:"rgba(240,235,225,.18)",
                     lineHeight:1.8,maxWidth:900}}>
            <strong style={{fontWeight:500,
                            color:"rgba(240,235,225,.28)"}}>
              Disclaimer:
            </strong>{" "}
            Zack Prior is not a medical professional. All content is
            for informational and educational purposes only and does not
            constitute medical advice. Consult a licensed physician before
            beginning any supplementation, drug protocol, or training
            program. Use of performance-enhancing substances carries
            inherent risks.
          </p>
        </div>

        {/* bottom bar */}
        <div style={{display:"flex",justifyContent:"space-between",
                     alignItems:"center",flexWrap:"wrap",gap:12}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                        fontSize:9,fontWeight:600,letterSpacing:3.5,
                        textTransform:"uppercase",
                        color:"rgba(240,235,225,.14)"}}>
            © 2025 Invictus Elite Performance · All Rights Reserved
          </span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",
                        fontSize:9,fontWeight:600,letterSpacing:3.5,
                        textTransform:"uppercase",
                        color:"rgba(240,235,225,.14)"}}>
            Built for those who earn it.
          </span>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════
export default function App() {
  useEffect(() => {
    // inject fonts
    if (!document.getElementById("iv-fonts")) {
      const l = document.createElement("link");
      l.id = "iv-fonts"; l.rel = "stylesheet"; l.href = FONTS;
      document.head.appendChild(l);
    }
  }, []);

  return (
    <>
      <GlobalCSS />
      <Nav />
      <Hero />
      <Ticker />
      <Pillars />
      <AboutSplit />
      <StatsBar />
      <Tiers />
      <Process />
      <Testimonial />
      <Transformations />
      <Blog />
      <CTA />
      <Footer />
    </>
  );
}
