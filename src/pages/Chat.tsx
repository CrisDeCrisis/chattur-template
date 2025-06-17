import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Avatar } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";
import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { mockMessages } from "@/constants/mockmessages";

export default function Chat() {
    const scrollRef = useRef<HTMLDivElement>(null);
    // Simulación de respuesta de IA generándose
    const [aiResponse, setAiResponse] = useState<string>("");
    const [isAITyping, setIsAITyping] = useState(false);

    // Simular IA "escribiendo" la última respuesta
    useEffect(() => {
        const lastMsg = mockMessages[mockMessages.length - 1];
        if (lastMsg.sender === "ai") {
            setIsAITyping(true);
            let i = 0;
            const interval = setInterval(() => {
                setAiResponse(lastMsg.text.slice(0, i));
                i++;
                if (i > lastMsg.text.length) {
                    setIsAITyping(false);
                    clearInterval(interval);
                }
            }, 20);
            return () => clearInterval(interval);
        } else {
            setAiResponse("");
            setIsAITyping(false);
        }
    }, []);

    // Scroll automático al último mensaje
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [aiResponse, isAITyping]);

    // Mensajes previos (sin la última respuesta de IA)
    const previousMessages = mockMessages.filter((msg, idx) =>
        !(idx === mockMessages.length - 1 && msg.sender === "ai")
    );

    return (
        <div className="flex flex-col h-[100dvh] bg-muted">
            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
                <ScrollArea className="flex-1 px-2 py-4 overflow-y-auto">
                    <div
                        className="flex flex-col gap-4 justify-end min-h-full"
                        ref={scrollRef}
                        style={{ height: "100%" }}
                    >
                        {/* Mensajes previos */}
                        {previousMessages.map((msg) =>
                            msg.sender === "user" ? (
                                <div key={msg.id} className="flex justify-end">
                                    <Card className="px-4 py-2 rounded-lg max-w-[80%] bg-primary text-primary-foreground rounded-br-none shadow-md">
                                        {msg.text}
                                    </Card>
                                    <Avatar className="ml-2" />
                                </div>
                            ) : (
                                <div key={msg.id} className="flex items-start gap-2">
                                    <Avatar className="mr-2" />
                                    <Card className="px-4 py-2 rounded-lg max-w-[80%] bg-background rounded-bl-none shadow-md">
                                        {msg.text}
                                    </Card>
                                </div>
                            )
                        )}
                        {/* Respuesta de IA en markdown */}
                        {mockMessages[mockMessages.length - 1].sender === "ai" && (
                            <div className="flex items-start gap-2">
                                <Avatar className="mr-2" />
                                <div className="prose bg-background p-4 rounded-lg max-w-[80%] w-full border shadow-md">
                                    <ReactMarkdown>
                                        {aiResponse || "La IA está escribiendo..."}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
            <form className="w-full max-w-2xl mx-auto px-2 pb-4 flex gap-2 sticky bottom-0 bg-muted/80 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
                <Input placeholder="Escribe tu mensaje..." className="flex-1" />
                <Button>Enviar</Button>
            </form>
        </div>
    );
}
