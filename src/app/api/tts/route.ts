import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { NextRequest } from "next/server";
import { PassThrough } from "stream";

export const GET = async (req: NextRequest) => {
    if (!process.env.SPEECH_KEY || !process.env.SPEECH_REGION) return;

    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);

    const teacher = req.nextUrl.searchParams.get("teacher") || "Nanami";
    speechConfig.speechSynthesisVoiceName = `ja-JP-${teacher}Neural`;

    const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

    const visemes: Array<[number, number]> = []; // Definir el tipo de visemes explícitamente

    speechSynthesizer.visemeReceived = function(s,e) {
        //console.log("(viseme), AUDIO Offset: " + e.audioOffset / 10000+" ms. Viseme ID: "+e.visemeId)

        visemes.push([e.audioOffset / 10000,e.visemeId])
    }

    const audioStream = await new Promise<ReadableStream>((resolve, reject) => {
        speechSynthesizer.speakTextAsync(req.nextUrl.searchParams.get("text") || "I'm excited to try text to speech",
            (result) => {
                const { audioData } = result;
                speechSynthesizer.close();
                // Convertir el array buffer a un stream
                const bufferStream = new PassThrough();
                bufferStream.end(Buffer.from(audioData));
                // Convertir el PassThrough a ReadableStream
                const readableStream = new ReadableStream({
                    start(controller) {
                        bufferStream.on('data', (chunk) => {
                            controller.enqueue(chunk);
                        });
                        bufferStream.on('end', () => {
                            controller.close();
                        });
                        bufferStream.on('error', (error) => {
                            controller.error(error);
                        });
                    }
                });
                resolve(readableStream);
            },
            (error) => {
                console.log(error);
                speechSynthesizer.close();
                reject(error);
            }
        );
    });

    if (!audioStream) return;

    const response = new Response(audioStream, {
        headers: {
            "Content-Type": "audio/mpeg",
            "Content-Disposition": `inline; filename=tts.mp3`,
            Visemes: JSON.stringify(visemes)
        },
    });

    return response;
};
