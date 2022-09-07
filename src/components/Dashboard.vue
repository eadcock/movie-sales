<template>
  <div>
    <b-container v-if="state === 'setup'" fluid id="dashboard-container">
      <h1>Movie Theater Dashboard</h1>
      <h2>Welcome back!</h2>
      <h2>Movies</h2>
      <b-container fluid id="movie-container">
        <ul>
          <li v-for="movie in movies" :key="movie._id" @click="removeMovie" :data-movie="movie._id"><span><input :value="movie._title" @change="onTitleChange" :data-movie="movie._id"/></span></li>
        </ul>
        <b-button variant="primary" id="addMovie" @click="addMovie">Add Movie</b-button>
      </b-container>

      <h2>Screens</h2>
      <b-container fluid class="screens-container">
        <div class="screen-container" v-for="(screen, index) in screens" :key="screen._id" :data-screen="screen._id">
          <h3>Screen {{ index + 1 }}</h3>
          <p>Currently Showing: <Movie :movies="movies" :selected="screen.currentMovie" :screen="screen._id" v-on:titleChanged="changeMovie"></Movie></p>
          <p>Max Tickets: <b-form-spinbutton inline v-model='screen.maxTickets' min='0' max='100' 
            @change="ticketChange(screen._id, $event)"></b-form-spinbutton></p>
        </div>
      </b-container>

      <b-container fluid class="start-container">
        <b-button variant="primary" id="startDay" @click="startDay">Start Day</b-button>
      </b-container>
    </b-container>

    <b-container v-if="state === 'daytime'">
      <h1>Movie Theater</h1>

      <b-container fluid class="screens-container">
        <div class="screen-container" v-for="(screen, index) in screens" :key="screen._id" :data-screen="screen._id">
          <h3>Screen {{ index + 1 }}</h3>
          <p>Currently Showing: {{ getMovie(screen.currentMovie)._title }}</p>
          <p>Current Tickets: {{ screen.maxTickets - screen.sales }}</p>
        </div>
      </b-container>

      <b-container v-if="currentStep === 0">
        <b-container fluid class="start-container">
          <b-button id="buybtn" variant="primary" @click="currentStep++">Buy Tickets</b-button>
        </b-container>
      </b-container>

      <b-container v-if="currentStep === 1">
        <h4>Which movie would you like to see?</h4>
        <b-container id="movie-select-btns">
          <b-button variant="primary" v-for="movie in movies" :key="'MovieSelect' + movie._id" @click="handleMovieSelect" :data-id="movie._id" :disabled="getTotalTickets(movie._id) === 0">{{ movie._title }}</b-button>
        </b-container>
      </b-container>

      <b-container v-if="currentStep === 2">
        <h4>How many tickets would you like?</h4>
        <b-container fluid class="start-container">
          <b-form-spinbutton id="buy-tickets" v-model="tickets" min="1" :max="getTotalTickets(selectedMovie)"></b-form-spinbutton>
          <b-button variant="success" @click="currentStep++;buyTickets();">Confirm</b-button>
          <b-button variant="secondary" @click="currentStep--">Go Back</b-button>
        </b-container>
      </b-container>

      <b-container v-if="currentStep === 3">
        <h4>Please enjoy the experience!</h4>
        <b-container fluid class="start-container">
        <b-button variant="primary" @click="currentStep = 1">Buy More Tickets</b-button>
        </b-container>
      </b-container>

      <b-container fluid class="start-container">
        <b-button variant="primary" @click="state = 'nighttime'">End Day</b-button>
      </b-container>
    </b-container>
    <b-container v-if="state === 'nighttime'">
      <h1>End of Day Report</h1>

      <b-container fluid class="screens-container">
        <div class="screen-container" v-for="(screen, index) in screens" :key="screen._id" :data-screen="screen._id">
          <h3>Screen {{ index + 1 }}</h3>
          <p>Movie Shown: {{ getMovie(screen.currentMovie)._title }}</p>
          <p>Starting Tickets: {{ screen.maxTickets }}</p>
          <p>Remaining Tickets: {{ screen.maxTickets - screen.sales }}</p>
          <p>Percent of Tickets Sold: {{ (screen.sales / screen.maxTickets) * 100 }}%</p>
        </div>
      </b-container>
    </b-container>
  </div>
  
</template>

<style scoped>
  h1,
  h2,
  h4 {
    text-align: center;
  }

  ul {
    width: 229px;
    margin: auto;
    padding: 20px;
  }

  li {
    text-align: left;
  }

  input,
  select {
    color: black;
  }

  div.b-form-spinbutton {
    width: 200px;
    text-align: center;
  }

  li:hover {
    cursor: pointer;
  }

  li:hover::marker {
      content:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='15' fill='red'><path d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/></svg>");
  }

  #movie-container,
  .start-container,
  .screens-container {
    display: flex;
    flex-direction: column;
  }
  .screens-container {
    flex-direction:row;
    justify-content: space-between;
    flex-wrap:wrap;
  }

  #movie-container {
    margin-bottom: 3em;
  }

  .start-container {
    margin-top: 3em;
    gap: 20px;
    align-items: space-between;
  }

  .screen-container {
    align-self: center;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--bg-darker);

    margin-bottom: 10px;
  }

  #movie-select-btns {
    display: flex;
  }

  button {
    width: 10em;
    margin: auto;
  }

  .b-form-spinbutton {
    width: 10em;
    margin: auto;
  }

  #buy-tickets {
    margin-bottom: 5em;
  }
</style>

<script>
  // eslint-disable-next-line no-unused-vars
  import Movie from './Movie.vue';
  import Theater from '../js/TheaterController.js';

  export default {
    name: 'DashboardVue',
    data() {
      return {
        movies: {},
        screens: {},
        state: 'setup',
        tickets: 0,
        currentStep: 0,
        selectedMovie: '',
      }
    },
    mounted() {
      this.movies = Theater.getMovies();
      this.screens = Theater.getScreens();
    },
    methods: {
      getCachedMovie(id) {
        console.log(this.movies.find(m => m._id === id));
        return this.movies.find(m => m._id === id);
      },
      getTotalTickets(id) {
        return this.screens.filter(m => m.currentMovie === id).reduce((p, c) => p + (c.maxTickets - c.sales), 0)
      },
      onTitleChange(e) {
        Theater.setTitle(e.target.dataset.movie, e.target.value);
      },
      getMovie(id) {
        return Theater.getMovie(id)
      },
      async updateMovies() {
        this.movies = Theater.getMovies();
      },
      addMovie() {
        this.movies = Theater.addMovie('New Movie!');
      },
      removeMovie(e) {
        if (e.target.nodeName === 'LI') {
          this.movies = Theater.deleteMovie(e.target.dataset.movie);
        }
      },
      changeMovie(screen, movie) {
        this.screens = Theater.setMovie(screen, movie);
      },
      ticketChange(id, value) {
        this.screens = Theater.setTickets(id, value);
      },
      startDay() {
        this.state = 'daytime';
      },
      handleMovieSelect(e) {
        this.selectedMovie = e.target.dataset.id; 
        this.currentStep++
      },
      getRandomEntry(array) {
        return array[Math.floor(Math.random() * array.length)];
      },
      buyTickets() {
        let totalTickets = this.tickets;
        // Reset tickets for next purchase
        this.tickets = 1;
        // Pick a random screen to send the customer to.
        // If the selected screening doesn't have enough tickets, select another screening to source the deficit.
        // Repeat as necessary.
        // It's impossible for totalTickets to be larger than all available tickets, so there's no need to worry about that
        const countedScreens = [];
        do {
          let screens = this.screens.filter(m => {console.log(m.currentMovie); return m.currentMovie === this.selectedMovie && !countedScreens.includes(m)});
          let randomScreen = this.getRandomEntry(screens);
          countedScreens.push(randomScreen);

          let desiredTickets = totalTickets;
          let remainingTickets = randomScreen.maxTickets - randomScreen.sales
          if(remainingTickets < totalTickets) {
            desiredTickets = remainingTickets;
          }

          totalTickets -= desiredTickets;

          this.screens = Theater.makeSale(randomScreen._id, desiredTickets);
        } while (totalTickets > 0);
      }
    },
    components: {
    Movie
}
  }
</script>