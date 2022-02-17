<template>
  <div class="container-fluid text-center text-white bg-dark w-100 h-100">
    <div class="container-fluid d-flex p-3 mx-auto flex-column">
      <Navbar />
    </div>
  </div>
  <div class="container">
    <h1>SEARCH BEST HOTELS</h1>
    <SearchCard />

    <div class="container">
      <h2>Results</h2>
      <div class="row">
        <div v-bind:key="index" class="row" v-for="(hotel, index) in hotels">
          <div class="col-md-4">
            <div class="card" style="width: 18rem">
              <img
                class="card-img-top rounded"
                v-bind:src="hotel.optimizedThumbUrls.srpDesktop"
                alt="Card image cap"
              />
            </div>
          </div>

          <div class="col-md-4">
            <h3 class="card-title">
            <button class="btn-primary" >
            </button>
              <router-link :to="{ name: 'Hotels', query:{ location,
           departDate,
           leaveDate,
           adults,},
            params: { id: hotel.id } }">
                {{ hotel.name }}
              </router-link>
            </h3>

            <h5 class="card-title">
              {{ hotel.address.streetAddress }}-
              {{ hotel.address.locality }}
            </h5>
            <router-link :to="{ name: 'Hotels', query:{location,
           departDate,
           leaveDate,
           adults}, params: { id: hotel.id } }">
              Book now
            </router-link>
          </div>
          <div class="col-md-4">
            <div>
              {{ hotel.ratePlan.price.current }}
              Stars: {{ hotel.starRating }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Navbar from "../components/nav/Navbar.vue";
import SearchCard from "../components/search/SearchCard.vue";
import SearchHotel from "../services/SearchHotel";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  name: "Search",
  components: {
    Navbar,
    SearchCard,
  },
  setup() {
    const route = useRoute();
    var location = ref(route.query.location);
    var departDate = ref(route.query.departDate);
    var leaveDate = ref(route.query.leaveDate);
    var adults = ref(route.query.adults);
    var properties = ref([]);
    var hotels = ref([]);


  // const handleHotel = (id) => {
  //     router.push({
  //       path: "/hotels/"+id,
  //       query: {
  //         location: location.value,
  //         departDate: departDate.value,
  //         leaveDate: returnDate.value,
  //         adults: adults.value,
  //       },
  //     });
  //   };


    const getPropertiesList = async () => {
      SearchHotel.getPropertiesList(
        location.value,
        departDate.value,
        leaveDate.value,
        adults.value
      ).then((response) => {
        properties.value = response.data;
        properties.value.body.searchResults.results.forEach((hotel) => {
          hotels.value.push(hotel);
        });
        console.log(response);
        console.log(hotels.value[0].optimizedThumbUrls.srpDesktop);
      });
    };
    onMounted(() => {
      getPropertiesList();
    });
    return {
      location,
      departDate,
      leaveDate,
      adults,
      properties,
      hotels,
      getPropertiesList,
    };
  },
};
</script>

<style>
</style>


//https://www.google.com/maps/place/39.980491,43.878499
//google maps url