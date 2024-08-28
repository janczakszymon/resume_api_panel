import type { NitroFetchRequest } from 'nitropack';

export const useApi = (request: NitroFetchRequest, opts = {}) => {
	const config = useRuntimeConfig();

	return $fetch(request, { baseURL: config.public.API_URL, ...opts });
};
