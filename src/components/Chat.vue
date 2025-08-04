<script setup>
import { ref } from "vue";
import { sentMessage } from "../services/apiChat";
import { marked } from "marked";

const data = ref({
  chats: [],
  message: null,
  think: false
});

const submit = () => {
  if (!data.value.message) return;

  data.value.think = true;

  const histories = data.value.chats;

  addChat('user', data.value.message)
  setTimeout(() => {
    addChat('model', '......')
  }, 1000);
  
  sentMessage(data.value.message, histories).then((res) => {
    setTimeout(() => {
      data.value.think = false;
      data.value.chats.pop();
      addChat('model', res.data.data)
    }, 1000);

  });

  data.value.message = null;
};

const addChat = (role, msg) => {
  data.value.chats.push({
    role: role,
    parts: [{ text: msg }],
  });
}

const renderMd = (msg) => {
  return marked(msg);
};

</script>

<template>
  <div class="flex py-18 justify-center">
    <div class="bg-white items-center h-auto w-1/2">
      <div class="h-[80vh] mb-10">
        <div class="header-title my-5 text-center">
          <span class="text-2xl y-5">Gemini AI ChatBot v0.1</span>
        </div>
  
        <div
          class="chat-container border border-gray-300 rounded-lg px-3 py-5 relative h-3/4 m-5 bg-gray-200 overflow-y-scroll"
        >
          <div v-for="(chat, id) in data.chats" :key="id">
            <div
              class="chat-bubble flex my-2 justify-end"
              :class="chat?.role == 'user' ? 'justify-end' : 'justify-start'"
            >
              <div
                :class="
                  chat?.role == 'user'
                    ? 'bg-blue-200 pl-2 rounded-tl-xl rounded-bl-xl rounded-br-xl pr-5'
                    : 'bg-gray-300 pr-2 rounded-tr-xl rounded-bl-xl rounded-br-xl pl-5'
                "
                class="text-sm max-w-5/6 py-2"
              >
                <span :class="{'animate__animated animate__flash animate__slow animate__infinite font-bold' : chat?.role == 'model' && chat.parts?.[0]?.text == '......'}" v-html="renderMd(chat.parts?.[0]?.text)"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="action-container flex gap-x-5 px-5">
          <div class="flex-1">
            <input
              type="text"
              name="message"
              v-model="data.message"
              @keyup.enter="submit"
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
