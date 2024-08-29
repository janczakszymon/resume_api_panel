<template>
	<UCard>
		<template #header>
			{{ $t('techStack') }}
		</template>

		<BaseTableComponent
			ref="table"
			v-model:data="technologies"
			v-model:columns="columns"
			:loading="loading"
			@clicked-edit="(e) => { $refs.editModal.open(e) }"
			@clicked-new="$refs.editModal.open(dataModel)"
			@clicked-delete="(e) => { deleteEntry(e) }"
		/>

		<EditModalComponent
			ref="editModal"
			@save="save"
		>
			<template #form="{ selected }">
				<UFormGroup
					:label="$t('name')"
				>
					<UInput
						v-model="selected.name"
						placeholder="Prestashop"
					/>
				</UFormGroup>
			</template>
		</EditModalComponent>
	</UCard>
</template>

<script setup lang="ts">
import type { ITechnology } from '~/interface/Resume/ITechnology';

const i18n = useI18n();
const technologies = ref<ITechnology[]>([]);
const editModal = ref();
const table = ref();
const loading = ref(false);

const crud = useCrud('/resumes/technologies', technologies, loading);

const dataModel = ref<ITechnology>({
	id: null,
	name: ''
});

const columns = [
	{
		key: 'id',
		label: 'ID'
	},
	{
		key: 'name',
		label: i18n.t('name')
	},
	{
		label: i18n.t('actions'),
		key: 'actions',
	}
];

function save(body): void {
	crud.save(
		body,
		body?.id,
		() => {
			editModal.value.close();
		});
}

function deleteEntry(selected): void {
	crud.delete(
		selected.id,
		() => {
			table.value.closeConfirmation();
		});
}

crud.get();
</script>
