// Module: Euclidean
{

  class GCD {

    let a, let b;

    Euclid(a, b) {

      while (b!=0) {
        if (a > b) {
          a = a - b;
        } else {
          b = b - a;
        }
      }
    }

    return a;
  }
}


function main(args[]) {

  GCD N

  N.a = prompt("Enter N.a:");
  N.b = prompt("Enter N.b:");
  console.log(N.Euclid(N.a, N.b));

}

}
// End module: Euclidean