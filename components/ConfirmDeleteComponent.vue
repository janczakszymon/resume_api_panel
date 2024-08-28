<template>
	<UModal v-model="isConfirmOpen">
		<div class="p-3 flex flex-col gap-3">
			<div class="text-center">
				{{ $t('confirm') }}
			</div>
			<div class="flex justify-center gap-3">
				<UButton
					color="red"
					@click="emits('confirmed')"
				>
					{{ $t('delete') }}
				</UButton>
				<UButton
					color="gray"
					@click="isConfirmOpen=false"
				>
					{{ $t('discard') }}
				</UButton>
			</div>
		</div>
	</UModal>
</template>

<script setup lang="ts">
const isConfirmOpen = defineModel<boolean>();
const emits = defineEmits(['confirmed']);
</script>
