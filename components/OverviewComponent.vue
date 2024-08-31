<template>
	<UCard>
		<template #header>
			<div class="flex justify-between items-center">
				<div class="text-xl">
					{{ $t('hello') }} <b>{username}</b>
				</div>
				<UButton
					color="gray"
					icon="i-heroicons-arrow-left-end-on-rectangle"
					@click="signOut({ callbackUrl: localeRoute('/login')?.path })"
				>
					{{ $t('logout') }}
				</UButton>
			</div>
		</template>
		<div class="flex flex-wrap gap-3">
			<UButton
				to="#"
				target="_blank"
				variant="outline"
				color="gray"
				class="ring-gray-300 dark:ring-gray-700 dark:hover:bg-inherit"
				icon="i-heroicons-globe-europe-africa"
				tabindex="-1"
			>
				{{ $t('website') }}
			</UButton>
			<UButton
				target="_blank"
				variant="outline"
				color="gray"
				class="ring-gray-300 dark:ring-gray-700 dark:hover:bg-inherit"
				icon="i-heroicons-key"
				tabindex="-1"
				@click="isPasswordChangeOpen = true"
			>
				{{ $t('changePassword') }}
			</UButton>
			<USelectMenu
				v-model="selectedLanguage"
				:options="availableLocales"
				:placeholder="selectedLanguage"
				tabindex="-1"
				icon="i-heroicons-language"
				class="cursor-pointer"
				:ui-menu="{
					select: 'cursor-pointer'
				}"
			/>
			<UButton
				:icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
				color="gray"
				class="ring-gray-300 dark:ring-gray-700 bg-inherit dark:bg-inherit"
				@click="isDark = !isDark"
			/>
		</div>

		<ChangePasswordModalComponent v-model="isPasswordChangeOpen" />
	</UCard>
</template>

<script setup lang="ts">
const { locale, setLocale, availableLocales } = useI18n();
const selectedLanguage = ref(locale.value);
const isPasswordChangeOpen = ref(false);
const colorMode = useColorMode();
const { signOut } = useAuth();
const localeRoute = useLocaleRoute();

const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	}
});

watch(selectedLanguage, () => {
	setLocale(selectedLanguage.value);
});
</script>
