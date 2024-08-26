<template>
	<UCard>
		<template #header>
			<div class="flex justify-between items-center">
				<div class="text-xl">
					{{ $t('hello') }} <b>{username}</b>
				</div>
				<UButton color="gray">
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
				class="ring-gray-300"
				icon="i-heroicons-globe-europe-africa"
			>
				{{ $t('website') }}
			</UButton>
			<UButton
				target="_blank"
				variant="outline"
				color="gray"
				class="ring-gray-300"
				icon="i-heroicons-key"
			>
				{{ $t('changePassword') }}
			</UButton>
			<USelectMenu
				v-model="selectedLanguage"
				:options="availableLocales"
				:placeholder="selectedLanguage"
				icon="i-heroicons-language"
			/>
		</div>
	</UCard>
</template>

<script setup lang="ts">
const { locale, setLocale, availableLocales } = useI18n();
const selectedLanguage = ref(locale.value);

watch(selectedLanguage, () => {
	setLocale(selectedLanguage.value);
});
</script>
