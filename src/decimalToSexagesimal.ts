// trying to sanitize floating point fuckups here to a certain extent
const imprecise = (number: number, decimals: number = 4) => {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
};

// Converts a decimal coordinate value to sexagesimal format
const decimal2sexagesimalNext = (decimal: number) => {
    const [pre, post] = decimal.toString().split('.');

    let deg = Math.abs(Number(pre));
    const min0 = Number('0.' + (post || 0)) * 60;
    const sec0 = min0.toString().split('.');

    let min = Math.floor(min0);
    let sec = imprecise(Number('0.' + (sec0[1] || 0)) * 60).toString();

    if(Number(sec) === 60){
        sec = '0';
        min++;
    }

    if(min === 60){
        min = 0;
        deg++;
    }

    const [secPreDec, secDec = '0'] = sec.split('.');

    return (
        deg +
        '° ' +
        min.toString().padStart(2, '0') +
        "' " +
        secPreDec.padStart(2, '0') +
        '.' +
        secDec.padEnd(1, '0') +
        '"'
    );
};

export default decimal2sexagesimalNext;
