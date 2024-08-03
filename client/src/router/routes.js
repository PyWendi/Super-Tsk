const routes = [
	{
		path: '/',
		component: () => import('pages/LoginPage.vue'),
	},

	{
		path: "/home",
		component: () => import('pages/HomePage.vue'),
		children: [
			{
				path: "",
				component: () => import('pages/subPages/UserTaskPage.vue'),
				name: "home"
			}
		]
	},

	{
		path: "/admin",
		component: () => import('pages/AdminPage.vue'),
		children: [
			{
				path: "user/management",
				component: () => import('pages/subPages/UserManagementPage.vue'),
				name: "user_management"
			},
			{
				path: "task/management",
				component: () => import('pages/subPages/TaskManagement.vue'),
				name: "task_management"
			}
		]
	},


	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue')
	}
]

export default routes
