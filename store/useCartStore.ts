"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SubscriptionPlan, AddOn, DeliveryAddress, PlanFrequency } from "@/types";
import { PROMO_CODES } from "@/lib/constants";

interface CartStore {
  plan: SubscriptionPlan | null;
  frequency: PlanFrequency;
  addOns: AddOn[];
  delivery: DeliveryAddress | null;
  promoCode: string;
  promoDiscount: number;

  setPlan: (plan: SubscriptionPlan) => void;
  setFrequency: (frequency: PlanFrequency) => void;
  toggleAddOn: (addOn: AddOn) => void;
  setDelivery: (delivery: DeliveryAddress) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  clearPromoCode: () => void;
  resetCart: () => void;
}

const initialState = {
  plan: null,
  frequency: "annual" as PlanFrequency,
  addOns: [] as AddOn[],
  delivery: null,
  promoCode: "",
  promoDiscount: 0,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPlan: (plan) => set({ plan }),

      setFrequency: (frequency) => set({ frequency }),

      toggleAddOn: (addOn) => {
        const { addOns } = get();
        const exists = addOns.some((a) => a.id === addOn.id);
        set({
          addOns: exists ? addOns.filter((a) => a.id !== addOn.id) : [...addOns, addOn],
        });
      },

      setDelivery: (delivery) => set({ delivery }),

      applyPromoCode: (code) => {
        const upper = code.trim().toUpperCase();
        const discount = PROMO_CODES[upper];
        if (discount !== undefined) {
          set({ promoCode: upper, promoDiscount: discount });
          return { success: true, message: `${Math.round(discount * 100)}% discount applied!` };
        }
        return { success: false, message: "Invalid promo code." };
      },

      clearPromoCode: () => set({ promoCode: "", promoDiscount: 0 }),

      resetCart: () => set(initialState),
    }),
    {
      name: "bloom-give-cart",
      partialize: (state) => ({
        plan: state.plan,
        frequency: state.frequency,
        addOns: state.addOns,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount,
      }),
    }
  )
);
