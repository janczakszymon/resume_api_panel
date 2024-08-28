<template>
	<div class="mb-3">
		<UButton
			size="xs"
			icon="i-heroicons-plus"
			@click="emits('clickedNew')"
		>
			{{ $t('create') }}
		</UButton>
	</div>
	<UTable
		:rows="props.data"
		:columns="props.columns"
		:loading="props.loading"
		:loading-state="{
			label: $t('loading')
		}"
		:empty-state="{
			label: $t('empty')
		}"
	>
		<template
			v-for="field in Object.keys($slots)"
			#[field]="{ item, row }"
		>
			<slot
				:name="field"
				:item="item"
				:data="row"
			/>
		</template>

		<template #actions-data="{ row }">
			<div class="flex gap-3">
				<UButton
					size="xs"
					color="blue"
					icon="i-heroicons-eye"
					@click="emits('clickedEdit', row);"
				>
					{{ $t('seeEdit') }}
				</UButton>
				<UButton
					size="xs"
					color="red"
					icon="i-heroicons-trash"
					@click="isConfirmDelete=true; selected = row"
				>
					{{ $t('delete') }}
				</UButton>
			</div>
		</template>
	</UTable>

	<ConfirmDeleteComponent
		v-model="isConfirmDelete"
		@confirmed="emits('clickedDelete', selected) "
	/>
</template>

<script setup lang="ts">
const props = defineProps({
	data: {
		type: Array,
		required: true
	},
	columns: {
		type: Array,
		required: true
	},
	loading: {
		type: Boolean,
		default: false
	}
});

const isConfirmDelete = ref(false);
const selected = ref(null);

function closeConfirmation(): void {
	isConfirmDelete.value = false;
}

const emits = defineEmits(['clickedEdit', 'clickedDelete', 'clickedNew']);

defineExpose({ closeConfirmation });
</script>
