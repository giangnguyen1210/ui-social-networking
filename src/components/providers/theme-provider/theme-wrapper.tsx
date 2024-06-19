'use client'

import React from 'react'

import { useThemeContextProvider } from '@/components/providers/theme-provider/theme-context'

interface IThemeWrapper {
	children: React.ReactNode
}

function ThemeWrapper({ children }: IThemeWrapper) {
	const { config } = useThemeContextProvider()
	return <div data-app-color-scheme={config.theme.mode}>{children}</div>
}

export default ThemeWrapper
