<template>
	<UFormGroup
		v-for="(t, key) in props.translation"
		:key="key"
		:name="`${props.name}.${key}.text`"
		:hint="t.language"
		:label="$t(props.name)"
		:required="props.required"
	>
		<ClientOnly
			fallback-tag="div"
			fallback="Loading editor..."
		>
			<QuillEditor
				v-model="t.text"
				theme="snow"
			/>
		</ClientOnly>
	</UFormGroup>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { ITranslation } from '~/interface/ITranslation';

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
