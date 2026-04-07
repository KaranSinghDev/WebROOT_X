![CI/CD Pipeline](https://github.com/<YOUR_GITHUB_USERNAME>/WebROOT_X/actions/workflows/ci.yml/badge.svg)
# WebROOT-X: Client-Side Physics Analysis with WebAssembly

WebROOT-X is a proof-of-concept platform that runs a high-performance C++ physics analysis code directly in the browser using WebAssembly. It demonstrates a "zero-server" approach to scientific computing, shifting the computational load from centralized servers to the researcher's own machine.

---

## 🚀 Live Demo & Showcase

**The application is hosted on Vercel**

[**<img src="https://vercel.com/button" alt="Deploy with Vercel" width="120">**](https://webroot-x.vercel.app/)


### Visual Showcase
A short demonstration of the application calculating the invariant mass of a Z-Boson from particle data in real-time. All calculations are happening locally in the browser.

<div align="center">
   <video src="https://github.com/user-attachments/assets/4b62bb7b-b7b9-429a-b6db-e6f56b97a00f" width="100%" autoplay loop muted>
</video>     
</div>

## Problem & Solution

*   **Problem:** The High-Luminosity LHC will generate more data than traditional server farms can handle sustainably.
*   **Solution:** WebROOT-X shifts the computational load from centralized servers to the researcher's browser, enabling scalable, "zero-server" analysis.

## Key Features

-   **C++ in the Browser:** Runs a C++17 physics engine for 4-Vector algebra and invariant mass calculations directly in the browser via WebAssembly.
-   **Interactive Frontend:** A modern, responsive frontend built with **React** and **Vite**, featuring real-time data visualization with **Recharts**.
-   **Zero Server Load:** All calculations are performed client-side, reducing server costs and network latency to zero during analysis.
-   **Reproducible Build:** A fully containerized build pipeline using **Docker** and **CMake** ensures the C++ engine is compiled reliably.

## Tech Stack

| Category        | Technologies                               |
| --------------- | ------------------------------------------ |
| **Frontend**    | `React.js`, `Vite`, `JavaScript`, `Tailwind CSS` |
| **Backend/Kernel**| `C++17`, `WebAssembly (Wasm)`, `Emscripten`  |
| **DevOps**      | `Docker`, `CMake`, `Google Test (GTest)`     |

## How to Run
Ensure Docker and Docker Compose are installed.

1.  **Stage and commit the build configurations:**
    ```bash
    git add CMakeLists.txt Dockerfile.wasm Dockerfile.test .vscode/
    git commit -m "chore: add build configurations and VSCode environment settings"
    ```

2.  **Stage and commit the Orchestrator and Documentation:**
    ```bash
    git add docker-compose.yml README.md
    git commit -m "docs: finalize system orchestration and scientific documentation"
    ```

