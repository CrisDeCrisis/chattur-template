import { useEffect, useRef, useState, type FC } from "react";
import { USUARIOS_INICIALES } from "@/constants/marketing";
import { Badge } from "./ui/badge";

interface ContadorAnimadoProps {
    valorObjetivo: number;
    titulo?: string;
}

export const ContadorAnimado: FC<ContadorAnimadoProps> = ({
    valorObjetivo,
}) => {
    const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES);
    const intervaloRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (intervaloRef.current) clearInterval(intervaloRef.current);

        intervaloRef.current = setInterval(() => {
            setUsuarios((prev) => {
                if (prev < valorObjetivo) return prev + 1;
                if (prev > valorObjetivo) return prev - 1;
                if (intervaloRef.current) clearInterval(intervaloRef.current);
                return prev;
            });
        }, 200);

        return () => {
            if (intervaloRef.current) clearInterval(intervaloRef.current);
        };
    }, [valorObjetivo]);

    return (
        <Badge className="text-lg px-4 py-2 bg-primary text-primary-foreground">
            {usuarios}
        </Badge>
    );
};