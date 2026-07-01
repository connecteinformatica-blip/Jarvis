# 🤖 LEX AI SYSTEM

Um assistente virtual inspirado no JARVIS do Iron Man, desenvolvido em HTML, CSS e JavaScript, integrado aos serviços Azure OpenAI e Azure Speech Services.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-cyan)
![Azure](https://img.shields.io/badge/Azure-OpenAI-blue)
![Speech](https://img.shields.io/badge/Azure-Speech%20Services-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

# 📌 Sobre o projeto

O **LEX AI SYSTEM** foi desenvolvido com o objetivo de estudar e integrar tecnologias modernas de Inteligência Artificial utilizando a plataforma Microsoft Azure.

O projeto busca reproduzir a experiência de interação de um assistente semelhante ao **JARVIS**, permitindo:

- Conversação por texto;
- Conversação por voz;
- Respostas geradas por modelos de linguagem da Azure OpenAI;
- Respostas faladas utilizando vozes neurais do Azure Speech;
- Interface futurista inspirada em HUDs holográficos.

---

# 🚀 Funcionalidades

## ✅ Interface futurista

- Design inspirado no JARVIS;
- HUD central animado;
- Painéis laterais de status;
- Layout responsivo.

---

## ✅ Chat com IA

Integração com:

- Azure OpenAI
- Modelo `o4-mini`

Exemplo:

```text
Usuário:
Qual a diferença entre Random Forest e XGBoost?

LEX AI:
Random Forest utiliza múltiplas árvores independentes...
```

---

## ✅ Speech To Text

Permite ao usuário falar diretamente com o sistema utilizando:

- Microfone do navegador;
- Azure Speech Services.

Fluxo:

```text
Usuário fala
↓
Azure Speech
↓
Texto
↓
Azure OpenAI
```

---

## ✅ Text To Speech

Após gerar a resposta, o sistema converte automaticamente o texto em áudio utilizando:

```text
pt-BR-AntonioNeural
```

Fluxo:

```text
Resposta da IA
↓
Azure Speech Synthesis
↓
Áudio reproduzido no navegador
```

---

# 🛠 Tecnologias utilizadas

## Frontend

- HTML5
- CSS3
- JavaScript

## Inteligência Artificial

- Azure OpenAI
- GPT o4-mini

## Voz

- Azure Speech Services
- Speech-to-Text
- Text-to-Speech

---

# 📂 Estrutura do projeto

```text
LEX_AI/
│
├── index.html
├── style.css
├── script.js
├── keys.json
├── .gitignore
└── README.md
```

---

# 🔐 Configuração das chaves

Crie um arquivo chamado:

```text
keys.json
```

Conteúdo:

```json
{
    "AZURE_OPENAI_KEY": "SUA_CHAVE_OPENAI",
    "AZURE_SPEECH_KEY": "SUA_CHAVE_SPEECH",
    "AZURE_SPEECH_REGION": "eastus"
}
```

---

## Importante

Adicione ao `.gitignore`:

```text
keys.json
```

Dessa forma as credenciais não serão enviadas ao GitHub.

---

# ⚙️ Configuração Azure OpenAI

Exemplo de endpoint:

```text
https://SEU_RECURSO.openai.azure.com/openai/v1/chat/completions
```

Modelo utilizado:

```text
o4-mini
```

---

# 🎤 Configuração Azure Speech

Exemplo:

```text
Speech Key:
xxxxxxxxxxxxxxxxxxxxxxxxxxxx

Speech Region:
eastus
```

Voz utilizada:

```text
pt-BR-AntonioNeural
```

---

# ▶️ Como executar

## 1 - Clone o projeto

```bash
git clone https://github.com/seu-usuario/lex-ai.git
```

---

## 2 - Abra no VS Code

```bash
code .
```

---

## 3 - Instale a extensão

```text
Live Server
```

---

## 4 - Execute

Clique com o botão direito:

```text
Open with Live Server
```

---

# 🧠 Arquitetura

```text
┌──────────┐
│ Microfone│
└────┬─────┘
     │
     ▼
┌──────────────┐
│ Azure Speech │
│ SpeechToText │
└────┬─────────┘
     │
     ▼
┌──────────────┐
│ Azure OpenAI │
│ GPT o4-mini  │
└────┬─────────┘
     │
     ▼
┌──────────────┐
│ Azure Speech │
│ TextToSpeech │
└────┬─────────┘
     │
     ▼
┌──────────────┐
│ Alto-falante │
└──────────────┘
```

---

# 📈 Roadmap

## Versão atual

- [x] Interface futurista
- [x] Chat textual
- [x] Speech To Text
- [x] Text To Speech
- [x] Integração Azure OpenAI

---

## Próximas versões

- [ ] Streaming das respostas
- [ ] Mudança de cor do HUD conforme estado
- [ ] Memória de contexto
- [ ] Upload de arquivos
- [ ] Execução de código Python
- [ ] Dashboard de métricas
- [ ] Histórico de conversas
- [ ] Integração com banco de dados

---

# 🎯 Objetivo educacional

Este projeto possui finalidade educacional e foi desenvolvido para estudo das seguintes áreas:

- Inteligência Artificial
- Engenharia de Prompt
- APIs REST
- Azure OpenAI
- Azure Speech Services
- Desenvolvimento Frontend

---

# 👨‍💻 Autor

Desenvolvido para fins de estudo e experimentação com tecnologias Microsoft Azure e Inteligência Artificial.

---

# 📜 Licença

Este projeto está licenciado sob a licença MIT.

George passou por aqui...