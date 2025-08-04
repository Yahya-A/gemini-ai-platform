import axios from "axios";

function sentMessage(message, history) {
    return axios.post('/chat/generate-text', { prompt: message, history: history })
}

export { sentMessage }