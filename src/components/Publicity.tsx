import { cartas } from "@/constants/marketing";
import { Card, CardContent, CardTitle } from "./ui/card";

export default function Publicity() {
    return (
        <>
            {cartas.map((carta, idx) => {
                const impar = idx % 2 === 1;
                return (
                    <Card key={idx} className="flex flex-row items-center overflow-hidden">
                        {impar ? (
                            <>
                                <div className="flex-shrink-0 basis-1/3 bg-muted flex items-center justify-center mx-5">
                                    {carta.tipo === 'imagen' ? (
                                        <img src={carta.src} alt="" className="object-contain max-h-full max-w-full" />
                                    ) : (
                                        <video src={carta.src} controls className="object-contain max-h-full max-w-full" />
                                    )}
                                </div>
                                <div className="flex flex-col basis-2/3 flex-1  mx-5">
                                    <CardTitle className="text-center">{carta.titulo}</CardTitle>
                                    <CardContent className="flex-1 p-6">
                                        <p className="text-center">{carta.texto}</p>
                                    </CardContent>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col basis-2/3 flex-1 mx-5">
                                    <CardTitle className="text-center">{carta.titulo}</CardTitle>
                                    <CardContent className="flex-1 p-6">
                                        <p className="text-center">{carta.texto}</p>
                                    </CardContent>
                                </div>
                                <div className="flex-shrink-0 basis-1/3 bg-muted flex items-center justify-center mx-5">
                                    {carta.tipo === 'imagen' ? (
                                        <img src={carta.src} alt="" className="object-contain max-h-full max-w-full" />
                                    ) : (
                                        <video src={carta.src} controls className="object-contain max-h-full max-w-full" />
                                    )}
                                </div>
                            </>
                        )}
                    </Card>
                );
            })}
        </>
    )
}
