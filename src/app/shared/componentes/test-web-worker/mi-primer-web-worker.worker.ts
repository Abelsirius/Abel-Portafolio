/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const resultado = calcularFibonacci(data); // Ejecuta un cálculo intensivo
  postMessage(resultado); // Envía el resultado de vuelta al hilo principal
});

// Función que calcula el enésimo número de Fibonacci (ejemplo intensivo)
function calcularFibonacci(n: number): number {
  if (n <= 1) return n;
  return calcularFibonacci(n - 1) + calcularFibonacci(n - 2);
}