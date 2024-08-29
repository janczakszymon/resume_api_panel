<template>
	<UModal v-model="isOpen">
		<UForm
			:state="{}"
			class="space-y-4 p-3"
		>
			<UFormGroup :label="$t('oldPassword')">
				<UInput />
			</UFormGroup>
			<UFormGroup :label="$t('newPassword')">
				<UInput />
			</UFormGroup>
			<UFormGroup :label="$t('confirmNewPassword')">
				<UInput />
			</UFormGroup>
			<div class="flex justify-end gap-3">
				<UButton color="green">
					{{ $t('save') }}
				</UButton>
				<UButton color="gray">
					{{ $t('discard') }}
				</UButton>
			</div>
		</UForm>
	</UModal>
</template>

<script setup lang="ts">
const isOpen = defineModel();
</script>
