import CommunityToggle from "@/components/home/community-toggle";
import WorkspaceButton from "@/components/home/workspace-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Globe2, Layout, PanelTopOpen, Rocket, Sparkles, Users } from "lucide-react";
import Link from "next/link";

const more = () => {
  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#0f172a]">
      <div className="max-w-full mx-auto px-6 py-10 lg:py-14 space-y-10">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <Button variant="outline" className="rounded-[6px] border-[#d4d7df] bg-white hover:bg-[#eef1f7]">
              <ArrowLeft className="size-4" />
              Back to landing
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <CommunityToggle />
            <WorkspaceButton />
          </div>
        </div>

        <header className="bg-white border border-[#dfe3ec] rounded-[18px] shadow-sm p-6 lg:p-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#f0f3fb] text-[#1341D0] px-3 py-1 rounded-full font-mono text-[12px] uppercase tracking-[0.08em]">
            Light, clear, multi-workspace
          </div>
          <h1 className="font-sans text-3xl lg:text-4xl font-semibold tracking-[-1px] leading-[1.1]">
            See how Plantly keeps every workspace polished, separate, and ready to publish.
          </h1>
          <p className="font-sans text-[16px] text-[#475569] max-w-3xl leading-[1.6]">
            Plantly is a Linktree-inspired platform with more control. Create multiple workspaces, publish each one as its own user-facing profile, and keep everything light, smooth, and professional.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: <Sparkles className="size-5 text-[#1341D0]" />,
              title: "Per-workspace identity",
              copy: "Every workspace has its own URL, theme, and publishing rules so brands never collide."
            },
            {
              icon: <Globe2 className="size-5 text-[#1341D0]" />,
              title: "Publish instantly",
              copy: "Ship live pages in minutes with built-in safeguards and previews that stay true to your design."
            },
            {
              icon: <Users className="size-5 text-[#1341D0]" />,
              title: "Built for teams & clients",
              copy: "Invite collaborators per workspace and keep roles scoped—no messy, shared dashboards."
            }
          ].map((card) => (
            <div key={card.title} className="bg-white border border-[#dfe3ec] rounded-[14px] p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                {card.icon}
                <p className="font-sans text-[15px] font-semibold">{card.title}</p>
              </div>
              <p className="font-sans text-[14px] text-[#475569] leading-6">{card.copy}</p>
            </div>
          ))}
        </section>

        <section className="bg-white border border-[#dfe3ec] rounded-[18px] shadow-sm p-6 lg:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="space-y-1">
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#475569]">Flow</p>
              <h2 className="font-sans text-2xl font-semibold tracking-[-0.7px]">From blank canvas to shipped profile</h2>
            </div>
            <div className="flex items-center gap-3">
              <WorkspaceButton />
              <Link href="/sign-up">
                <Button className="rounded-[6px] bg-[#1341D0] text-white hover:bg-[#0f33a6]">
                  Try it now
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: "Start a workspace", detail: "Pick a light theme and keep fonts clean with sans + mono accents.", icon: <Layout className="size-4 text-[#1341D0]" /> },
              { title: "Assemble blocks", detail: "Add links, media, social buttons, and reorder without breaking layout.", icon: <PanelTopOpen className="size-4 text-[#1341D0]" /> },
              { title: "Publish as user", detail: "Generate a unique, public-facing profile per workspace—no overlap.", icon: <Globe2 className="size-4 text-[#1341D0]" /> },
              { title: "Measure & adjust", detail: "Check clicks and funnels per workspace; tune the details quickly.", icon: <Rocket className="size-4 text-[#1341D0]" /> }
            ].map((item) => (
              <div key={item.title} className="border border-[#dfe3ec] rounded-[12px] p-4 bg-[#f7f9fb]">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <span className="font-mono text-[11px] text-[#475569]">Step</span>
                </div>
                <p className="font-sans text-[15px] font-semibold">{item.title}</p>
                <p className="font-sans text-[13.5px] text-[#475569] leading-5 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-[#dfe3ec] rounded-[16px] shadow-sm p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Layout className="size-4 text-[#1341D0]" />
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#475569]">Publishing confidence</p>
            </div>
            <h3 className="font-sans text-xl font-semibold tracking-[-0.5px]">Separate profiles, consistent quality</h3>
            <ul className="space-y-2">
              {[
                "Keep every workspace branded with sans headings and mono labels for clarity.",
                "Preview before publishing so every page looks sharp on mobile and desktop.",
                "Use the same calm, light palette as your auth experience for continuity."
              ].map((text) => (
                <li key={text} className="flex items-start gap-2 text-[#475569] font-sans text-[14px]">
                  <Check className="size-4 mt-[2px] text-[#10b981]" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[#ffd9b3] text-[#0f172a] rounded-[16px] p-6 space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute -right-10 -top-12 h-36 w-36 bg-[#ffe8f1] blur-3xl" />
            <div className="absolute -left-12 bottom-0 h-36 w-36 bg-[#c7daff] blur-3xl" />

            <div className="flex items-center gap-2 relative">
              <Users className="size-4 text-[#f97316]" />
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#475569]">Client-friendly</p>
            </div>
            <h3 className="font-sans text-xl font-semibold tracking-[-0.5px] relative">Share without exposing your whole workspace list</h3>
            <p className="font-sans text-[14.5px] text-[#475569] relative">
              Send a clean, dedicated URL for each workspace. Keep experiments private, share only what is ready, and still move quickly.
            </p>
            <div className="relative">
              <WorkspaceButton />
            </div>
          </div>
        </section>

        <section className="bg-white border border-[#dfe3ec] rounded-[18px] shadow-sm p-6 lg:p-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="space-y-1">
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#475569]">Stay aligned</p>
              <h3 className="font-sans text-2xl font-semibold tracking-[-0.6px]">A calmer alternative to juggling accounts</h3>
              <p className="font-sans text-[14.5px] text-[#475569] max-w-3xl">
                Linktree made links easy—Plantly makes multi-workspace publishing effortless. Keep it light, keep it professional, and keep every audience focused on what matters.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline" className="rounded-[6px] border-[#d4d7df] bg-white hover:bg-[#eef1f7]">Return home</Button>
              </Link>
              <WorkspaceButton />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default more;

