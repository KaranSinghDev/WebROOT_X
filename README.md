# WebROOT-X: Client-Side High Energy Physics (HEP) Analysis

## 1. Motivation & Intuition
The High-Luminosity LHC (HL-LHC) upgrade will produce an unprecedented "Data Deluge." Traditional centralized analysis servers face massive bottlenecks in both network bandwidth and compute resources. 

**WebROOT-X** is a futurist proof-of-concept addressing this challenge by shifting high-performance physics calculations from the data center to the user's browser. It demonstrates a **Zero-Server Compute** model: the browser downloads a binary C++ engine and raw event data, performing complex Kinematic Analysis at near-native speed locally.

## 2. Architecture
The system utilizes a multi-layered approach to bridge low-level physics code with modern web interfaces:

*   **Logic Engine (C++17):** A mathematically verified library for particle 4-vector algebra and Invariant Mass calculations (e.g., Z-Boson decay).
*   **Wasm Bridge (Emscripten):** A translation layer that compiles C++ into WebAssembly, enabling JavaScript to execute native-speed compiled code.
*   **Frontend Dashboard (React + Vite):** A high-contrast, DAQ-style interface that visualizes real-time metrics and historical analysis trends using **TailwindCSS** and **Recharts**.
*   **Verification (GTest):** The physics core is unit-tested inside a Dockerized environment before deployment to ensure mathematical fidelity.

## 3. Technology Stack
*   **Languages:** C++17, JavaScript (React).
*   **Web Standard:** WebAssembly (Wasm).
*   **Build Systems:** CMake, Emscripten (emsdk).
*   **Containerization:** Multi-stage Docker builds & Docker Compose.
*   **Visualization:** SVG-based vector charting and Recharts.

## 4. How to Run
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