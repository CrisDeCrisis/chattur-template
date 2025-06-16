import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number; // de 1 a 5, puede ser decimal (ej: 3.5)
}

export function StarRating({ rating }: StarRatingProps) {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => {
                const fill =
                    rating >= star
                        ? "100%"
                        : rating >= star - 0.5
                            ? "50%"
                            : "0%";
                return (
                    <span key={star} className="relative w-5 h-5">
                        <Star
                            className="absolute top-0 left-0"
                            size={20}
                            strokeWidth={1.5}
                            color="#fbbf24"
                            fill="none"
                        />
                        <Star
                            className="absolute top-0 left-0"
                            size={20}
                            strokeWidth={0}
                            color="#fbbf24"
                            style={{
                                clipPath: `inset(0 ${100 - parseFloat(fill)}% 0 0)`,
                                fill: "#fbbf24",
                                opacity: fill === "0%" ? 0 : 1,
                            }}
                        />
                    </span>
                );
            })}
        </div>
    );
}