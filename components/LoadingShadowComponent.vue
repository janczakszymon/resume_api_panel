<template>
	<div class="loading-shadow">
		<div class="lds-dual-ring" />
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.loading-shadow {
  background-color: rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  color: theme('colors.primary.500');
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(1px);

  .lds-dual-ring,
  .lds-dual-ring:after {
    box-sizing: border-box;
    z-index: 1000;
  }

  .lds-dual-ring:after {
    content: "";
    display: block;
    width: 32px;
    height: 32px;
    margin: 8px;
    border-radius: 50%;
    border: 3px solid currentColor;
    border-color: currentColor transparent currentColor transparent;
    animation: lds-dual-ring 1.2s linear infinite;
    z-index: 1000;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
