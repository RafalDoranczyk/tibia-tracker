"use server";

import { cache } from "react";

import { fetchCharacters } from "@/modules/characters";

import { fetchUser } from "../actions/fetchUser";
import { fetchUserSettings } from "../actions/fetchUserSettings";

export const loadUser = cache(async () => {
  const [user, settings, characters] = await Promise.all([
    fetchUser(),
    fetchUserSettings(),
    fetchCharacters(),
  ]);

  return {
    user,
    settings,
    characters,
  };
});
