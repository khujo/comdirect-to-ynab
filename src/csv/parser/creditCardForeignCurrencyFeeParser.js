const regex = / \d\.\d\d PROZ.AUSLANDSENTGELT /;

function canParse(text) {
    return regex.test(text);
}

function parse(text) {
    return {
        payee: {
            name: "comdirect"
        },
        text
    }
}

export default {parse, canParse}