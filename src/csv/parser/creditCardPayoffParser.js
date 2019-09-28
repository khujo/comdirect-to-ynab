const regex = / Empfänger: (.+)Buchungstext: ((\d+) Ueberweisung von Girokonto auf Visa-Karte) Ref\. (.+) /;

function canParse(text) {
    return regex.test(text);
}

function parse(text) {
    let match = regex.exec(text);
    return {
        payee: {
            name: match[1],
            creditCardNo: match[3]
        },
        text: match[2],
        reference: match[4]
    }
}

export default {parse, canParse}