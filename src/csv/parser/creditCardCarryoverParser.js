const regex = / UEBERTRAG AUF VISA-KARTE /;

function canParse(text) {
    return regex.test(text);
}

function parse(text) {
    return {
        payee: {
            name: "Self"
        },
        text: text
    }
}

export default {parse, canParse}