import type { RefreshHandler } from '@sidebase/nuxt-auth';
import { useApi } from '~/composables/useApi';
import type { IRefreshTokenResponse } from '~/interface/IRefreshTokenResponse';

class CustomRefreshHandler implements RefreshHandler {
	interval?: ReturnType<typeof setInterval>;

	init(): void {
		const { refreshToken, status, setToken, clearToken } = useAuthState();
		const runtimeConfig = useRuntimeConfig();

		this.interval = setInterval(() => {
			if (status.value !== 'authenticated') {
				return;
			}

			useApi(`/token/refresh/`, {
				method: 'POST',
				body: JSON.stringify({
					refresh_token: refreshToken.value,
				})
			})
				.then((res: IRefreshTokenResponse) => {
					setToken(res.token);
				})
				.catch(() => {
					clearToken();
					clearInterval(this.interval);
				});
		}, runtimeConfig.public.REFRESH_PERIOD * 1000);
	}

	destroy(): void {
		clearInterval(this.interval);
	}
}

export default new CustomRefreshHandler();
