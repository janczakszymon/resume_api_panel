<template>
	<UPopover :popper="{ placement: 'bottom-start' }">
		<UButton
			icon="i-heroicons-calendar-days-20-solid"
			:disabled="props.disabled"
			:label="format(date, 'dd-MM-yyy')"
		/>
		<template #panel="{ close }">
			<VCalendarDatePicker
				v-model="date"
				v-bind="{ ...attrs, ...$attrs }"
			/>
		</template>
	</UPopover>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { DatePicker as VCalendarDatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

const dateString = defineModel<string>();

const date = computed({
	get: () => {
		if (dateString.value) {
			return new Date(dateString.value);
		}

		return new Date();
	},
	set: (d) => { dateString.value = d.toLocaleString(); }
});

const props = defineProps({
	disabled: {
		type: Boolean,
		default: false
	}
});

const attrs = {
	'transparent': true,
	'borderless': true,
	'color': 'gray',
	'is-dark': { selector: 'html', darkClass: 'dark' },
	'first-day-of-week': 2,
};
</script>
