import { comparisonModel } from '@/common/config/appRouter/admin/comparison-model'
import { costEstimate } from '@/common/config/appRouter/admin/cost-estimate'
import { dashboard } from '@/common/config/appRouter/admin/dashboard'
import { equipment } from '@/common/config/appRouter/admin/equipment'
import { files } from '@/common/config/appRouter/admin/file'
import { modelManagement } from '@/common/config/appRouter/admin/model-management'
import { projectManagement } from '@/common/config/appRouter/admin/project-management'
import { settings } from '@/common/config/appRouter/admin/settings'
import { systemLog } from '@/common/config/appRouter/admin/system-log'

const DEFAULT_PATHS = {
	admin: {
		dashboard,
		files,
		settings,
		modelManagement,
		comparisonModel,
		costEstimate,
		equipment,
		projectManagement,
		systemLog,
	},
	center: {
		signIn: {
			path: '/sign-in',
		},
		signUp: {
			path: '/sign-up',
		},
		forgotPassword: {
			path: '/forgot-password',
		},
	},
	unAuth: {
		root: '/',
	},
	homePage: {
		root: '/',
	},
}

export default Object.freeze({
	paths: DEFAULT_PATHS,
})
