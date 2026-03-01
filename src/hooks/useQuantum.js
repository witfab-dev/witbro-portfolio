import { useState, useCallback } from 'react';

const useQuantum = () => {
  const [circuit, setCircuit] = useState([]);
  const [state, setState] = useState({ real: 1, imag: 0 }); // |0⟩ state
  const [measurements, setMeasurements] = useState([]);
  const [qubits, setQubits] = useState(2);

  const addGate = useCallback((gate, qubit = 0, target = null) => {
    const newGate = {
      id: Date.now(),
      gate,
      qubit,
      target,
      timestamp: new Date().toISOString()
    };
    
    setCircuit(prev => [...prev, newGate]);
    
    // Apply gate to state (simplified simulation)
    applyGateEffect(gate, qubit, target);
  }, []);

  const applyGateEffect = useCallback((gate, qubit, target) => {
    // Simplified quantum gate effects
    switch (gate) {
      case 'H':
        // Hadamard gate creates superposition
        setState(prev => ({
          real: prev.real * 0.7071, // 1/√2
          imag: prev.imag * 0.7071
        }));
        break;
      case 'X':
        // Pauli-X (NOT) gate
        setState(prev => ({
          real: -prev.real,
          imag: -prev.imag
        }));
        break;
      case 'CNOT':
        // Controlled-NOT gate
        if (target !== null) {
          // Simplified effect for visualization
          setState(prev => ({
            real: prev.real * 0.5,
            imag: prev.imag * 0.5
          }));
        }
        break;
      default:
        break;
    }
  }, []);

  const measure = useCallback(() => {
    // Simulate quantum measurement
    const probability0 = state.real ** 2 + state.imag ** 2;
    const random = Math.random();
    
    const result = random < probability0 ? '0' : '1';
    const newMeasurement = {
      id: Date.now(),
      result,
      probabilities: {
        '0': probability0.toFixed(4),
        '1': (1 - probability0).toFixed(4)
      },
      timestamp: new Date().toISOString()
    };
    
    setMeasurements(prev => [newMeasurement, ...prev.slice(0, 9)]);
    
    // Collapse state (simplified)
    setState({
      real: result === '0' ? 1 : 0,
      imag: 0
    });
    
    return result;
  }, [state]);

  const runCircuit = useCallback(async () => {
    // Simulate running the circuit
    for (const gate of circuit) {
      await new Promise(resolve => setTimeout(resolve, 500));
      applyGateEffect(gate.gate, gate.qubit, gate.target);
    }
    
    // Final measurement
    const result = measure();
    return result;
  }, [circuit, applyGateEffect, measure]);

  const clearCircuit = useCallback(() => {
    setCircuit([]);
    setState({ real: 1, imag: 0 });
    setMeasurements([]);
  }, []);

  const getStateVector = useCallback(() => {
    const magnitude = Math.sqrt(state.real ** 2 + state.imag ** 2);
    const phase = Math.atan2(state.imag, state.real);
    
    return {
      magnitude: magnitude.toFixed(4),
      phase: phase.toFixed(4),
      display: `|ψ⟩ = ${magnitude.toFixed(2)}e^{${phase.toFixed(2)}i}|0⟩`
    };
  }, [state]);

  return {
    circuit,
    state: getStateVector(),
    measurements,
    qubits,
    addGate,
    measure,
    runCircuit,
    clearCircuit,
    setQubits
  };
};

export default useQuantum;