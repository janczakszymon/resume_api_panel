<template>
	<NuxtLayout>
		<NuxtPage />
		<UNotifications />
	</NuxtLayout>
</template>

<script setup lang="ts">
useHead({
	title: 'Resume panel',
	htmlAttrs: {
		lang: 'pl',
	},
	bodyAttrs: {
		class: 'bg-zinc-100 dark:bg-slate-900',
	}
});
</script>

<style lang="scss">
html {
  font-size: 12px;

  @screen sm {
    font-size: 14px;
  }

  @screen lg {
    font-size: unset;
  }
}

body {
  font-family: "Roboto mono", sans-serif;
}
</style>
