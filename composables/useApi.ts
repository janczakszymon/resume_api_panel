import type { NitroFetchRequest } from 'nitropack';

export const useApi = (request: NitroFetchRequest, opts = {}) => {
	const config = useRuntimeConfig();
	const { token } = useAuthState();

	return $fetch(request, {
		baseURL: config.public.API_URL,
		headers: {
			Authorization: token.value as string
		},
		...opts
	});
};
