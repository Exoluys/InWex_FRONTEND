import { WS_URL } from "@/components/config"

const token = localStorage.getItem("token")
const ws = new WebSocket(`${WS_URL}/?token=${token}`)

ws.onopen = () => {
    console.log("Connected!");
}

ws.onmessage = (event) => {
    console.log("Received:", event.data);
}

ws.onclose = () => {
    console.log("Disconnected");
}

ws.onerror = (error) => {
    console.error("Error:", error);
}


export default ws