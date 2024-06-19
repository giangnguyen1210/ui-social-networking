// import { getTranslations } from 'next-intl/server'
import React from 'react'

export async function generateMetadata(props: { params: { locale: string; slug: string } }) {
	// const t = await getTranslations({
	// 	locale: props.params.locale,
	// 	namespace: 'Dashboard',
	// })

	return {
		// title: t('meta_title'),
		title: props.params.slug,
	}
}
function OtherPage({ params }: { params: { slug: string } }) {
	return <div>{params.slug}</div>
}

export default OtherPage
