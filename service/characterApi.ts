import axios from "axios";

export async function getAllCharacter() {
  const response = await axios.get("/mk-characters");
  return response.data;
}

export async function saveCharacter(character: any) {
  const response = await axios.post("/mk-characters", character);
  return response.data;
}

export async function saveCharacterVariation(character: any) {
  const response = await axios.post("/mk-character-variations", character);
  return response.data;
}
