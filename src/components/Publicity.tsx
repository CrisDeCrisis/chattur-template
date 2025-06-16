import { cartas } from "@/constants/marketing";
import { Card, CardContent, CardTitle } from "./ui/card";

export default function Publicity() {
    return (
        <>
            {cartas.map((carta, idx) => {
                const impar = idx % 2 === 1;
                return (
                    <Card
                        key={idx}
                        className={"flex flex-col lg:flex-row items-center overflow-hidden mb-6"}
                    >
                        <div className={
                            `flex-shrink-0 w-full lg:basis-1/3 flex items-center justify-center mb-2 lg:mb-0 lg:mx-5 ` +
                            (impar
                                ? "order-2 lg:order-1"
                                : "order-1 lg:order-2")
                        }
                        >
                            {carta.tipo === "imagen" ? (
                                <img
                                    src={carta.src}
                                    alt=""
                                    className="object-contain max-h-60 lg:max-h-72 lg:max-w-full"
                                />
                            ) : (
                                <video
                                    src={carta.src}
                                    controls
                                    className="object-contain max-h-60 lg:max-h-72 lg:max-w-full"
                                />
                            )}
                        </div>
                        <div className={
                            `flex flex-col w-full lg:basis-2/3 flex-1 lg:mx-2 ` +
                            (impar
                                ? "order-1 lg:order-2"
                                : "order-2 lg:order-1")
                        }
                        >
                            <CardTitle className="text-center text-base xl:text-lg">
                                {carta.titulo}
                            </CardTitle>
                            <CardContent className="flex-1 p-4 lg:p-6">
                                <p className="text-center text-sm xl:text-base">{carta.texto}</p>
                            </CardContent>
                        </div>
                    </Card>
                );
            })}
        </>
    );
}
