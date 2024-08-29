<template>
	<UCard>
		<template #header>
			{{ $t('experience') }}
		</template>

		<BaseTableComponent
			ref="table"
			v-model:data="experiences"
			v-model:columns="columns"
			:loading="loading"
			@clicked-edit="(e) => { $refs.editModal.open(e) }"
			@clicked-new="$refs.editModal.open(dataModel)"
			@clicked-delete="(e) => { deleteEntry(e) }"
		>
			<template #position-data="{ data }">
				<div class="truncate w-64">
					{{ data.position.find(property => property.language === $i18n.locale).text }}
				</div>
			</template>
		</BaseTableComponent>

		<EditModalComponent
			ref="editModal"
			@save="save"
		>
			<template #form="{ selected }">
				<UFormGroup
					:label="$t('company')"
				>
					<UInput
						v-model="selected.company"
						placeholder="SpaceX"
					/>
				</UFormGroup>
				<UDivider />
				<UFormGroup
					:label="$t('location')"
				>
					<UInput
						v-model="selected.company"
						placeholder="Hawthorn"
					/>
				</UFormGroup>
				<UDivider />
				<UFormGroup
					:label="$t('startDate')"
				>
					<UInput
						v-model="selected.startDate"
						placeholder="data"
					/>
				</UFormGroup>
				<UDivider />
				<UFormGroup
					:label="$t('endDate')"
				>
					<UInput
						v-model="selected.endDate"
						placeholder="data"
					/>
				</UFormGroup>
				<TranslationEditComponent
					v-for="(translations, key) in [selected.position]"
					:key="key"
					:translation="translations"
					:for="$t('position')"
				/>
			</template>
		</EditModalComponent>
	</UCard>
</template>

<script setup lang="ts">
import type { IExperience } from '~/interface/Resume/IExperience';

const i18n = useI18n();
const experiences = ref<IExperience[]>([]);
const editModal = ref();
const table = ref();
const loading = ref(false);

const crud = useCrud('/resumes/experiences', experiences, loading);

const dataModel = ref<IExperience>({
	id: null,
	company: '',
	position: [
		{
			language: 'pl',
			text: ''
		},
		{
			language: 'pl',
			text: ''
		}
	],
	location: '',
	startDate: '',
	endDate: ''
});

const columns = [
	{
		key: 'id',
		label: 'ID'
	},
	{
		key: 'company',
		label: i18n.t('company')
	},
	{
		key: 'position',
		label: i18n.t('position')
	},
	{
		key: 'location',
		label: i18n.t('location')
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
