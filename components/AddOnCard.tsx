"use client";

import { useCartStore } from "@/store/useCartStore";
import type { AddOn } from "@/types";

interface Props {
  addOn: AddOn;
}

export default function AddOnCard({ addOn }: Props) {
  const { addOns, toggleAddOn } = useCartStore();
  const isSelected = addOns.some((a) => a.id === addOn.id);

  return (
    <div
      className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-200 cursor-pointer group ${
        isSelected
          ? "border-sage-500 shadow-card ring-2 ring-sage-300"
          : "border-sage-100 hover:border-sage-300 shadow-soft hover:shadow-card"
      }`}
      onClick={() => toggleAddOn(addOn)}
    >
      {/* Badge */}
      {addOn.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-coral-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {addOn.badge}
          </span>
        </div>
      )}

      {/* Selected check */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 w-6 h-6 bg-sage-500 rounded-full flex items-center justify-center shadow-soft">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-cream-50 to-sage-50 flex flex-col items-center justify-center border-b border-sage-100 group-hover:from-cream-100 group-hover:to-sage-100 transition-colors">
        <svg
          className="w-10 h-10 text-sage-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-xs text-sage-400 mt-2">Product image</p>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-semibold text-sage-900 text-sm">{addOn.name}</h4>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed flex-1">{addOn.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-sage-900">+${addOn.price}</span>
          <span className="text-xs text-sage-600 font-medium">
            {isSelected ? "Added ✓" : "Add"}
          </span>
        </div>
      </div>
    </div>
  );
}
