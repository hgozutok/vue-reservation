<template>
  <div class="container-fluid text-center text-white bg-dark w-100 h-100">
    <div class="container-fluid d-flex p-3 mx-auto flex-column">
      <Navbar />
    </div>
  </div>
  <h1>Hotel Details</h1>

  <div class="row">
    <div class="container">
      <!-- hotel name and price -->
      <div
        v-if="pageLoaded === true && propertyDescription != null"
        class="row"
      >
        <div class="col-md-8">
          <h2>
            {{ propertyDescription.name }}
          </h2>
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
      <div v-if="pageLoaded === true && hotelImages.length > 0" class="row">
        <div class="col-md-8">
          <div class="card responsive">
            <Carousel :value="hotelImages" :numVisible="1" :numScroll="1">
              <template #header>
                <h5>Hotel Images</h5>
              </template>
              <template #item="slotProps">
                <div class="product-item responsive">
                  <div class="product-item-content">
                    <div class="mb-3">
                      <img
                        v-bind:src="
                          slotProps.data.baseUrl.replace(
                            '{size}',
                            slotProps.data.sizes[1].suffix
                          )
                        "
                        :alt="slotProps.data.baseUrl"
                        class="product-image responsive"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </Carousel>
          </div>
          <div v-if="pageLoaded === true && roomsAndRates != null" class="row">
            <div class="col-md-8">
              <h4>Rooms</h4>

              <div v-bind:key="room" v-for="room in roomsAndRates.rooms">
                <h4 room.name>{{ room.name }}</h4>
                <h6>Description</h6>
                <p>
                  {{ room.additionalInfo.description }}
                </p>
                <h6>Room Type</h6>
                <p>
                  <!-- {{ room.bedChoices.mainOptions[0] }} -->
                </p>
                <h6>Room Type</h6>
                <p>
                  {{ room.ratePlans[0].cancellation.info }}
                </p>
              </div>
            </div>
          </div>
          <div v-if="pageLoaded === true" class="row">
            <div class="col-md-8">
              <h4>At Glance</h4>

              <h6>Arriving:</h6>
              <p>{{ atAGlance.keyFacts.arrivingLeaving[0] }}</p>
              <h6>Leaving:</h6>
              <p>{{ atAGlance.keyFacts.arrivingLeaving[1] }}</p>
              <h6>Hotel Capacity:</h6>
              <p>{{ atAGlance.keyFacts.hotelSize[0] }}</p>
              <h6>required At Check-In:</h6>
              <div
                v-bind:key="item"
                v-for="item in atAGlance.keyFacts.requiredAtCheckIn"
              >
                <p>{{ item }}</p>
              </div>
              <h6>Hotel Capacity:</h6>
              <p>
                {{ atAGlance.keyFacts.specialCheckInInstructions[0] }}
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div id="map" style="width: 100%; height: 400px">
            <img v-bind:src="propertyDescription.mapWidget.staticMapUrl" />
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
            <div>
              Guests Review:{{ guestReviews.brands.formattedRating }}/{{
                guestReviews.brands.formattedScale
              }}
            </div>
            <div>Total {{ guestReviews.brands.total }} review</div>

            <h4>Amenities</h4>
            <div>
              <div v-bind:key="amenity.heading" v-for="amenity in amenities">
                <h3 key="amenity.heading">{{ amenity.heading }}</h3>

                <div v-bind:key="item" v-for="item in amenity.listItems">
                  <h5 key="item">{{ item.heading }}</h5>
                  <div v-bind:key="subitem" v-for="subitem in item.listItems">
                    <ul>
                      <li>{{ subitem }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="pageLoaded === true && overview != null" class="row">
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
    var roomsAndRates = ref();
    var transportations = ref();
    var hotelImages = ref();

    var pageLoaded = ref(false);

    // var location = ref(route.query.location);
    var departDate = ref(route.query.departDate);
    var returnDate = ref(route.query.leaveDate);
    var adults = ref(route.query.adults);

    const getHotelDetails = async () => {
      SearchHotel.getHotelDetails(
        hotelid.value,
        departDate.value,
        returnDate.value,
        adults.value
      ).then((response) => {
        hotel.value = response;
        console.log("htoelDetails", response);
        if (response.data) {
          pdpHeader.value = response.data.body.pdpHeader;
          overview.value = response.data.body.overview;
          hotelWelcomeRewards.value = response.data.body.hotelWelcomeRewards;
          propertyDescription.value = response.data.body.propertyDescription;
          guestReviews.value = response.data.body.guestReviews;
          atAGlance.value = response.data.body.atAGlance;
          amenities.value = response.data.body.amenities;
          hygieneAndCleanliness.value =
            response.data.body.hygieneAndCleanliness;
          smallPrint.value = response.data.body.smallPrint;
          specialFeatures.value = response.data.body.specialFeatures;
          miscellaneous.value = response.data.body.miscellaneous;
          pageInfo.value = response.data.body.pageInfo;
          hotelBadges.value = response.hotelBadges;
          unavailable.value = response.unavailable;
          roomsAndRates.value = response.data.body.roomsAndRates;

          transportations.value = response.transportations;
        }

        console.log(hotel.value);

        // pageLoaded.value = true;
        SearchHotel.getHotelImages(hotelid.value).then((response) => {
          console.log(response, "hotelImages");
          // let images = [];
          // response.hotelImages.forEach(function (item) {
          //   images.push(item.baseUrl.replace("{size}", item.sizes[1].suffix));
          // });

          hotelImages.value = response.hotelImages;

          console.log(response.hotelImages);
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
      roomsAndRates,
    };
  },
  name: "Hotels",
  components: {
    Navbar,
    Carousel,
  },
};
</script>

<style scoped>
.p-carousel-next {
  width: 2rem;
  height: 2rem;
  color: #061a2c;
  border: 0 none;

  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  margin: 0.5rem;
}
.product-item .product-item-content {
  border: 1px solid var(--surface-border);
  border-radius: 3px;
  margin: 0.3rem;
  text-align: center;
  padding: 2rem 0;
}

.product-item .product-image {
  width: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>