import client from "./client";

const endPoint = "/customerService";

const sendConcern = (message) => client.post(endPoint, { text: message });
export default { sendConcern };
