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
        <>
            <div className="w-[90%] mx-auto space-y-8">
                <Card>
                    <CardHeader className="flex flex-col items-center">
                        <CardTitle className="text-2xl text-center">Usuarios registrados en la plataforma!</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-4">
                        <ContadorAnimado valorObjetivo={usuarios} />
                    </CardContent>
                </Card>

                <Card className="hidden lg:block">
                    <CardHeader className="flex flex-col items-center">
                        <CardTitle className="text-2xl text-center">Un agente de turismo al alcance de tu mano</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <p>Descubre todo lo que Formosa tiene para ofrecer y planifica tu viaje soñado.</p>
                        <p>Conoce los mejores lugares, actividades y servicios turísticos de la provincia.</p>
                        <p>¡Explora Formosa y vive una experiencia inolvidable!</p>
                        <div className='w-[18%] max-w-sm my-4'>
                            <img src="/images/qrapk.png" alt="" />
                        </div>
                        <p className='text-sm'>Escanea el código QR y descarga nuestra app.</p>
                    </CardContent>
                </Card>

                <Publicity />

            </div>
            <footer className="flex flex-col justify-center items-center bg-slate-900 text-white py-4">
                <img src="/images/ministerio-blanco.png" className="object-contain sm:max-w-sm md:max-w-md lg:max-w-lg" />
            </footer>
        </>
    );
};
