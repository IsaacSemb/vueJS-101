
<script setup>
import Hero from './components/Hero.vue';
import HomeCards from './components/HomeCards.vue';
import JobListings from './components/JobListings.vue';
</script>

<template>
    <Hero 
    title="This is Vue Jobs" 
    subtitle="Hone and sharpen your skills"
    />
    <HomeCards />
    <JobListings :limit="3" :view-all-jobs="true" />
</template>
