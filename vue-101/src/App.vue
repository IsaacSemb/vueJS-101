
<!-- scripting for logic -->
<script setup>
import NavBar from './components/NavBar.vue';
import Hero from './components/Hero.vue';
import HomeCards from './components/HomeCards.vue';
import JobListings from './components/JobListings.vue';

</script>

<!-- html  -->
<template>
    <NavBar />
    <Hero 
    title="This is Vue Jobs" 
    subtitle="Hone and sharpen your skills"
    />
    <HomeCards />
    <JobListings :limit="2" />

</template>

<!-- css styling -->
<style>

</style>