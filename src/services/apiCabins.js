import supabase from "./supabase";

import { supabaseUrl } from "./supabase";

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

    throw error;
  }
}


export async function createCabin(cabin)
{
  //https://nsmitxxcuxwdkttsivag.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/","");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create the cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin,image : imagePath }])
    .select();

  if (error) {
    console.log("Error while adding a cabin");

    throw error;
  }

  //2. upload the image
  const { storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

   //3. Delete the cabin if there was an error uploading the image

   if(storageError)
   {
         await supabase.from("cabins").delete().eq("id", data.id);

         console.log(storageError)

         throw new Error("Cabin could not be created");

   }


      return data;


}
