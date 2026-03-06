#include "analyzer.hpp"

namespace webroot {

double PhysicsEngine::calculateInvariantMass(const Particle &p1,
                                             const Particle &p2) {
  // Standard HEP formula: M^2 = (E1+E2)^2 - (Px1+Px2)^2 - (Py1+Py2)^2 -
  // (Pz1+Pz2)^2
  double totalE = p1.energy + p2.energy;
  double totalPx = p1.px + p2.px;
  double totalPy = p1.py + p2.py;
  double totalPz = p1.pz + p2.pz;

  double massSq =
      std::pow(totalE, 2) -
      (std::pow(totalPx, 2) + std::pow(totalPy, 2) + std::pow(totalPz, 2));
  return (massSq > 0) ? std::sqrt(massSq) : 0.0;
}

std::vector<double>
PhysicsEngine::processEventBatch(const std::vector<Particle> &events) {
  std::vector<double> results;
  results.reserve(events.size() / 2);

  // Process particles in pairs
  for (size_t i = 0; i + 1 < events.size(); i += 2) {
    results.push_back(calculateInvariantMass(events[i], events[i + 1]));
  }
  return results;
}

} // namespace webroot
