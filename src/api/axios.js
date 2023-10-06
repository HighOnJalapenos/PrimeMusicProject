import axios from "axios";

export default axios.create({
  baseURL: "https://academics.newtonschool.co/api/v1",
  headers: { "Content-Type": "application/json", projectId: "c4oeb3ucmlyq" },
});
