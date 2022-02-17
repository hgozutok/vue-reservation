<template>
  <div class="container-fluid text-center text-white bg-dark w-100 h-100">
    <div class="container-fluid d-flex p-3 mx-auto flex-column">
      <Navbar />
    </div>
  </div>
  <h1>Hotel Details</h1>
  {{ $route.params.id }}
  {{ pageLoaded }}
  <div class="row">
    <div class="container">
      <!-- hotel name and price -->
      <div v-if="pageLoaded === true" class="row">
        <div class="col-md-8">
          <h2>{{ propertyDescription.name }}</h2>
          <!-- <h4>{{ propertyDescription.starRatingTitle }}</h4> -->
          <h4>{{ propertyDescription.tagline[0] }}</h4>
        </div>
        <div class="col-md-4">
          <h4>{{ propertyDescription.featuredPrice.beforePriceText }}</h4>
          <h1>
            <p class="text-decoration-line-through">
              {{ propertyDescription.featuredPrice.oldPrice }}
            </p>
            {{ propertyDescription.featuredPrice.currentPrice.formatted }}
          </h1>
          <h4>{{ propertyDescription.featuredPrice.afterPriceText }}</h4>
          <h4>{{ propertyDescription.featuredPrice.pricingAvailability }}</h4>
          <button class="btn btn-primary">Book Now</button>
        </div>
      </div>
      <!-- hotel images and map -->
      <div v-if="pageLoaded === true" class="row">
        <div class="col-md-8">
          <Carousel :value="hotelImages" :numVisible="1" :numScroll="1">
            <template #header>
              <h2>Hotel Images</h2>
            </template>
            <template #item="slotProps">
              <div>
                <img :src="slotProps.data.brand" :alt="slotProps.data.brand" />
              </div>
            </template>
          </Carousel>
        </div>
        <div class="col-md-4">
          <div id="map" style="width: 100%; height: 400px">
            <iframe
              width="300"
              height="170"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              :src="propertyDescription.mapWidget.staticMapUrl"
            >
            </iframe>
            <address>
              <strong>{{ propertyDescription.address.fullAddress }}</strong>
            </address>
            <div>{{ guestReviews.formattedRating }}</div>
          </div>
        </div>
      </div>
      <div v-if="pageLoaded === true" class="row">
        {{
          overview.overviewSections[0].content.forEach(function (item) {
            return item.text;
          })
        }}
      </div>
    </div>
  </div>

  <div v-if="pageLoaded === false" class="row">
    <h2>Loading data</h2>
  </div>
</template>

<script>
// import { onMounted } from "@vue/runtime-core";
import Navbar from "../components/nav/Navbar.vue";

import SearchHotel from "../services/SearchHotel";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import Carousel from "primevue/carousel";

export default {
  setup() {
    const route = useRoute();
    var hotelid = ref(route.params.id);
    console.log(hotelid.value);
    var hotel = ref();
    var pdpHeader = ref();
    var overview = ref();
    var hotelWelcomeRewards = ref();
    var propertyDescription = ref({});
    var guestReviews = ref();
    var atAGlance = ref();
    var amenities = ref();
    var hygieneAndCleanliness = ref();
    var smallPrint = ref();
    var specialFeatures = ref();
    var miscellaneous = ref();
    var pageInfo = ref();
    var hotelBadges = ref();
    var unavailable = ref();

    var transportations = ref();
    var hotelImages = ref();
    var pageLoaded = ref(false);

   // var location = ref(route.query.location);
    var departDate = ref(route.query.departDate);
    var returnDate = ref(route.query.leaveDate);
    var adults = ref(route.query.adults);

    const getHotelDetails = async () => {
      console.log("htoelDetails")
       SearchHotel.getHotelDetails(hotelid.value,departDate.value,returnDate.value,adults.value).then((response) => {
        hotel.value = response;
        pdpHeader.value = response.pdpHeader;
        overview.value = response.overview;
        hotelWelcomeRewards.value = response.hotelWelcomeRewards;
        propertyDescription.value = response.propertyDescription;
        guestReviews.value = response.guestReviews;
        atAGlance.value = response.atAGlance;
        amenities.value = response.amenities;
        hygieneAndCleanliness.value = response.hygieneAndCleanliness;
        smallPrint.value = response.smallPrint;
        specialFeatures.value = response.specialFeatures;
        miscellaneous.value = response.miscellaneous;
        pageInfo.value = response.pageInfo;
        hotelBadges.value = response.hotelBadges;
        unavailable.value = response.unavailable;

        transportations.value = response.transportations;
        console.log(hotel.value);
      pageLoaded.value = true;
        SearchHotel.getHotelImages(hotelid.value).then((response) => {
          hotelImages.value = response;
        });
      });

    
    };

  onMounted(() => {
        console.log("page mounted");
        getHotelDetails();
        pageLoaded.value = true;
      });

    return {
      getHotelDetails,
      hotelid,
      hotel,
      pdpHeader,
      overview,
      hotelWelcomeRewards,
      propertyDescription,
      guestReviews,
      atAGlance,
      amenities,
      hygieneAndCleanliness,
      smallPrint,
      specialFeatures,
      miscellaneous,
      pageInfo,
      hotelBadges,
      unavailable,
      transportations,
      hotelImages,
      pageLoaded,
    };
  },
  name: "Hotels",
  components: {
    Navbar,
    Carousel,
  },
};
</script>

<style>
</style>