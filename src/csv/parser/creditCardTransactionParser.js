const regex = / (.+[^A-Z])[A-Z].+?\d\d\d/;

function canParse(text) {
    return regex.test(text);
}

function parse(text) {
    let match = regex.exec(text);
    return {
        payee: {
            name: match[1].trim()
        }
    }
}

export default {parse, canParse}