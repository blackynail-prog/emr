/**
 * time.ts
 * Time formatting utilities for EMR
 */

/**
 * Format ISO timestamp to HH:MM
 * @param ts ISO timestamp string (e.g., "2026-02-02T10:20:00")
 * @returns Formatted time string (e.g., "10:20")
 */
export function formatTimeHHMM(ts: string): string {
  try {
    const date = new Date(ts);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch (e) {
    return '--:--';
  }
}

/**
 * Format ISO timestamp to MM/DD HH:MM
 * @param ts ISO timestamp string
 * @returns Formatted date-time string (e.g., "02/02 10:20")
 */
export function formatDateTime(ts: string): string {
  try {
    const date = new Date(ts);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  } catch (e) {
    return '--/-- --:--';
  }
}
