<script setup>

import BackButton from '@/components/BackButton.vue';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';

// route for getting the current route
const route = useRoute()

const router = useRouter()
const toast = useToast()

// get id from route
const jobId = route.params.id

// getting the job state
const jobState = reactive(
  {
    job: {},
    isLoading: true
  }
)


onMounted(
  async () => {
    try {

      const response = await axios.get(`/api/jobs/${jobId}`)
      jobState.job = response.data

    } catch (error) {
      console.error("Error fetching jobs", error)
    } finally {
      jobState.isLoading = false
    }

  }
)


const handleDeleteJobClick = async () => {
  try {
    const confirm = window.confirm("Are sure you want to delete this job?")

    if (confirm) {
      await axios.delete(`/api/jobs/${jobId}`)
      toast.success("Job deleted sucessfully")
      router.push('/jobs')
    }

  } catch (error) {
    console.error(error);
    toast.error("Job Not deleted")
  }

}




</script>


<template>

  <BackButton />

  <!-- show loading spinner while loading is true -->
  <div v-if="jobState.isLoading" class=" text-center text-gray-500 py-6">
    <PulseLoader />
  </div>




  <section v-else class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">{{ jobState.job.type }}</div>
            <h1 class="text-3xl font-bold mb-4"> {{ jobState.job.title }} </h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="pi pi-map-marker text-orange-700 mr-3"></i>
              <p class="text-orange-700">{{ jobState.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ jobState.job.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ jobState.job.salary }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ jobState.job.company.name }}</h2>

            <p class="my-2"> {{ jobState.job.company.description }} </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ jobState.job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">{{ jobState.job.company.contactPhone }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink :to="`/jobs/edit/${jobId}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Edit
              Job</RouterLink>
            <button @click="handleDeleteJobClick"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>