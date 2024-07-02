import React from 'react'
import { Toaster } from 'react-hot-toast'

import { ReactQueryClientProvider } from '@/components/providers/query-client-provider/ReactQueryClientProvider'
import { AppModalProvider } from '../modals/app-modal'

interface IAppProvider {
	children: React.ReactNode
}

function AppProvider({ children }: IAppProvider) {
	return (
		<ReactQueryClientProvider>
			{children}
			<Toaster />
			<AppModalProvider/>
		</ReactQueryClientProvider>
	)
}

export default AppProvider
