"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import type { PortfolioItem } from "@/lib/repositories/dataRepository";

const DATA_PATH = path.join(process.cwd(), "lib/data/portfolioData.json");

function readData(): PortfolioItem[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as PortfolioItem[];
}

function writeData(data: PortfolioItem[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function deletePortfolioItem(slug: string) {
  const items = readData();
  const updated = items.filter((p) => p.slug !== slug);
  writeData(updated);
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updatePortfolioItem(slug: string, data: Partial<PortfolioItem>) {
  const items = readData();
  const idx = items.findIndex((p) => p.slug === slug);
  if (idx === -1) return { success: false, error: "Item not found" };
  items[idx] = { ...items[idx], ...data };
  writeData(items);
  revalidatePath("/", "layout");
  return { success: true };
}

export async function addPortfolioItem(data: PortfolioItem) {
  const items = readData();
  if (items.find((p) => p.slug === data.slug)) {
    return { success: false, error: "Slug sudah digunakan" };
  }
  items.push(data);
  writeData(items);
  revalidatePath("/", "layout");
  return { success: true };
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  return readData();
}
