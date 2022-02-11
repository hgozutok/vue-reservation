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
            <label for="exampleDataList" class="form-label"
              >Select Location</label
            >
            <input
              @keyup="getLocations"
              @v-model="query"
              class="form-control"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Where are you travelling?"
            />
            <datalist id="datalistOptions">
              <!-- locations.map(location => { return (
              <option value="location.destinationId">
                {{ location.name }}
              </option>
              ); }) -->
              <option value="San Francisco"></option>
            </datalist>

            <!-- <input
              class="col-md-8"
              id="search"
              type="text"
              placeholder="Where are you travelling?"
            /> -->
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
              id="depart"
              type="text"
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
              id="return"
              type="text"
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
            >
              <option placeholder="">2 Adults</option>
              <option>3 Adults</option>
              <option>4 Adults</option>
              <option>5 Adults</option>
            </select>
          </div>
        </fieldset>
        <div class="mb-3 input-field fifth-wrap">
          <button class="btn-primary rounded" type="button">SEARCH</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import SearchHotel from "../../services/SearchHotel";

export default {
  name: "SearchCard",
  data() {
    return {
      locations: [],
      query: "Ankara",
    };
  },

  methods: {
    getLocations() {
      SearchHotel.search(this.query).then((response) => {
        console.log(response);
        response.suggestions.forEach((element) => {
          this.locations = [...this.locations, ...element.entities];
          // console.log({ ...this.locations, ...element.entities });
        });
      });
    },
  },
};
</script>

<style>
</style>
