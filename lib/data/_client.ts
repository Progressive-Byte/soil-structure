/**
 * Data-access boundary.
 * ---------------------
 * Every function in /lib/data/* returns a Promise and reads from local JSON
 * fixtures in /data. This is the ONLY layer that knows where data comes from.
 *
 * When the Node.js + MongoDB API is ready, replace the body of `read()` with a
 * `fetch()` against `API_BASE` (or a direct DB call in a server context). No
 * component or page needs to change, because they all consume Promises of the
 * shapes defined in /types.
 *
 * Example future implementation:
 *
 *   export async function read<T>(resource: string): Promise<T> {
 *     const res = await fetch(`${API_BASE}/${resource}`, { next: { revalidate: 60 } });
 *     if (!res.ok) throw new Error(`Failed to load ${resource}`);
 *     return res.json() as Promise<T>;
 *   }
 */

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Wrap a synchronously-imported fixture in a resolved Promise so call sites are
 * already written against the async contract the real API will use. We return a
 * structured clone so callers can never mutate the shared fixture in memory.
 */
export async function read<T>(data: T): Promise<T> {
  return structuredClone(data);
}
