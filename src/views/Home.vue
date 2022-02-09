
<template>
  <div class="container-fluid text-center text-white bg-dark w-100 h-100">
    <div class="container-fluid d-flex p-3 mx-auto flex-column">
      <Navbar />
    </div>
  </div>
  <main class="px-3">
    <div class="row homeImg h-100 text-center text-primary">
      <h1 class="mb-3">Search your hotel now...</h1>
      <div class="col-md-4">
        <SearchCard />
      </div>
      <div class="col-md-8"></div>
      <div class="row">
        <p>Search the best hotel from hundreds of hotels in the world.</p>
        <p>
          <a href="#" class="btn btn-lg fw-bold btn-primary">MORE..</a>
        </p>
        <div class="mb-3">
          click for more
          <div />
        </div>
      </div>
    </div>
  </main>

  <footer class="mt-auto text-white-50">
    <p>
      <i class="fa fa-copy" aria-hidden="true">Copyright by hugostore</i>
    </p>
  </footer>
</template>
<script>
// @ is an alias to /src

import SearchCard from "@/components/search/SearchCard.vue";
import Navbar from "@/components/nav/Navbar.vue";

export default {
  name: "Home",
  components: {
    SearchCard,
    Navbar,
  },
};
</script>
