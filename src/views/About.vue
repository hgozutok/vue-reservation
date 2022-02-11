<template>
  <div class="container-fluid text-center text-white bg-dark w-100 h-100">
    <div class="container-fluid d-flex p-3 mx-auto flex-column">
      <Navbar />
    </div>
  </div>
  <div class="about">
    <h1>This is an about page</h1>

    <form class="form-horizontal">
      <fieldset>
        <!-- Form Name -->
        <legend>Form Name</legend>

        <!-- Text input-->
        <div class="form-group">
          <label class="col-md-4 control-label" for="textinput"
            >Text Input</label
          >
          <div class="col-md-4">
            <input
              id="textinput"
              name="textinput"
              type="text"
              placeholder="placeholder"
              class="form-control input-md"
            />
            <span class="help-block">help</span>
          </div>
        </div>

        <!-- Appended checkbox -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="appendedcheckbox"
            >Appended Checkbox</label
          >
          <div class="col-md-4">
            <div class="input-group">
              <input
                id="appendedcheckbox"
                name="appendedcheckbox"
                class="form-control"
                type="text"
                placeholder="placeholder"
              />
              <span class="input-group-addon">
                <input type="checkbox" />
              </span>
            </div>
            <p class="help-block">help</p>
          </div>
        </div>

        <!-- Button Drop Down -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="buttondropdown"
            >Button Drop Down</label
          >
          <div class="col-md-4">
            <div class="input-group">
              <input
                id="buttondropdown"
                name="buttondropdown"
                class="form-control"
                placeholder="placeholder"
                type="text"
              />
              <div class="input-group-btn">
                <button
                  type="button"
                  class="btn btn-default dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Action
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu pull-right">
                  <li><a href="#">Option one</a></li>
                  <li><a href="#">Option two</a></li>
                  <li><a href="#">Option three</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Button (Double) -->
        <div class="form-group">
          <label class="col-md-4 control-label" for="button1id"
            >Double Button</label
          >
          <div class="col-md-8">
            <button id="button1id" name="button1id" class="btn btn-success">
              Good Button
            </button>
            <button id="button2id" name="button2id" class="btn btn-danger">
              Scary Button
            </button>
          </div>
        </div>
      </fieldset>
    </form>
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