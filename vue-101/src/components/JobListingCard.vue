<script setup>
import { defineProps } from 'vue';

defineProps(
    {
        durationType:{
            type: String,
            default: "n/a",
        },
        jobPosition:{
            type: String, 
            default: "n/a"
        },
        salary:{
            type: Object,
            default: ()=>({
                lowerRange:' # ',
                upperRange:' # '
            })
            
        },
        description:{
            type: String,
            default:'n/a'
        },
        jobLocation:{
            type: String,
            default:'n/a'
        }
    }
)

</script>

<template>

    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div class="mb-6">
                <div class="text-gray-600 my-2">{{ durationType }}</div>
                <h3 class="text-xl font-bold">{{ jobPosition }}</h3>
            </div>

            <div class="mb-5">
                {{ description }}
            </div>

            <h3 class="text-green-500 mb-2">${{salary.lowerRange}}K - ${{salary.upperRange}}K / Year</h3>

            <div class="border border-gray-100 mb-5"></div>

            <div class="flex flex-col lg:flex-row justify-between mb-4">
                <div class="text-orange-700 mb-3">
                    <i class="fa-solid fa-location-dot text-lg"></i>
                    {{ jobLocation }}
                </div>
                <a href="job.html"
                    class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                    Read More
                </a>
            </div>
        </div>
    </div>


</template>