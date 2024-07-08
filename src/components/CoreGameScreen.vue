<script setup lang="ts">
import UserInput from "./UserInput.vue";
import Scrollable from "./Scrollable.vue";
import { onMounted, ref } from "vue";
import MessageBubble from "./MessageBubble.vue";
import ProfilePicture from "./ProfilePicture.vue";
import { WhoAmAiClient } from "../core/WhoAmAiClient";
import WaitingBubble from "./WaitingBubble.vue";

const messages = ref<string[]>([]);
const entity = ref<string>("");
const waiting = ref(true);
const scrollable = ref();
const userInput = ref();
const gameFinished = ref(false);
const entityImagePathToBe = ref<string | undefined>(undefined);
let entityImagePath: string | undefined = "";

const client = new WhoAmAiClient()

onMounted(async () => {
  const response = await client.getEntity();
  entity.value = response.entity;

  client.getImage({ entity: entity.value }).then(
    ({ imageUrl }) => (entityImagePath = imageUrl)
  );

  setTimeout(async () => {
    addMessageToChat(response.intro);
    toggleWaiting();
  }, 1000);
});

//--- private utilities

async function processInput(question: string) {
  const aiAnswerPromise = client.askQuestion({
    entity: entity.value,
    question,
  });
  addMessageToChat(question);

  toggleWaiting();
  const aiAnswer = (await aiAnswerPromise).answer.toLocaleLowerCase();
  addMessageToChat(aiAnswer);
  toggleWaiting();

  checkIfCorrect(aiAnswer);
}

function addMessageToChat(message: string) {
  messages.value.push(message);
  scrollable.value.scrollToBottom();
  userInput.value.toggle();
}

function toggleWaiting() {
  waiting.value = !waiting.value;
}

async function checkIfCorrect(aiAnswer: string) {
  const correctAnswer = `yes, I am ${entity.value}.`.toLowerCase();
  if (aiAnswer.toLocaleLowerCase() === correctAnswer) {
    gameFinished.value = true;
    if (entityImagePath) {
      entityImagePathToBe.value = entityImagePath;
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="scrollable-container">
      <Scrollable ref="scrollable" class="scrollable">
        <MessageBubble
            v-for="message in messages"
            class="message-bubble"
            :message="message"
        />
        <WaitingBubble
            v-if="waiting"
            class="message-bubble"
        />
      </Scrollable>
      <ProfilePicture
          class="entity-picture"
          :img-path="entityImagePathToBe"
          :key="entityImagePathToBe"
      />
    </div>

    <UserInput
        v-if="!gameFinished"
        ref="userInput"
        class="input"
        @input="processInput"
    />
  </div>
</template>

<style scoped>
.container {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.scrollable-container {
  position: relative;
}

.scrollable {
  position: relative;
  min-width: 70vw;
  min-height: 100px;
  max-height: 70vh;

  .message-bubble {
    position: relative;
  }

  .message-bubble:nth-child(even) {
    align-self: flex-start;
    background-color: lightcyan;
    font-weight: 400;
  }
  .message-bubble:nth-child(even)::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: -2px;
    background-color: lightcyan;
    width: 10px;
    height: 10px;
    transform: rotate(-30deg) skew(-45deg, 0deg);
  }

  .message-bubble:nth-child(odd) {
    align-self: flex-end;
  }
  .message-bubble:nth-child(odd)::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: -2px;
    background-color: white;
    width: 10px;
    height: 10px;
    transform: rotate(30deg) skew(45deg, 0deg);
  }
}

.message-bubble {
  animation: appear 1.5s ease-in-out forwards;
  @keyframes appear {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
}

.entity-picture {
  position: absolute;
  left: 50%;
  top: 0;

  transform: translate(-50%, -80%);
}

.input {
  margin-top: 20px;
  width: 50%;
}
</style>
