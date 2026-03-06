#ifndef WEBROOT_ANALYZER_HPP
#define WEBROOT_ANALYZER_HPP

#include <cmath>
#include <vector>

namespace webroot {

struct Particle {
  double energy;
  double px;
  double py;
  double pz;
};

class PhysicsEngine {
public:
  // Calculates the mass of a parent particle from two daughter particles
  static double calculateInvariantMass(const Particle &p1, const Particle &p2);

  // Processes a large batch of data (Simulating the HL-LHC data deluge)
  static std::vector<double>
  processEventBatch(const std::vector<Particle> &events);
};

} // namespace webroot

#endif
