<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" style="margin-left: auto">
            <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button
              variant="outline-success"
              class="my-2 my-sm-0"
              type="submit"
              style="margin-left: 20px; max-width: 150px"
              >Search</b-button
            >

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <div>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        controls
        indicators
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide
          caption="First Slide"
          img-src="https://picsum.photos/1024/480/?image=10"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Second Slide"
          img-src="https://picsum.photos/1024/480/?image=12"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Third Slide"
          img-src="https://picsum.photos/1024/480/?image=22"
        ></b-carousel-slide>
      </b-carousel>
    </div>

    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
    <img :src="image_src" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,

      select: "",
      target_url: "/all_images",
      image_src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    };
  },
  mounted() {},
  methods: {
    onSlideStart(slide) {
      console.log(slide);
      this.sliding = true;
    },
    onSlideEnd(slide) {
      console.log(slide);
      this.sliding = false;
    },
  },
};
</script>
