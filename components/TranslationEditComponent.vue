<template>
	<UFormGroup
		v-for="(t, key) in props.translation"
		:key="key"
		:name="`${props.name}.${key}.text`"
		:hint="t.language"
		:label="$t(props.name)"
		:required="props.required"
	>
		<UTextarea
			v-model="t.text"
			autoresize
			:rows="1"
		/>
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
	},
	required: {
		type: Boolean,
		default: false
	}
});
</script>
