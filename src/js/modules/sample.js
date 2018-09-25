/*
  NOTE: Babel is enabled, which translates much of the below to ES5 compatible code.
  https://github.com/google/traceur-compiler
  
  An alternative is 6to5: https://6to5.org/
  
  Helpful docs for getting up to speed on ES6: https://6to5.org/docs/learn-es6/
*/

// Convenience function for logging. Look funny? It won't by the end of this.
let _ = msg => console.log(msg);

/*
 * let is the new var
 */
let someVariable = 'some value';
_(someVariable); // some value

// Value is mutable
someVariable = 'another value';
_(someVariable); // another value

// This would cause an error, cannot redeclare in the same block/scope.
// let someVariable = 'yet another value';

// This is OK, as it's a different block/scope.
function something() {
  let someVariable = 'yet another value';
  // do stuff
}

/*
 * Constants
 * Cannot be changed once they are set.
 */
const a = 'Some string';
// The following line would generate an error. 'a' is read only.
// a = 'Another string';

/*
 * Template strings
 */
let firstName = 'Brad';
let lastName = 'Daily';

_(`My name is ${firstName} ${lastName}.`); // My name is Brad Daily.

// Can be multiline too
let multilineString = `My name is ${firstName} ${lastName}.
Really nice to meet ya.`;

_(multilineString); // My name is Brad Daily.\nReally nice to meet ya.

/*
 * 'Spread' operator
 * Creates an array from all passed arguments
 */
let spread = function(...x) {
  return x;
}

_(spread(1, 2, 3)); // [1, 2, 3]

/*
 * Fat arrow function syntax
 */

/* Old way

  var helloWorld = function() {
    return 'Hello world';
  }
*/

let helloWorld = () => 'Hello world.';

_(helloWorld()); // Hello world.

// Here's that spread function from earlier
let newSpread = (...x) => x;

_(newSpread(3, 4, 5)); // [3, 4, 5]

// Example using spread operator plus arrow functions.
// add()  will sum any numbers passed to it as arguments.
let add = (...x) => x.reduce((previous, current) => previous + current);
_(add(1, 5, 10, 20)); // 36

// Array sort
_([1, 5, 8, 2, 3, 4].sort((a, b) => a < b ? -1 : 1)); // [1, 2, 3, 4, 5, 8]

// Arrow functions inherit the scope they are defined in.
// No more var self = this;
// See: this.owner in the sayFruits function
let pantry = {
  owner: 'Jim',
  fruits: ['apple', 'orange', 'pear'],
  sayFruits() {
    this.fruits.forEach(fruit => {
      _(`${this.owner}'s pantry has ${fruit}s`);
    });
  }
}

pantry.sayFruits();
// Jim's pantry has apples
// Jim's pantry has oranges
// Jim's pantry has pears

/*
 * Object literals
 */
let x = 50;
let y = 100;

/* Old way

  var coordinates = {
    x: x,
    y: y
  }
  
*/

let coordinates = {
  x, y
};

_(coordinates); // Object { x: 50, y: 100}

/*
 * Destructuring
 */
let http = () => [404, 'Not found'];
let [status, textResponse] = http();

_(status); // 404
_(textResponse); // Not found

/*
 * Classes
 */
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  
  // Getters allow for dynamic properties
  // In this example, you can use .fullName instead of .fullName()
  // See the greeting() function below 
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  greeting() {
    return `Hi, my name is ${this.fullName} and I am ${this.age} years old.`; 
  }
  
  isAdult() {
    return this.age >= 18;
  }
}

let me = new Person('Brad', 'Daily', 35);
_(me.isAdult()); // true
_(me.greeting()); // Hi, my name is Brad Daily and I am 35 years old.
me.age = 36;
_(me.greeting()); // Hi, my name is Brad Daily and I am 36 years old.

// Class extension
class Pirate extends Person {
  greeting() {
    return `Arggh, me name is ${this.fullName} and I've been sailing these here seas for ${this.age} years.`;  
  }
}

var pirate = new Pirate('Brad', 'Daily', 35);
_(pirate.greeting()); // Arggh, me name is Brad Daily and I've been sailing these here seas for 35 years.

/*
 * Default parameters values
 */
function repeat(toldYa = 'Nothin') {
  return `You told me ${toldYa}.`;
}

_(repeat()); // You told me Nothin'.
_(repeat("Somethin'")); // You told me Somethin'.

// Arrow version
let repeat2 = (toldYa = "Nothin'") => `You told me ${toldYa}.`;

_(repeat2()); // You told me Nothin'.
_(repeat2("Somethin'")); // You told me Somethin'.

/*
 * Sets
 */
let letters = new Set();
letters.add('A');
_(letters.size); // 1

// Ignores duplicate values
letters.add('A');
_(letters.size); // 1

_(letters.has('A')); // true
_(letters.has('B')); // false

letters.add('B');

for (let letter of letters) _(letter); // Outputs A, then B

_(letters.delete('Z')); // returns false since Z is was not in letters before delete()
_(letters.delete('A')); // returns true since A is was in letters before delete()

letters.clear();
_(letters.size); // 0

/*
 * Maps
 */
let map = new Map();
map.set('string-key', 'I belong to the string-key');

// Keys can be anything, like a DOM element
map.set(document.getElementsByTagName('h1')[0], 'I belong to the first <h1> in the DOM.');

_(map.size); // 2

_(map.get(document.getElementsByTagName('h1')[0])); // I belong to the first <h1> in the DOM.

for (let [key, val] of map.entries()) {
  _(key); // Outputs 'string-key', then the <h1>
  _(val); // Outputs 'I belong to the string-key', then 'I belong to the first <h1> in the DOM.'
}