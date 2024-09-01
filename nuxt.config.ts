// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: false },
	modules: [
		'@nuxt/ui',
		'@nuxtjs/google-fonts',
		'@nuxt/image',
		'@nuxt/eslint',
		'@nuxtjs/sitemap',
		'@nuxtjs/i18n',
		'@sidebase/nuxt-auth'
	],
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL || '',
			WEBSITE_URL: process.env.WEBSITE_URL || '',
			REFRESH_PERIOD: process.env.REFRESH_PERIOD ? parseInt(process.env.REFRESH_PERIOD) : 5,
			UMAMI_URL: process.env.UMAMI_WEBSITE_URL,
		},
	},
	googleFonts: {
		download: true,
		families: {
			'Roboto Mono': {
				wght: '300..700',
			},
		},
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
				commaDangle: 'only-multiline'
			},
		},
	},
	colorMode: {
		preference: 'light'
	},
	i18n: {
		locales: ['pl', 'en'],
		defaultLocale: 'pl',
	},
	auth: {
		baseURL: process.env.API_URL,
		globalAppMiddleware: true,
		sessionRefresh: {
			enablePeriodically: process.env.REFRESH_PERIOD ? parseInt(process.env.REFRESH_PERIOD) * 1000 : 5000,
			enableOnWindowFocus: true,
			handler: './config/authRefreshHandler'
		},
		provider: {
			type: 'local',
			pages: {
				login: '/login',
			},
			endpoints: {
				signIn: { path: 'login/', method: 'post' },
				signOut: { path: 'logout/', method: 'get' },
				getSession: { path: 'users/session/', method: 'get' },
			},
			token: {
				signInResponseTokenPointer: '/token',
				type: 'Bearer',
				headerName: 'Authorization',
				sameSiteAttribute: 'lax',
				cookieDomain: process.env.COOKIE_DOMAIN || 'localhost'
			},
			refresh: {
				isEnabled: true,
				endpoint: { path: 'token/refresh/', method: 'post' },
				refreshOnlyToken: false,
				token: {
					signInResponseRefreshTokenPointer: '/refresh_token',
					sameSiteAttribute: 'lax',
					cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',
				}
			},
			sessionDataType: {
				id: 'number',
				username: 'string',
				roles: 'string[]'
			}
		}
	},
	server: {
		port: 3001
	}
});
