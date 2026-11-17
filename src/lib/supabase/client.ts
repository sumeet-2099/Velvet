import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nvzszrsdowacqmddymev.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_pnct3e7yqnbnElRziwkuCg_0glTRxIM";

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
