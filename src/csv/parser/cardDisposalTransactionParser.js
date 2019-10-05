const regex = / Buchungstext: (.+) Ref\. (.+) /;

function canParse(text) {
    return regex.test(text);
}

function parse(text) {
    let match = regex.exec(text);
    return {
        payee: {
            name: null
        },
        text: match[1],
        reference: match[2]
    }
}

export default {parse, canParse}