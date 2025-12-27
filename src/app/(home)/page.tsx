import { onBoardUser } from "@/actions/auth";
import CommunityModal from "@/components/home/community-modal";
import CommunityToggle from "@/components/home/community-toggle";
import HomeTemplate from "@/components/home/home-template";
import WorkspaceButton from "@/components/home/workspace-button";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BarChart3, Layers, Layout, ShieldCheck, Sparkles, Users } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    icon: <Layers className="size-5 text-[#1341D0]" />,
    title: "Multiple workspaces",
    copy: "Spin up dedicated spaces for every brand, client, or experiment without juggling extra accounts."
  },
  {
    icon: <Users className="size-5 text-[#1341D0]" />,
    title: "Publish as unique profiles",
    copy: "Ship each workspace as its own public identity so every audience gets a tailored experience."
  },
  {
    icon: <BarChart3 className="size-5 text-[#1341D0]" />,
    title: "Clarity-first analytics",
    copy: "Track clicks, channels, and conversions at the workspace level to see what actually moves."
  }
];

const steps = [
  { title: "Create a workspace", detail: "Start with a clean, branded canvas for each idea." },
  { title: "Drop your links & media", detail: "Use flexible blocks to organize content in seconds." },
  { title: "Publish as its own user", detail: "Share a unique URL per workspace—no collisions, no confusion." },
  { title: "Iterate with insights", detail: "View performance per workspace and tune what matters." }
];

const page = async () => {
  const { user } = await onBoardUser();

  return (
    <div className="w-full min-h-screen bg-[#f7f9fb] text-[#0f172a]">
      <div className="sticky top-0 z-40 bg-white border-b border-[#e5e7ef] shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
                <span className="size-8 rounded-full bg-[#ffe8f1] border border-[#ffd9e8] flex items-center justify-center font-mono text-[12px] text-[#0f172a]">P</span>
                <div className="flex flex-col leading-tight">
                  <span className="font-sans font-semibold text-[16px] tracking-[-0.3px] text-[#0f172a]">Plantly</span>
                  <span className="font-mono text-[11px] text-[#475569]">multi-workspace</span>
                </div>
              </Link>
              <div className="hidden md:flex items-center gap-2">
                <Link href="/more" className="font-sans text-[14px] text-[#0f172a] px-2 py-1 rounded-[6px] hover:bg-[#f5f6fb] hover:text-[#1341D0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4e7bff] focus-visible:outline-offset-2">Overview</Link>
                <Link href="/sign-up" className="font-sans text-[14px] text-[#0f172a] px-2 py-1 rounded-[6px] hover:bg-[#f5f6fb] hover:text-[#1341D0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4e7bff] focus-visible:outline-offset-2">Sign up</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user?.isCommunity ? (
                <Link href={"/community"}>
                  <Button variant="outline" className="rounded-[6px] border-[#e2e9ff] bg-white text-[#0f172a] hover:border-[#c7cbd6] hover:text-black">
                    Community
                  </Button>
                </Link>
              ) : (
                <CommunityToggle />
              )}
              <div className="hidden sm:block">
                <WorkspaceButton />
              </div>
            </div>
          </nav>
        </div>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-10 h-72 w-72 bg-[#ffe8f1] blur-3xl" />
          <div className="absolute top-20 -right-10 h-72 w-72 bg-[#c7daff] blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-6 lg:py-12 grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-[#dfe3ec] px-3 py-1 rounded-full shadow-sm font-mono text-[12px] uppercase tracking-[0.04em] text-[#1341D0]">
              Multi-workspace link-in-bio for modern teams
            </div>

            <h1 className="font-sans font-semibold text-4xl lg:text-5xl leading-[1.05] tracking-[-1px]">
              Plantly is the smoothest way to run many profiles from one home.
            </h1>

            <p className="font-sans text-[17px] leading-[1.55] text-[#334155] max-w-2xl">
              Build, brand, and publish independent workspaces for every client or idea. Each workspace ships as its own user-ready page—professional, light, and fast—without the maintenance headache.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <WorkspaceButton />
              <Link href="/more">
                <Button variant="outline" className="rounded-[6px] border-[#d4d7df] bg-white text-[#0f172a] hover:bg-[#eef1f7] hover:text-black">
                  See how it works
                  <ArrowUpRight className="size-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              {[
                { label: "Workspaces live", value: "4.2k" },
                { label: "Avg. publish time", value: "3 min" },
                { label: "Countries served", value: "48" },
              ].map((item) => (
                <div key={item.label} className="bg-white/90 border border-[#dfe3ec] rounded-[14px] px-4 py-3 shadow-sm">
                  <p className="font-mono text-[12px] uppercase text-[#475569] tracking-[0.08em]">{item.label}</p>
                  <p className="font-sans text-2xl font-semibold text-[#0f172a]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <HomeTemplate />
            </div>
          </div>

          <div className="w-full">
            <div className="relative bg-white border border-[#dfe3ec] rounded-[18px] shadow-xl shadow-[#1a2a5314] p-6 lg:p-8 overflow-hidden">
              <div className="absolute -right-8 -top-10 h-32 w-32 bg-[#ffe8f1] blur-2xl" />
              <div className="absolute -left-10 bottom-0 h-32 w-32 bg-[#c7daff] blur-2xl" />

              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-[#10b981]" />
                  <span className="font-mono text-[12px] text-[#475569]">Live preview</span>
                </div>
                <span className="font-mono text-[12px] text-[#475569]">Workspace states</span>
              </div>

              <div className="grid gap-4">
                <div className="bg-[#fdf2e9] border border-[#ffd9b3] rounded-[12px] p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="size-5 text-[#f97316]" />
                    <div>
                      <p className="font-sans text-lg font-semibold text-[#0f172a]">Create profiles without chaos</p>
                      <p className="font-sans text-[14px] text-[#475569]">
                        Keep every workspace isolated, branded, and ready to publish with zero conflicts.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border border-[#dfe3ec] rounded-[12px] p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Layout className="size-4 text-[#4e7bff]" />
                      <p className="font-sans text-[15px] font-semibold text-[#0f172a]">Modular layout</p>
                    </div>
                    <p className="font-sans text-[14px] text-[#475569]">
                      Drag, drop, and reorder blocks with a light, intentional UI built for speed.
                    </p>
                  </div>

                  <div className="border border-[#dfe3ec] rounded-[12px] p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="size-4 text-[#4e7bff]" />
                      <p className="font-sans text-[15px] font-semibold text-[#0f172a]">Ready to ship</p>
                    </div>
                    <p className="font-sans text-[14px] text-[#475569]">
                      Publish instantly with per-workspace URLs and permissions that respect each audience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/3 space-y-3">
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#475569]">Why teams choose Plantly</p>
            <h2 className="font-sans text-3xl font-semibold tracking-[-0.6px] text-[#0f172a]">
              Smooth, light, professional—built for operators who need clarity.
            </h2>
            <p className="font-sans text-[15px] text-[#475569]">
              Inspired by Linktree but designed for multi-brand work. Everything stays organized, fast, and on-message.
            </p>
          </div>

          <div className="lg:w-2/3 grid md:grid-cols-3 gap-4">
            {highlights.map((item) => (
              <div key={item.title} className="bg-white border border-[#dfe3ec] rounded-[14px] p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <p className="font-sans text-[15px] font-semibold text-[#0f172a]">{item.title}</p>
                </div>
                <p className="font-sans text-[14px] text-[#475569] leading-6">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <div className="bg-white border border-[#dfe3ec] rounded-[18px] shadow-sm p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-[#e6e9f0]">
            <div className="space-y-1">
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#475569]">Workflow</p>
              <h3 className="font-sans text-2xl font-semibold tracking-[-0.6px] text-[#0f172a]">From idea to shipped profile in minutes</h3>
            </div>
            <Link href="/more">
              <Button className="rounded-[6px] bg-[#1341D0] text-white hover:bg-[#0f33a6]">Explore the full flow</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-4 pt-6">
            {steps.map((step, idx) => (
              <div key={step.title} className="border border-[#dfe3ec] rounded-[12px] p-4 bg-[#f7f9fb]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[11px] text-[#1341D0]">Step {idx + 1}</span>
                </div>
                <p className="font-sans text-[15px] font-semibold text-[#0f172a]">{step.title}</p>
                <p className="font-sans text-[13.5px] text-[#475569] leading-5 mt-1">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white border border-[#dfe3ec] rounded-[20px] px-6 py-10 lg:px-10 lg:py-14 overflow-hidden relative">
          <div className="absolute -right-16 -bottom-16 h-72 w-72 bg-[#ffe8f1] blur-3xl" />
          <div className="absolute -left-16 top-0 h-72 w-72 bg-[#c7daff] blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#475569]">Ready to launch</p>
              <h3 className="font-sans text-3xl font-semibold tracking-[-0.8px] text-[#0f172a]">Publish every workspace as its own polished identity.</h3>
              <p className="font-sans text-[15px] text-[#475569] max-w-xl">
                Keep your audiences separated, your brand consistent, and your ship cadence fast. Plantly makes multi-profile publishing feel effortless.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <WorkspaceButton />
                <Link href="/more">
                  <Button variant="outline" className="rounded-[6px] border-[#d4d7df] bg-white text-[#0f172a] hover:bg-[#eef1f7] hover:text-black">See details</Button>
                </Link>
              </div>
            </div>

            <div className="bg-[#fdf2e9] text-[#0f172a] rounded-[14px] border border-[#ffd9b3] shadow-sm p-5 min-w-[260px]">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="size-4 text-[#f97316]" />
                <p className="font-sans text-[15px] font-semibold">Workspace snapshot</p>
              </div>
              <p className="font-sans text-[13.5px] text-[#475569]">
                Multiple workspaces, each with its own audience, design, and analytics—managed from a single, calm dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CommunityModal />
    </div>
  );
};

export default page;