<template>
	<div class="flex flex-col gap-3 my-3">
		<div class="flex justify-between items-center">
			{{ $t('links') }}
			<UButton
				size="xs"
				color="green"
				icon="i-heroicons-plus"
				@click="links.push(linkModel)"
			/>
		</div>
		<div
			v-for="(link, key) in links"
			:key="key"
			class="space-y-3 bg-slate-100 rounded-lg p-1"
		>
			<TranslationEditComponent
				v-for="(translation, key) in [link.name]"
				:key="key"
				:translation="translation"
				:for="$t('name')"
			/>
			<UFormGroup label="Link">
				<UInput
					v-model="link.address"
					placeholder="www"
				/>
			</UFormGroup>
			<UFormGroup :label="$t('icon')">
				<UInput
					v-model="link.icon"
					placeholder="i-heroicons-star"
					:trailing-icon="link.icon"
				/>
			</UFormGroup>
			<UFormGroup>
				<UButton
					size="xs"
					color="red"
					class="float-right"
					@click="remove(key)"
				>
					{{ $t('delete') }}
				</UButton>
			</UFormGroup>
		</div>
	</div>
</template>

<script setup lang="ts">
const links = defineModel();

const linkModel = {
	name: [
		{
			language: 'pl',
			text: ''
		},
		{
			language: 'en',
			text: ''
		}
	],
	icon: '',
	address: ''
};

function remove(key: number | string): void {
	links.value.splice(key, 1);
}
</script>
