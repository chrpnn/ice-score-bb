<script setup>
import TheTable from '@/components/TheTable.vue'
import ThePodium from '@/components/ThePodium.vue'
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <main>
    <div class="sticky top-0 bg-[#181818]">
      <TheHeader />
      <ThePodium />
    </div>
    <div class="relative ">
      <TheTable />
    </div>
    
  </main>
</template>
