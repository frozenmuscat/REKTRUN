import type {CSSProperties} from "react";
import type {Metadata} from "next";

export const metadata:Metadata={title:"REKTRUN — Enter the Wild Chain",description:"A browser action platformer built for Robinhood Chain."};
const sprite=(x:number,y:number)=>({"--sx":`${x*33.333}%`,"--sy":`${y*33.333}%`} as CSSProperties);
const features=[
 {n:"01",title:"CHOOSE YOUR RUNNER",copy:"Four distinct movement and combat styles. Find the build that carries you furthest.",x:0,y:0},
 {n:"02",title:"DEFEAT GUARDIANS",copy:"Learn unique attack patterns, break their defenses, and survive the final arena.",x:1,y:1},
 {n:"03",title:"COLLECT CORE SHARDS",copy:"Gather shards during every run to unlock gear, routes, and stronger loadouts.",x:1,y:3},
 {n:"04",title:"CLIMB THE LEADERBOARD",copy:"Wallet-verified runs rank each season and determine reward eligibility.",x:3,y:0}
];
const zones=[
 {n:"01",name:"VERDANT RUINS",pos:"0% 0%"},{n:"02",name:"SUNKEN CIRCUIT",pos:"33.333% 0%"},
 {n:"03",name:"EMBER VAULT",pos:"66.666% 33.333%"},{n:"04",name:"TITAN ENCOUNTER",pos:"100% 33.333%"}
];
export default function Home(){return <main className="forestLanding">
 <header className="forestNav"><a className="forestBrand" href="/"><i>R</i><b>REKTRUN</b></a><nav><a className="active" href="#game">GAME</a><a href="#world">WORLD</a><a href="/play">LEADERBOARD</a><a href="/docs">DOCS</a></nav><a className="forestWallet" href="/play">CONNECT WALLET</a><span className="chainMark">✦<small>ROBINHOOD<br/>CHAIN ONLY</small></span></header>
 <section className="forestHero" id="game"><div className="forestBackdrop"/><h1 className="srOnly">REKTRUN — Enter the Wild Chain</h1><div className="sideLore left">A SMALL<br/>RUNNER<br/><i/>A BIGGER<br/>TOMORROW</div><div className="sideLore right">ANCIENT<br/>ROOTS<br/>POWER<br/>A BRIGHTER<br/>CHAIN<i/></div><div className="heroControls"><div><a className="wildPlay" href="/play">▶ PLAY NOW</a><a className="trailer" href="#gameplay">◎ HOW TO PLAY</a></div><p>BROWSER ACTION PLATFORMER <em/> SEASON 01</p></div><div className="scrollCue">SCROLL TO EXPLORE ↓</div></section>
 <section className="featureGrid" id="world">{features.map(f=><article className="featureCard" key={f.n}><div className="featureCopy"><small>{f.n}</small><h2>{f.title}</h2><p>{f.copy}</p><b>→</b></div><div className="featureSprite" style={sprite(f.x,f.y)} aria-hidden="true"/></article>)}</section>
 <section className="worldIntro"><div><small>THE WILD CHAIN</small><h2>RUN. FIGHT.<br/><i>OUTLAST.</i></h2><p>REKTRUN is a fast browser action platformer where every run remixes the route. Leap through vertical ruins, cut through roaming creatures, collect core shards, and escape the unstoppable hunter before a Guardian seals the arena.</p><div className="statRow"><span><b>4</b> RUNNERS</span><span><b>4</b> GUARDIANS</span><span><b>∞</b> ROUTES</span></div><a href="/docs">READ THE GAME DOCS →</a></div><div className="worldArt"><i style={sprite(0,0)}/><i style={sprite(1,1)}/></div></section>
 <div className="sectionRibbon" id="gameplay"><span>A GLIMPSE INTO THE WILD</span><b>EXPLORE / FIGHT / COLLECT / RISE</b></div>
 <section className="zoneGrid">{zones.map(z=><article key={z.n}><div style={{backgroundPosition:z.pos}}/><span><b>{z.n}</b>{z.name}</span></article>)}</section>
 <section className="gameLoop"><div className="loopTitle"><small>HOW A RUN WORKS</small><h2>ONE RUN.<br/>NO SAFE PATH.</h2></div>{[["01","ENTER","Connect a Robinhood Chain wallet and choose a runner."],["02","ADAPT","Master jumps, dashes, melee timing, traps, and shifting terrain."],["03","SURVIVE","Defeat the Guardian. Your hunter disappears when the arena begins."],["04","RISE","Submit a verified score and climb the seasonal leaderboard."]].map(v=><article key={v[0]}><b>{v[0]}</b><h3>{v[1]}</h3><p>{v[2]}</p></article>)}</section>
 <section className="chainSection"><div><small>BUILT FOR ROBINHOOD CHAIN</small><h2>PLAYABLE FIRST.<br/>ONCHAIN WHERE IT COUNTS.</h2><p>Gameplay stays immediate in the browser. Wallet verification protects competitive submissions, while seasonal records create a transparent basis for future reward and airdrop eligibility.</p><p className="finePrint">Final reward rules, snapshot dates, and eligibility requirements will be published before each season closes.</p></div><div className="chainPanel"><span>SEASON 01</span><b>VERIFIED RUNS</b><b>ANTI-REPLAY SCORES</b><b>PUBLIC LEADERBOARD</b><b>ROBINHOOD CHAIN ONLY</b><a href="/play">START A VERIFIED RUN →</a></div></section>
 <section className="docsCta"><small>FIELD MANUAL / VERSION 01</small><h2>KNOW THE WILD<br/>BEFORE IT KNOWS YOU.</h2><p>Controls, combat, runners, Guardians, scoring, wallet rules, and seasonal rewards—documented in one place.</p><a href="/docs">OPEN DOCS</a></section>
 <footer className="forestFooter"><span>REKTRUN // ENTER THE WILD CHAIN</span><b>♠ BUILT FOR PLAYERS. ONCHAIN FOREVER. ♠</b><span>ROBINHOOD CHAIN ONLY</span></footer>
 </main>}
