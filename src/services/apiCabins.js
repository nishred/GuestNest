import supabase from "./supabase";

export async function fetchCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("error while fetyching cabins");

    throw error;
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log("There was an error while deleting the cabin");

    throw err;
  }
}
