export const useCrud = (endpoint: string, data: Ref, loading: Ref) => {
	const toast = useToast();
	const i18n = useI18n();

	return {
		async get(id?: number | null) {
			loading.value = true;
			data.value = [];

			const fixedEndpoint = id ? `${endpoint}/${id}/` : `${endpoint}/`;

			return await useApi(fixedEndpoint, {
				method: 'GET'
			})
				.then((res: unknown) => {
					data.value = res;
				})
				.catch(() => {
					toast.add({ title: i18n.t('errorOccurred'), color: 'red' });
				})
				.finally(() => {
					loading.value = false;
				});
		},
		async save(body: object, id?: number | null, onThen?: () => unknown) {
			let fixedEndpoint = ``;
			let method = '';

			if (id) {
				fixedEndpoint = `${endpoint}/${id}/`;
				method = 'PUT';
			}
			else {
				fixedEndpoint = `${endpoint}/`;
				method = 'POST';
			}

			return await useApi(fixedEndpoint, {
				method: method,
				body: JSON.stringify(body)
			})
				.then((res) => {
					if (!res) {
						return;
					}

					if (onThen) {
						onThen();
					}

					toast.add({ title: i18n.t('saved'), color: 'green' });

					this.get();
				})
				.catch(() => {
					toast.add({ title: i18n.t('errorOccurred'), color: 'red' });
				});
		},
		async delete(id: number, onThen?: () => unknown) {
			return await useApi(`${endpoint}/${id}/`, {
				method: 'DELETE'
			})
				.then(() => {
					toast.add({ title: i18n.t('deleted'), color: 'green' });

					if (onThen) {
						onThen();
					}

					this.get();
				})
				.catch(() => {
					toast.add({ title: i18n.t('errorOccurred'), color: 'red' });
				});
		},
	};
};
