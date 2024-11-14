import supabase from "./supabase"

export async function fetchCabins()
{


let { data, error } = await supabase
  .from('cabins')
  .select('*')

   if(error)
   {
      console.log("error while fetyching cabins")

      throw error

   }

   return data
  
}