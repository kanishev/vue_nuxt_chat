<template>
  <div class="c-wrap">
    <div class="c-chat" ref="block">
      <Message
        v-for="m in messages"
        :key="m.text"
        :name="m.name"
        :text="m.text"
        :owner="user.id === m.id"
      />
    </div>

    <div class="c-form">
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Message from "../components/Message";
import ChatForm from "../components/ChatFrom";

export default {
  layout: "main",
  head() {
    return {
      title: `Комната ${this.user.room}`,
    };
  },
  middleware: ["chat"],
  computed: mapState(["user", "messages"]),
  watch: {
    messages() {
      setTimeout(() => {
        if (this.$refs.block) {
          this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
        } else {
          return;
        }
      }, 0);
    },
  },
  components: {
    Message,
    ChatForm,
  },
};
</script>


<style scoped>
.c-wrap {
  position: relative;
  height: 100%;
  padding: 1rem;
  overflow: hidden;
}

.c-chat {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 80px;
  overflow-y: auto;
}

.c-form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: #212121;
  height: 80px;
}
</style>
