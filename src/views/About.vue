<template>
  <div class="container-fluid text-center text-white bg-dark w-100 h-100">
    <div class="container-fluid d-flex p-3 mx-auto flex-column">
      <Navbar />
    </div>
  </div>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script>
import Navbar from "@/components/nav/Navbar.vue";
export default {
  name: "About",
  components: {
    Navbar,
  },
};
</script>

<style>
</style>