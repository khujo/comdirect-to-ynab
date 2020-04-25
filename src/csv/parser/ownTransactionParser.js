const regex = / ?(Empfänger|Auftraggeber): (.+)Kto\/IBAN: (\w+) BLZ\/BIC: (\w+)([\W]*Buchungstext: (.+))? Ref\. (.+)/;

function canParse(text) {
    return regex.test(text);
}

function parse(text) {
    let match = regex.exec(text);
    return {
        payee: {
            name: match[2],
            iban: match[3],
            bic: match[4]
        },
        text: match[6],
        reference: match[7]
    }
}

export default {parse, canParse}