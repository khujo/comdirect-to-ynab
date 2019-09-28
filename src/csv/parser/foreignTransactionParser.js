const regex = / Auftraggeber: (.+)Buchungstext: (.+) Ref\. (.+) /;

function canParse(text) {
    return regex.test(text);
}

function parse(text) {
    let match = regex.exec(text);
    return {
        payee: {
            name: match[1]
        },
        text: match[2],
        reference: match[3]
    }
}

export default {parse, canParse}