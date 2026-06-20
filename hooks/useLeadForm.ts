"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { leadService, LeadFormData } from "@/lib/services/leadService";

const formSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  perusahaan: z.string().optional(),
  whatsapp: z
    .string()
    .min(9, "Nomor WhatsApp tidak valid")
    .regex(/^[0-9+\s-]+$/, "Nomor hanya angka"),
  kebutuhan: z.string().min(1, "Pilih jenis kebutuhan"),
  pesan: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof formSchema>;

export function useLeadForm(source: "hero" | "footer" | "bottom" | "blog_sidebar" | "portfolio_sidebar" | "portfolio_bottom") {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      perusahaan: "",
      whatsapp: "",
      kebutuhan: "",
      pesan: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    try {
      await leadService.submitLead(data as LeadFormData, source);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit lead:", error);
    }
  };

  return {
    ...form,
    submitted,
    onSubmit: form.handleSubmit(onSubmit),
    submitDirectly: onSubmit,
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
}
