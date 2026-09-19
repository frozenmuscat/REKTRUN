"use client";

import { useCallback, useEffect, useRef, useState } from "react";

declare global { interface Window { ethereum?: { request: (args: {method:string; params?: unknown[]}) => Promise<unknown> } } }

const CHAIN = { id: 46630, hex: "0xb626", name: "Robinhood Chain Testnet", rpc: "https://rpc.testnet.chain.robinhood.com", explorer: "https://explorer.testnet.chain.robinhood.com" };
type Score = { rank:number; address:string; score:number; distance:number; gems:number; rekt:number };
type Run = { id:string; token:string };

export default function GameClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0); const keys = useRef(new Set<string>()); const runRef = useRef<Run|null>(null);
  const [wallet,setWallet]=useState(""); const [status,setStatus]=useState("CONNECT WALLET TO ENTER");
  const [playing,setPlaying]=useState(false); const [scores,setScores]=useState<Score[]>([]);
  const [stats,setStats]=useState({score:0,distance:0,gems:0,rekt:0}); const [tab,setTab]=useState<"game"|"board">("game");

  const loadBoard=useCallback(async()=>{ try { const r=await fetch("/api/leaderboard",{cache:"no-store"}); if(r.ok)setScores((await r.json()).scores); } catch{} },[]);
  useEffect(()=>{loadBoard()},[loadBoard]);

  async function connect(){
    try{
      if(!window.ethereum) throw new Error("请安装 Robinhood Wallet 或兼容的 EVM 钱包");
      setStatus("REQUESTING WALLET…");
      const accounts=await window.ethereum.request({method:"eth_requestAccounts"}) as string[]; const address=accounts[0];
      const current=await window.ethereum.request({method:"eth_chainId"}) as string;
      if(parseInt(current,16)!==CHAIN.id){
        try{await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:CHAIN.hex}]});}
        catch{await window.ethereum.request({method:"wallet_addEthereumChain",params:[{chainId:CHAIN.hex,chainName:CHAIN.name,nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:[CHAIN.rpc],blockExplorerUrls:[CHAIN.explorer]}]});}
      }
      const c=await fetch("/api/auth/challenge",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({address})});
      if(!c.ok) throw new Error("无法创建登录挑战"); const {message}=await c.json();
      const signature=await window.ethereum.request({method:"personal_sign",params:[message,address]}) as string;
      const v=await fetch("/api/auth/verify",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({address,message,signature})});
      if(!v.ok) throw new Error((await v.json()).error||"签名验证失败");
      setWallet(address); setStatus("WALLET VERIFIED — READY");
    }catch(e){setStatus(e instanceof Error?e.message:"连接失败")}
  }

  const start=useCallback(async()=>{
    if(!wallet)return connect();
    const r=await fetch("/api/run/start",{method:"POST"}); if(!r.ok){setStatus("SESSION EXPIRED — RECONNECT");setWallet("");return}
    runRef.current=await r.json(); setStats({score:0,distance:0,gems:0,rekt:0}); setPlaying(true); setStatus("RUN LIVE");
  },[wallet]);

  useEffect(()=>{
    const down=(e:KeyboardEvent)=>{keys.current.add(e.code); if(["Space","ArrowUp","ArrowDown"].includes(e.code))e.preventDefault()};
    const up=(e:KeyboardEvent)=>keys.current.delete(e.code); window.addEventListener("keydown",down);window.addEventListener("keyup",up);
    return()=>{window.removeEventListener("keydown",down);window.removeEventListener("keyup",up)};
  },[]);

  useEffect(()=>{
    if(!playing||!canvasRef.current)return; const c=canvasRef.current,ctx=c.getContext("2d")!;
    let last=performance.now(),elapsed=0,spawn=0,gemSpawn=0; const player={x:90,y:250,vy:0,w:28,h:34,hp:3};
    let enemies:{x:number;y:number;s:number}[]=[],gems:{x:number;y:number}[]=[],distance=0,rekt=0,collected=0,dead=false;
    const resize=()=>{const d=Math.min(devicePixelRatio,2),r=c.getBoundingClientRect();c.width=r.width*d;c.height=r.height*d;ctx.setTransform(d,0,0,d,0,0)}; resize();window.addEventListener("resize",resize);
    const finish=async()=>{ if(dead)return; dead=true;cancelAnimationFrame(raf.current);setPlaying(false);const score=Math.floor(distance+collected*120+rekt*200);setStats({score,distance:Math.floor(distance),gems:collected,rekt});setStatus("RUN COMPLETE — VERIFYING SCORE");
      const res=await fetch("/api/run/finish",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({run:runRef.current,durationMs:Math.floor(elapsed),distance:Math.floor(distance),gems:collected,rekt,score})});
      setStatus(res.ok?"SCORE VERIFIED & RECORDED":"SCORE REJECTED"); if(res.ok)loadBoard(); };
    const loop=(now:number)=>{const dt=Math.min((now-last)/1000,.034);last=now;elapsed+=dt*1000; const W=c.clientWidth,H=c.clientHeight,ground=H-70;distance+=dt*42;
      if((keys.current.has("Space")||keys.current.has("ArrowUp")||keys.current.has("KeyW"))&&player.y>=ground-player.h-2)player.vy=-520;
      player.vy+=1300*dt;player.y=Math.min(ground-player.h,player.y+player.vy*dt);
      spawn-=dt;if(spawn<=0){enemies.push({x:W+30,y:ground-30,s:26+Math.random()*14});spawn=Math.max(.65,1.5-distance/1800)}
      gemSpawn-=dt;if(gemSpawn<=0){gems.push({x:W+20,y:ground-70-Math.random()*110});gemSpawn=.7+Math.random()*.8}
      enemies.forEach(e=>e.x-=(220+distance/16)*dt);gems.forEach(g=>g.x-=(210+distance/18)*dt);
      enemies=enemies.filter(e=>{if(e.x<player.x+player.w&&e.x+e.s>player.x&&player.y+player.h>e.y){player.hp--;e.x=-99;if(player.hp<=0)finish()}return e.x>-50});
      gems=gems.filter(g=>{if(g.x<player.x+player.w&&g.x+16>player.x&&player.y<g.y+16&&player.y+player.h>g.y){collected++;return false}return g.x>-20});
      if(keys.current.has("KeyX")||keys.current.has("KeyK")){const hit=enemies.find(e=>e.x>player.x&&e.x<player.x+100&&Math.abs(e.y-player.y)<50);if(hit){hit.x=-99;rekt++;keys.current.delete("KeyX");keys.current.delete("KeyK")}}
      const score=Math.floor(distance+collected*120+rekt*200);setStats({score,distance:Math.floor(distance),gems:collected,rekt});
      const grad=ctx.createLinearGradient(0,0,0,H);grad.addColorStop(0,"#071514");grad.addColorStop(1,"#0d241b");ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
      ctx.strokeStyle="#173a2a";ctx.lineWidth=1;for(let x=(-distance*3)%48;x<W;x+=48){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}for(let y=30;y<H;y+=48){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
      ctx.fillStyle="#b6ff33";ctx.fillRect(0,ground,W,3);ctx.shadowBlur=20;ctx.shadowColor="#b6ff33";ctx.fillStyle="#efffd3";ctx.fillRect(player.x,player.y,player.w,player.h);ctx.fillStyle="#0a1811";ctx.fillRect(player.x+17,player.y+8,5,5);ctx.shadowBlur=0;
      enemies.forEach(e=>{ctx.fillStyle="#ff4d6d";ctx.fillRect(e.x,e.y,e.s,e.s);ctx.fillStyle="#2c0710";ctx.fillRect(e.x+6,e.y+7,5,5);ctx.fillRect(e.x+e.s-11,e.y+7,5,5)});
      gems.forEach(g=>{ctx.save();ctx.translate(g.x+8,g.y+8);ctx.rotate(now/450);ctx.fillStyle="#65f8ff";ctx.fillRect(-7,-7,14,14);ctx.restore()});
      ctx.fillStyle="#d9ffe7";ctx.font="700 14px monospace";ctx.fillText(`HP ${"■".repeat(player.hp)}  DIST ${Math.floor(distance)}M  GEMS ${collected}  REKT ${rekt}`,20,28);
      if(!dead)raf.current=requestAnimationFrame(loop);
    };raf.current=requestAnimationFrame(loop);return()=>{cancelAnimationFrame(raf.current);window.removeEventListener("resize",resize)};
  },[playing,loadBoard]);

  return <main>
    <header><div className="brand"><span>R</span>REKTRUN</div><nav><button className={tab==="game"?"active":""} onClick={()=>setTab("game")}>THE GAME</button><button className={tab==="board"?"active":""} onClick={()=>{setTab("board");loadBoard()}}>LEADERBOARD</button></nav><button className="wallet" onClick={connect}>{wallet?`${wallet.slice(0,6)}…${wallet.slice(-4)}`:"CONNECT WALLET"}</button></header>
    {tab==="game"?<section className="gameShell">
      <div className="eyebrow">ROBINHOOD CHAIN // SEASON ZERO</div><h1>RUN. REKT.<br/><i>GET REWARDED.</i></h1>
      <div className="gameFrame"><canvas ref={canvasRef}/>{!playing&&<div className="overlay"><div className="portal">R</div><p>{status}</p><button className="play" onClick={start}>{wallet?"START RUN":"CONNECT TO PLAY"}</button><small>SPACE / W — JUMP &nbsp; · &nbsp; X / K — ATTACK</small></div>}</div>
      <div className="stats"><div><small>SCORE</small><b>{stats.score.toLocaleString()}</b></div><div><small>DISTANCE</small><b>{stats.distance}M</b></div><div><small>GEMS</small><b>{stats.gems}</b></div><div><small>REKT</small><b>{stats.rekt}</b></div></div>
      <p className="notice">Every run is server-timed and wallet-authenticated. Season snapshots are reviewed before token allocation.</p>
    </section>:<Leaderboard scores={scores} wallet={wallet}/>}<footer><span>BUILT EXCLUSIVELY ON ROBINHOOD CHAIN</span><span>TESTNET · CHAIN 46630</span></footer>
  </main>
}

function Leaderboard({scores,wallet}:{scores:Score[];wallet:string}){return <section className="board"><div className="eyebrow">SEASON ZERO // VERIFIED RUNS</div><h1>THE <i>LEADERBOARD</i></h1><p>Top verified wallets qualify for the season airdrop snapshot. Final allocations are subject to anti-sybil review.</p><div className="table"><div className="tr head"><span>RANK</span><span>RUNNER</span><span>SCORE</span><span>GEMS</span><span>REKT</span></div>{scores.length?scores.map(s=><div className={`tr ${s.address.toLowerCase()===wallet.toLowerCase()?"you":""}`} key={s.address}><span>#{s.rank}</span><span>{s.address.slice(0,8)}…{s.address.slice(-5)}</span><span>{s.score.toLocaleString()}</span><span>{s.gems}</span><span>{s.rekt}</span></div>):<div className="empty">NO VERIFIED RUNS YET — BE THE FIRST.</div>}</div></section>}
