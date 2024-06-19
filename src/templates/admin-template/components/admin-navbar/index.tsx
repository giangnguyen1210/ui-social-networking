// import './style.css'

import Image from 'next/image'
import { useAdminTemplateContext } from '../..'


function AdminNavbar() {
	const { handleToggleSidebar } = useAdminTemplateContext()

	return (
		<div className="admin__navbar-component">
			<section className="flex items-center justify-between gap-3">
			
				<Image
					src="/assets/layout/imgs/header_logo.svg"
					alt="header_logo"
					width={10}
					height={10}
					className="size-auto"
				/>
			</section>
			<section className="flex items-center justify-center gap-4">
				
				{/* <span className="e-avatar e-avatar-circle">
					<FallbackImage
						src="/assets/layout/imgs/user_avt.jpg"
						alt="header_logo"
						width={200}
						height={200}
						className="size-full"
					/>
				</span> */}
			</section>
		</div>
	)
}

export default AdminNavbar
