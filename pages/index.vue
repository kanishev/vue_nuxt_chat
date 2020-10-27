<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400">
        <v-snackbar v-model="snackbar" top :timeout="1000">
          {{ message }}
          <template>
            <v-btn color="red" @click="snackbar = false"> Закрыть </v-btn>
          </template>
        </v-snackbar>

        <v-card-title><h1>Nuxt чат</h1></v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Имя"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Комната"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="submit"
            >
              Войти
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>



<script>
import { mapMutations } from "vuex";
import Snackbar from "../components/Snackbar";
import messages from "../utils/messages";

export default {
  name: "Index",
  head: {
    title: "Добро пожаловать",
  },
  layout: "empty",
  sockets: {
    connect: function () {
      console.log("socket to notification channel connected");
    },
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Введите имя",
      (v) => (v && v.length <= 10) || "Имя не должно превышать 16 символов ",
    ],
    room: "",
    roomRules: [(v) => !!v || "Введите комнату"],
    snackbar: false,
    message: "",
  }),

  methods: {
    ...mapMutations(["setUser"]),
    submit() {
      this.$refs.form.validate();

      const user = {
        name: this.name,
        room: this.room,
      };

      this.$socket.emit("userJoin", user, (data) => {
        if (typeof data === "string") {
          console.log(data);
        } else {
          user.id = data.userId;
          this.setUser(user);
          this.$router.push("/chat");
        }
      });
    },
  },
  components: {
    Snackbar,
  },
  mounted() {
    const { message } = this.$route.query;
    if (message) {
      this.message = messages[message];
      this.snackbar = !!this.message;
      this.$store.commit("setSnackbar", true);
    }
  },
};
</script>
