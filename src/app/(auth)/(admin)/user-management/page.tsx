import TableComponent from '@/components/tables/TableComponent'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'Dashboard',
	})

	return {
		title: t('meta_title'),
	}
}

const UserManagement = () => {
	return <div> 
		bca
		<TableComponent/>
	</div>
}

export default UserManagement
