import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/workspace/preview";
import ShareButton from "@/components/workspace/share-button";
import ShareModal from "@/components/workspace/share-modal";
import SocialLinkModal from "@/components/workspace/social-link-modal";
import UserProfileModal from "@/components/workspace/user-profile-modal";
import WorkspaceDropDownBg from "@/components/workspace/workspace-dropdown-bg";
import WorkspaceLinks from "@/components/workspace/workspace-links";
import WorkSpaceModal from "@/components/workspace/workspace-modal";
import WorkspaceModalCover from "@/components/workspace/workspace-modal-cover";
import WorkspaceProfile from "@/components/workspace/workspace-profile";
import { ChartBarBig, Pen } from "lucide-react";

interface WorkspaceProps {
  params: Promise<{
    username: string
  }>
}

const Workspace = async ({ params }: WorkspaceProps) => {
  const { username } = await params;
  return (
    <div className="w-full min-h-auto flex flex-col justify-center items-center">
      <div className="w-full min-h-auto flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant={"outline"} className="flex text-[#e9e9e9] font-sans font-medium">
            <Pen />
            <p>Design</p>
          </Button>
          <ShareButton workspace={username} />
          <WorkspaceModalCover />
        </div>
        <div className="bg-zinc-950 rounded-[6px] px-5 py-2 flex justify-center items-center gap-2 h-14">
          <div className="flex gap-1 justify-center items-center">
            <p className="text-[#f3f3f3] font-sans font-medium text-[12px]">Workspaces</p>
            <ChartBarBig size={13} />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <WorkspaceDropDownBg active={username} />
        </div>
      </div>
      <div className="w-full min-h-auto pt-15 px-5">
        <div className="px-5">
          <h1 className="text-3xl font-sans font-medium tracking-[-0.5px]">Profile</h1>
          <p className="text-[13px] font-sans font-normal tracking-[-0.3px]">Here, your profile and can make changes!</p>
        </div>

        <div className="flex justify-center items-center gap-5 pt-5">
          <div className="w-full md:w-[50%] flex flex-col gap-10">
            <div className="w-full min-h-auto bg-zinc-900 rounded-[100px] border border-dashed border-zinc-500">
              <WorkspaceProfile workspace={username} />
            </div>
            <div className="w-full min-h-auto bg-zinc-900 rounded-[30px] border border-dashed border-zinc-500">
              <WorkspaceLinks workspace={username} />
            </div>
          </div>

          {/* Preview */}
          <div className="w-full md:w-[50%] max-h-140 bg-zinc-900 rounded-[30px] border border-dashed border-zinc-500 hidden md:flex min-h-130">
            <Preview workspace={username} />
          </div>
        </div>
      </div>
      <WorkSpaceModal />
      <ShareModal />
      <UserProfileModal username={username} />
      <SocialLinkModal username={username} />
    </div>
  )
}

export default Workspace