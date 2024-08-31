<template>
	<div class="flex justify-center items-center h-screen">
		<div class="p-6 overflow-hidden rounded-xl shadow-2xl shadow-gray-700 relative flex flex-col items-center gap-6">
			<LoadingShadowComponent v-if="loading" />
			<img
				alt="app_logo"
				src="/logo.png"
				class="w-24"
			>
			<UForm
				class="form space-y-4"
				:schema="schema"
				:state="loginModel"
				@submit="signInWithCredentials"
			>
				<UFormGroup
					:label="$t('username')"
					name="username"
				>
					<UInput
						v-model="loginModel.username"
						placeholder="j_kowalski"
						icon="i-heroicons-envelope"
					/>
				</UFormGroup>
				<UFormGroup
					:label="$t('password')"
					name="password"
				>
					<UInput
						v-model="loginModel.password"
						placeholder="********"
						type="password"
						icon="i-heroicons-key"
					/>
				</UFormGroup>
				<div>
					<UButton
						type="submit"
						class="float-right"
						trailing-icon="i-heroicons-arrow-right-end-on-rectangle"
					>
						{{ $t('login') }}
					</UButton>
				</div>
			</UForm>
		</div>
	</div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { navigateTo } from '#app';

const { signIn, status, token } = useAuth();
const toast = useToast();
const i18n = useI18n();

definePageMeta({
	auth: false,
	layout: false
});

if (status.value === 'authenticated') {
	navigateTo('/');
}

const schema = z.object({
	username: z.string().min(1, { message: i18n.t('fieldIsRequired') }),
	password: z.string().min(1, { message: i18n.t('fieldIsRequired') })
});

const loading = ref(false);
const loginModel = ref({
	username: '',
	password: '',
});

async function signInWithCredentials() {
	loading.value = true;

	// FIXME - Nuxt auth is pushing warn, upgrade package when it will fixed
	await signIn({
		username: loginModel.value.username,
		password: loginModel.value.password,
	}, {
		callbackUrl: '/'
	})
		.catch((err) => {
			loading.value = false;

			if (err.response && err.response.status === 401) {
				toast.add({
					title: i18n.t('errorOccurred'),
					description: i18n.t('badCredentials'),
					color: 'yellow',
					icon: 'i-heroicons-exclamation-triangle'
				});
			}
			else {
				toast.add({
					title: i18n.t('errorOccurred'),
					description: i18n.t('apiErrorOccurred'),
					color: 'red',
					icon: 'i-heroicons-exclamation-circle'
				});
			}
		});
}
</script>
