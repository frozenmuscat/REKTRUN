import type { Metadata } from "next";import "./globals.css";
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||"https://rektrun.vercel.app";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:"REKTRUN",description:"Enter the Wild Chain. Run, fight guardians, and climb the Robinhood Chain leaderboard.",openGraph:{title:"REKTRUN — Enter the Wild Chain",description:"A wallet-gated pixel action runner built exclusively on Robinhood Chain.",images:["/forest-hero.png"]},twitter:{card:"summary_large_image",title:"REKTRUN — Enter the Wild Chain",description:"Run. Fight. Collect. Rise.",images:["/forest-hero.png"]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
