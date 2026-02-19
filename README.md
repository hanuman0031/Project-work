# RunAnywhere Web Starter App

A minimal React + TypeScript starter app demonstrating **on-device AI in the browser** using the [`@runanywhere/web`](https://www.npmjs.com/package/@runanywhere/web) SDK. All inference runs locally via WebAssembly — no server, no API key, 100% private.

## Features

| Tab | What it does |
|-----|-------------|
| **Chat** | Stream text from an on-device LLM (SmolLM2 360M) |
| **Vision** | Point your camera and describe what the VLM sees (LFM2-VL 450M) |
| **Voice** | Speak naturally — VAD detects speech, STT transcribes, LLM responds, TTS speaks back |
| **Code** | 🆕 AI Code Assistant with Tool Calling — write, execute, and debug code with live preview |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Models are downloaded on first use and cached in the browser's Origin Private File System (OPFS).

## How It Works

```
@runanywhere/web (npm package)
  ├── WASM engine (llama.cpp, whisper.cpp, sherpa-onnx)
  ├── Model management (download, OPFS cache, load/unload)
  └── TypeScript API (TextGeneration, STT, TTS, VAD, VLM, VoicePipeline)
```

The app imports everything from `@runanywhere/web`:

```typescript
import { RunAnywhere, TextGeneration, VLMWorkerBridge } from '@runanywhere/web';

await RunAnywhere.initialize({ environment: 'development' });

// Stream LLM text
const { stream } = await TextGeneration.generateStream('Hello!', { maxTokens: 200 });
for await (const token of stream) { console.log(token); }

// VLM: describe an image
const result = await VLMWorkerBridge.shared.process(rgbPixels, width, height, 'Describe this.');
```

## Project Structure

```
src/
├── main.tsx              # React root
├── App.tsx               # Tab navigation (Chat | Vision | Voice)
├── runanywhere.ts        # SDK init + model catalog + VLM worker
├── workers/
│   └── vlm-worker.ts     # VLM Web Worker entry (2 lines)
├── hooks/
│   └── useModelLoader.ts # Shared model download/load hook
├── components/
│   ├── ChatTab.tsx        # LLM streaming chat
│   ├── VisionTab.tsx      # Camera + VLM inference
│   ├── VoiceTab.tsx       # Full voice pipeline
│   ├── CodeTab.tsx        # 🆕 AI Code Assistant with Tool Calling
│   └── ModelBanner.tsx    # Download progress UI
└── styles/
    └── index.css          # Dark theme CSS
```

## Adding Your Own Models

Edit the `MODELS` array in `src/runanywhere.ts`:

```typescript
{
  id: 'my-custom-model',
  name: 'My Model',
  repo: 'username/repo-name',           // HuggingFace repo
  files: ['model.Q4_K_M.gguf'],         // Files to download
  framework: LLMFramework.LlamaCpp,
  modality: ModelCategory.Language,      // or Multimodal, SpeechRecognition, etc.
  memoryRequirement: 500_000_000,        // Bytes
}
```

Any GGUF model compatible with llama.cpp works for LLM/VLM. STT/TTS/VAD use sherpa-onnx models.

## 🆕 AI Code Assistant Feature

The **Code** tab demonstrates RunAnywhere's powerful **Tool Calling** capabilities:

- 💻 **Live Code Editor** - Write HTML/CSS/JS with real-time preview
- 🤖 **AI Assistant** - Chat with AI to generate, debug, and improve code
- 🔧 **Tool Calling** - AI can execute JavaScript, update preview, and read current code
- 📚 **Templates** - Quick start with pre-built examples (Counter, Animations, etc.)

See [CODE_ASSISTANT_README.md](./CODE_ASSISTANT_README.md) for full documentation.

### Example Interactions:
- "Create a todo list app" → AI generates complete HTML/CSS/JS
- "Calculate fibonacci(10)" → AI executes code and returns result
- "Add dark mode to this" → AI reads current code and enhances it
- "Explain how flexbox works" → AI creates interactive demo

## Deployment

### Vercel

```bash
npm run build
npx vercel --prod
```

The included `vercel.json` sets the required Cross-Origin-Isolation headers.

### Netlify

Add a `_headers` file:

```
/*
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: credentialless
```

### Any static host

Serve the `dist/` folder with these HTTP headers on all responses:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: credentialless
```

## Browser Requirements

- Chrome 96+ or Edge 96+ (recommended: 120+)
- WebAssembly (required)
- SharedArrayBuffer (requires Cross-Origin Isolation headers)
- OPFS (for persistent model cache)

## Documentation

- [SDK API Reference](https://docs.runanywhere.ai)
- [npm package](https://www.npmjs.com/package/@runanywhere/web)
- [GitHub](https://github.com/RunanywhereAI/runanywhere-sdks)

## License

MIT
