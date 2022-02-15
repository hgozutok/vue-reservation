<template>
  <div class="container-fluid text-center text-white bg-dark w-100 h-100">
    <div class="container-fluid d-flex p-3 mx-auto flex-column">
      <Navbar />
    </div>
  </div>
  <h1>Hotel Details</h1>
  {{ $route.params.id }}
  { propertyDescription.value ? (
  <div class="row">
    <h2>Loaded data</h2>
  </div>
  ) : (
  <div class="row">
    <h2>Loading data</h2>
  </div>
  ) }
  <div class="container">
    <!-- hotel name and price -->
    <div class="row">
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
    <div class="row">
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
    <div class="row">
      {{
        overview.overviewSections[0].content.forEach(function (item) {
          return item.text;
        })
      }}
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Navbar from "../components/nav/Navbar.vue";

import SearchHotel from "../services/SearchHotel";
import { useRoute } from "vue-router";
import { ref } from "vue";
import Carousel from "primevue/carousel";

export default {
  name: "Hotels",
  components: {
    Navbar,
    Carousel,
  },
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

    const getHotelDetails = async () => {
      await SearchHotel.getHotelDetails(hotelid.value).then((response) => {
        hotel.value = response.data;
        pdpHeader.value = hotel.value.pdpHeader;
        overview.value = hotel.value.overview;
        hotelWelcomeRewards.value = hotel.value.hotelWelcomeRewards;
        propertyDescription.value = hotel.value.propertyDescription;
        guestReviews.value = hotel.value.guestReviews;
        atAGlance.value = hotel.value.atAGlance;
        amenities.value = hotel.value.amenities;
        hygieneAndCleanliness.value = hotel.value.hygieneAndCleanliness;
        smallPrint.value = hotel.value.smallPrint;
        specialFeatures.value = hotel.value.specialFeatures;
        miscellaneous.value = hotel.value.miscellaneous;
        pageInfo.value = hotel.value.pageInfo;
        hotelBadges.value = hotel.value.hotelBadges;
        unavailable.value = hotel.value.unavailable;

        transportations.value = hotel.value.transportations;
        console.log(hotel.value);

        SearchHotel.getHotelImages(hotelid.value).then((response) => {
          hotelImages.value = response.data;
        });
      });

      onMounted(() => {
        getHotelDetails();
      });
    };
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
    };
  },
};
</script>

<style>
</style>