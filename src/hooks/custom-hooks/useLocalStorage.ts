export const useLocalStorage = (key: string) => {
	const setItem = (value: unknown) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error)
		}
	}

	// eslint-disable-next-line consistent-return
	const getItem = (): any => {
		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : undefined
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error)
		}
	}

	const removeItem = () => {
		try {
			window.localStorage.removeItem(key)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error)
		}
	}

	return { setItem, getItem, removeItem }
}
