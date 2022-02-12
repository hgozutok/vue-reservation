<template>
  <div class="container-fluid text-center text-white bg-dark w-100 h-100">
    <div class="container-fluid d-flex p-3 mx-auto flex-column">
      <Navbar />
    </div>
  </div>
  <div class="container-fluid">
    <h1>SEARCH BEST HOTELS</h1>
    <input
      type="text"
      v-model="query"
      class="form-control"
      placeholder="Search..."
    />
    <button type="button" class="btn btn-primary" @click="searchHotel">
      SEARCH
    </button>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div
        v-bind:key="index"
        class="col-md-4"
        v-for="(location, index) in locations"
      >
        <div class="card" style="width: 18rem">
          <!-- <img
            :src="
              hotel.hotelImages && hotel.hotelImages.length
                ? hotel.hotelImages[0].baseUrl.replace(
                    '{size}',
                    hotel.hotelImages[0].sizes[0].suffix
                  )
                : '../assets/noroom.png'
            "
            class="card-img-top"
            alt="..."
            style="height: 200px"
          /> -->
          <div class="card-body">
            <h5 class="card-title">{{ location.name }}</h5>
            <!-- <p class="card-text">{{ location.description }}</p> -->
            <a href="#" class="btn btn-primary">Search here</a>
          </div>
        </div>
      </div>

      <div class="row">
        <label for="DataList" class="form-label">Select Place</label>
        <input
          class="form-control"
          list="datalistOptions"
          id="DataList"
          placeholder="Type to search..."
        />
        <datalist id="datalistOptions">
          <option value="San Francisco"></option>
          <option value="New York"></option>
          <option value="Seattle"></option>
          <option value="Los Angeles"></option>
          <option value="Chicago"></option>
        </datalist>
      </div>
    </div>
  </div>
  {{ this.$route.query.location }}
</template>

<script>
import Navbar from "../components/nav/Navbar.vue";
import SearchHotel from "../services/SearchHotel";

export default {
  name: "Search",
  components: {
    Navbar,
  },

  mounted() {
    console.log(this.$route.query.location);
  },

  //searh hole via api
  data() {
    return {
      locations: [],

      query: "Berlin",
    };
  },
  methods: {
    searchHotel() {
      this.locations = [];
      SearchHotel.search(this.query).then((response) => {
        console.log(response);
        response.suggestions.forEach((element) => {
          this.locations = [...this.locations, ...element.entities];
          // console.log({ ...this.locations, ...element.entities });
        });
        // this.hotels.forEach((hotel) => {
        //   SearchHotel.getHotelImages(hotel.destinationId).then((response) => {
        //     console.log(response);
        //     hotel.hotelImages = response.data.hotelImages; //[0].baseUrl
        //     console.log(this.hotelImages);
        //   });
        // });
      });
    },
  },
};
</script>

<style>
</style>


//https://www.google.com/maps/place/39.980491,43.878499
//google maps url