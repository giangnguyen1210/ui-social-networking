import HomePageView from "@/view/home/pages/home.page"

export async function generateMetadata() {
	return {
		title: 'Home',
	}
}


const HomePage = () => {
	return <HomePageView/>

}

export default HomePage
