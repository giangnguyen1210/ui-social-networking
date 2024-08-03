import { create } from 'zustand'

const initialModalState = {
	isOpen: false,
	showCloseIcon: true,
	title: '',
	content: '',
	classNames: {
		overlay: '',
		modal: '',
	},
}

type AppModal = {
	isOpen: boolean
	showCloseIcon: boolean
	content: string | React.ReactNode
	title: string
	classNames: {
		overlay: string
		modal: string
	}

	open: () => void
	close: () => void
	toggle: () => void
	setModalOptions: ({
		showCloseIcon,
		content,
		title,
		classNames,
	}: {
		showCloseIcon?: AppModal['showCloseIcon']
		content?: AppModal['content']
		title?: AppModal['title']
		classNames?: AppModal['classNames']
	}) => void
}

const useAppModal = create<AppModal>()((set) => ({
	...initialModalState,

	setModalOptions: ({ showCloseIcon, content, title }) =>
		set((state) => ({ ...state, showCloseIcon, content, title })),
	open: () => set(() => ({ isOpen: true })),
	close: () => set(() => ({ isOpen: false })),
	toggle: () => set((state) => ({ isOpen: !state.isOpen })),
	reset: () => set((state) => ({ ...state, ...initialModalState })),
}))

export default useAppModal
