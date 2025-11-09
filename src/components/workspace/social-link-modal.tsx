"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState, FormEvent } from "react";
import { useSocialLinksModal } from "@/store/workspace";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCreateSocialLinks } from "@/hooks/workspace";
import { toast } from "sonner";
import { socialPlatforms } from "@/utils";

interface SocialLinksModalProps {
    username: string;
}

const SocialLinkModal = ({ username }: SocialLinksModalProps) => {
    const [url, setUrl] = useState<string>("");
    const [platform, setPlatform] = useState<string>("");
    const { isSocialLinks, setIsSocialLinks } = useSocialLinksModal();
    const { mutateAsync, isPending } = useCreateSocialLinks()

    const handleCloseForm = () => {
        setIsSocialLinks();
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            platform, username, url
        };
        const response = await mutateAsync(data);

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.error);
        }

        setIsSocialLinks();
    }

    return (
        <Dialog open={isSocialLinks} onOpenChange={handleCloseForm}>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Added Social Links</DialogTitle>
                    <DialogDescription className="text-[12.5px] leading-3">
                        Make yourSelf socially availaible to others!
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-start items-center gap-5 pt-2"
                >
                    <div className="w-full flex flex-col gap-1 px-1">
                        <Label htmlFor="platform" className="text-right text-[12px] font-normal font-sans">
                            Platform
                        </Label>
                        <Select
                            required
                            onValueChange={(value) => setPlatform(value)}
                            value={platform}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                            <SelectContent>
                                {socialPlatforms.map((platform) => (
                                    <SelectItem key={platform.value} value={platform.value}>
                                        <div className="flex items-center gap-2">
                                            <platform.icon size={16} /> {platform.label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full flex flex-col justify-center gap-1 px-1">
                        <Label htmlFor="url" className="text-right text-[12px] font-sans font-normal">
                            URL
                        </Label>
                        <Input
                            required
                            id="url"
                            type="url"
                            placeholder="https://example.com/profile"
                            className="col-span-3"
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <DialogFooter className="w-full">
                        <Button type="button" onClick={handleCloseForm} variant="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            Add
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SocialLinkModal;