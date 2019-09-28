const regex = / SUMME MONATSABRECHNUNG VISA /;

function canParse(text) {
    return regex.test(text);
}

function parse(text) {
    return {
        payee: {
            name: "Visa"
        }
    }
}

export default {parse, canParse}