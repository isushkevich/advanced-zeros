module.exports = function getZerosCount( number, base ) {
  let count = 0,
    primesArr = [];

  // find prime divisors
  primesArr = findPrimes( base );

  const primeCount = baseCounter( number, primesArr );
  const baseCount = primesArr.reduce( ( counter, prime ) => {
    let number = base;
    let count = 0;
    while ( number % prime == 0 ) {
      number = number / prime;
      count++;
    }
    return Object.assign( {}, counter, {
      [ prime ]: count
    } );
  }, {} );
  // find the rarest one and count it
  const [ rarestPrime, rarestCount ] = Object.entries( primeCount ).reduce( ( min, prime ) => min[ 1 ] > prime[ 1 ] ? prime : min );

  let divisor = rarestPrime;

  while ( divisor <= number ) {
    count += Math.floor( number / divisor );
    divisor = divisor * rarestPrime;
  }

  count = count / baseCount[ rarestPrime ];

  return count;
}


function findPrimes( number ) {
  let root = Math.sqrt( number );
  let arr = [];

  for ( let i = 2; i < root; ++i ) {
    if ( number % i == 0 ) {
      arr.push( i );
    }
    while ( number % i == 0 ) {
      number = number / i;
    }
  }
  if ( number > 1 ) {
    arr.push( number );
  }
  return arr;
}

function baseCounter( number, primesArr ) {
  const primeCount = primesArr.reduce( ( o, prime ) => o[ prime ] ? o : Object.assign( {}, o, {
      [ prime ]: 0
  } ) );

  for ( let i = 1; i < number; ++i ) {
    primesArr.forEach( j => {
      let a = i;
      while ( a % j == 0 ) {
        a = a / j;
        primeCount[ j ]++;
      }
    } )
  }
  return primeCount;
}