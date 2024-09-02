<template>
	<UCard>
		<template #header>
			{{ $t('texts') }}
		</template>

		<BaseTableComponent
			ref="table"
			v-model:data="texts"
			v-model:columns="columns"
			:loading="loading"
			@clicked-edit="(e) => { $refs.editModal.open(e) }"
			@clicked-new="$refs.editModal.open(dataModel)"
			@clicked-delete="(e) => { deleteEntry(e) }"
		>
			<template #textPrimary-data="{ data }">
				<div class="truncate w-64">
					{{ data.textPrimary.find(property => property.language === $i18n.locale).text }}
				</div>
			</template>

			<template #textSecondary-data="{ data }">
				<div class="truncate w-64">
					{{ data.textSecondary.find(property => property.language === $i18n.locale).text }}
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
					:label="$t('section')"
					name="section"
				>
					<UInput
						v-model="selected.section"
						placeholder="aboutMe"
					/>
				</UFormGroup>
				<UDivider />
				<TranslationEditComponent
					:translation="selected.textPrimary"
					name="textPrimary"
					required
				/>
				<UDivider />
				<TranslationEditComponent
					:translation="selected.textSecondary"
					name="textSecondary"
				/>
			</template>
		</EditModalComponent>
	</UCard>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type { IText } from '~/interface/Resume/IText';

const i18n = useI18n();
const texts = ref<IText[]>([]);
const editModal = ref();
const table = ref();
const loading = ref(false);

const crud = useCrud('/resumes/texts', texts, loading);

const dataModel = ref<IText>({
	id: null,
	section: '',
	textPrimary: [
		{
			language: 'pl',
			text: ''
		},
		{
			language: 'en',
			text: ''
		}
	],
	textSecondary: [
		{
			language: 'pl',
			text: ''
		},
		{
			language: 'en',
			text: ''
		}
	],
});

const columns = ref([
	{
		key: 'id',
		label: 'ID'
	}, {
		key: 'section',
		label: i18n.t('section')
	},
	{
		key: 'textPrimary',
		label: i18n.t('textPrimary')
	},
	{
		key: 'textSecondary',
		label: i18n.t('textSecondary')
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
	section: z.string().min(1, { message: i18n.t('fieldIsRequired') }),
	textPrimary: z.array(translationSchema),
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
