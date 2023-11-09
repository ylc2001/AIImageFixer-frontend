<template>
  <div class="app" id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    document.title = 'FAixer';
  },
}
</script>
