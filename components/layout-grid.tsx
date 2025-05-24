import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="w-[80%] p-5 grid grid-cols-1 md:grid-cols-3 mx-auto gap-4">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "bg-white rounded-xl w-full")}>
          <div className="relative w-full pt-[75%] overflow-hidden">
            <Image
              src={card.thumbnail}
              alt="thumbnail"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      ))}
    </div>
  );
};