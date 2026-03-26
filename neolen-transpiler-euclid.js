// Transpiled from Neolen
const _readline = (prompt) => new Promise((resolve) => {
  const answer = window.prompt(prompt) ?? '';
  resolve(answer);
});

function Euclid(a, b) {
  while (b != 0) {
    if (a > b) {
      a = a - b;
    } else {
      b = b - a;
    }
    return a;
async function main(args) {
      let a;
      let b;
      a = await _readline("Enter a: ");
      b = await _readline("Enter b: ");
      console.log(Euclid(a, b));
}

main().catch(console.error);
  }
}
