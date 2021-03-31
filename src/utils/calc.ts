import Big from 'big.js';

export function calcAdd(num1: string | number, num2: string | number) {
    return Number(new Big(+num1 || 0).plus(+num2 || 0).toString());
}

export function calcSub(num1: string | number, num2: string | number) {
    return Number(new Big(+num1 || 0).minus(+num2 || 0).toString());
}

export function calcMul(num1: string | number, num2: string | number) {
    return Number(new Big(+num1 || 0).times(+num2 || 0).toString());
}

export function calcDiv(num1: string | number, num2: string | number) {
    return Number(new Big(+num1 || 0).div(+num2 || 0).toString());
}