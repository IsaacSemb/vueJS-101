<script setup>
import JobListingCard from './JobListingCard.vue';
import JobListing from './JobListing.vue';
// import jobData from "@/jobs.json"
import { ref, defineProps, onMounted } from 'vue';
import axios from 'axios';

const allJobs = ref("")

defineProps(
  {
    limit: Number,
    viewAllJobs: {
      type: Boolean,
      default: false
    }
  }
)



onMounted(
  async ()=>{
    try {
      
      const response = await axios.get('http://127.0.0.1:5000/jobs')
      allJobs.value = response.data

    } catch (error ) {
      console.error("Error fetching jobs", error)
    }
    
  }
)

</script>

<template>

  <section class="bg-blue-50 px-4 py-10">

    <div class="container-xl lg:container m-auto">

      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing v-for="job in allJobs.slice(0, limit || allJobs.length)" :key="job.id" :job="job" />
      </div>

    </div>

  </section>

  <!-- view all jobs button -->
  <section class="m-auto max-w-lg my-10 px-6" v-if="viewAllJobs">
    <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
      View All Jobs
    </RouterLink>
  </section>

</template>
