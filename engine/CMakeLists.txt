cmake_minimum_required(VERSION 3.10)
project(WebROOT_Engine)

set(CMAKE_CXX_STANDARD 17)

# --- CERN QA: Strict Compiler Flags ---
# Treat warnings as errors to enforce high code quality.
# -pedantic enforces strict ISO C++ compliance.
add_compile_options(-Wall -Wextra -Werror -pedantic)

# --- CERN QA: Memory Sanitizer (ASan) ---
# This injects code to detect memory leaks and buffer overflows at runtime.
option(ENABLE_ASAN "Enable AddressSanitizer" OFF)
if(ENABLE_ASAN)
    add_compile_options(-fsanitize=address -fno-omit-frame-pointer -g)
    add_link_options(-fsanitize=address)
endif()

# 1. Logic Library
add_library(analysis_engine STATIC src/analyzer.cpp)
target_include_directories(analysis_engine PUBLIC include)

# 2. Automated Testing Setup (GTest)
include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/refs/heads/main.zip
)
# Force shared CRT to avoid MSVC/Windows specific issues
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

# 3. Test Executable
add_executable(unit_tests tests/test_math.cpp)
target_link_libraries(unit_tests analysis_engine GTest::gtest_main)
