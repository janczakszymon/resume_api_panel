<template>
	<div>
		<div class="mb-1">
			{{ props.for }}
		</div>
		<UAccordion
			:items="props.translation"
		>
			<template #item="{ item }">
				<UTextarea
					v-model="item.text"
				/>
			</template>
		</UAccordion>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { ITranslation } from '~/interface/ITranslation';

const props = defineProps({
	translation: {
		type: Object as PropType<ITranslation[]>,
		required: true
	},
	for: {
		type: String,
		required: true
	}
});

props.translation?.forEach((item) => {
	item['label'] = item.language;
});
</script>
