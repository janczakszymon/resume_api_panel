<template>
	<UTable
		:rows="props.data"
		:columns="props.columns"
		:loading="!!props.data && props.data.length === 0"
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
					@click="emits('clickedDelete', row)"
				>
					{{ $t('delete') }}
				</UButton>
			</div>
		</template>
	</UTable>
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
	}
});

const emits = defineEmits(['clickedEdit', 'clickedDelete']);
</script>
