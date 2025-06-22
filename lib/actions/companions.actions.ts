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
    // console.log("data: ",data)
    // console.log("error: ",error)
    if(error || !data){
        throw new Error("Failed to create companion");
    }
    return data[0];
}


export const getAllCompanions = async ({limit=10,page=1,subject,topic} : GetAllCompanions)=>{
    const supabase = createSupabaseClient();
    let query = supabase.from('companions').select();
    if(subject && topic){
        query = query.ilike("subject",`%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.like.%${topic}`);
    }
    else if(subject){
        query = query.ilike("subject",`%${subject}%`);
    }
    else if(topic){
        query = query.or(`topic.ilike.%${topic}%,name.like.%${topic}`);
    }
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    const {data,error} = await query;
    if(error){
        throw new Error("Failed to get all companions",error);
    }
    return data; 
}