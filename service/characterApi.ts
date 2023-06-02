import axios from "axios";

export async function getAllCharacter() {
  const response = await axios.get("/mkcharacters");
  return response.data;
}

export async function saveCharacter(character: any) {
  const response = await axios.post("/mkcharacters", character);
  return response.data;
}

export async function saveProduct(product: any) {
  const response = await axios.post("/products", product);
  return response.data;
}

export async function saveShortcut(product: any) {
  const response = await axios.post("/shortcuts", product);
  return response.data;
}

export async function saveShortcutCategory(product: any) {
  const response = await axios.post("/shortcut-categories", product);
  return response.data;
}

export async function saveCharacterVariation(data: any) {
  const response = await axios.post("/mkcharvars", data);
  return response.data;
}

export async function saveKomboCategory(data: any) {
  const response = await axios.post("/mkcombocats", data);
  return response.data;
}

export async function saveKomboSubCategory(data: any) {
  const response = await axios.post("/mkcombosubcats", data);
  return response.data;
}

export async function saveInputCommands(data: any) {
  const response = await axios.post("/mkcombos", data);
  return response.data;
}
