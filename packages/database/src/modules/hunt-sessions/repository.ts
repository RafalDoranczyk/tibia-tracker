import type { TypedSupabaseClient } from "../../types";
import type { CharacterID } from "../characters";
import type {
  CreateHuntSessionPayload,
  FetchHuntSessionListPayload,
  HuntSession,
  UpdateHuntSessionPayload,
} from "./schemas/hunt-session.schema";

// --- Constants (Queries) ---
const SESSION_DETAIL_SELECT = `
  id,
  updated_at,
  character_id,
  place_id,
  date,
  started_at,
  ended_at,
  duration_seconds,
  level,
  player_count,
  created_at,
  profit,
  loot_value,
  supplies_cost,
  xp_gain,
  raw_xp_gain,
  damage,
  healing,
  xp_per_hour,
  raw_xp_per_hour,
  profit_per_hour,
  damage_per_hour,
  healing_per_hour,

  place:hunt_places!inner(id, name, image_path),

  supplies:hunt_session_supplies(
    count,
    item:items(id, name, image_path)
  ),

  killed_monsters:hunt_session_killed_monsters(
    id,
    count,
    monster:monsters(id, name, image_path),
    charm_bonus:hunt_session_charm_bonuses(
      charm:charms(id, name, image_path, type)
    ),
    prey_bonus:hunt_session_prey_bonuses(
      prey:prey_bonuses(id, description, bonus_value, bonus_type)
    )
  ),

  looted_items:hunt_session_looted_items(
    count,
    item:items(id, name, image_path)
  ),

  damage_elements:hunt_session_damage_elements(
    percent,
    damage_element:damage_elements(id, name, image_path, slug)
  ),

  monster_damage_sources:hunt_session_monster_damage_sources(
    percent,
    damage_source:monsters(id, name, image_path)
  )
` as const;

const SESSION_LIST_SELECT =
  `id, date, duration_seconds, level, created_at, raw_xp_per_hour, profit_per_hour, place:hunt_places!inner(id, name, image_path)` as const;

// --- Repository Implementation ---
export const HuntSessionsRepo = {
  getList: (supabase: TypedSupabaseClient, payload: FetchHuntSessionListPayload) => {
    const sortCol = payload.sortBy || "created_at";
    const sortDir = payload.sortDirection || "desc";

    let query = supabase
      .from("hunt_sessions")
      .select(SESSION_LIST_SELECT, { count: "exact" })
      .eq("character_id", payload.character_id)
      .order(sortCol, { ascending: sortDir !== "desc" });

    if (typeof payload.limit === "number") {
      const page = Math.max(payload.page ?? 1, 1);
      const from = (page - 1) * payload.limit;
      const to = from + payload.limit - 1;
      query = query.range(from, to);
    }
    return query;
  },

  getById: (supabase: TypedSupabaseClient, { id, characterId }: GetByIdPayload) => {
    return supabase
      .from("hunt_sessions")
      .select(SESSION_DETAIL_SELECT)
      .eq("id", id)
      .eq("character_id", characterId)
      .maybeSingle();
  },

  delete: (supabase: TypedSupabaseClient, id: HuntSession["id"]) => {
    return supabase.from("hunt_sessions").delete().eq("id", id);
  },

  create: (supabase: TypedSupabaseClient, payload: CreateHuntSessionPayload) => {
    return supabase.rpc("create_hunt_session", { p_payload: payload });
  },

  update: (supabase: TypedSupabaseClient, payload: UpdateHuntSessionPayload) => {
    return supabase.rpc("update_hunt_session", { p_payload: payload });
  },
};

// --- Payloads ---

type GetByIdPayload = { id: HuntSession["id"]; characterId: CharacterID };
