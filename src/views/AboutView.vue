<template>
  <div class="flex flex-col p-8 gap-8 bg-gray-200">
    <RatingsHeader />
    <RatingsPrinciples />
    <RatingsMetrics />
    <RatingsCalculation />
    <RatingsScale />
    <RatingsFeatures />
  </div>
</template>

<script setup>
import RatingsHeader from '../components/rating-help/RatingsHeader.vue'
import RatingsPrinciples from '../components/rating-help/RatingsPrinciples.vue'
import RatingsMetrics from '../components/rating-help/RatingsMetrics.vue'
import RatingsCalculation from '../components/rating-help/RatingsCalculation.vue'
import RatingsScale from '../components/rating-help/RatingsScale.vue'
import RatingsFeatures from '@/components/rating-help/RatingsFeatures.vue'
</script>

<style scoped></style>
