<script setup>

import { onMounted, ref } from 'vue';

const name = ref("Isaac Semb");
const status = ref(false);
const otherStatus = ref('active');
const available = ref("no");
const numbers = ref(["one", "two", "three"]);
const semb_github = "https://github.com/IsaacSemb";
const semb_linkedIn = "https://www.linkedin.com/in/isaac-semb/";
const newNumber = ref("")


const toggleStatus = () => {
    status.value = !status.value;
};


const toggleOtherStatus = () => {

    if (otherStatus.value === 'active') {
        otherStatus.value = 'inactive';
    } else {
        otherStatus.value = 'active';
    }
};

const addTask = () => {

    toggleOtherStatus()

    if (newNumber.value.trim() !== '') {
        numbers.value.push(newNumber.value)
        newNumber.value = ''
    }

}

const deleteItem = (index) => {
    numbers.value.splice(index, 1)

}

onMounted(
    async ()=>{
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json()
            numbers.value = data.map(
                (task)=>task.title
            )

        } catch (error) {
            console.log('error fetching tasks')
        }
    }
)

</script>

<template>
    <h1>Hello, {{ name }}</h1>

    <!-- if statements or if directive -->
    <h2 v-if="status">Status is True</h2>
    <h2 v-else="status">status is false</h2>

    <h2 v-if="available === 'yes'">user is available</h2>
    <h2 v-else="available === 'no'">user is NOT available</h2>

    <!-- for statements or for directives -->
    <h3>Numbers</h3>
    <ul>
        <li v-for="(nbr, index) in numbers" :key="nbr"><span>{{ nbr }}</span><button
                @click="deleteItem(index)">X</button></li>
    </ul>

    <!-- binding dynamic data to elements -->
    <h3>
        <a v-bind:href="semb_linkedIn" target="_blank">SEMB linked in</a>
    </h3>
    <h3>
        <a :href="semb_github" target="_blank">SEMB GITHUB</a>
    </h3>

    <!-- event listeners  -->
    <h2>
        <button v-on:click="toggleStatus">Change Status</button>
    </h2>

    <h2>
        <button @click="toggleStatus">Change Status</button>
    </h2>

    <h2>
        <h2 v-if="otherStatus === 'active'">user is active</h2>
        <h2 v-else="otherStatus==='inactive'">user is inactive</h2>
        <button @click="toggleOtherStatus">Change Status</button>
    </h2>


    <!-- dealing with forms -->
    <h1> forms </h1>

    <form @submit.prevent="addTask">
        <label for="newNumber">Task: </label>
        <input id="newNumber" name="newNumber" type="text" v-model="newNumber">
        <button type="submit">Add Task</button>
    </form>




</template>

<style scoped>
h1 {
    color: red;
}
</style>
