import { useEffect, useState } from 'react';
import { USUARIOS_INICIALES } from '@/constants/marketing';
import Publicity from '@/components/Publicity';
import { ContadorAnimado } from '@/components/UsersCount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Marketing() {
    const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setUsuarios((prev) => prev + Math.floor(Math.random() * 10 + 1));
        }, 10000);
        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="w-[90%] mx-auto space-y-8">
            <Card>
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-2xl text-center">Usuarios registrados en la plataforma!</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                    <ContadorAnimado valorObjetivo={usuarios} />
                </CardContent>
            </Card>

            {/* Publicidad */}
            <div className="space-y-6">
                <Publicity />
            </div>
        </div>
    );
};
