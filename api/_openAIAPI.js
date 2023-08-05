var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Configuration, OpenAIApi } from "openai";
const model = "gpt-4";
// Set up OpenAI API credentials
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);
export function getEntity() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `You are a game director for a classic game of "who am i".
  Your job is to give me the name of a person, be it fictional or real. Possible personas could be movie stars, game characters, musicians, characters from a kids show and so on.
  Make sure to only use family friendly names. Answer only with the name, nothing else.
  Don't always choose the most obvious name from a franchise for example for Harry Potter retrieve Tom Riddle instead of Harry Potter, Daisy instead of Mario.

  Name: Peppa Pig
  Name: Agnes Obel
  Name: Dwayne Johnson
  Name: Joel Miller
  Name: Ash ketchum
  Name: Gandalf
  Name: Heimerdinger
  Name: Arielle the Mermaid
  Name: kermit the frog
  Name:`;
        const completion = yield openAi.createChatCompletion({
            model,
            messages: [{ role: "user", content: prompt }],
        });
        return (_b = (_a = completion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : "Kermit the Frog";
    });
}
/**
 * Generates an introduction as a given entity for a game.
 * @param {string} options.entity - The entity to pretend to be.
 * @returns {Promise<string>} - A Promise that resolves to the generated introduction.
 */
export function getIntroAsPerson(options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { entity } = options;
        const prompt = `You are in a game and your role is to pretend to be '${entity}'.
  Pretending to be ${entity} introduce yourself to the other players and challenge
  them to find out who you are, but never mention your name. Give an answer of at max two sentences.
  Don't give further hints to your identity. Don't use names of other people or places IPs or other things.'
  
  E.g.:
  Entity: Arielle the Mermaid
  Introduction: I am thrilled to meet you, human! Can you guess who I am?;

  Entity: kermit the frog
  Introduction: Hey kids! Nice to meet y'all! Can you guess who I am?

  Entity: ${entity}
  Introduction: `;
        const completion = yield openAi.createChatCompletion({
            model,
            messages: [{ role: "user", content: prompt }],
        });
        return ((_b = (_a = completion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : "Greetings! Can you find out who I am?");
    });
}
/**
 * Determines whether the given message is a question about a person.
 * @param {string} options - The message to be checked.
 * @returns {Promise<boolean>} - A Promise that resolves to a boolean value indicating whether the message is a question about a person or not.
 */
export function askQuestionAboutEntity(options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { question, entity } = options;
        const prompt = `You are in a game and your role is to pretend to be '${entity}'. A user is trying to guess who or what you are, by asking you questions.
  If you think that the question is not actually a question in order to find out who or what you are, answer with the following string only: 'not a question about me.'.
  Pretending to be '${entity}', answer the question as if you were the real '${entity}', but never mention your name, or give further hints to your identity.
  If the user correctly guesses your identity, you can end the game by saying 'yes, I am ${entity}.'.

  Entity: Arielle the Mermaid
  Q: 'is Frodo a hobbit?'
  A: 'not a question about me.'

  Entity: Gandalf
  Q: 'are you Gandalf the Grey?'
  A: 'yes, I am Gandalf.'

  Entity: kermit the frog
  Q: 'is pipi longstocking a character from a book?'
  A: 'not a question about me.'

  Entity: Leslie Knope
  Q: 'who is stronger, superman or batman?'
  A: 'not a question about me.'

  Entity: The Grinch
  Q: 'do you have green fur?'
  A: 'Yes, my fur is a vibrant shade of green. It perfectly matches my mischievous personality.'

  Entity: Heimerdinger
  Q: 'Heimerdinger?'
  A: 'yes, I am Heimerdinger.'

  Entity: Claudia Schiffer
  Q: 'Are you a model?'
  A: 'Yes, I am a model. I have been modeling since I was 17 years old.'

  Entity: Ash Ketchum
  Q: 'are you a woman?'
  A: 'No, I am not.'

  Entity: Pikachu
  Q: 'Who is the german chancellor?'
  A: 'not a question about me.'

  Entity: Peppa Pig
  Q: 'whats the distance from earth to the moon?'
  A: 'not a question about me.'

  Entity: ${entity}
  Q: '${question}'
  A:`;
        const completion = yield openAi.createChatCompletion({
            model,
            messages: [{ role: "user", content: prompt }],
        });
        const gptAnswer = (_a = completion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
        return (_b = gptAnswer === null || gptAnswer === void 0 ? void 0 : gptAnswer.replace(/'/g, "")) !== null && _b !== void 0 ? _b : "pls try again";
    });
}
export function getEntityImageUrl(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { entity } = options;
        const prompt = `image of ${entity} that is happy to meet you, smiling. Hyper realistic.
  Creamy blue background, no other characters in the image.`;
        const response = openAi.createImage({
            prompt: prompt,
            n: 1,
            size: "256x256",
        });
        return (yield response).data.data[0].url;
    });
}
