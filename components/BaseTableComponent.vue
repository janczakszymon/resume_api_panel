<template>
	<UTable
		:rows="data"
		:columns="columns"
		:loading="!!data && data.length === 0"
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
				:row="row"
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
const data = defineModel<unknown[]>('data');
const columns = defineModel<unknown[]>('columns');

const emits = defineEmits(['clickedEdit', 'clickedDelete']);
</script>
