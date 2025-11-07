"use client";

import { Button } from '@/components/ui/button'
import { useCommunityModal } from '@/store/auth';

const CommunityToggle = () => {
    const { setIsCommunityOpen } = useCommunityModal();
    return (
        <Button onClick={setIsCommunityOpen} className="rounded-[5px]">
            Community
        </Button>
    )
}

export default CommunityToggle;