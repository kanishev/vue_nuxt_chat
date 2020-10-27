<template>
  <v-snackbar v-model="snackbar" :timeout="fn" top>
    {{ message }}
    <template>
      <v-btn color="red" @click="$emit('change-cnackbar')"> Закрыть </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: ["message"],
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    },
  },
  methods: {
    fn() {
      console.log("FN");
    },
  },
};
</script>
