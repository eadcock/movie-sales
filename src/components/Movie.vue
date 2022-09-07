<template>
    <select @change="onTitleChange">
      <option v-for="movie in movies" :key="'option' + movie._id" :value="movie._id" :selected="movie._id === selected">{{ movie._title }}</option>
    </select>
</template>

<style lang="scss">

</style>

<script>
    export default {
      name: 'MovieVue',
      props: {
        movies: Array,
        screen: String,
        selected: String
      },
      methods: {
        onTitleChange(e) {
          this.$emit('titleChanged', this.screen, e.target.options[e.target.selectedIndex].value);
        }
      }
    }
</script>