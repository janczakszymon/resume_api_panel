<template>
	<UModal v-model="isOpen">
		<UForm
			:state="passwordData"
			:schema="schema"
			class="space-y-4 p-3"
			@submit="updatePassword"
		>
			<UFormGroup
				:label="$t('oldPassword')"
				name="oldPassword"
			>
				<UInput
					v-model="passwordData.oldPassword"
					required
				/>
			</UFormGroup>
			<UFormGroup
				:label="$t('newPassword')"
				name="newPassword"
			>
				<UInput
					v-model="passwordData.newPassword"
					required
				/>
			</UFormGroup>
			<UFormGroup
				:label="$t('confirmNewPassword')"
				name="confirmNewPassword"
			>
				<UInput
					v-model="passwordData.confirmNewPassword"
					required
				/>
			</UFormGroup>
			<div class="flex justify-end gap-3">
				<UButton
					color="green"
					type="submit"
				>
					{{ $t('save') }}
				</UButton>
				<UButton
					color="gray"
					@click="isOpen=false"
				>
					{{ $t('discard') }}
				</UButton>
			</div>
		</UForm>
	</UModal>
</template>

<script setup lang="ts">
import { z } from 'zod';

const isOpen = defineModel<boolean>();

const i18n = useI18n();
const toast = useToast();
const { data } = useAuthState();
const passwordData = ref({
	oldPassword: '',
	newPassword: '',
	confirmNewPassword: ''
});

const schema = z.object({
	oldPassword: z.string().min(1, { message: i18n.t('fieldIsRequired') }),
	newPassword: z.string().min(1, { message: i18n.t('fieldIsRequired') }),
	confirmNewPassword: z.string().min(1, { message: i18n.t('fieldIsRequired') })
});

function updatePassword(): void {
	useApi(`/users/${data.value?.id}/passwords/`, {
		method: 'PUT',
		body: JSON.stringify(passwordData.value)
	})
		.then(() => {
			toast.add({ title: i18n.t('saved'), color: 'green' });
			isOpen.value = false;
		})
		.catch(() => {
			toast.add({ title: i18n.t('errorOccurred'), color: 'red' });
		});
}
</script>
