"use client";

import { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useCreateLinks } from "@/hooks/workspace";
import { toast } from "sonner";

interface WorkspaceLinksProps {
    workspace: string
}

const WorkspaceLinks = ({ workspace }: WorkspaceLinksProps) => {
    const { mutateAsync, isPending } = useCreateLinks();
    const [title, setTitle] = useState<string>("");
    const [description, setDespription] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [profileImageUrl, setProfileImageUrl] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            title, description, url, profileImageUrl, username: workspace
        }

        const response = await mutateAsync(data);

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.error);
        }

        setTitle("");
        setDespription("");
        setProfileImageUrl("");
        setUrl("");
    }

    return (
        <form onSubmit={handleSubmit} className="px-5 py-5 flex items-center flex-col justify-center gap-6">
            <div className="w-full px-1">
                <h1 className="text-xl font-sans font-medium tracking-tight">Add Links</h1>
                <p className="text-[12px] font-normal font-sans tracking-[-0.2px]">Add links to your plant for more visibiity</p>
            </div>

            <div className="w-full min-h-auto flex flex-col justify-center gap-3">
                <div className="w-full flex flex-col gap-1">
                    <Label
                        htmlFor="title"
                        className="font-sans font-normal text-[12px] text-[#f3f3f3] px-1"
                    >
                        Title
                    </Label>
                    <Input
                        required
                        placeholder="twitter"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="accent-blue-500"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label
                        htmlFor="url"
                        className="font-sans font-normal text-[12px] text-[#f3f3f3] px-1"
                    >
                        URL
                    </Label>
                    <Input
                        required
                        placeholder="http://x.com"
                        id="url"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="accent-blue-500"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label
                        htmlFor="description"
                        className="font-sans font-normal text-[12px] text-[#f3f3f3] px-1"
                    >
                        Description
                    </Label>
                    <Textarea
                        required
                        placeholder="An url of x.com"
                        id="description"
                        value={description}
                        onChange={(e) => setDespription(e.target.value)}
                        className="accent-blue-500"
                    />
                </div>
                <div className="w-full pt-1 flex justify-between px-1">
                    <div className="flex gap-2 justify-center items-center">
                        <span className="text-[12px] font-sans font-medium p-1.5 bg-zinc-950 rounded-[5px] border border-[#313136]">Workspace :</span>
                        <span className="text-[12px] font-sans font-medium rounded-[5px] hover:underline">{workspace}</span>
                    </div>
                    <Button size={"sm"} className="font-sans font-medium" type="submit" disabled={isPending}>
                        Create
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default WorkspaceLinks;