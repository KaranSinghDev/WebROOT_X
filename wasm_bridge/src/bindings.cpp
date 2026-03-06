#include "analyzer.hpp"
#include <emscripten/bind.h>

using namespace emscripten;
using namespace webroot;

// 1. Helper function to make the C++ API "JavaScript-friendly"
// Instead of struct Particle, we will accept a JS object with 4 numbers.
double calculateMassFromValues(double e1, double px1, double py1, double pz1,
                               double e2, double px2, double py2, double pz2) {
  Particle p1 = {e1, px1, py1, pz1};
  Particle p2 = {e2, px2, py2, pz2};
  return PhysicsEngine::calculateInvariantMass(p1, p2);
}

// 2. Binding Definitions
// This tells Emscripten: "Make these C++ functions available to JavaScript."
EMSCRIPTEN_BINDINGS(my_module) {
  function("calculateInvariantMass", &calculateMassFromValues);
}
