// Transpiled from Neolen
const _readline = (prompt) => new Promise((resolve) => {
  const answer = window.prompt(prompt) ?? '';
  resolve(answer);
});

function Eratosthenes(n) {
  let primes = new Array(n);
  let l = 0;
  let i = 0;
  let index_square = 3;
  let first;
  let last;
  let factor;
  for (let k = 0; k < n; k++) {
    true(primes[k]);
    while (index_square < n) {
      if (primes[i]) {
        first = 0 + index_square;
        last = 0 + n;
        factor = i + i + 3;
        false(primes[first]);
        while (last - first > factor) {
          first = first + factor;
          false(primes[first]);
          i = i + 1;
          index_square = 2 * i * (i + 3) + 3;
          process.stdout.write(`${"2 "}`);
          for (i = 0; i < n; i++) {
            if (primes[i]) {
              if (2 * i + 3 > n) {
                break;
              }
              process.stdout.write(`${" "}` + `${2}` + `${*}` + `${i}` + `${+}` + `${3}`);
              l = l + 1;
              if (l % 10 == 0) {
                process.stdout.write(`${"\n"}`);
              }
            }
            process.stdout.write(`${"\nnumber : "}` + `${l}`);
async function main() {
              Eratosthenes(1000);
}

main().catch(console.error);
          }
        }
      }
    }
}
