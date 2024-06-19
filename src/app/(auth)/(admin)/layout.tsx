import { AdminTemplate } from '@/templates/admin-template'

export default function AuthLayout(props: { children: React.ReactNode; params: { locale: string } }) {
	return <AdminTemplate>{props.children}</AdminTemplate>
}
