const regex = / SUMME MONATSABRECHNUNG VISA /;

function canParse() {
    return true;
}

function parse(text) {
    return {
        payee: {
            name: null
        },
        text
    }
}

export default {parse, canParse}