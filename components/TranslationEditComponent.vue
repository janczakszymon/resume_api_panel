<template>
	<UFormGroup
		v-for="(translation, key) in props.translation"
		:key="key"
		:name="`${props.name}.${key}.text`"
		:hint="translation.language"
		:label="$t(props.name)"
	>
		<UTextarea v-model="translation.text" />
	</UFormGroup>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { ITranslation } from '~/interface/ITranslation';

const i18n = useI18n();

const props = defineProps({
	translation: {
		type: Object as PropType<ITranslation[]>,
		required: true
	},
	name: {
		type: String,
		required: true,
		default: ''
	}
});
</script>
