#include <gtest/gtest.h>
#include "analyzer.hpp"

using namespace webroot;

// Test: Verify the Invariant Mass of a Z-Boson decay
TEST(PhysicsEngineTest, ZBosonMassCalculation) {
    // Simulated decay: Z -> Electron (p1) + Positron (p2)
    // Values chosen to result in approx 91.18 GeV
    Particle p1 = {45.6, 10.0, 5.0, 44.2}; 
    Particle p2 = {45.6, -10.0, -5.0, -44.2};

    double mass = PhysicsEngine::calculateInvariantMass(p1, p2);

    // Expect mass to be approx 91.2 GeV (accounting for float precision)
    EXPECT_NEAR(mass, 91.2, 0.1);
}

// Test: Verify batch processing
TEST(PhysicsEngineTest, BatchProcessingSize) {
    std::vector<Particle> events(4, {10.0, 0, 0, 0});
    auto results = PhysicsEngine::processEventBatch(events);
    
    EXPECT_EQ(results.size(), 2);
}

int main(int argc, char **argv) {
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}