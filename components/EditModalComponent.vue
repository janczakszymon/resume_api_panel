<template>
	<UModal
		v-model="isModalOpen"
		prevent-close
	>
		<UCard
			class="p-3"
		>
			<template #header>
				<div v-if="selected.id">
					{{ $t('editing') }} <b>#{{ selected.id }}</b>
				</div>
				<div v-else>
					{{ $t('creating') }}
				</div>
			</template>

			<UForm
				class="space-y-4 text-sm"
				:schema="props.schema"
				:state="selected"
				:validate-on="['submit', 'input']"
				@submit="() => { emits('save', selected) }"
			>
				<slot
					name="form"
					:selected="selected"
				/>
				<UDivider />
				<div class="flex justify-end gap-3">
					<UButton
						color="green"
						icon="i-heroicons-check"
						type="submit"
					>
						{{ $t('save') }}
					</UButton>
					<UButton
						color="gray"
						icon="i-heroicons-x-mark"
						@click="close"
					>
						{{ $t('discard') }}
					</UButton>
				</div>
			</UForm>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
const props = defineProps({
	schema: {
		type: Object,
		required: true
	}
});

const isModalOpen = ref(false);
const selected = ref<unknown | null>(null);

function open(s: unknown | null): void {
	isModalOpen.value = true;
	selected.value = JSON.parse(JSON.stringify(s));
}

function close(): void {
	isModalOpen.value = false;
}

const emits = defineEmits(['save']);

defineExpose({ open, close });
</script>
