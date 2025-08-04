<script setup>
import { ref } from "vue";
import axios from 'axios';
import { sentMessage } from "../services/apiChat";

defineProps({
  msg: String,
});

const data = ref({
  chats : [],
  message: null,
})

const submit = () => {
  if (!data.value.message) return;
  data.value.chats.push({from: 'me', message : data.value.message})

  sentMessage(data.value.message).then(res => {
    data.value.chats.push({from: 'ai', message : res.data.data})
  })
  

}
</script>

<template>
  <div class="flex py-18 justify-center">
    <div
      class="bg-white items-center h-[80vh] max-height-[80vh] overflowy-scroll w-1/2"
    >
      <div class="header-title my-5 text-center">
        <span class="text-2xl y-5">Gemini AI ChatBot v0.1</span>
      </div>

      <div
        class="chat-container border border-gray-300 rounded-lg px-3 py-5 relative h-3/4 m-5 bg-gray-200 overflow-y-scroll"
      >
      <div v-for="(chat, id) in data.chats" :key="id">
        <div class="chat-bubble flex my-2 justify-end"  :class="chat.from == 'me' ? 'justify-end' : 'justify-start'">
          <div :class="chat.from == 'me' ? 'bg-blue-200 pl-2  rounded-tl-xl rounded-bl-xl rounded-br-xl pr-5' : 'bg-gray-300 r-2 rounded-tr-xl rounded-bl-xl rounded-br-xl pl-5'" class="text-sm max-w-5/6 py-1 ">
            {{ chat.message }}
          </div>
        </div>
      </div>
      <!-- <div class="chat-bubble-ai flex justify-start">
        <div class="text-sm  max-w-5/6 p py-1 ">
          asdada;ldjs;lasjdl;asjl;djal;sjdlajdljaljdlkakjsldkaj;dljal;dj ajd
        </div>
      </div> -->
      </div>
      <div class="action-container flex gap-x-5 px-5">
        <div class="flex-1 ">
          <input
            type="text"
            name="message"
            v-model="data.message"
            class="block w-full border rounded-md border-gray-300 bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
        </div>
        <div>
          <button
            type="submit"
            :onclick="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Sent
          </button>
        </div>
        <!-- <div class="grid">
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
