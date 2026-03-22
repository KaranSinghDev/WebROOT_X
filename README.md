![CI/CD Pipeline](https://github.com/<YOUR_GITHUB_USERNAME>/WebROOT_X/actions/workflows/ci.yml/badge.svg)
# WebROOT-X: Client-Side Physics Analysis with WebAssembly

WebROOT-X is a proof-of-concept platform that runs high-performance C++ physics analysis code directly in the browser using WebAssembly. It demonstrates a "zero-server" approach to scientific computing, shifting the computational load from centralized servers to the researcher's own machine.

---

## 🚀 Live Demo & Showcase

**The application is hosted on Vercel**

[**<img src="https://vercel.com/button" alt="Deploy with Vercel" width="120">**](https://webroot-x.vercel.app/)


### Visual Showcase
A short demonstration of the application calculating the invariant mass of a Z-Boson from particle data in real-time. All calculations are happening locally in the browser.

<div align="center">
  <video src="[YOUR_VIDEO_URL_HERE](https://github.com/user-attachments/assets/4b62bb7b-b7b9-429a-b6db-e6f56b97a00f)" width="100%" autoplay loop muted></video>
</div>
---

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

## Architecture

The system is primarily based on simple but powerful architecture to bridge the C++ and web worlds.

```mermaid
graph TD
    A[C++ Physics Kernel] -- "Compiled by Emscripten" --> B(WebAssembly Module);
    B -- "Loaded by" --> C{React Frontend};
    C -- "Displays Results" --> D[User's Browser];```

## How to Run Locally

This project is fully containerized for a one-command setup.

1.  **Prerequisites:** Docker and Docker Compose.
2.  **Clone the repository:**
    ```bash
    git clone https://github.com/KaranSinghDev/WebROOT-X.git
    cd WebROOT-X
    ```
3.  **Build and Run:**
    This command will automatically compile the C++ to WebAssembly and start the web server.
    ```bash
    docker-compose up --build
    ```
4.  Open your browser and navigate to `http://localhost:5173`.

---
