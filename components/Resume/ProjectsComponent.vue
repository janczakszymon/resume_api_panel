<template>
	<UCard>
		<template #header>
			{{ $t('projects') }}
		</template>

		<BaseTableComponent
			ref="table"
			v-model:data="projects"
			v-model:columns="columns"
			:loading="loading"
			@clicked-edit="(e) => { $refs.editModal.open(e) }"
			@clicked-new="$refs.editModal.open(dataModel)"
			@clicked-delete="(e) => { deleteEntry(e) }"
		>
			<template #description-data="{ data }">
				<div class="truncate w-64">
					{{ data.description.find(property => property.language === $i18n.locale).text }}
				</div>
			</template>

			<template #name-data="{ data }">
				<div class="truncate w-64">
					{{ data.name.find(property => property.language === $i18n.locale).text }}
				</div>
			</template>

			<template #fullName-data="{ data }">
				<div class="truncate w-64">
					{{ data.fullName.find(property => property.language === $i18n.locale).text }}
				</div>
			</template>
		</BaseTableComponent>

		<EditModalComponent
			ref="editModal"
			:schema="schema"
			@save="save"
		>
			<template #form="{ selected }">
				<TranslationEditComponent
					:translation="selected.name"
					name="name"
					required
				/>
				<UDivider />
				<TranslationEditComponent
					:translation="selected.fullName"
					name="fullName"
					required
				/>
				<UDivider />
				<TranslationEditComponent
					:translation="selected.description"
					name="description"
					required
				/>
				<UFormGroup
					:label="$t('type')"
					name="type"
				>
					<UInput
						v-model="selected.type"
						placeholder="opensource"
					/>
				</UFormGroup>
			</template>
		</EditModalComponent>
	</UCard>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { IProject } from '~/interface/Resume/IProject';

const i18n = useI18n();
const projects = ref<IProject[]>([]);
const editModal = ref();
const table = ref();
const loading = ref(false);

const crud = useCrud('/resumes/projects', projects, loading);

const dataModel = ref<IProject>({
	id: null,
	name: [
		{
			language: 'pl',
			text: ''
		},
		{
			language: 'en',
			text: ''
		}
	],
	fullName: [
		{
			language: 'pl',
			text: ''
		},
		{
			language: 'en',
			text: ''
		}
	],
	description: [
		{
			language: 'pl',
			text: ''
		},
		{
			language: 'en',
			text: ''
		}
	],
	type: ''
});

const columns = ref([
	{
		key: 'id',
		label: 'ID'
	}, {
		key: 'name',
		label: i18n.t('name')
	},
	{
		key: 'fullName',
		label: i18n.t('fullName')
	},
	{
		key: 'description',
		label: i18n.t('description')
	},
	{
		label: i18n.t('actions'),
		key: 'actions',
	}
]);

const translationSchema = z.object({
	language: z.string().min(1, { message: i18n.t('fieldIsRequired') }),
	text: z.string().min(1, { message: i18n.t('fieldIsRequired') })
});

const schema = z.object({
	name: z.array(translationSchema),
	fullName: z.array(translationSchema),
	description: z.array(translationSchema),
	type: z.string().min(1, { message: i18n.t('fieldIsRequired') }),
});

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
