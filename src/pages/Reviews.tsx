import { ReviewCard } from "@/components/ReviewCard";
import { reviews } from "@/constants/reviews";

export default function Reviews() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-6">Reseñas de Usuarios</h1>
            {reviews.map((review, idx) => (
                <ReviewCard
                    key={idx}
                    description={review.description}
                    rating={review.rating}
                />
            ))}
        </div>
    )
}
