import { HomeTemplate } from '@/templates/home-template'

export default function AuthLayout(props: { children: React.ReactNode; params: { locale: string } }) {
	return <HomeTemplate>{props.children}</HomeTemplate>
}
