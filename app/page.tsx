import type { Metadata } from "next";
import GameClient from "./GameClient";

export const metadata: Metadata = {
  title: "REKTRUN — Robinhood Chain Arcade",
  description: "Connect your wallet, survive the run, and climb the verified Robinhood Chain leaderboard.",
};

export default function Home() {
  return <GameClient />;
}
