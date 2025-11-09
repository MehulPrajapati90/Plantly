export interface UpdateUserProfileProps {
    firstName: string;
    lastName: string;
    bio: string;
}

export interface CreateLinkProps {
    username: string;
    title: string;
    url: string;
    profileImageUrl: string;
    description: string;
}

export interface CreateSocialLinksProps {
    username: string;
    url: string;
    platform: string;
}