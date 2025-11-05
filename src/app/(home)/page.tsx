import { onBoardUser } from "@/actions/auth"
import CommunityModal from "@/components/home/community-modal";
import CommunityToggle from "@/components/home/community-toggle";
import HomeTemplate from "@/components/home/home-template";
import WorkspaceButton from "@/components/home/workspace-button";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const { user, success } = await onBoardUser();
  return (
    <div className="w-full min-h-auto">
      <div className="w-full flex justify-center items-center pt-15 pb-5">
        <HomeTemplate />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-[#f3f3f3]">
        <h1 className="font-sans font-medium text-4xl tracking-[-1.5px]">A Service that can lift you from zero to Hero!</h1>
        <p className="font-sans font-normal text-[18px] tracking-[-0.5px] w-[40%] text-center">
          A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 text-[#f3f3f3] py-5">
        {user?.isCommunity ? (
          <>
            <Link href={'/community'}>
              <Button className="rounded-[5px]">
                Community
              </Button>
            </Link>
          </>
        ) :
          (
            <>
              <CommunityToggle />
            </>
          )}
        <WorkspaceButton />
      </div>

      <CommunityModal />
    </div>
  )
}

export default page;