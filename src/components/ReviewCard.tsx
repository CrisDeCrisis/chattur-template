import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "./StarRating";

interface ReviewCardProps {
    description: string;
    rating: number;
}

export function ReviewCard({ description, rating }: ReviewCardProps) {
    return (
        <Card className="w-full max-w-md mx-auto my-4">
            <CardContent className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-2">
                    <StarRating rating={rating} />
                </div>
                <p className="text-muted-foreground text-sm italic">
                    "{description}"
                </p>
                <span className="text-xs text-gray-400 mt-2">-Anónimo</span>
            </CardContent>
        </Card>
    );
}