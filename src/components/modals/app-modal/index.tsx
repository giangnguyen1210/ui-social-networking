'use client'

import { Modal } from 'react-responsive-modal'

import useAppModal from '@/components/modals/app-modal/store'

export function AppModalProvider() {
	const { isOpen, content, showCloseIcon, close } = useAppModal((state) => ({
		isOpen: state.isOpen,
		title: state.title,
		content: state.content,
		showCloseIcon: state.showCloseIcon,

		open: state.open,
		close: state.close,
		setModalOptions: state.setModalOptions,
	}))

	return (
		<Modal open={isOpen} classNames={{
			// overlay: 'customOverlay',
			modal: 'customModal',
		}} onClose={close} center showCloseIcon={showCloseIcon}>
			{/* <h2>{title}</h2> */}
			<div>{content}</div>
		</Modal>
	)
}
