"use client";

import { Button } from '@/components/ui/button'
import { useCommunityModal } from '@/store/auth';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CommunityToggle = () => {
    const user = useUser();
    const router = useRouter();
    const { setIsCommunityOpen } = useCommunityModal();

    const handleToggle = () => {
        if (!user?.isSignedIn) {
            router.push('/sign-in');
            return;
        }
        setIsCommunityOpen();
    }
    return (
        <Button onClick={handleToggle} className="rounded-[5px]">
            Community
        </Button>
    )
}

export default CommunityToggle;