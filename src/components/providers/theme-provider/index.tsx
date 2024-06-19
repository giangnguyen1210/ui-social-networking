import React from 'react'

import { ThemeContextProvider } from '@/components/providers/theme-provider/theme-context'
import ThemeWrapper from '@/components/providers/theme-provider/theme-wrapper'

interface IThemeProvider {
	children: React.ReactNode
}

function ThemeProvider({ children }: IThemeProvider) {
	return (
		<ThemeContextProvider>
			<ThemeWrapper>{children}</ThemeWrapper>
		</ThemeContextProvider>
	)
}

export default ThemeProvider
