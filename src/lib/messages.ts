import { client } from "./supabase";

type Message = {
  by: string;
  message: string;
  created_at: string;
};

export async function getMessages(): Promise<Message[]> {
  const { data, error } = await client
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function sendMessage(
  by: string,
  message: string,
): Promise<boolean> {
  const { error } = await client.from("messages").insert({
    by,
    message,
  });

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
