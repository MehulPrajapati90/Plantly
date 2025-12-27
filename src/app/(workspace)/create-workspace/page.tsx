"use client";

import CreateWorkspaceModal from '@/components/workspace/create-workspace-modal';
import React from 'react'

const CreateWorkspace = () => {
    return (
        <div className="min-h-screen w-full bg-[#060914] relative overflow-hidden flex items-center justify-center px-4">
            <style jsx global>{`
              @keyframes moveGradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              @keyframes hueShift {
                from { filter: hue-rotate(0deg); }
                to { filter: hue-rotate(360deg); }
              }
            `}</style>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-28 -left-24 h-96 w-96 bg-[#4e7bff3b] blur-3xl" />
                <div className="absolute top-6 -right-16 h-80 w-80 bg-[#ff8abf3b] blur-3xl" />
                <div className="absolute -bottom-24 left-1/4 h-96 w-[65%] bg-[radial-gradient(circle_at_20%_30%,#ffb86c2e,transparent_50%),radial-gradient(circle_at_75%_70%,#6ac8ff2e,transparent_45%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,186,108,0.12),transparent_40%)]" />
                <div
                    className="absolute inset-0 opacity-[0.28] mix-blend-screen"
                    style={{
                        backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
                        backgroundSize: "32px 32px"
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.22] mix-blend-screen"
                    style={{
                        backgroundImage: "linear-gradient(90deg, rgba(255,138,191,0.12), rgba(74,134,255,0.12))"
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.28] mix-blend-screen"
                    style={{
                        backgroundImage: "linear-gradient(135deg, rgba(255,138,191,0.24), rgba(74,134,255,0.24), rgba(106,200,255,0.2), rgba(255,186,108,0.22))",
                        backgroundSize: "220% 220%",
                        animation: "moveGradient 18s ease-in-out infinite, hueShift 24s linear infinite"
                    }}
                />
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "radial-gradient(circle at 10% 10%, rgba(255,255,255,0.16) 0, rgba(255,255,255,0.02) 30%), radial-gradient(circle at 90% 20%, rgba(115,130,255,0.18) 0, rgba(115,130,255,0.02) 32%)"
                }} />
            </div>
            <div className="relative w-full max-w-xl">
                <div className="rounded-[18px] border border-white/10 bg-[#0f172a]/85 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md p-4">
                    <div className="rounded-[14px] bg-linear-to-br from-white/10 via-white/8 to-white/5 border border-white/10 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_15px_35px_-25px_rgba(0,0,0,0.9)]">
                        <CreateWorkspaceModal />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateWorkspace;