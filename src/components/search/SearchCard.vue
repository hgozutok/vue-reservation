<template>
  <div class="row addShadow rounded">
    <form
      class="d-flex flex-column justify-content-center align-items-center"
      method="post"
      style="
        background: rgba(255, 255, 255, 0.49);

        margin: 0px;
        border-top: 5px solid #fca311;
      "
    >
      <fieldset>
        <legend class="text-success">SEARCH HOTEL</legend>
      </fieldset>
      <div class="inner-form">
        <fieldset>
          <div class="row mb-3 input-field first-wrap">
            <div class="col-md-2 icon-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                ></path>
              </svg>
            </div>
            <AutoComplete
              class="col-md-8"
              v-model="query.label"
              :suggestions="locationsAC"
              @complete="getLocations($event)"
              placeholder="Where are you
            travelling?"
              field="name"
              @item-select="() => {}"
            />

            <!-- {{ query.value }} -->
          </div>
        </fieldset>
        <fieldset>
          <div class="row mb-3 input-field second-wrap">
            <div class="col-md-2 icon-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
                ></path>
              </svg>
            </div>
            <input
              class="col-md-8 datepicker"
              v-model="departDate"
              type="date"
              placeholder="29 Aug 2022"
            />
          </div>
        </fieldset>
        <fieldset>
          <div class="row mb-3 input-field third-wrap">
            <div class="col-md-2 icon-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
                ></path>
              </svg>
            </div>
            <input
              class="col-md-8 datepicker"
              v-model="returnDate"
              id="return"
              type="date"
              placeholder="30 Aug 2022"
            />
          </div>
        </fieldset>
        <fieldset>
          <div class="row mb-3 input-field fouth-wrap">
            <div class="col-md-2 icon-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                ></path>
              </svg>
            </div>
            <select
              class="col-md-8"
              data-trigger=""
              name="choices-single-default"
              v-model="adults"
              v-bind="{
                value: adults,
                placeholder: 'Adults',
              }"
            >
              <option placeholder="" value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option>3 Adults</option>
              <option>4 Adults</option>
              <option>5 Adults</option>
            </select>
          </div>
        </fieldset>
        <div class="mb-3 input-field fifth-wrap">
          <button
            @click="handleSearch()"
            class="btn-primary rounded"
            type="button"
          >
            SEARCH
          </button>

          <!-- <router-link :to={ name: 'search', params: { location: 'test' } }>{{
            "query.name"
          }}</router-link> -->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import SearchHotel from "../../services/SearchHotel";
import AutoComplete from "primevue/autocomplete";
import { ref } from "vue";
import { useRouter } from "vue-router";

// import { FilterService, FilterMatchMode } from "primevue/api";

export default {
  name: "SearchCard",
  components: {
    AutoComplete,
  },
  setup() {
    const router = useRouter();
    // const route = useRoute()

    var locations = ref([]);
    var locationsAC = ref([]);
    var selectedLocation = ref({});
    //var query = ref("Berlin");
    var query = ref({ label: "Berlin", value: 332483 });
    var today = new Date();
    var thisMonth = today.getMonth() + 1;

    var date =
      today.getFullYear() +
      "-" +
      (thisMonth < 10 ? "0" + thisMonth : thisMonth) +
      "-" +
      (today.getDate() + 1);

    var departDate = ref(new Date().toISOString().slice(0, 10));
    var returnDate = ref(date);
    var adults = ref("1");

    const getLocations = () => {
      locations.value = [""];
      locationsAC.value = [""];

      SearchHotel.search(query.value).then((response) => {
        // console.log(response);
        locationsAC.value = [""];
        response.suggestions.forEach((element) => {
          locations.value = [...element.entities];

          locations.value.forEach((element) => {
            locationsAC.value.push({
              name: element.name,
              value: element.destinationId,
            });
          });
        });

        // console.log(locationsAC.value);
      });
    };

    const handleSearch = () => {
      router.push({
        path: "/search",
        query: {
          location: query.value.value,
          departDate: departDate.value,
          leaveDate: returnDate.value,
          adults: adults.value,
        },
      });
    };

    return {
      locations,
      locationsAC,
      selectedLocation,
      getLocations,
      departDate,
      returnDate,
      adults,
      query,
      handleSearch,
    };
  },
};
</script>

<style>
</style>
