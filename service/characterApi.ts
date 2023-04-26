import axios from "axios";

export async function getAllCharacter() {
  return await axios.get("/mk-characters");
}
