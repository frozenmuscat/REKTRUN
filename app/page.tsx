import type { Metadata } from "next";

export const metadata:Metadata={title:"REKTRUN — Run the chain"};
const roster=[
  ["BYTE","#b6ff33","BALANCED"],["NOVA","#65f8ff","GEM HUNTER"],["EMBER","#ff6b4a","BRAWLER"],["VOID","#ad7aff","PHASER"]
];
export default function Home(){return <main className="landing">
  <header><a className="brand" href="/"><span>R</span>REKTRUN</a><nav><a href="#game">THE GAME</a><a href="#mechanics">MECHANICS</a><a href="#roster">RUNNERS</a><a href="/play">LEADERBOARD</a></nav><a className="wallet" href="/play">PLAY NOW</a></header>
  <section className="hero" id="game"><div className="heroCopy"><div className="eyebrow">ROBINHOOD CHAIN // SEASON ZERO</div><h1>OUTRUN<br/>THE <i>CHAIN.</i></h1><p>A high-speed onchain arcade run. Smash hazards, collect shards, build your loadout and earn your place in the verified airdrop leaderboard.</p><a className="play heroPlay" href="/play">ENTER THE RUN <b>→</b></a><small>WALLET REQUIRED · NO DOWNLOAD · INSTANT PLAY</small></div><div className="heroVisual"><div className="sun"/><div className="track"><div className="runnerArt"><i/><b/></div><em>◆</em><strong>▲ ▲</strong></div><div className="scoreGhost">004821<br/><small>PERSONAL BEST</small></div></div></section>
  <section className="mechanics" id="mechanics"><div><span>01</span><h2>RUN</h2><p>Jump shifting hazards as the world accelerates with every metre.</p></div><div><span>02</span><h2>REKT</h2><p>Equip weapons, time your attacks and turn enemies into score.</p></div><div><span>03</span><h2>COLLECT</h2><p>Gather shards to unlock runners and permanent equipment.</p></div><div><span>04</span><h2>CLIMB</h2><p>Verified wallet scores determine the seasonal airdrop ranks.</p></div></section>
  <section className="roster" id="roster"><div className="sectionHead"><div><div className="eyebrow">CHOOSE YOUR BUILD</div><h2>RUNNERS & LOADOUTS</h2></div><p>Every runner and equipment item changes how a run feels. Unlock with shards earned in-game.</p></div><div className="rosterGrid">{roster.map((r,i)=><article key={r[0]} style={{"--runner":r[1]} as React.CSSProperties}><div className="avatar"><span>{i===0?"R":i===1?"N":i===2?"E":"V"}</span></div><small>0{i+1}</small><h3>{r[0]}</h3><p>{r[2]}</p></article>)}</div></section>
  <section className="cta"><div className="eyebrow">YOUR WALLET. YOUR RUN. YOUR RANK.</div><h2>READY TO GET<br/><i>REKT?</i></h2><a className="play" href="/play">PLAY FULLSCREEN →</a></section>
  <footer><span>BUILT EXCLUSIVELY ON ROBINHOOD CHAIN</span><span>TESTNET · CHAIN 46630</span></footer>
 </main>}
