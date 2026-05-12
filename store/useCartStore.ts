"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SubscriptionPlan, AddOn, DeliveryAddress } from "@/types";
import { PROMO_CODES } from "@/lib/constants";

interface CartStore {
  plan: SubscriptionPlan | null;
  addOns: AddOn[];
  delivery: DeliveryAddress | null;
  promoCode: string;
  promoDiscount: number;

  setPlan: (plan: SubscriptionPlan) => void;
  toggleAddOn: (addOn: AddOn) => void;
  setDelivery: (delivery: DeliveryAddress) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  clearPromoCode: () => void;
  resetCart: () => void;
}

const initialState = {
  plan: null,
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
        addOns: state.addOns,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount,
      }),
    }
  )
);
