import AuthTemplate from '@/templates/auth-template'

export default function CenteredLayout(props: { children: React.ReactNode }) {
	return <AuthTemplate>{props.children}</AuthTemplate>
}
