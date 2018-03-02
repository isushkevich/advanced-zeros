module.exports = function getZerosCount( number, base ) {
  let count = 0,
    primesArr = [];


  primesArr = findPrimes( base );
  const baseCount = primesArr.reduce( ( counter, prime ) => {
    let number = base;
    let count = 0;
    while ( number % prime == 0 ) {
      number = number / prime;
      count++;
    }
    return { ...counter,
      [ prime ]: count
    };
  }, {} );
  const primeCount = baseCounter( number, primesArr, baseCount );


  const [ rarestPrime, rarestCount ] = Object.entries( primeCount ).reduce( ( min, prime ) => min[ 1 ] > prime[ 1 ] ? prime : min );




  return rarestCount;
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

function baseCounter( number, primesArr, baseCount ) {
  const primeCount = primesArr.reduce( ( o, prime ) => o[ prime ] ? o : { ...o,
    [ prime ]: 0
  }, {} );



  primesArr.forEach( j => {
    let divisor = j;
    let count = 0;
    while ( divisor <= number ) {
      count += Math.floor( number / divisor );
      divisor = divisor * j;
    }
    count = count / baseCount[ j ];
    primeCount[ j ] = count;
  } )

  return primeCount;
}