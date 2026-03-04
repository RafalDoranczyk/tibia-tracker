/**
 * Checks if we should attempt to fetch new data based on Tibia's daily cycle.
 * Statistics are usually processed and available on external sites after 11:00 AM CET.
 */
export function isCharacterSyncAllowed(lastEntryDate: Date | null): boolean {
  const now = new Date();

  // Create a reference for today at 11:00 AM for the server save check
  const serverSaveReady = new Date();
  serverSaveReady.setHours(11, 0, 0, 0);

  // Get "yesterday" but reset time to 00:00:00 to compare only the date part
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  if (!lastEntryDate) return true;

  // Reset time for the last entry date as well for a fair comparison
  const lastDateOnly = new Date(lastEntryDate);
  lastDateOnly.setHours(0, 0, 0, 0);

  /**
   * Check 1: Do we already have data for yesterday (or today)?
   * If lastDateOnly is 2026-03-03 and yesterday is 2026-03-03,
   * this will now correctly return true.
   */
  if (lastDateOnly >= yesterday) {
    return false;
  }

  /**
   * Check 2: If we don't have yesterday's data yet,
   * check if it's already past 11:00 AM today.
   */
  if (now < serverSaveReady) {
    return false;
  }

  return true;
}
