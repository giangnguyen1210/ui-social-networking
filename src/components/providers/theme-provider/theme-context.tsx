'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { useLocalStorage } from '@/hooks/custom-hooks'

interface IThemeContext {
	children: React.ReactNode
}

const initialTheme = { theme: { mode: 'light' } }
const themeCdn = {
	dark: '/themes/tailwind-dark.css',
	light: '/themes/tailwind.css',
}
const ThemeContext = createContext({ config: initialTheme, handleToggleTheme: () => null })

const useThemeContextProvider = () => {
	const context = useContext(ThemeContext)

	if (!context) {
		throw Error('useThemeContextProvider must me used in ThemeContextProvider')
	}

	return context
}

function ThemeContextProvider({ children }: IThemeContext) {
	const storage = useLocalStorage('mode')
	const [theme, setTheme] = useState<typeof initialTheme>(initialTheme)
	const linkRelEl = document?.getElementById('app-themes-cdn')

	useEffect(() => {
		if (storage.getItem()) {
			linkRelEl?.setAttribute('href', storage.getItem() === 'light' ? themeCdn.light : themeCdn.dark)
			setTheme((prev) => {
				return {
					...prev,
					theme: {
						mode: storage.getItem(),
					},
				}
			})
		} else {
			storage.setItem(initialTheme.theme.mode)
			linkRelEl?.setAttribute('href', themeCdn.light)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleToggleTheme = () => {
		storage.setItem(theme.theme.mode === 'light' ? 'dark' : 'light')
		linkRelEl?.setAttribute('href', theme.theme.mode === 'light' ? themeCdn.dark : themeCdn.light)
		setTheme((prev) => {
			return {
				...prev,
				theme: {
					mode: prev.theme.mode === 'light' ? 'dark' : 'light',
				},
			}
		})
		return null
	}

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	return <ThemeContext.Provider value={{ config: theme, handleToggleTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeContextProvider, useThemeContextProvider }
