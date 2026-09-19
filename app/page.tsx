import type {Metadata} from "next";

export const metadata:Metadata={title:"REKTRUN — Enter the Wild Chain"};
const features=[
 {n:"01",title:"CHOOSE YOUR RUNNER",copy:"Four builds. One wild chain.",kind:"runners"},
 {n:"02",title:"DEFEAT GUARDIANS",copy:"Massive machines. Deeper rewards.",kind:"guardian"},
 {n:"03",title:"COLLECT CORE SHARDS",copy:"Power your gear. Unlock new paths.",kind:"shard"},
 {n:"04",title:"CLIMB THE LEADERBOARD",copy:"Verified runs decide the airdrop.",kind:"podium"}
];
export default function Home(){return <main className="forestLanding">
 <header className="forestNav"><a className="forestBrand" href="/"><i>R</i><b>REKTRUN</b></a><nav><a className="active" href="#game">GAME</a><a href="/play">LEADERBOARD</a><a href="#lore">LORE</a></nav><a className="forestWallet" href="/play">CONNECT WALLET</a><span className="chainMark">✦<small>PLAY<br/>ON CHAIN</small></span></header>
 <section className="forestHero" id="game"><div className="forestBackdrop"/><h1 className="srOnly">REKTRUN — Enter the Wild Chain</h1><div className="sideLore left">A SMALL<br/>RUNNER<br/><i/>A BIGGER<br/>TOMORROW</div><div className="sideLore right">ANCIENT<br/>ROOTS<br/>POWER<br/>A BRIGHTER<br/>CHAIN<i/></div><div className="heroControls"><div><a className="wildPlay" href="/play">▶ PLAY NOW</a><a className="trailer" href="#gameplay">◉ HOW TO PLAY</a></div><p>BROWSER ACTION PLATFORMER <em/> SEASON 01</p></div></section>
 <section className="featureGrid" id="lore">{features.map(f=><article className={`featureCard ${f.kind}`} key={f.n}><div className="featureCopy"><small>{f.n}</small><h2>{f.title}</h2><p>{f.copy}</p><b>→</b></div><div className="featureVisual" aria-hidden="true"><i/><i/><i/></div></article>)}</section>
 <div className="sectionRibbon" id="gameplay"><span>A GLIMPSE INTO THE WILD</span><b>EXPLORE / FIGHT / COLLECT / RISE</b></div>
 <section className="glimpseGrid">
  <article className="glimpse g1"><div className="hearts">♥♥♥♥</div><span><b>01</b> VERDANT RUINS</span></article>
  <article className="glimpse g2"><div className="hearts">♥♥♥♥</div><span><b>02</b> SUNKEN CIRCUIT</span></article>
  <article className="glimpse g3"><div className="hearts">♥♥♥♥</div><span><b>03</b> TITAN ENCOUNTER</span></article>
  <article className="inventoryCard"><div className="inventoryTop">INVENTORY <span>◆ 024</span></div><div className="inventoryBody"><div className="miniRunner">R<i/></div><div className="slots"><i>⚔</i><i>◇</i><i>⬡</i><i>⌁</i></div><div className="itemStats"><b>FOREST BLADE</b><span>ATK +12</span><span>SPD +8</span><span>CRIT +5%</span></div></div><span className="inventoryLabel"><b>04</b> GEAR UP</span></article>
 </section>
 <footer className="forestFooter"><span>REKTRUN // ENTER THE WILD CHAIN</span><b>♠ BUILT FOR PLAYERS. ONCHAIN FOREVER. ♠</b><span>ROBINHOOD CHAIN ONLY</span></footer>
 </main>}
