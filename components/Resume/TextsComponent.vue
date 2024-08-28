<template>
	<UCard>
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
			@save="save"
		>
			<template #form="{ selected }">
				<UFormGroup
					:label="$t('section')"
				>
					<UInput
						v-model="selected.section"
						placeholder="aboutMe"
					/>
				</UFormGroup>
				<UDivider />
				<TranslationEditComponent
					v-for="(translations, key) in [selected.textPrimary]"
					:key="key"
					:translation="translations"
					:for="$t('textPrimary')"
				/>
				<UDivider />
				<TranslationEditComponent
					v-for="(translations, key) in [selected.textSecondary]"
					:key="key"
					:translation="translations"
					:for="$t('textSecondary')"
				/>
			</template>
		</EditModalComponent>
	</UCard>
</template>

<script setup lang="ts">
import type { IText } from '~/interface/Resume/IText';

const crud = useCrud('/resumes/texts');
const toast = useToast();
const i18n = useI18n();
const texts = ref<IText[]>([]);
const editModal = ref();
const table = ref();
const loading = ref(false);

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

const columns = [
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
];

function loadData(): void {
	loading.value = true;
	texts.value = [];

	crud.get()
		.then((res: IText[]) => {
			texts.value = res;
		})
		.finally(() => {
			loading.value = false;
		});
}

function save(body): void {
	crud.save(body, body?.id)
		.then((res) => {
			if (!res) {
				return;
			}

			editModal.value.close();
			toast.add({ title: i18n.t('saved'), color: 'green' });

			loadData();
		});
}

function deleteEntry(selected): void {
	crud.delete(selected.id)
		.then(() => {
			texts.value = [];
			loading.value = true;

			table.value.closeConfirmation();
			toast.add({ title: i18n.t('deleted'), color: 'green' });

			loadData();
		});
}

loadData();
</script>
