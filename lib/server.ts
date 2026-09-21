import postgres from "postgres";
import { recoverMessageAddress, isAddress } from "viem";

const encoder=new TextEncoder();
const secret=()=>{const value=process.env.GAME_SIGNING_SECRET;if(!value&&process.env.NODE_ENV==="production")throw new Error("GAME_SIGNING_SECRET is not configured");return value||"local-development-secret-change-me"};
const globalDb=globalThis as unknown as {rektrunSql?:ReturnType<typeof postgres>;rektrunInit?:Promise<void>};
export function db(){
 const url=process.env.DATABASE_URL;
 if(!url)throw new Error("DATABASE_URL is not configured");
 return globalDb.rektrunSql??=postgres(url,{max:1,prepare:false,ssl:"require"});
}
export async function init(){
 if(!globalDb.rektrunInit)globalDb.rektrunInit=(async()=>{const d=db();
  await d`CREATE TABLE IF NOT EXISTS auth_nonces (address TEXT PRIMARY KEY, nonce TEXT NOT NULL, expires_at BIGINT NOT NULL)`;
  await d`CREATE TABLE IF NOT EXISTS runs (id TEXT PRIMARY KEY, address TEXT NOT NULL, started_at BIGINT NOT NULL, finished_at BIGINT, duration_ms INTEGER, distance INTEGER, gems INTEGER, rekt INTEGER, score INTEGER, valid INTEGER NOT NULL DEFAULT 0)`;
  await d`CREATE TABLE IF NOT EXISTS profiles (address TEXT PRIMARY KEY, shards INTEGER NOT NULL DEFAULT 0, runner TEXT NOT NULL DEFAULT 'byte', gear TEXT NOT NULL DEFAULT 'blade', unlocked_runners TEXT NOT NULL DEFAULT '[\"byte\"]', unlocked_gear TEXT NOT NULL DEFAULT '[\"blade\"]')`;
  await d`CREATE INDEX IF NOT EXISTS idx_runs_valid_score ON runs(valid, score DESC)`;
  await d`CREATE INDEX IF NOT EXISTS idx_runs_address ON runs(address)`;
 })().catch(e=>{globalDb.rektrunInit=undefined;throw e});
 return globalDb.rektrunInit;
}
const b64=(b:ArrayBuffer)=>btoa(String.fromCharCode(...new Uint8Array(b))).replaceAll("+","-").replaceAll("/","_").replaceAll("=","");
async function mac(value:string){const k=await crypto.subtle.importKey("raw",encoder.encode(secret()),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return b64(await crypto.subtle.sign("HMAC",k,encoder.encode(value)))}
export async function token(payload:Record<string,unknown>){const body=b64(encoder.encode(JSON.stringify(payload)).buffer);return `${body}.${await mac(body)}`}
export async function untoken(value:string){const [body,sig]=value.split(".");if(!body||!sig||await mac(body)!==sig)return null;try{return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(body.replaceAll("-","+").replaceAll("_","/")),c=>c.charCodeAt(0)))) as Record<string,unknown>}catch{return null}}
export async function session(req:Request){const raw=req.headers.get("cookie")?.match(/(?:^|; )rr_session=([^;]+)/)?.[1];if(!raw)return null;const p=await untoken(decodeURIComponent(raw));return p&&Number(p.exp)>Date.now()?String(p.address):null}
export async function verifyWallet(message:string,signature:`0x${string}`,address:string){if(!isAddress(address))return false;const recovered=await recoverMessageAddress({message,signature});return recovered.toLowerCase()===address.toLowerCase()}
export const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{"cache-control":"no-store"}});
