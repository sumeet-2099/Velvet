export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      checkout_idempotency_keys: {
        Row: {
          checkout_kind: string
          created_at: string
          expires_at: string
          idempotency_key: string
          plan_id: string
          request_hash: string
          response_payload: Json
          status: string
          template_id: string | null
          user_id: string
        }
        Insert: {
          checkout_kind?: string
          created_at?: string
          expires_at?: string
          idempotency_key: string
          plan_id: string
          request_hash: string
          response_payload?: Json
          status: string
          template_id?: string | null
          user_id: string
        }
        Update: {
          checkout_kind?: string
          created_at?: string
          expires_at?: string
          idempotency_key?: string
          plan_id?: string
          request_hash?: string
          response_payload?: Json
          status?: string
          template_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checkout_idempotency_keys_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkout_idempotency_keys_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkout_idempotency_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      download_logs: {
        Row: {
          id: string
          requested_at: string
          subscription_id: string | null
          template_id: string
          template_slug: string
          template_version: string
          user_id: string
        }
        Insert: {
          id?: string
          requested_at?: string
          subscription_id?: string | null
          template_id: string
          template_slug: string
          template_version: string
          user_id: string
        }
        Update: {
          id?: string
          requested_at?: string
          subscription_id?: string | null
          template_id?: string
          template_slug?: string
          template_version?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "download_logs_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "download_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "download_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount_subunits: number
          currency: string
          id: string
          method: string | null
          provider: string
          provider_payment_id: string
          raw_metadata: Json
          settled_at: string
          status: string
          subscription_id: string
        }
        Insert: {
          amount_subunits: number
          currency: string
          id?: string
          method?: string | null
          provider: string
          provider_payment_id: string
          raw_metadata?: Json
          settled_at?: string
          status: string
          subscription_id: string
        }
        Update: {
          amount_subunits?: number
          currency?: string
          id?: string
          method?: string | null
          provider?: string
          provider_payment_id?: string
          raw_metadata?: Json
          settled_at?: string
          status?: string
          subscription_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      processed_webhooks: {
        Row: {
          event_id: string
          event_type: string
          processed_at: string
          provider: string
        }
        Insert: {
          event_id: string
          event_type: string
          processed_at?: string
          provider: string
        }
        Update: {
          event_id?: string
          event_type?: string
          processed_at?: string
          provider?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          email: string
          id: string
          pending_checkout_tier: string | null
          plan_onboarded: boolean
          role: string
          selected_plan_tier: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string
          email: string
          id: string
          pending_checkout_tier?: string | null
          plan_onboarded?: boolean
          role?: string
          selected_plan_tier?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string
          email?: string
          id?: string
          pending_checkout_tier?: string | null
          plan_onboarded?: boolean
          role?: string
          selected_plan_tier?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_licenses: {
        Row: {
          client_name: string | null
          created_at: string
          deployed_domain: string
          id: string
          is_perpetual: boolean
          license_key: string
          license_scope: string
          project_name: string
          revocation_reason: string | null
          revoked_at: string | null
          status: string
          subscription_id: string | null
          template_id: string
          template_slug: string
          template_title: string
          template_version: string
          user_id: string
        }
        Insert: {
          client_name?: string | null
          created_at?: string
          deployed_domain: string
          id?: string
          is_perpetual?: boolean
          license_key: string
          license_scope: string
          project_name: string
          revocation_reason?: string | null
          revoked_at?: string | null
          status?: string
          subscription_id?: string | null
          template_id: string
          template_slug: string
          template_title: string
          template_version: string
          user_id: string
        }
        Update: {
          client_name?: string | null
          created_at?: string
          deployed_domain?: string
          id?: string
          is_perpetual?: boolean
          license_key?: string
          license_scope?: string
          project_name?: string
          revocation_reason?: string | null
          revoked_at?: string | null
          status?: string
          subscription_id?: string | null
          template_id?: string
          template_slug?: string
          template_title?: string
          template_version?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_licenses_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_licenses_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_licenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          billing_interval: string
          commercial_rights: boolean
          created_at: string
          currency: string
          daily_download_velocity: number
          id: string
          is_active: boolean
          max_seats: number
          monthly_download_quota: number
          price_subunits: number
          single_purchase_discount_pct: number
          tier: string
        }
        Insert: {
          billing_interval: string
          commercial_rights?: boolean
          created_at?: string
          currency: string
          daily_download_velocity: number
          id: string
          is_active?: boolean
          max_seats: number
          monthly_download_quota: number
          price_subunits: number
          single_purchase_discount_pct?: number
          tier: string
        }
        Update: {
          billing_interval?: string
          commercial_rights?: boolean
          created_at?: string
          currency?: string
          daily_download_velocity?: number
          id?: string
          is_active?: boolean
          max_seats?: number
          monthly_download_quota?: number
          price_subunits?: number
          single_purchase_discount_pct?: number
          tier?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          cancelled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          ended_at: string | null
          id: string
          plan_id: string
          provider: string
          provider_subscription_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          cancelled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          ended_at?: string | null
          id?: string
          plan_id: string
          provider?: string
          provider_subscription_id: string
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          cancelled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          ended_at?: string | null
          id?: string
          plan_id?: string
          provider?: string
          provider_subscription_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      template_backend_configs: {
        Row: {
          agents_md: string
          api_endpoints: Json
          backend_stack: string
          database_schema_sql: string
          editable_cms_fields: Json
          env_template: string
          preview_watermark_text: string
          rls_policies_summary: string
          template_id: string
          tokens_json: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          agents_md?: string
          api_endpoints?: Json
          backend_stack?: string
          database_schema_sql?: string
          editable_cms_fields?: Json
          env_template?: string
          preview_watermark_text?: string
          rls_policies_summary?: string
          template_id: string
          tokens_json?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          agents_md?: string
          api_endpoints?: Json
          backend_stack?: string
          database_schema_sql?: string
          editable_cms_fields?: Json
          env_template?: string
          preview_watermark_text?: string
          rls_policies_summary?: string
          template_id?: string
          tokens_json?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_backend_configs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: true
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_backend_configs_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      template_reviews: {
        Row: {
          author_display_name: string
          body: string
          created_at: string
          id: string
          moderation_status: string
          rating: number
          template_id: string
          title: string
          updated_at: string
          user_id: string
          verified_subscriber: boolean
        }
        Insert: {
          author_display_name?: string
          body: string
          created_at?: string
          id?: string
          moderation_status?: string
          rating: number
          template_id: string
          title: string
          updated_at?: string
          user_id: string
          verified_subscriber?: boolean
        }
        Update: {
          author_display_name?: string
          body?: string
          created_at?: string
          id?: string
          moderation_status?: string
          rating?: number
          template_id?: string
          title?: string
          updated_at?: string
          user_id?: string
          verified_subscriber?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "template_reviews_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      template_versions: {
        Row: {
          byte_size: number
          changelog: string
          id: string
          is_latest: boolean
          published_at: string
          sha256_checksum: string
          storage_bucket: string
          storage_object_path: string
          template_id: string
          version: string
        }
        Insert: {
          byte_size?: number
          changelog?: string
          id?: string
          is_latest?: boolean
          published_at?: string
          sha256_checksum?: string
          storage_bucket?: string
          storage_object_path: string
          template_id: string
          version: string
        }
        Update: {
          byte_size?: number
          changelog?: string
          id?: string
          is_latest?: boolean
          published_at?: string
          sha256_checksum?: string
          storage_bucket?: string
          storage_object_path?: string
          template_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_versions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          average_rating: number
          category: string
          category_label: string
          created_at: string
          created_by: string | null
          demo_path: string
          description: string
          features: string[]
          future_demo_host: string
          has_optional_3d: boolean
          id: string
          is_featured: boolean
          min_tier: string
          popularity_rank: number
          preview_alt: string
          preview_gallery: Json
          preview_image: string
          preview_mode: string
          released_at: string
          review_count: number
          single_price_inr_paise: number | null
          single_price_usd_cents: number | null
          slug: string
          specs: Json
          stack: string[]
          status: string
          tagline: string
          tags: string[]
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          average_rating?: number
          category: string
          category_label: string
          created_at?: string
          created_by?: string | null
          demo_path: string
          description: string
          features?: string[]
          future_demo_host: string
          has_optional_3d?: boolean
          id?: string
          is_featured?: boolean
          min_tier?: string
          popularity_rank?: number
          preview_alt: string
          preview_gallery?: Json
          preview_image: string
          preview_mode?: string
          released_at?: string
          review_count?: number
          single_price_inr_paise?: number | null
          single_price_usd_cents?: number | null
          slug: string
          specs?: Json
          stack?: string[]
          status?: string
          tagline: string
          tags?: string[]
          title: string
          updated_at?: string
          version?: string
        }
        Update: {
          average_rating?: number
          category?: string
          category_label?: string
          created_at?: string
          created_by?: string | null
          demo_path?: string
          description?: string
          features?: string[]
          future_demo_host?: string
          has_optional_3d?: boolean
          id?: string
          is_featured?: boolean
          min_tier?: string
          popularity_rank?: number
          preview_alt?: string
          preview_gallery?: Json
          preview_image?: string
          preview_mode?: string
          released_at?: string
          review_count?: number
          single_price_inr_paise?: number | null
          single_price_usd_cents?: number | null
          slug?: string
          specs?: Json
          stack?: string[]
          status?: string
          tagline?: string
          tags?: string[]
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
