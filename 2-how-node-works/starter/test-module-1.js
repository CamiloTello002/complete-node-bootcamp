class Calculator {
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
    divide(a, b) {
        return a / b;
    }
}

// module.exports for one value
module.exports = Calculator;

// another way would be:
/*
module.exports = class {
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
    divide(a, b) {
        return a / b;
    }
}
*/