import axios from "axios";

export default axios.create({
  baseURL: "https://academics.newtonschool.co/api/v1",
  headers: {
    "Content-Type": "application/json",
    projectId: process.env.REACT_APP_PROJECT_ID,
  },
});
