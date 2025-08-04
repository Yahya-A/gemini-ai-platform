import axios from "axios";

function sentMessage(message) {
    return axios.post('/chat/generate-text', { prompt: 'Hii' })
}

export { sentMessage }