"use client";

import { 
  companyData, 
  heroData, 
  aboutData, 
  testimonialsData, 
  leadFormData,
  certsData,
  clientsData,
  productsData,
  statsData
} from "@/lib/repositories/dataRepository";

/**
 * Hook to access application data from the repository layer.
 * This simplifies data access in the UI layer.
 */
export function useAppData() {
  return {
    company: companyData,
    hero: heroData,
    about: aboutData,
    testimonials: testimonialsData,
    leadForm: leadFormData,
    certs: certsData,
    clients: clientsData,
    products: productsData,
    stats: statsData,
  };
}
