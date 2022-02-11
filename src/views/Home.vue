
<template>
  <div class="container-fluid text-center text-white bg-dark w-100 h-100">
    <div class="container-fluid d-flex p-3 mx-auto flex-column">
      <Navbar />
    </div>
  </div>
  <div
    class="
      bg-light
      border
      rounded
      border-light
      d-flex
      flex-column
      justify-content-center
      hero-food
      jumbotron
      py-5
      px-4
      homeImg
    "
  >
    <div class="container">
      <div class="row">
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <SearchCard />
        </div>
        <div
          class="
            col-md-6
            d-flex
            flex-column
            justify-content-center
            align-items-start
          "
        >
          <h1
            class="text-uppercase"
            style="font-size: 46px; color: rgb(255, 255, 255)"
          >
            Search your hotel now...
          </h1>
          <h1 class="text-uppercase text-warning" style="color: #ffc107">
            Search the best hotel from hundreds, in the world.
          </h1>
        </div>
      </div>
    </div>
  </div>

  <div class="container my-5">
    <div class="row">
      <div
        class="
          col-md-4
          d-flex d-xxl-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
        <img
          class="img-fluid"
          src="../assets/couch.png"
          alt="couch"
          width="60"
        />
        <h3>Living room services</h3>
        <p style="text-align: center">
          Non mollis condimentum ornare curabitur. Massa elit rutrum iaculis,
          bibendum hac curabitur suscipit.
        </p>
      </div>
      <div
        class="
          col-md-4
          d-flex d-xxl-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
        <img
          class="img-fluid"
          src="../assets/dinig.png"
          alt="couch"
          width="60"
        />
        <h3>Room services</h3>
        <p style="text-align: center">
          Felis mi eget nunc suspendisse, ut lacus. Integer in et, urna primis
          a.
        </p>
      </div>
      <div
        class="
          col-md-4
          d-flex d-xxl-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
        <img class="img-fluid" src="../assets/bed.png" alt="couch" width="60" />
        <h3>Beed room services</h3>
        <p style="text-align: center">
          Himenaeos fusce euismod lacus interdum quisque augue erat cursus,
          justo faucibus. Volutpat torquent.
        </p>
      </div>
    </div>
  </div>
  <section class="py-4 guestsImg">
    <div class="container">
      <div class="row rounded">
        <div class="col-md-4 text-center">
          <picture
            ><img
              class="img-fluid imghover rounded"
              src="../assets/img1.jpg"
              style="width: 500px; height: 300px"
          /></picture>
        </div>
        <div class="col-md-4 text-center">
          <picture
            ><img
              class="img-fluid imghover rounded"
              src="../assets/img2.jpeg"
              style="width: 500px; height: 300px"
          /></picture>
        </div>
        <div class="col-md-4 text-center">
          <picture
            ><img
              class="img-fluid imghover rounded"
              src="../assets/img3.jpg"
              style="width: 500px; height: 300px"
          /></picture>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>
<script>
// @ is an alias to /src

import SearchCard from "@/components/search/SearchCard.vue";
import Navbar from "@/components/nav/Navbar.vue";
import Footer from "@/components/nav/Footer.vue";

export default {
  name: "Home",
  components: {
    SearchCard,
    Navbar,
    Footer,
  },
};
</script>
