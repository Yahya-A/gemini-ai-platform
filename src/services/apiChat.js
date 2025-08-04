import axios from "axios";

function sentMessage(message) {
    return axios.post('/chat/generate-text', { prompt: message })
}

export { sentMessage }