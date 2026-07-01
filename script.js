console.clear();
console.log("LEX AI ONLINE");

let OPENAI_ENDPOINT = "";
let OPENAI_KEY = "";
let OPENAI_MODEL = "";

let SPEECH_KEY = "";
let SPEECH_REGION = "";
let SPEECH_VOICE = "";

let configuracoesCarregadas = false;

async function carregarConfiguracoes() {

    try {

        console.log("Carregando configurações...");

        const response = await fetch("./keys.json");

        const config = await response.json();

        OPENAI_ENDPOINT = config.AZURE_OPENAI_ENDPOINT;
        OPENAI_KEY = config.AZURE_OPENAI_KEY;
        OPENAI_MODEL = config.AZURE_OPENAI_MODEL;

        SPEECH_KEY = config.AZURE_SPEECH_KEY;
        SPEECH_REGION = config.AZURE_SPEECH_REGION;
        SPEECH_VOICE = config.AZURE_SPEECH_VOICE;

        configuracoesCarregadas = true;

        console.log("CONFIGURAÇÕES CARREGADAS");
        console.log("OPENAI:", OPENAI_KEY ? "OK" : "VAZIA");
        console.log("MODEL:", OPENAI_MODEL);
        console.log("SPEECH:", SPEECH_KEY ? "OK" : "VAZIA");
        console.log("REGION:", SPEECH_REGION);
        console.log("VOICE:", SPEECH_VOICE);

    }
    catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar keys.json"
        );
    }
}

carregarConfiguracoes();

const sendBtn =
    document.getElementById("sendBtn");

const micBtn =
    document.getElementById("micBtn");

const input =
    document.getElementById("message");

const chat =
    document.getElementById("chatContainer");

const apiStatus =
    document.getElementById("apiStatus");

if (sendBtn) {
    sendBtn.addEventListener(
        "click",
        enviarPergunta
    );
}

if (micBtn) {
    micBtn.addEventListener(
        "click",
        iniciarReconhecimento
    );
}

if (input) {

    input.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {
                enviarPergunta();
            }

        }
    );

}

async function enviarPergunta() {

    const pergunta =
        input.value.trim();

    if (!pergunta) return;

    adicionarMensagem(
        "Você",
        pergunta,
        "user-message"
    );

    input.value = "";

    apiStatus.innerHTML =
        "PROCESSANDO";

    try {

        const response =
            await fetch(
                OPENAI_ENDPOINT,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${OPENAI_KEY}`
                    },

                    body: JSON.stringify({

                        model:
                            OPENAI_MODEL,

                        messages: [
                            {
                                role: "user",
                                content: pergunta
                            }
                        ],

                        max_completion_tokens: 4000
                    })
                }
            );

        const data =
            await response.json();

        console.log(data);

        let resposta =
            "Não foi possível obter resposta.";

        if (
            data.choices &&
            data.choices.length > 0
        ) {

            resposta =
                data.choices[0]
                    .message.content;

        }

        adicionarMensagem(
            "LEX AI",
            resposta,
            "bot-message"
        );

        falarResposta(resposta);

    }
    catch (erro) {

        console.error(erro);

        adicionarMensagem(
            "LEX AI",
            "Erro ao conectar com Azure OpenAI.",
            "bot-message"
        );

    }

    apiStatus.innerHTML =
        "ONLINE";
}

function adicionarMensagem(
    autor,
    texto,
    classe
) {

    chat.innerHTML += `
        <div class="message ${classe}">
            <strong>${autor}</strong>
            <p>${texto}</p>
        </div>
    `;

    chat.scrollTop =
        chat.scrollHeight;
}

function iniciarReconhecimento() {

    if (!configuracoesCarregadas) {

        alert(
            "Configurações ainda não carregadas."
        );

        return;
    }

    micBtn.innerHTML = "🎙️";

    const speechConfig =
        SpeechSDK.SpeechConfig.fromSubscription(
            SPEECH_KEY,
            SPEECH_REGION
        );

    speechConfig.speechRecognitionLanguage =
        "pt-BR";

    const audioConfig =
        SpeechSDK.AudioConfig
            .fromDefaultMicrophoneInput();

    const recognizer =
        new SpeechSDK.SpeechRecognizer(
            speechConfig,
            audioConfig
        );

    recognizer.recognizeOnceAsync(

        function (result) {

            micBtn.innerHTML = "🎤";

            if (
                result.reason ===
                SpeechSDK.ResultReason
                    .RecognizedSpeech
            ) {

                input.value =
                    result.text;

                enviarPergunta();
            }

            recognizer.close();
        },

        function (erro) {

            micBtn.innerHTML = "🎤";

            console.error(erro);

            recognizer.close();
        }
    );
}

function falarResposta(texto) {

    const speechConfig =
        SpeechSDK.SpeechConfig.fromSubscription(
            SPEECH_KEY,
            SPEECH_REGION
        );

    speechConfig.speechSynthesisVoiceName =
        SPEECH_VOICE;

    const synthesizer =
        new SpeechSDK.SpeechSynthesizer(
            speechConfig
        );

    synthesizer.speakTextAsync(
        texto,
        function () {
            synthesizer.close();
        },
        function (erro) {
            console.error(erro);
            synthesizer.close();
        }
    );
}