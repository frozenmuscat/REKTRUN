import type {CSSProperties} from "react";
import type {Metadata} from "next";

export const metadata:Metadata={title:"REKTRUN — Enter the Wild Chain",description:"Run, fight Guardians, collect Core Shards, and climb the Robinhood Chain leaderboard."};
const sprite=(column:number,row:number)=>({"--sprite-x":`${column*33.333}%`,"--sprite-y":`${row*33.333}%`} as CSSProperties);
const runners=[
 {name:"BYTE",role:"BALANCED",color:"#b8ff39",column:0},
 {name:"NOVA",role:"TWIN BLADE",color:"#47eaff",column:1},
 {name:"EMBER",role:"HEAVY CLEAVE",color:"#ff7039",column:2},
 {name:"VOID",role:"PHASE STRIKE",color:"#b34dff",column:3}
];
const zones=[
 {number:"01",name:"VERDANT RUINS",position:"0% 0%",detail:"Ancient roots and shifting stone."},
 {number:"02",name:"SUNKEN CIRCUIT",position:"33.333% 0%",detail:"Broken bridges above the abyss."},
 {number:"03",name:"EMBER VAULT",position:"66.666% 33.333%",detail:"Heat, traps, and unstable ground."},
 {number:"04",name:"TITAN ARENA",position:"100% 33.333%",detail:"A final test against the Guardian."}
];

function Sprite({column,row=0,className=""}:{column:number;row?:number;className?:string}){return <i className={`officialSprite ${className}`} style={sprite(column,row)} aria-hidden="true"/>}

export default function Home(){return <main className="officialHome">
 <header className="officialNav">
  <a className="officialBrand" href="/" aria-label="REKTRUN home"><span className="officialLogo"><img src="/rektrun-logo.png" alt=""/></span><b>REKTRUN</b></a>
  <nav aria-label="Primary navigation"><a className="active" href="#game">GAME</a><a href="#runners">RUNNERS</a><a href="#world">WORLD</a><a href="/docs">DOCS</a></nav>
  <div className="officialNavActions"><small>ROBINHOOD CHAIN<br/>EXCLUSIVE</small><a href="/play">CONNECT WALLET</a></div>
 </header>

 <section className="officialHero" id="game">
  <div className="officialHeroShade"/>
  <div className="officialHeroLogo" aria-hidden="true"><img src="/rektrun-logo.png" alt=""/></div>
  <div className="officialHeroCopy">
   <p className="officialKicker"><span/> SEASON 01 · THE WILD CHAIN</p>
   <h1>REKT<span>RUN</span></h1>
   <p className="officialLead">A browser-native action platformer built exclusively for Robinhood Chain. Master movement, melee combat, changing routes, and distinct Guardian encounters.</p>
   <div className="officialHeroButtons"><a className="officialPrimary" href="/play">PLAY NOW <b>▶</b></a><a className="officialSecondary" href="#how">HOW TO PLAY</a></div>
   <div className="officialHeroMeta"><span>BROWSER NATIVE</span><span>MELEE COMBAT</span><span>WALLET VERIFIED</span></div>
  </div>
  <div className="officialHeroStamp"><b>01</b><span>RUN<br/>FIGHT<br/>OUTLAST</span></div>
  <a className="officialScroll" href="#runners">EXPLORE THE WILD ↓</a>
 </section>

 <section className="officialPillars" aria-label="Core game features">
  <article><div><small>01 / CHOOSE</small><h3>Four runners.<br/>Four combat styles.</h3></div><div className="officialPillarArt"><Sprite column={0}/></div></article>
  <article><div><small>02 / FIGHT</small><h3>Read the pattern.<br/>Break the Guardian.</h3></div><div className="officialPillarArt"><Sprite column={1} row={1}/></div></article>
  <article><div><small>03 / COLLECT</small><h3>Claim Core Shards.<br/>Unlock your build.</h3></div><div className="officialPillarArt"><Sprite column={1} row={3}/></div></article>
  <article><div><small>04 / RISE</small><h3>Verified scores.<br/>Seasonal rankings.</h3></div><div className="officialPillarArt"><Sprite column={3}/></div></article>
 </section>

 <section className="officialRoster" id="runners">
  <div className="officialSectionHead"><div><small>THE RUNNERS</small><h2>CHOOSE YOUR<br/><em>PLAYSTYLE.</em></h2></div><p>Each runner has a distinct attack rhythm, power curve, and signature skill. Higher-tier runners hit harder—but timing still wins every fight.</p></div>
  <div className="officialRosterGrid">{runners.map((runner,index)=><article key={runner.name} style={{"--runner-color":runner.color} as CSSProperties}><div className="officialRunnerFrame"><span>0{index+1}</span><Sprite column={runner.column}/></div><div><small>{runner.role}</small><h3>{runner.name}</h3><b>{index===0?"AVAILABLE":`${[20,35,50][index-1]} SHARDS`}</b></div></article>)}</div>
 </section>

 <section className="officialWorld" id="world">
  <div className="officialWorldCopy"><small>THE WILD CHAIN</small><h2>NO TWO RUNS<br/><em>STAY THE SAME.</em></h2><p>Run through vertical ruins, moving platforms, traps, and roaming creatures. Collect Core Shards, reach the arena, learn the Guardian’s attack pattern, and finish with a wallet-verified score.</p><dl><div><dt>4</dt><dd>RUNNERS</dd></div><div><dt>4</dt><dd>GUARDIANS</dd></div><div><dt>∞</dt><dd>ROUTES</dd></div></dl><a href="/docs">READ THE FIELD MANUAL →</a></div>
  <div className="officialEncounter"><div className="officialEncounterScene"/><Sprite column={0} className="encounterRunner"/><Sprite column={1} row={1} className="encounterBoss"/><span>LIVE ENCOUNTER</span></div>
 </section>

 <section className="officialZones"><div className="officialSectionBar"><span>CAMPAIGN BIOMES</span><b>EXPLORE / FIGHT / COLLECT / RISE</b></div><div className="officialZoneGrid">{zones.map(zone=><article key={zone.number}><div className="officialZoneArt" style={{backgroundPosition:zone.position}}/><div><small>{zone.number}</small><h3>{zone.name}</h3><p>{zone.detail}</p></div></article>)}</div></section>

 <section className="officialLoop" id="how"><div className="officialLoopIntro"><small>HOW A RUN WORKS</small><h2>ONE RUN.<br/><em>NO SAFE PATH.</em></h2></div>{[
  ["01","ENTER","Connect a Robinhood Chain wallet and choose your loadout."],
  ["02","ADAPT","Jump, dash, strike, and navigate a route that changes every run."],
  ["03","DEFEAT","Survive the arena and break the Guardian’s unique attack pattern."],
  ["04","RISE","Submit a verified score and climb the seasonal leaderboard."]
 ].map(step=><article key={step[0]}><small>{step[0]}</small><h3>{step[1]}</h3><p>{step[2]}</p></article>)}</section>

 <section className="officialChain"><div><small>BUILT FOR ROBINHOOD CHAIN</small><h2>PLAY FIRST.<br/><em>VERIFY WHAT MATTERS.</em></h2><p>Movement and combat stay immediate in the browser. Wallet authentication protects competitive submissions, while verified seasonal records provide a transparent foundation for future rewards.</p></div><aside><span>SEASON 01 SYSTEM</span><b>WALLET-VERIFIED RUNS</b><b>ANTI-REPLAY SCORING</b><b>PUBLIC LEADERBOARD</b><b>ROBINHOOD CHAIN ONLY</b><a href="/play">START A VERIFIED RUN →</a></aside></section>

 <section className="officialCta"><small>THE WILD IS OPEN</small><h2>YOUR RUN<br/>STARTS NOW.</h2><p>Choose a runner. Learn the route. Outlast the chain.</p><a href="/play">PLAY REKTRUN</a></section>
 <footer className="officialFooter"><span className="officialFooterBrand"><i className="officialLogo"><img src="/rektrun-logo.png" alt=""/></i> REKTRUN © 2026</span><b>BUILT FOR PLAYERS · ONCHAIN WHERE IT COUNTS</b><span>ROBINHOOD CHAIN</span></footer>
 </main>}
