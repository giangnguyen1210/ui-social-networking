import SignupPageView from '@/view/auth/pages/signup.page'

export async function generateMetadata() {
	return {
		title: 'Sign up',
	}
}

function SingUpPage() {
	return <SignupPageView />
}

export default SingUpPage
