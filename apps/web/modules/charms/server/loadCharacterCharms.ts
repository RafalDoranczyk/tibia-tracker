"use server";

import { fetchCharacterBestiarySummary } from "@/modules/bestiary";

import { fetchCharacterCharmEconomy } from "../actions/fetchCharacterCharmEconomy";
import { getCharmsWithProgress } from "./queries/getCharmsWithProgress";

export async function loadCharmsPage(characterId: string) {
  const [charms, { data: bestiarySummary }, charmEconomy] = await Promise.all([
    getCharmsWithProgress(characterId),
    fetchCharacterBestiarySummary(characterId),
    fetchCharacterCharmEconomy(characterId),
  ]);

  const { unlocked_charm_points, total_charm_points } = bestiarySummary;

  const progress = total_charm_points > 0 ? (unlocked_charm_points / total_charm_points) * 100 : 0;

  return {
    charms,
    charmEconomy,
    progress,
    totalCharmPoints: total_charm_points,
  };
}
