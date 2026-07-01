console.clear();
console.log("LEX AI ONLINE");

// ======================================
// CONFIGURAÇÕES
// ======================================

let OPENAI_KEY = "";
let SPEECH_KEY = "";
let SPEECH_REGION = "";

let configuracoesCarregadas = false;

// ======================================
// CARREGAR KEYS.JSON
// ======================================

async function carregarConfiguracoes() {

    try {

        console.log("Carregando configurações...");

        const response = await fetch("./keys.json");

        if (!response.ok) {
            throw new Error(
                "Não foi possível localizar keys.json"
            );
        }

        const config = await response.json();

        OPENAI_KEY = config.AZURE_OPENAI_KEY;
        SPEECH_KEY = config.AZURE_SPEECH_KEY;
        SPEECH_REGION = config.AZURE_SPEECH_REGION;

        configuracoesCarregadas = true;

        console.log("CONFIGURAÇÕES CARREGADAS");
        console.log("OPENAI KEY:", OPENAI_KEY ? "OK" : "VAZIA");
        console.log("SPEECH KEY:", SPEECH_KEY ? "OK" : "VAZIA");
        console.log("REGION:", SPEECH_REGION);

    }
    catch (erro) {

        console.error(
            "Erro ao carregar keys.json",
            erro
        );

        alert(
            "Erro ao carregar keys.json"
        );
    }
}

carregarConfiguracoes();


// ======================================
// ELEMENTOS
// ======================================

const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const input = document.getElementById("message");
const chat = document.getElementById("chatContainer");
const apiStatus = document.getElementById("apiStatus");


// ======================================
// EVENTOS
// ======================================

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


// ======================================
// ENVIAR PERGUNTA
// ======================================

async function enviarPergunta() {

    const pergunta = input.value.trim();

    if (!pergunta) return;

    adicionarMensagem(
        "Você",
        pergunta,
        "user-message"
    );

    input.value = "";

    apiStatus.innerHTML = "PROCESSANDO";

    try {

        const response = await fetch(
            " ",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization":
                        `Bearer ${OPENAI_KEY}`
                },

                body: JSON.stringify({

                    model: "o4-mini",

                    messages: [
                        {
                            role: "user",
                            content: pergunta
                        }
                    ],

                    max_completion_tokens: 4000,
                    reasoning_effort: "low"
                })
            }
        );

        const data = await response.json();

        console.log(data);

        let resposta = "";

        if (
            data.choices &&
            data.choices.length > 0
        ) {
            resposta =
                data.choices[0]
                    .message.content;
        }
        else {

            resposta =
                "Não foi possível obter resposta da IA.";

        }

        adicionarMensagem(
            "LEX AI",
            resposta,
            "bot-message"
        );

        falarResposta(resposta);

    }
    catch (erro) {

        console.error(
            "Erro OpenAI:",
            erro
        );

        adicionarMensagem(
            "LEX AI",
            "Erro ao conectar com Azure OpenAI.",
            "bot-message"
        );

    }

    apiStatus.innerHTML = "ONLINE";
}


// ======================================
// ADICIONAR MENSAGENS
// ======================================

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


// ======================================
// MICROFONE
// ======================================

async function iniciarReconhecimento() {

    if (!configuracoesCarregadas) {

        alert(
            "Configurações ainda não carregadas."
        );

        return;
    }

    if (!SPEECH_KEY) {

        alert(
            "Speech Key não encontrada."
        );

        return;
    }

    if (!SPEECH_REGION) {

        alert(
            "Speech Region não encontrada."
        );

        return;
    }

    console.log(
        "Iniciando reconhecimento..."
    );

    micBtn.innerHTML = "🎙️";

    try {

        const speechConfig =
            SpeechSDK.SpeechConfig
                .fromSubscription(
                    SPEECH_KEY,
                    SPEECH_REGION
                );

        speechConfig
            .speechRecognitionLanguage =
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

                console.log(result);

                if (
                    result.reason ===
                    SpeechSDK.ResultReason
                        .RecognizedSpeech
                ) {

                    input.value =
                        result.text;

                    enviarPergunta();
                }

                else {

                    alert(
                        "Não foi possível reconhecer a fala."
                    );

                }

                recognizer.close();
            },

            function (erro) {

                micBtn.innerHTML = "🎤";

                console.error(
                    erro
                );

                alert(
                    "Erro no reconhecimento de voz."
                );

                recognizer.close();
            }
        );
    }
    catch (erro) {

        micBtn.innerHTML = "🎤";

        console.error(
            "Erro Speech:",
            erro
        );

        alert(
            "Erro ao iniciar Speech Service."
        );
    }
}


// ======================================
// FALAR RESPOSTA
// ======================================

function falarResposta(texto) {

    if (!SPEECH_KEY) return;

    try {

        const speechConfig =
            SpeechSDK.SpeechConfig
                .fromSubscription(
                    SPEECH_KEY,
                    SPEECH_REGION
                );

        speechConfig
            .speechSynthesisVoiceName =
            "pt-BR-AntonioNeural";

        const synthesizer =
            new SpeechSDK
                .SpeechSynthesizer(
                    speechConfig
                );

        synthesizer.speakTextAsync(

            texto,

            function () {

                console.log(
                    "Resposta falada."
                );

                synthesizer.close();
            },

            function (erro) {

                console.error(
                    erro
                );

                synthesizer.close();
            }
        );
    }
    catch (erro) {

        console.error(
            erro
        );
    }
}