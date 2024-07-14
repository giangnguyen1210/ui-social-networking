import { ProfileTemplate } from "@/templates/profile-detail-template";
// import { ProfileTemplate } from "@/templates/profile-detail-template";

export default function ChatLayout(props: { children: React.ReactNode; params: { locale: string } }) {
	return <ProfileTemplate>{props.children}</ProfileTemplate>
}
