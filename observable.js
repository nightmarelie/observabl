class Observable {
  constructor(producer) {
    this._producer = producer;
  }

  subscribe(observer) {
    // return needed for unsubscribe functionality
    // Return result od "producer" containing "unsubscribe"
    return this._producer(observer);
  }
}

// Simple observable: start
const simplProducer = (observer) => {
  observer("Hello");
  observer(" ");
  observer("World!");
};

const observer = (value) => {
  console.log(value);
};

const obs1$ = new Observable(simplProducer);

// invoke producer
obs1$.subscribe(observer); // pass "observer" to "producer"

// Simple observable: end

// Array observable: start
const obs2$ = new Observable((observer) => {
  [1, 2, 3, 4, 5, 6, 7].forEach((v) => observer(v));
});

obs2$.subscribe((v) => console.log(v));

// package into the function
function fromArray(values) {
  return new Observable((observer) => {
    values.forEach((v) => observer(v));

    return {
      unsubscribe() {}, // For consistency
    };
  });
}

const obs3$ = fromArray([1, 2, 3, 4, 5]);
obs3$.subscribe((v) => console.log(v));

// Array observable: end

// DOM events observables: start
function fromEvent(element, eventName) {
  return new Observable((observer) => {
    element.addEventListener(eventName, observer);

    return {
      unsubscribe() {
        element.removeEventListener(eventName, observer);
      },
    };
  });
}

const btn = document.getElementById("btn");

const obs4$ = fromEvent(btn, "click");
const subscription4 = obs4$.subscribe((v) => alert(v));

setTimeout(() => {
  subscription4.unsubscribe();
}, 4000);
// DOM events observables: end

// Pipeable operators: start
// Pipeable operators: end
