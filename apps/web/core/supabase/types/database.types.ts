export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      character_bestiary: {
        Row: {
          character_id: string;
          created_at: string;
          has_soul: boolean;
          kills: number;
          monster_id: number;
          stage: number;
        };
        Insert: {
          character_id: string;
          created_at?: string;
          has_soul?: boolean;
          kills?: number;
          monster_id: number;
          stage?: number;
        };
        Update: {
          character_id?: string;
          created_at?: string;
          has_soul?: boolean;
          kills?: number;
          monster_id?: number;
          stage?: number;
        };
        Relationships: [
          {
            foreignKeyName: "character_bestiary_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "character_bestiary_class_summary";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "character_bestiary_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "character_charm_economy";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "character_bestiary_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "characters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "character_bestiary_monster_id_fkey";
            columns: ["monster_id"];
            isOneToOne: false;
            referencedRelation: "monsters";
            referencedColumns: ["id"];
          },
        ];
      };
      character_charms: {
        Row: {
          character_id: string;
          charm_id: number;
          level: number;
        };
        Insert: {
          character_id: string;
          charm_id: number;
          level: number;
        };
        Update: {
          character_id?: string;
          charm_id?: number;
          level?: number;
        };
        Relationships: [
          {
            foreignKeyName: "character_charms_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "character_bestiary_class_summary";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "character_charms_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "character_charm_economy";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "character_charms_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "characters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "character_charms_charm_id_fkey";
            columns: ["charm_id"];
            isOneToOne: false;
            referencedRelation: "charms";
            referencedColumns: ["id"];
          },
        ];
      };
      characters: {
        Row: {
          id: string;
          name: string;
          synchronized_at: string | null;
          user_id: string;
          vocation: Database["public"]["Enums"]["character_vocation"];
          world: string;
        };
        Insert: {
          id?: string;
          name: string;
          synchronized_at?: string | null;
          user_id?: string;
          vocation: Database["public"]["Enums"]["character_vocation"];
          world: string;
        };
        Update: {
          id?: string;
          name?: string;
          synchronized_at?: string | null;
          user_id?: string;
          vocation?: Database["public"]["Enums"]["character_vocation"];
          world?: string;
        };
        Relationships: [];
      };
      charms: {
        Row: {
          cost_lvl1: number;
          cost_lvl2: number;
          cost_lvl3: number;
          description: string;
          effect_lvl1: string;
          effect_lvl2: string;
          effect_lvl3: string;
          id: number;
          image_path: string;
          name: string;
          type: Database["public"]["Enums"]["charm_type"];
        };
        Insert: {
          cost_lvl1: number;
          cost_lvl2: number;
          cost_lvl3: number;
          description: string;
          effect_lvl1: string;
          effect_lvl2: string;
          effect_lvl3: string;
          id?: never;
          image_path: string;
          name: string;
          type: Database["public"]["Enums"]["charm_type"];
        };
        Update: {
          cost_lvl1?: number;
          cost_lvl2?: number;
          cost_lvl3?: number;
          description?: string;
          effect_lvl1?: string;
          effect_lvl2?: string;
          effect_lvl3?: string;
          id?: never;
          image_path?: string;
          name?: string;
          type?: Database["public"]["Enums"]["charm_type"];
        };
        Relationships: [];
      };
      damage_elements: {
        Row: {
          id: number;
          image_path: string;
          name: string;
          slug: Database["public"]["Enums"]["damage_element"] | null;
        };
        Insert: {
          id?: number;
          image_path: string;
          name: string;
          slug?: Database["public"]["Enums"]["damage_element"] | null;
        };
        Update: {
          id?: number;
          image_path?: string;
          name?: string;
          slug?: Database["public"]["Enums"]["damage_element"] | null;
        };
        Relationships: [];
      };
      hunt_places: {
        Row: {
          id: number;
          image_path: string | null;
          name: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          image_path?: string | null;
          name?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          image_path?: string | null;
          name?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      hunt_session_charm_bonuses: {
        Row: {
          charm_id: number;
          hunt_session_monster_id: number;
        };
        Insert: {
          charm_id: number;
          hunt_session_monster_id: number;
        };
        Update: {
          charm_id?: number;
          hunt_session_monster_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "hunt_session_charm_bonuses_charm_fkey";
            columns: ["charm_id"];
            isOneToOne: false;
            referencedRelation: "charms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hunt_session_charms_hunt_session_monster_id_fkey";
            columns: ["hunt_session_monster_id"];
            isOneToOne: false;
            referencedRelation: "hunt_session_killed_monsters";
            referencedColumns: ["id"];
          },
        ];
      };
      hunt_session_damage_elements: {
        Row: {
          damage_element_id: number;
          percent: number;
          session_id: number;
        };
        Insert: {
          damage_element_id: number;
          percent: number;
          session_id: number;
        };
        Update: {
          damage_element_id?: number;
          percent?: number;
          session_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "hunt_session_damage_elements_damage_element_id_fkey";
            columns: ["damage_element_id"];
            isOneToOne: false;
            referencedRelation: "damage_elements";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hunt_session_damage_elements_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "hunt_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      hunt_session_killed_monsters: {
        Row: {
          count: number;
          id: number;
          monster_id: number;
          session_id: number;
        };
        Insert: {
          count: number;
          id?: number;
          monster_id: number;
          session_id: number;
        };
        Update: {
          count?: number;
          id?: number;
          monster_id?: number;
          session_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "kills_monster_id_fkey";
            columns: ["monster_id"];
            isOneToOne: false;
            referencedRelation: "monsters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "session_monsters_hunt_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "hunt_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      hunt_session_looted_items: {
        Row: {
          count: number;
          item_id: number;
          session_id: number;
        };
        Insert: {
          count: number;
          item_id: number;
          session_id: number;
        };
        Update: {
          count?: number;
          item_id?: number;
          session_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "hunt_session_items_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "hunt_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hunt_session_looted_items_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hunt_session_looted_items_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "supplies";
            referencedColumns: ["id"];
          },
        ];
      };
      hunt_session_monster_damage_sources: {
        Row: {
          monster_id: number;
          percent: number;
          session_id: number;
        };
        Insert: {
          monster_id: number;
          percent: number;
          session_id: number;
        };
        Update: {
          monster_id?: number;
          percent?: number;
          session_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "hunt_session_damage_sources_monster_id_fkey";
            columns: ["monster_id"];
            isOneToOne: false;
            referencedRelation: "monsters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hunt_session_damage_sources_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "hunt_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      hunt_session_prey_bonuses: {
        Row: {
          hunt_session_monster_id: number;
          prey_id: number;
        };
        Insert: {
          hunt_session_monster_id: number;
          prey_id: number;
        };
        Update: {
          hunt_session_monster_id?: number;
          prey_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_prey_monster";
            columns: ["hunt_session_monster_id"];
            isOneToOne: false;
            referencedRelation: "hunt_session_killed_monsters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hunt_session_prey_bonuses_prey_id_fkey";
            columns: ["prey_id"];
            isOneToOne: false;
            referencedRelation: "prey_bonuses";
            referencedColumns: ["id"];
          },
        ];
      };
      hunt_session_supplies: {
        Row: {
          count: number;
          item_id: number;
          session_id: number;
        };
        Insert: {
          count: number;
          item_id: number;
          session_id: number;
        };
        Update: {
          count?: number;
          item_id?: number;
          session_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "hunt_session_supplies_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hunt_session_supplies_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "supplies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "session_supplies_hunt_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "hunt_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      hunt_sessions: {
        Row: {
          character_id: string;
          created_at: string;
          damage: number;
          damage_per_hour: number;
          date: string;
          duration_seconds: number;
          ended_at: string;
          healing: number;
          healing_per_hour: number;
          id: number;
          level: number;
          loot_value: number;
          place_id: number;
          player_count: number;
          profit: number;
          profit_per_hour: number;
          raw_xp_gain: number;
          raw_xp_per_hour: number;
          started_at: string;
          supplies_cost: number;
          updated_at: string | null;
          xp_gain: number;
          xp_per_hour: number;
        };
        Insert: {
          character_id: string;
          created_at?: string;
          damage: number;
          damage_per_hour: number;
          date: string;
          duration_seconds: number;
          ended_at: string;
          healing: number;
          healing_per_hour: number;
          id?: number;
          level: number;
          loot_value: number;
          place_id: number;
          player_count: number;
          profit: number;
          profit_per_hour: number;
          raw_xp_gain: number;
          raw_xp_per_hour: number;
          started_at: string;
          supplies_cost: number;
          updated_at?: string | null;
          xp_gain: number;
          xp_per_hour: number;
        };
        Update: {
          character_id?: string;
          created_at?: string;
          damage?: number;
          damage_per_hour?: number;
          date?: string;
          duration_seconds?: number;
          ended_at?: string;
          healing?: number;
          healing_per_hour?: number;
          id?: number;
          level?: number;
          loot_value?: number;
          place_id?: number;
          player_count?: number;
          profit?: number;
          profit_per_hour?: number;
          raw_xp_gain?: number;
          raw_xp_per_hour?: number;
          started_at?: string;
          supplies_cost?: number;
          updated_at?: string | null;
          xp_gain?: number;
          xp_per_hour?: number;
        };
        Relationships: [
          {
            foreignKeyName: "hunt_sessions_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "character_bestiary_class_summary";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "hunt_sessions_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "character_charm_economy";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "hunt_sessions_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "characters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sessions_place_fkey";
            columns: ["place_id"];
            isOneToOne: false;
            referencedRelation: "hunt_places";
            referencedColumns: ["id"];
          },
        ];
      };
      imbuing_prices: {
        Row: {
          key: Database["public"]["Enums"]["imbuing_price_key"];
          price: number;
          user_id: string;
        };
        Insert: {
          key: Database["public"]["Enums"]["imbuing_price_key"];
          price: number;
          user_id?: string;
        };
        Update: {
          key?: Database["public"]["Enums"]["imbuing_price_key"];
          price?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      item_categories: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      item_item_categories: {
        Row: {
          category_id: number;
          item_id: number;
        };
        Insert: {
          category_id: number;
          item_id: number;
        };
        Update: {
          category_id?: number;
          item_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "item_item_categories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "item_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "item_item_categories_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "item_item_categories_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "supplies";
            referencedColumns: ["id"];
          },
        ];
      };
      items: {
        Row: {
          created_at: string;
          id: number;
          image_path: string;
          name: string;
          tibia_item_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image_path: string;
          name: string;
          tibia_item_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          image_path?: string;
          name?: string;
          tibia_item_id?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      monsters: {
        Row: {
          bestiary_class: Database["public"]["Enums"]["bestiary_class"];
          bestiary_difficulty: number;
          bestiary_kills: Json;
          charm_points: number;
          elemental_resistances: Json;
          exp: number;
          hp: number;
          id: number;
          image_path: string | null;
          name: string;
          sort_order: number | null;
        };
        Insert: {
          bestiary_class: Database["public"]["Enums"]["bestiary_class"];
          bestiary_difficulty: number;
          bestiary_kills?: Json;
          charm_points: number;
          elemental_resistances: Json;
          exp: number;
          hp: number;
          id?: number;
          image_path?: string | null;
          name: string;
          sort_order?: number | null;
        };
        Update: {
          bestiary_class?: Database["public"]["Enums"]["bestiary_class"];
          bestiary_difficulty?: number;
          bestiary_kills?: Json;
          charm_points?: number;
          elemental_resistances?: Json;
          exp?: number;
          hp?: number;
          id?: number;
          image_path?: string | null;
          name?: string;
          sort_order?: number | null;
        };
        Relationships: [];
      };
      prey_bonuses: {
        Row: {
          bonus_type: Database["public"]["Enums"]["prey_bonus_type"];
          bonus_value: number;
          description: string;
          id: number;
        };
        Insert: {
          bonus_type: Database["public"]["Enums"]["prey_bonus_type"];
          bonus_value: number;
          description: string;
          id?: number;
        };
        Update: {
          bonus_type?: Database["public"]["Enums"]["prey_bonus_type"];
          bonus_value?: number;
          description?: string;
          id?: number;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          role: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        Insert: {
          role?: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        Update: {
          role?: Database["public"]["Enums"]["user_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      user_settings: {
        Row: {
          last_active_character_id: string | null;
          user_id: string;
        };
        Insert: {
          last_active_character_id?: string | null;
          user_id: string;
        };
        Update: {
          last_active_character_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_settings_last_active_character_id_fkey";
            columns: ["last_active_character_id"];
            isOneToOne: false;
            referencedRelation: "character_bestiary_class_summary";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "user_settings_last_active_character_id_fkey";
            columns: ["last_active_character_id"];
            isOneToOne: false;
            referencedRelation: "character_charm_economy";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "user_settings_last_active_character_id_fkey";
            columns: ["last_active_character_id"];
            isOneToOne: false;
            referencedRelation: "characters";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      character_bestiary_class_summary: {
        Row: {
          bestiary_class: Database["public"]["Enums"]["bestiary_class"] | null;
          character_id: string | null;
          completed_monsters: number | null;
          completed_soulpits: number | null;
          total_charm_points: number | null;
          total_monsters: number | null;
          unlocked_charm_points: number | null;
        };
        Relationships: [];
      };
      character_bestiary_summary: {
        Row: {
          character_id: string | null;
          completed_soulpits: number | null;
          total_charm_points: number | null;
          unlocked_charm_points: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "character_bestiary_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "character_bestiary_class_summary";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "character_bestiary_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "character_charm_economy";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "character_bestiary_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "characters";
            referencedColumns: ["id"];
          },
        ];
      };
      character_charm_economy: {
        Row: {
          character_id: string | null;
          major_available: number | null;
          major_spent: number | null;
          major_unlocked: number | null;
          minor_available: number | null;
          minor_spent: number | null;
          minor_unlocked: number | null;
        };
        Relationships: [];
      };
      character_charms_summary: {
        Row: {
          character_id: string | null;
          minor_pool_unlocked: number | null;
          spent_major: number | null;
          spent_minor: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "character_charms_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "character_bestiary_class_summary";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "character_charms_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "character_charm_economy";
            referencedColumns: ["character_id"];
          },
          {
            foreignKeyName: "character_charms_character_id_fkey";
            columns: ["character_id"];
            isOneToOne: false;
            referencedRelation: "characters";
            referencedColumns: ["id"];
          },
        ];
      };
      supplies: {
        Row: {
          created_at: string | null;
          id: number | null;
          image_path: string | null;
          name: string | null;
          updated_at: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      can_access_character: { Args: { cid: string }; Returns: boolean };
      can_access_hunt_session: { Args: { sid: number }; Returns: boolean };
      create_hunt_session: {
        Args: { p_payload: Json };
        Returns: {
          character_id: string;
          created_at: string;
          damage: number;
          damage_per_hour: number;
          date: string;
          duration_seconds: number;
          ended_at: string;
          healing: number;
          healing_per_hour: number;
          id: number;
          level: number;
          loot_value: number;
          place_id: number;
          player_count: number;
          profit: number;
          profit_per_hour: number;
          raw_xp_gain: number;
          raw_xp_per_hour: number;
          started_at: string;
          supplies_cost: number;
          updated_at: string | null;
          xp_gain: number;
          xp_per_hour: number;
        };
        SetofOptions: {
          from: "*";
          to: "hunt_sessions";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      get_monsters_with_character_progress: {
        Args: {
          p_bestiary_class?: Database["public"]["Enums"]["bestiary_class"];
          p_bestiary_difficulty?: number;
          p_character_id: string;
          p_limit?: number;
          p_offset?: number;
          p_search?: string;
          p_stage_filter?: Database["public"]["Enums"]["bestiary_stage_filter"];
        };
        Returns: {
          bestiary_class: Database["public"]["Enums"]["bestiary_class"];
          bestiary_difficulty: number;
          bestiary_kills: Json;
          charm_points: number;
          elemental_resistances: Json;
          exp: number;
          has_soul: boolean;
          hp: number;
          id: number;
          image_path: string;
          kills: number;
          name: string;
          sort_order: number;
          stage: number;
          total_count: number;
        }[];
      };
      reset_all_charms: { Args: { p_character_id: string }; Returns: undefined };
      set_character_charm_level: {
        Args: { p_character_id: string; p_charm_id: number; p_level: number };
        Returns: undefined;
      };
      update_hunt_session: {
        Args: { p_payload: Json };
        Returns: {
          character_id: string;
          created_at: string;
          damage: number;
          damage_per_hour: number;
          date: string;
          duration_seconds: number;
          ended_at: string;
          healing: number;
          healing_per_hour: number;
          id: number;
          level: number;
          loot_value: number;
          place_id: number;
          player_count: number;
          profit: number;
          profit_per_hour: number;
          raw_xp_gain: number;
          raw_xp_per_hour: number;
          started_at: string;
          supplies_cost: number;
          updated_at: string | null;
          xp_gain: number;
          xp_per_hour: number;
        };
        SetofOptions: {
          from: "*";
          to: "hunt_sessions";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      upsert_imbuing_prices: { Args: { p_prices: Json }; Returns: undefined };
    };
    Enums: {
      bestiary_class:
        | "Amphibic"
        | "Aquatic"
        | "Bird"
        | "Construct"
        | "Demon"
        | "Dragon"
        | "Elemental"
        | "Extra Dimensional"
        | "Fey"
        | "Giant"
        | "Human"
        | "Humanoid"
        | "Inkborn"
        | "Lycanthrope"
        | "Magical"
        | "Mammal"
        | "Plant"
        | "Reptile"
        | "Slime"
        | "Undead"
        | "Vermin";
      bestiary_stage_filter: "completed" | "not_completed";
      character_vocation: "paladin" | "knight" | "sorcerer" | "monk" | "druid";
      charm_type: "major" | "minor";
      damage_element:
        | "death"
        | "earth"
        | "fire"
        | "ice"
        | "physical"
        | "life_drain"
        | "mana_drain"
        | "energy"
        | "holy";
      imbuing_price_key:
        | "gold_token"
        | "vampire_teeth"
        | "bloody_pincers"
        | "piece_of_dead_brain"
        | "rope_belt"
        | "silencer_claws"
        | "grimleech_wings"
        | "sabretooth"
        | "protective_charm"
        | "vexclaw_talon"
        | "gloom_wolf_fur"
        | "flask_of_embalming_fluid"
        | "mystical_hourglass"
        | "piece_of_swampling_wood"
        | "snake_skin"
        | "brimstone_fangs"
        | "green_dragon_leather"
        | "blazing_bone"
        | "draken_sulphur"
        | "winter_wolf_fur"
        | "thick_fur"
        | "deepling_warts"
        | "wyvern_talisman"
        | "crawler_head_plating"
        | "wyrm_scale"
        | "cultish_robe"
        | "cultish_mask"
        | "hellspawn_tail"
        | "elvish_talisman"
        | "broken_shamanic_staff"
        | "strand_of_medusa_hair"
        | "elven_scouting_glass"
        | "elven_hoof"
        | "metal_spike"
        | "tarantula_egg"
        | "mantassin_tail"
        | "gold_brocaded_cloth"
        | "lions_mane"
        | "moohtah_shell"
        | "war_crystal"
        | "cyclops_toe"
        | "ogre_nose_ring"
        | "warmasters_wristguards"
        | "orc_tooth"
        | "battle_stone"
        | "moohtant_horn"
        | "scroll_strike"
        | "scroll_vampirism"
        | "scroll_void"
        | "scroll_bash"
        | "scroll_chop"
        | "scroll_epiphany_powerful"
        | "scroll_epiphany_intricate"
        | "scroll_punch"
        | "scroll_slash"
        | "scroll_precise"
        | "scroll_cloud_fabric"
        | "scroll_demon_presence"
        | "scroll_dragon_hide"
        | "scroll_quara_scale"
        | "scroll_snake_skin"
        | "scroll_lich_shroud";
      prey_bonus_type: "exp" | "loot" | "damage" | "damage_reduction";
      user_role: "user" | "admin";
    };
    CompositeTypes: {
      monsters_with_character_progress_row: {
        id: number | null;
        name: string | null;
        exp: number | null;
        image_path: string | null;
        hp: number | null;
        elemental_resistances: Json | null;
        charm_points: number | null;
        bestiary_class: string | null;
        bestiary_difficulty: number | null;
        sort_order: number | null;
        bestiary_kills: Json | null;
        character_id: string | null;
        kills: number | null;
        stage: number | null;
        has_soul: boolean | null;
      };
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      bestiary_class: [
        "Amphibic",
        "Aquatic",
        "Bird",
        "Construct",
        "Demon",
        "Dragon",
        "Elemental",
        "Extra Dimensional",
        "Fey",
        "Giant",
        "Human",
        "Humanoid",
        "Inkborn",
        "Lycanthrope",
        "Magical",
        "Mammal",
        "Plant",
        "Reptile",
        "Slime",
        "Undead",
        "Vermin",
      ],
      bestiary_stage_filter: ["completed", "not_completed"],
      character_vocation: ["paladin", "knight", "sorcerer", "monk", "druid"],
      charm_type: ["major", "minor"],
      damage_element: [
        "death",
        "earth",
        "fire",
        "ice",
        "physical",
        "life_drain",
        "mana_drain",
        "energy",
        "holy",
      ],
      imbuing_price_key: [
        "gold_token",
        "vampire_teeth",
        "bloody_pincers",
        "piece_of_dead_brain",
        "rope_belt",
        "silencer_claws",
        "grimleech_wings",
        "sabretooth",
        "protective_charm",
        "vexclaw_talon",
        "gloom_wolf_fur",
        "flask_of_embalming_fluid",
        "mystical_hourglass",
        "piece_of_swampling_wood",
        "snake_skin",
        "brimstone_fangs",
        "green_dragon_leather",
        "blazing_bone",
        "draken_sulphur",
        "winter_wolf_fur",
        "thick_fur",
        "deepling_warts",
        "wyvern_talisman",
        "crawler_head_plating",
        "wyrm_scale",
        "cultish_robe",
        "cultish_mask",
        "hellspawn_tail",
        "elvish_talisman",
        "broken_shamanic_staff",
        "strand_of_medusa_hair",
        "elven_scouting_glass",
        "elven_hoof",
        "metal_spike",
        "tarantula_egg",
        "mantassin_tail",
        "gold_brocaded_cloth",
        "lions_mane",
        "moohtah_shell",
        "war_crystal",
        "cyclops_toe",
        "ogre_nose_ring",
        "warmasters_wristguards",
        "orc_tooth",
        "battle_stone",
        "moohtant_horn",
        "scroll_strike",
        "scroll_vampirism",
        "scroll_void",
        "scroll_bash",
        "scroll_chop",
        "scroll_epiphany_powerful",
        "scroll_epiphany_intricate",
        "scroll_punch",
        "scroll_slash",
        "scroll_precise",
        "scroll_cloud_fabric",
        "scroll_demon_presence",
        "scroll_dragon_hide",
        "scroll_quara_scale",
        "scroll_snake_skin",
        "scroll_lich_shroud",
      ],
      prey_bonus_type: ["exp", "loot", "damage", "damage_reduction"],
      user_role: ["user", "admin"],
    },
  },
} as const;
