"use client";

import { ArrowRight, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetUsernames } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useSelectUsernameWorkspace } from '@/store/workspace';

const WorkspaceButton = () => {
    const router = useRouter();
    const { data } = useGetUsernames();
    const { workspace, setWorkspace } = useSelectUsernameWorkspace();

    console.log(data);
    const HandleOnClick = () => {
        if (data?.usernames?.length === 0) {
            router.push('/create-workspace');
        } else {
            if (workspace) {
                setWorkspace(workspace);
                router.push(`/${workspace}/workspace`)
            } else {
                setWorkspace(data?.usernames?.[0]!);
                router.push(`/${data?.usernames?.[0]}/workspace`)
            }
        }
    }

    if (!data?.usernames) {
        return (
            <Button size={"lg"} className="bg-[#1341D0] text-white hover:bg-blue-500 rounded-[5px] w-30">
                <LoaderCircle className='animate-spin' />
            </Button>
        )
    }

    return (
        <div>
            <Button onClick={HandleOnClick} className="bg-[#1341D0] text-white hover:bg-[#0f33a6] active:translate-y-[1px] rounded-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4e7bff] focus-visible:outline-offset-2 transition">
                <span>
                    Get Started
                </span>
                <ArrowRight />
            </Button>
        </div>
    )
}

export default WorkspaceButton;