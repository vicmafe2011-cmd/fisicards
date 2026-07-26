"use client";

import { useEffect, useMemo, useState } from "react";

type StatKey = "teo" | "exp" | "imp";
type View = "collection" | "duel" | "ranking" | "rules";

type Physicist = {
  id: string;
  number: number;
  name: string;
  dates: string;
  category: string;
  color: string;
  image: string;
  ability: string;
  effect: string;
  abilityStat: StatKey;
  teo: number;
  exp: number;
  imp: number;
  epithet: string;
  summary: string;
  challenge: string;
  cue: string;
};

const physicists: Physicist[] = [
  { id:"galileo",number:1,name:"Galileo Galilei",dates:"1564–1642",category:"Mecánica",color:"#e8ad29",image:"/cards/FIS-S01-001_Galileo_Galilei_frente_69x94mm.png",ability:"Caída controlada",effect:"Si distingue masa y aceleración, suma +3 EXP.",abilityStat:"exp",teo:96,exp:99,imp:100,epithet:"El cielo se observa y el movimiento se mide",summary:"Combinó observación, experimento y razonamiento matemático. Sus estudios del movimiento y sus observaciones telescópicas ayudaron a sustituir la autoridad por pruebas reproducibles.",challenge:"Dos objetos parten del reposo y caen durante el mismo tiempo en vacío. ¿Cuál llega antes?",cue:"Distingue masa, aceleración gravitatoria y resistencia del aire." },
  { id:"newton",number:2,name:"Isaac Newton",dates:"1643–1727",category:"Mecánica",color:"#e8ad29",image:"/cards/FIS-S01-002_Isaac_Newton_frente_69x94mm.png",ability:"Gravitación universal",effect:"Si relaciona fuerza, masa y aceleración, suma +3 TEÓ.",abilityStat:"teo",teo:100,exp:98,imp:100,epithet:"Las mismas leyes mueven la Tierra y el cielo",summary:"Formuló leyes capaces de describir desde una caída hasta una órbita. Su síntesis del movimiento y la gravitación convirtió muchos fenómenos en problemas calculables.",challenge:"¿Qué fuerza neta acelera 4 kg a 2 m/s²?",cue:"Escribe F = m·a, sustituye y conserva las unidades." },
  { id:"faraday",number:3,name:"Michael Faraday",dates:"1791–1867",category:"Electromagnetismo",color:"#20b7b4",image:"/cards/FIS-S01-003_Michael_Faraday_frente_69x94mm.png",ability:"Inducción",effect:"Si explica un cambio de flujo magnético, suma +3 EXP.",abilityStat:"exp",teo:94,exp:100,imp:99,epithet:"Mover un imán puede crear corriente",summary:"Descubrió relaciones fundamentales entre electricidad y magnetismo mediante experimentos ingeniosos y mostró que un campo magnético cambiante puede inducir corriente.",challenge:"¿Cuándo se induce más corriente: con el imán quieto o moviéndolo rápidamente?",cue:"Busca qué situación cambia más deprisa el flujo magnético." },
  { id:"maxwell",number:4,name:"James C. Maxwell",dates:"1831–1879",category:"Electromagnetismo",color:"#20b7b4",image:"/cards/FIS-S01-004_James_C_Maxwell_frente_69x94mm.png",ability:"Campo unificado",effect:"Si conecta electricidad, magnetismo y luz, suma +3 TEÓ.",abilityStat:"teo",teo:100,exp:96,imp:100,epithet:"Electricidad, magnetismo y luz: un mismo campo",summary:"Reunió resultados dispersos en una teoría del campo electromagnético. Sus ecuaciones predijeron ondas y revelaron que la luz pertenece a esa misma familia.",challenge:"Ordena radio, luz visible y rayos X de menor a mayor frecuencia.",cue:"Relaciona frecuencia alta con longitud de onda corta." },
  { id:"curie",number:5,name:"Marie Curie",dates:"1867–1934",category:"Radiactividad",color:"#dc533c",image:"/cards/FIS-S01-005_Marie_Curie_frente_69x94mm.png",ability:"Doble Nobel",effect:"Si identifica una evidencia experimental, suma +3 EXP.",abilityStat:"exp",teo:97,exp:100,imp:100,epithet:"Medir la energía que nace del átomo",summary:"Investigó sistemáticamente la radiactividad y aisló nuevos elementos. Su trabajo abrió caminos decisivos en física nuclear y medicina.",challenge:"Una muestra empieza con 64 g. ¿Cuánto queda tras tres vidas medias?",cue:"Divide entre dos en cada etapa y muestra la secuencia." },
  { id:"einstein",number:6,name:"Albert Einstein",dates:"1879–1955",category:"Relatividad",color:"#3c86c8",image:"/cards/FIS-S01-006_Albert_Einstein_frente_69x94mm.png",ability:"Espacio-tiempo",effect:"Si reconoce el sistema de referencia, suma +3 TEÓ.",abilityStat:"teo",teo:100,exp:94,imp:100,epithet:"El espacio y el tiempo dependen del movimiento",summary:"Reformuló espacio, tiempo y gravedad. También explicó el efecto fotoeléctrico mediante cuantos de luz, conectando relatividad y física cuántica.",challenge:"¿Por qué un sistema GPS no puede ignorar por completo la relatividad?",cue:"Relaciona relojes, velocidad, gravedad y error acumulado." },
  { id:"planck",number:7,name:"Max Planck",dates:"1858–1947",category:"Cuántica",color:"#7756a8",image:"/cards/FIS-S01-007_Max_Planck_frente_69x94mm.png",ability:"Cuanto de energía",effect:"Si usa niveles discretos de energía, suma +3 TEÓ.",abilityStat:"teo",teo:99,exp:92,imp:100,epithet:"La energía llega en paquetes",summary:"Propuso que la energía se intercambia en cantidades discretas. Ese paso resolvió la radiación térmica e inició la revolución cuántica.",challenge:"Entre luz roja y violeta, ¿qué fotón tiene más energía?",cue:"Compara sus frecuencias y usa E = h·f." },
  { id:"bohr",number:8,name:"Niels Bohr",dates:"1885–1962",category:"Cuántica",color:"#7756a8",image:"/cards/FIS-S01-008_Niels_Bohr_frente_69x94mm.png",ability:"Salto cuántico",effect:"Si justifica una transición de nivel, suma +3 TEÓ.",abilityStat:"teo",teo:98,exp:95,imp:99,epithet:"El átomo cambia mediante saltos",summary:"Propuso un modelo con estados de energía permitidos. Aunque después fue superado, explicó el espectro del hidrógeno y consolidó las transiciones cuánticas.",challenge:"Si un electrón baja de energía, ¿absorbe o emite un fotón?",cue:"Sigue el balance energético del átomo." },
  { id:"schrodinger",number:9,name:"Erwin Schrödinger",dates:"1887–1961",category:"Cuántica",color:"#7756a8",image:"/cards/FIS-S01-009_Erwin_Schrodinger_frente_69x94mm.png",ability:"Función de onda",effect:"Si diferencia estado y medición, suma +3 TEÓ.",abilityStat:"teo",teo:100,exp:91,imp:99,epithet:"Una ecuación para las posibilidades",summary:"Formuló una ecuación central de la mecánica cuántica. La función de onda describe amplitudes relacionadas con probabilidades de medición.",challenge:"¿La función de onda predice siempre un único resultado individual?",cue:"Diferencia predicción probabilística y resultado medido." },
  { id:"heisenberg",number:10,name:"Werner Heisenberg",dates:"1901–1976",category:"Cuántica",color:"#7756a8",image:"/cards/FIS-S01-010_Werner_Heisenberg_frente_69x94mm.png",ability:"Incertidumbre",effect:"Si identifica magnitudes conjugadas, suma +3 TEÓ.",abilityStat:"teo",teo:100,exp:92,imp:99,epithet:"La naturaleza impone límites a la precisión",summary:"Creó una formulación matricial de la mecánica cuántica y estableció relaciones de incertidumbre que no dependen solo de la calidad del instrumento.",challenge:"Si disminuye Δx, ¿qué debe ocurrir con la incertidumbre mínima Δp?",cue:"Razona con el producto de ambas incertidumbres." },
  { id:"meitner",number:11,name:"Lise Meitner",dates:"1878–1968",category:"Radiactividad",color:"#dc533c",image:"/cards/FIS-S01-011_Lise_Meitner_frente_69x94mm.png",ability:"Fisión nuclear",effect:"Si conserva masa-energía al explicar el proceso, suma +3 TEÓ.",abilityStat:"teo",teo:98,exp:99,imp:99,epithet:"Comprender cómo se parte el núcleo",summary:"Interpretó físicamente la fisión nuclear observada en experimentos y explicó su enorme energía mediante la equivalencia entre masa y energía.",challenge:"¿Por qué la masa final puede ser menor sin violar la conservación?",cue:"Habla de conservación conjunta de masa y energía." },
  { id:"feynman",number:12,name:"Richard Feynman",dates:"1918–1988",category:"Cuántica",color:"#7756a8",image:"/cards/FIS-S01-012_Richard_Feynman_frente_69x94mm.png",ability:"Caminos posibles",effect:"Si representa interacciones con un diagrama, suma +3 EXP.",abilityStat:"exp",teo:99,exp:98,imp:100,epithet:"Dibujar interacciones para calcular",summary:"Desarrolló herramientas para la electrodinámica cuántica y una manera visual de organizar interacciones entre partículas.",challenge:"Dibuja dos líneas de materia que intercambian un fotón y etiqueta la interacción.",cue:"Diferencia partículas externas y partícula intercambiada." },
  { id:"chandrasekhar",number:13,name:"S. Chandrasekhar",dates:"1910–1995",category:"Astrofísica",color:"#3c86c8",image:"/cards/FIS-S01-013_S_Chandrasekhar_frente_69x94mm.png",ability:"Límite estelar",effect:"Si relaciona masa y destino estelar, suma +3 TEÓ.",abilityStat:"teo",teo:100,exp:94,imp:99,epithet:"La masa decide el destino de una estrella",summary:"Calculó que una enana blanca no puede sostener cualquier masa. Su límite conectó física cuántica, relatividad y evolución estelar.",challenge:"¿Qué indica el límite: tamaño, temperatura o masa máxima de una enana blanca?",cue:"Identifica la magnitud física que aparece en el enunciado." },
  { id:"rubin",number:14,name:"Vera Rubin",dates:"1928–2016",category:"Astrofísica",color:"#3c86c8",image:"/cards/FIS-S01-014_Vera_Rubin_frente_69x94mm.png",ability:"Rotación invisible",effect:"Si interpreta una curva de rotación, suma +3 EXP.",abilityStat:"exp",teo:96,exp:100,imp:99,epithet:"Las galaxias giran como si faltara materia visible",summary:"Obtuvo evidencias observacionales decisivas al medir la rotación de galaxias: sus estrellas exteriores se movían demasiado rápido para la materia visible estimada.",challenge:"¿Qué comparación revela el problema: velocidad esperada frente a observada, o color frente a edad?",cue:"Piensa qué magnitud mide una curva de rotación." },
  { id:"hawking",number:15,name:"Stephen Hawking",dates:"1942–2018",category:"Astrofísica",color:"#3c86c8",image:"/cards/FIS-S01-015_Stephen_Hawking_frente_69x94mm.png",ability:"Radiación del horizonte",effect:"Si conecta gravedad y cuántica, suma +3 TEÓ.",abilityStat:"teo",teo:100,exp:88,imp:100,epithet:"Incluso un agujero negro puede radiar",summary:"Combinó relatividad, teoría cuántica y termodinámica para estudiar agujeros negros y el universo temprano.",challenge:"Si un agujero negro emite energía durante mucho tiempo, ¿qué ocurre con su masa?",cue:"Aplica la equivalencia entre masa y energía." },
  { id:"wu",number:16,name:"Chien-Shiung Wu",dates:"1912–1997",category:"Experimentación",color:"#dc533c",image:"/cards/FIS-S01-016_Chien_Shiung_Wu_frente_69x94mm.png",ability:"Paridad rota",effect:"Si describe qué variable se invierte, suma +3 EXP.",abilityStat:"exp",teo:97,exp:100,imp:99,epithet:"El espejo no siempre conserva las leyes",summary:"Dirigió el experimento que demostró la violación de paridad en la interacción débil y cambió una simetría que se creía universal.",challenge:"¿La violación de paridad afirma que el experimento real y su espejo son siempre equivalentes?",cue:"Compara la predicción simétrica con el resultado observado." },
];

const statMeta: Record<StatKey,{short:string;name:string;color:string}> = {
  teo:{short:"TEÓ",name:"Teoría",color:"#21c2c0"},
  exp:{short:"EXP",name:"Experimento",color:"#ef6347"},
  imp:{short:"IMP",name:"Impacto",color:"#efbd3d"},
};

const nav: {id:View;label:string;icon:string}[] = [
  {id:"collection",label:"Colección",icon:"▦"},
  {id:"duel",label:"Arena",icon:"⚔"},
  {id:"ranking",label:"Ranking",icon:"♛"},
  {id:"rules",label:"Cómo jugar",icon:"?"},
];

const getPower = (item: Physicist) => item.teo + item.exp + item.imp;
const cardCode = (item: Physicist) => `FIS-S01-${String(item.number).padStart(3,"0")}`;

function readArray(key:string) {
  if (typeof window === "undefined") return [] as string[];
  try { const value=JSON.parse(localStorage.getItem(key)||"[]"); return Array.isArray(value)?value:[]; } catch { return []; }
}
function readWins() {
  if (typeof window === "undefined") return {} as Record<string,number>;
  try { return JSON.parse(localStorage.getItem("fisicards-wins")||"{}"); } catch { return {}; }
}

function Stat({stat,value,active=false}:{stat:StatKey;value:number;active?:boolean}) {
  const meta=statMeta[stat];
  return <span className={`stat ${active?"active":""}`} style={{"--stat":meta.color} as React.CSSProperties}><small>{meta.short}</small><b>{value}</b></span>;
}

export default function Home() {
  const [view,setView]=useState<View>("collection");
  const [owned,setOwned]=useState<Set<string>>(()=>new Set(readArray("fisicards-owned")));
  const [done,setDone]=useState<Set<string>>(()=>new Set(readArray("fisicards-challenges")));
  const [wins,setWins]=useState<Record<string,number>>(()=>readWins());
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("Todas");
  const [selected,setSelected]=useState("galileo");
  const [a,setA]=useState("galileo");
  const [b,setB]=useState("einstein");
  const [stat,setStat]=useState<StatKey>("teo");
  const [rounds,setRounds]=useState<{stat:StatKey;scoreA:number;scoreB:number;winner:"A"|"B"|"tie"}[]>([]);
  const [bonusA,setBonusA]=useState(false);
  const [bonusB,setBonusB]=useState(false);

  useEffect(()=>localStorage.setItem("fisicards-owned",JSON.stringify([...owned])),[owned]);
  useEffect(()=>localStorage.setItem("fisicards-challenges",JSON.stringify([...done])),[done]);
  useEffect(()=>localStorage.setItem("fisicards-wins",JSON.stringify(wins)),[wins]);

  const categories=["Todas",...new Set(physicists.map(x=>x.category))];
  const active=physicists.find(x=>x.id===selected) || physicists[0];
  const fighterA=physicists.find(x=>x.id===a)!;
  const fighterB=physicists.find(x=>x.id===b)!;
  const used=new Set(rounds.map(x=>x.stat));
  const scoreA=rounds.filter(x=>x.winner==="A").length;
  const scoreB=rounds.filter(x=>x.winner==="B").length;
  const duelOver=scoreA===2||scoreB===2||rounds.length===3;

  const filtered=useMemo(()=>physicists.filter(x=>{
    const q=query.trim().toLocaleLowerCase("es");
    return (category==="Todas"||x.category===category)&&(!q||`${x.name} ${x.ability} ${x.category}`.toLocaleLowerCase("es").includes(q));
  }),[query,category]);
  const ranking=useMemo(()=>[...physicists].sort((x,y)=>(wins[y.id]||0)-(wins[x.id]||0)||getPower(y)-getPower(x)),[wins]);

  function toggle(setter:React.Dispatch<React.SetStateAction<Set<string>>>,id:string) {
    setter(current=>{const next=new Set(current);next.has(id)?next.delete(id):next.add(id);return next;});
  }
  function switchView(next:View){setView(next);document.querySelector("#contenido")?.scrollIntoView({behavior:"smooth"});}
  function resetDuel(){setRounds([]);setStat("teo");setBonusA(false);setBonusB(false);}
  function resolveRound(){
    if(used.has(stat)||duelOver)return;
    const score1=fighterA[stat]+(bonusA&&fighterA.abilityStat===stat?3:0);
    const score2=fighterB[stat]+(bonusB&&fighterB.abilityStat===stat?3:0);
    const winner=score1===score2?"tie":score1>score2?"A":"B";
    const next=[...rounds,{stat,scoreA:score1,scoreB:score2,winner}] as typeof rounds;
    setRounds(next);setBonusA(false);setBonusB(false);
    const nextA=next.filter(x=>x.winner==="A").length;
    const nextB=next.filter(x=>x.winner==="B").length;
    if(nextA===2||nextB===2||next.length===3){
      const winnerId=nextA===nextB?(getPower(fighterA)>=getPower(fighterB)?fighterA.id:fighterB.id):(nextA>nextB?fighterA.id:fighterB.id);
      setWins(current=>({...current,[winnerId]:(current[winnerId]||0)+1}));
    } else {
      const nextStat=(Object.keys(statMeta) as StatKey[]).find(key=>!next.some(x=>x.stat===key));
      if(nextStat)setStat(nextStat);
    }
  }

  return <main>
    <header className="topbar">
      <button className="brand" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Volver al inicio">
        <span className="brand-mark">Φ</span><span><b><em>Mimoa</em> FisiCards</b><small>Arquitectos del universo</small></span>
      </button>
      <nav aria-label="Navegación principal">{nav.map(item=><button key={item.id} className={view===item.id?"active":""} onClick={()=>switchView(item.id)}><span>{item.icon}</span>{item.label}</button>)}</nav>
      <div className="progress"><b>{owned.size}/16</b><small>coleccionadas</small></div>
    </header>

    <section className="hero">
      <div className="orbits"/>
      <div className="hero-copy">
        <span className="kicker">Mimoa Learning Cards · Serie 01</span>
        <h1>El universo<br/>también tiene <em>poder.</em></h1>
        <p>Colecciona a 16 grandes figuras de la física. Domina la teoría, el experimento y el impacto. Justifica tu habilidad y conquista la arena.</p>
        <div className="hero-actions"><button className="primary" onClick={()=>switchView("duel")}>Entrar en la arena →</button><button className="secondary" onClick={()=>switchView("collection")}>Explorar las cartas</button></div>
        <div className="hero-numbers"><span><b>16</b><small>cartas legendarias</small></span><span><b>{owned.size}</b><small>en tu colección</small></span><span><b>{done.size}</b><small>retos superados</small></span></div>
      </div>
      <div className="hero-cards">
        <img className="card left" src={physicists[0].image} alt="FisiCard de Galileo Galilei"/>
        <img className="card center" src={physicists[4].image} alt="FisiCard de Marie Curie"/>
        <img className="card right" src={physicists[15].image} alt="FisiCard de Chien-Shiung Wu"/>
        <span className="power-badge">PF 300<small>Poder máximo</small></span>
      </div>
    </section>

    <section className="formula" aria-label="Fórmula del poder físico"><div><small>Poder físico</small><b>PF</b></div><i>=</i>{(Object.keys(statMeta) as StatKey[]).map((key,index)=><div key={key} style={{"--stat":statMeta[key].color} as React.CSSProperties}><b>{statMeta[key].short}</b><small>{statMeta[key].name}</small>{index<2&&<i>+</i>}</div>)}<p>La cifra abre el duelo. La explicación activa la habilidad.</p></section>

    <div id="contenido">
      {view==="collection"&&<section className="content collection">
        <div className="heading"><span>01</span><div><small>Serie fundadores</small><h2>Arquitectos del universo</h2></div><p>Marca las cartas físicas que ya tienes y abre cada ficha para descubrir su reto, habilidad y poder físico.</p></div>
        <div className="tools"><label><span>⌕</span><input aria-label="Buscar cartas" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar figura o habilidad"/></label><div>{categories.map(item=><button className={category===item?"active":""} key={item} onClick={()=>setCategory(item)}>{item}</button>)}</div><small>{filtered.length} cartas</small></div>
        <div className="grid">{filtered.map(item=><article className={`tile ${selected===item.id?"selected":""}`} style={{"--accent":item.color} as React.CSSProperties} key={item.id}>
          <button className="tile-image" onClick={()=>setSelected(item.id)}><img src={item.image} alt={`FisiCard de ${item.name}`}/><span>Ver ficha</span></button>
          <footer><div><small>{cardCode(item)}</small><b>PF {getPower(item)}</b></div><button className={owned.has(item.id)?"owned":""} onClick={()=>toggle(setOwned,item.id)}>{owned.has(item.id)?"✓ Conseguida":"+ La tengo"}</button></footer>
        </article>)}</div>
        <article className="dossier" style={{"--accent":active.color} as React.CSSProperties}>
          <div className="dossier-image"><img src={active.image} alt={`Carta completa de ${active.name}`}/></div>
          <div className="dossier-copy"><div className="eyebrow"><span>Perfil {cardCode(active)}</span><span>{active.category}</span></div><h2>{active.name}</h2><small>{active.dates} · Legendaria</small><h3>{active.epithet}</h3><p>{active.summary}</p>
            <div className="stats"><Stat stat="teo" value={active.teo}/><Stat stat="exp" value={active.exp}/><Stat stat="imp" value={active.imp}/><span className="total"><small>Poder físico</small><b>{getPower(active)}</b></span></div>
            <div className="ability"><small>Habilidad especial</small><h4>{active.ability}</h4><p>{active.effect}</p></div>
            <div className={`challenge ${done.has(active.id)?"done":""}`}><small>Reto del álbum</small><p>{active.challenge}</p><span>{active.cue}</span><button onClick={()=>toggle(setDone,active.id)}>{done.has(active.id)?"✓ Reto superado":"Marcar como superado"}</button></div>
            <div className="dossier-actions"><button className="primary" onClick={()=>{setA(active.id);resetDuel();switchView("duel")}}>Llevar a la arena</button><button className="secondary" onClick={()=>toggle(setOwned,active.id)}>{owned.has(active.id)?"✓ Carta conseguida":"+ Añadir a mi colección"}</button></div>
          </div>
        </article>
      </section>}

      {view==="duel"&&<section className="content arena">
        <div className="heading"><span>02</span><div><small>Arena FisiCards</small><h2>Duelo de arquitectos</h2></div><p>Elige dos cartas. Cada atributo se juega una sola vez. Gana quien conquista dos rondas.</p></div>
        <div className="selectors"><label>Jugador 1<select value={a} onChange={e=>{setA(e.target.value);resetDuel()}}>{physicists.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label><b>VS</b><label>Jugador 2<select value={b} onChange={e=>{setB(e.target.value);resetDuel()}}>{physicists.filter(x=>x.id!==a).map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label></div>
        <div className="fighters"><div><img src={fighterA.image} alt={fighterA.name}/><h3>{fighterA.name}</h3><div className="mini-stats"><Stat stat="teo" value={fighterA.teo} active={stat==="teo"}/><Stat stat="exp" value={fighterA.exp} active={stat==="exp"}/><Stat stat="imp" value={fighterA.imp} active={stat==="imp"}/></div></div><strong>{scoreA}<small>RONDAS</small>{scoreB}</strong><div><img src={fighterB.image} alt={fighterB.name}/><h3>{fighterB.name}</h3><div className="mini-stats"><Stat stat="teo" value={fighterB.teo} active={stat==="teo"}/><Stat stat="exp" value={fighterB.exp} active={stat==="exp"}/><Stat stat="imp" value={fighterB.imp} active={stat==="imp"}/></div></div></div>
        <div className="console"><div className="console-head"><div><small>Ronda {Math.min(rounds.length+1,3)} de 3</small><h3>{duelOver?"Duelo terminado":"Elige el atributo"}</h3></div><button onClick={resetDuel}>Reiniciar duelo</button></div>
          {!duelOver&&<><div className="stat-picker">{(Object.keys(statMeta) as StatKey[]).map(key=><button key={key} disabled={used.has(key)} className={stat===key?"active":""} style={{"--stat":statMeta[key].color} as React.CSSProperties} onClick={()=>setStat(key)}><b>{statMeta[key].short}</b><span>{statMeta[key].name}</span>{used.has(key)&&<small>Usado</small>}</button>)}</div>
          <div className="bonuses"><label><input type="checkbox" checked={bonusA} disabled={fighterA.abilityStat!==stat} onChange={e=>setBonusA(e.target.checked)}/><span><b>{fighterA.ability}</b><small>Activar +3 si justificas la condición</small></span></label><label><input type="checkbox" checked={bonusB} disabled={fighterB.abilityStat!==stat} onChange={e=>setBonusB(e.target.checked)}/><span><b>{fighterB.ability}</b><small>Activar +3 si justificas la condición</small></span></label></div>
          <button className="primary resolve" onClick={resolveRound}>Resolver la ronda</button></>}
          {duelOver&&<div className="winner"><small>Resultado final</small><h3>{scoreA===scoreB?(getPower(fighterA)>=getPower(fighterB)?fighterA.name:fighterB.name):scoreA>scoreB?fighterA.name:fighterB.name} conquista la arena</h3><p>{scoreA}–{scoreB} · En caso de empate decide el poder físico total.</p></div>}
          {rounds.length>0&&<div className="history">{rounds.map((r,i)=><div key={r.stat}><span>Ronda {i+1}</span><b style={{color:statMeta[r.stat].color}}>{statMeta[r.stat].short}</b><span>{r.scoreA} — {r.scoreB}</span><strong>{r.winner==="tie"?"Empate":r.winner==="A"?fighterA.name:fighterB.name}</strong></div>)}</div>}
        </div>
      </section>}

      {view==="ranking"&&<section className="content ranking">
        <div className="heading"><span>03</span><div><small>Salón de la fama</small><h2>Ranking FisiCards</h2></div><p>Las victorias quedan guardadas en este dispositivo. En igualdad, decide el poder físico total.</p></div>
        <div className="podium">{ranking.slice(0,3).map((item,index)=><article key={item.id} className={`place p${index+1}`}><span>{index+1}</span><img src={item.image} alt={item.name}/><h3>{item.name}</h3><b>{wins[item.id]||0} victorias</b><small>PF {getPower(item)}</small></article>)}</div>
        <div className="rank-table"><div><b>#</b><b>Figura</b><b>PF</b><b>Victorias</b></div>{ranking.map((item,index)=><div key={item.id}><span>{String(index+1).padStart(2,"0")}</span><span><i style={{background:item.color}}/>{item.name}<small>{item.category}</small></span><b>{getPower(item)}</b><strong>{wins[item.id]||0}</strong></div>)}</div>
      </section>}

      {view==="rules"&&<section className="content rules">
        <div className="heading"><span>04</span><div><small>Manual de juego</small><h2>Cómo jugar</h2></div><p>Las cifras importan, pero una habilidad solo se activa cuando la explicación es correcta.</p></div>
        <div className="rules-grid">{[["1","Colecciona","Marca las cartas físicas que ya tienes y completa los retos del álbum."],["2","Elige","Selecciona dos FisiCards y un atributo que todavía no se haya usado."],["3","Justifica","Activa el +3 únicamente si puedes explicar la condición de la habilidad."],["4","Combate","Compara las puntuaciones. Dos rondas ganadas conquistan el duelo."]].map(item=><article key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div>
        <div className="guide"><div><h3>PF = TEÓ + EXP + IMP</h3><p>El poder físico resume la carta, pero cada duelo obliga a elegir estratégicamente qué atributo usar primero.</p></div>{(Object.keys(statMeta) as StatKey[]).map(key=><article key={key} style={{"--stat":statMeta[key].color} as React.CSSProperties}><b>{statMeta[key].short}</b><h4>{statMeta[key].name}</h4><p>{key==="teo"?"Modelización, explicación y fuerza conceptual.":key==="exp"?"Observación, medición y contraste de hipótesis.":"Influencia histórica y alcance de las aportaciones."}</p></article>)}</div>
      </section>}
    </div>
    <footer className="site-footer"><div className="brand"><span className="brand-mark">Φ</span><span><b><em>Mimoa</em> FisiCards</b><small>Arquitectos del universo</small></span></div><p>Una colección de Mimoa Paper · Víctor Manuel Ferrer García · 2026</p></footer>
  </main>;
}
