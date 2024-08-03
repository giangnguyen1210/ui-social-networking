// import './style.css'

// import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import Link from 'next/link'

import { useHomeTemplateContext } from '@/templates/home-template'
import { Button } from '@mui/material'
import Image from 'next/image'
import SidebarButton from '../sidebar-button'
import { useProfileTemplateContext } from '@/templates/profile-detail-template'


function SideBarProfile() {
	const profileTemplateContext = useProfileTemplateContext()
	// console.log(adminTemplateContext.handleLogout());

	return (
		<div className={`admin__sidebar-component`}>
			<div className="admin__sidebar-body">


				<section className="flex flex-col items-start justify-between gap-3">
					<Image
						src="/assets/layout/imgs/header_logo.svg"
						alt="header_logo"
						width={10}
						height={10}
						className="size-auto pl-4 mb-8"
					/>
					{/* <Button variant="outlined"
						onClick={handleToggleSidebar}
						className="e-flat !flex h-[33px] w-[35px] !border-[var(--color-primary)] !p-0"
						style={{ border: 'none' }}
					>
						<span
							style={{ fontSize: 24 }}
							className="material-symbols-outlined m-auto text-[var(--color-primary)]"
						>
							{bodyExpand ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'}
						</span>
					</Button> */}
					
					{profileTemplateContext.templateState.sidebarData.sections.navigator.map((nav) => {
						if (nav?.type === 'search') {
							return (
								<Link style={{ width: '100%' }}  href={nav.path} key={nav.key}>
									<SidebarButton
										key={nav.key}
										innerItext={nav.innerText}
										icon={nav.icon}
										onClick={() => profileTemplateContext.handleOpenSearchModal()}
									/>
								</Link>
							)
						}
						if (nav?.type === 'add') {
							// console.log(adminTemplateContext.handleLogout)
							return (
								<Link style={{ width: '100%' }} href={nav.path} key={nav.key}>
									<SidebarButton
										key={nav.key}
										innerItext={nav.innerText}
										icon={nav.icon}
										onClick={() => profileTemplateContext.handleClickOpenModal()}
									/>
								</Link>
							)
						}
						return (
							<Link style={{ width: '100%' }} href={nav.path} key={nav.key}>
								<SidebarButton  innerItext={nav.innerText} icon={nav.icon} />
							</Link>
						)
					})}
				</section>

				<section className="lex flex-col items-start justify-between gap-3">
					{profileTemplateContext.templateState.sidebarData.sections.settings.map((nav) => {
						// console.log(nav)
						if (nav?.type === 'logout') {
							// console.log(adminTemplateContext.handleLogout)
							return (
								<Link href={nav.path} key={nav.key}>
									<SidebarButton
										key={nav.key}
										innerItext={nav.innerText}
										icon={nav.icon}
										onClick={() => profileTemplateContext.handleLogout()}
									/>
								</Link>
							)
						}
						return (
							<Link href={nav.path} key={nav.key}>
								<SidebarButton innerItext={nav.innerText} icon={nav.icon} />
							</Link>
						)
					})}
				</section>
			</div>
		</div>
	)
}

export default SideBarProfile
