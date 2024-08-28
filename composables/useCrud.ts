export const useCrud = (endpoint: string) => {
	const toast = useToast();
	const i18n = useI18n();

	return {
		async get(id?: number | null) {
			const fixedEndpoint = id ? `${endpoint}/${id}/` : `${endpoint}/`;

			return await useApi(fixedEndpoint, {
				method: 'GET'
			}).catch(() => {
				toast.add({ title: i18n.t('errorOccurred') });
			});
		},
		async save(body: object, id?: number | null) {
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
			}).catch(() => {
				toast.add({ title: i18n.t('errorOccurred') });
			});
		},
		async delete(id: number) {
			return await useApi(`${endpoint}/${id}/`, {
				method: 'DELETE'
			}).catch(() => {
				toast.add({ title: i18n.t('errorOccurred') });
			});
		},
	};
};
