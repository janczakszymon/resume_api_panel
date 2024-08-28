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
				class="space-y-3 text-sm"
				:state="{}"
			>
				<slot
					name="form"
					:selected="selected"
				/>
			</UForm>

			<template #footer>
				<div class="flex justify-end gap-3">
					<UButton
						color="green"
						icon="i-heroicons-check"
						@click="emits('save', selected)"
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
			</template>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
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
