import servicesData from "@/data/services.json";
import type { Service } from "@/types";
import { read } from "./_client";

const services = servicesData as Service[];

/** All services, ordered by their `order` field. */
export async function getServices(): Promise<Service[]> {
  const all = await read(services);
  return all.sort((a, b) => a.order - b.order);
}

/** Featured services for the home grid. */
export async function getFeaturedServices(): Promise<Service[]> {
  const all = await getServices();
  return all.filter((s) => s.featured);
}

/** A single service by slug, or null if not found. */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}
