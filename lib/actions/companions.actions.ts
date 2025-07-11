
"use server"

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  console.log("userId: ", author);
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("companions").insert({
    ...formData,
    author,
  }).select();

  if (error || !data) {
    console.error("Error creating companion:", error);
    throw new Error("Failed to create companion");
  }

  return data[0];
};

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
  try {
    const supabase = createSupabaseClient();
    let query = supabase.from("companions").select();

    if (subject && topic) {
      query = query.ilike("subject", `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    } else if (subject) {
      query = query.ilike("subject", `%${subject}%`);
    } else if (topic) {
      query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error } = await query;
    if (error) {
      console.error("Supabase fetch error:", error);
      throw new Error(`Failed to get all companions: ${error.message}`);
    }

    return data;
  } catch (err: any) {
    console.error("getAllCompanions failed:", err);
    throw new Error("getAllCompanions crashed at build time.");
  }
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("companions").select().eq("id", id);

  if (error) {
    console.error("Error fetching companion:", error);
    throw new Error(`Failed to get companion: ${error.message}`);
  }

  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("session_history").insert({
    user_id: userId,
    companion_id: companionId,
  });

  if (error) {
    console.error("Error adding session:", error);
    throw new Error(`Failed to add companion to session history: ${error.message}`);
  }

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select("companions:companion_id(*)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error getting recent sessions:", error);
    throw new Error(`Failed to get recent sessions: ${error.message}`);
  }

  return data.map(({ companions }) => companions);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select("companions:companion_id(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error getting user sessions:", error);
    throw new Error(`Failed to get user sessions: ${error.message}`);
  }

  return data.map(({ companions }) => companions);
};
