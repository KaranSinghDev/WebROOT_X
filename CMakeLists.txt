cmake_minimum_required(VERSION 3.10)
project(WebROOT_Engine)

set(CMAKE_CXX_STANDARD 17)

# 1. Logic Library
add_library(analysis_engine STATIC src/analyzer.cpp)
target_include_directories(analysis_engine PUBLIC include)

# 2. Automated Testing Setup (GTest)
include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/refs/heads/main.zip
)
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

# 3. Test Executable
add_executable(unit_tests tests/test_math.cpp)
target_link_libraries(unit_tests analysis_engine GTest::gtest_main)
