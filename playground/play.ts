// let ttest: { alpha: string; beta: string; gamma: string };
let ttest = {
    alpha: 'tt',
    beta: 'kk',
    gamma: 'qq'
};

let stringTest: string = ``;

for (let key in ttest) {
    stringTest += `${key}, ${ttest[key]}\n`;
}

console.log(stringTest);