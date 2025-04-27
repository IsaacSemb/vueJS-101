<script setup>
import JobListingCard from './JobListingCard.vue';
import JobListing from './JobListing.vue';
// import jobData from "@/jobs.json"
import { reactive, defineProps, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios';

const jobState = reactive(
  {
    allJobs:[],
    isLoading:true
  }
)

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
      jobState.allJobs = response.data

    } catch (error ) {
      console.error("Error fetching jobs", error)
    } finally {
      jobState.isLoading = false
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

      <!-- show loading spinner while loading is true -->
       <div v-if="jobState.isLoading" class=" text-center text-gray-500 py-6" >
        <PulseLoader />
       </div>

      <!-- if not loading ie done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing v-for="job in jobState.allJobs.slice(0, limit || jobState.allJobs.length)" :key="job.id" :job="job" />
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
