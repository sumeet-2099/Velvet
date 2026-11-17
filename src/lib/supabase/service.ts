import { createClient as createBrowserSupabase } from "./client";
import { createClient as createServerSupabase } from "./server";
import { Database } from "@/types/supabase";

export type DbTemplate = Database["public"]["Tables"]["templates"]["Row"];
export type DbPlan = Database["public"]["Tables"]["subscription_plans"]["Row"];
export type DbLicense = Database["public"]["Tables"]["project_licenses"]["Row"];

/**
 * Fetch all published templates directly from Supabase PostgreSQL
 */
export async function getPublishedTemplates(): Promise<DbTemplate[]> {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("status", "published")
      .order("popularity_rank", { ascending: true });

    if (error) {
      console.warn("Supabase templates query error:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn("Failed to fetch templates from Supabase:", err);
    return [];
  }
}

/**
 * Fetch all active subscription plans from Supabase PostgreSQL
 */
export async function getActiveSubscriptionPlans(): Promise<DbPlan[]> {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*")
      .eq("is_active", true)
      .order("price_subunits", { ascending: true });

    if (error) {
      console.warn("Supabase subscription_plans query error:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn("Failed to fetch plans from Supabase:", err);
    return [];
  }
}

/**
 * Fetch project licenses for a user
 */
export async function getUserProjectLicenses(userId: string): Promise<DbLicense[]> {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from("project_licenses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase project_licenses query error:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn("Failed to fetch project licenses from Supabase:", err);
    return [];
  }
}
