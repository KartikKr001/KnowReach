"use server"

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData : CreateCompanion)=>{
    const {userId : author} = await auth();
    console.log("userId: ",author)
    const supabase = createSupabaseClient();

    const {data,error} = await supabase.from("companions").insert({  
        ...formData,
        author
    }).select();
    console.log("data: ",data)
    console.log("error: ",error)
    if(error || !data){
        throw new Error("Failed to create companion");
    }
    return data[0];
}
