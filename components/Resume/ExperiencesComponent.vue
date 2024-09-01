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
			:schema="schema"
			@save="save"
		>
			<template #form="{ selected }">
				<UFormGroup
					:label="$t('company')"
					name="company"
				>
					<UInput
						v-model="selected.company"
						placeholder="SpaceX"
					/>
				</UFormGroup>
				<UDivider />
				<UFormGroup
					:label="$t('location')"
					name="location"
				>
					<UInput
						v-model="selected.location"
						placeholder="Hawthorn"
					/>
				</UFormGroup>
				<UDivider />
				<div class="flex gap-3">
					<UFormGroup
						:label="$t('startDate')"
					>
						<DatePickerComponent
							v-model="selected.startDate"
						/>
					</UFormGroup>
					<UFormGroup
						:label="$t('endDate')"
					>
						<DatePickerComponent
							v-model="selected.endDate"
							:disabled="selected.stillWorks"
						/>
					</UFormGroup>
					<UFormGroup
						:label="$t('stillWorks')"
					>
						<UToggle
							v-model="selected.stillWorks"
						/>
					</UFormGroup>
				</div>
				<UDivider />
				<TranslationEditComponent
					:translation="selected.position"
					name="position"
				/>
			</template>
		</EditModalComponent>
	</UCard>
</template>

<script setup lang="ts">
import { z } from 'zod';
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
			language: 'en',
			text: ''
		}
	],
	location: '',
	startDate: new Date().toDateString(),
	endDate: new Date().toLocaleString(),
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

const translationSchema = z.object({
	language: z.string().min(1, { message: i18n.t('fieldIsRequired') }),
	text: z.string().min(1, { message: i18n.t('fieldIsRequired') })
});

const schema = z.object({
	company: z.string().min(1, { message: i18n.t('fieldIsRequired') }),
	location: z.string().min(1, { message: i18n.t('fieldIsRequired') }),
	position: z.array(translationSchema)
});

function save(body): void {
	if (body['stillWorks']) {
		body.endDate = null;
	}

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

watch(experiences, () => {
	experiences.value.forEach((e) => {
		e['stillWorks'] = !e.endDate;

		if (!e.endDate) {
			e.endDate = new Date().toLocaleString();
		}
	});
});
</script>
