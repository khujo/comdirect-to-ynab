const startAccountRegex = /"Umsätze (.+) ";"Zeitraum: ([\d])+ Tage";/;
const checkingTransactionRegex = /"([\d]{2}.[\d]{2}.[\d]{4})";"([\d]{2}.[\d]{2}.[\d]{4})";"([^"]*)";("([^"]*)";)?"([^"]*)";"(-?[\d.,]+)";/;
const dateRegex = /([\d]{2}).([\d]{2}).([\d]{4})/;
const textRegex = / ((Empfänger|Auftraggeber): (.*))?(Buchungstext: (.*))? Ref. (.*) /;

const YEAR = 3;
const MONTH = 2;
const DAY = 1;

const VALUE_DATE = 1;
const BOOKING_DATE = 2;
const PROCESS = 3;
const text = 6;
const VALUE = 7;

function parseDate(dateString) {
    let match = dateRegex.exec(dateString);
    return new Date(match[YEAR], match[MONTH]-1, match[DAY]);
}

function parseNumber(numberString) {
    numberString = numberString.replace(/\./g, "");
    numberString = numberString.replace(",", ".");
    return parseFloat(numberString);
}

function parseText(text) {
    const match = textRegex.exec(text);
    return {
        payee: {
            name: match[3]
        },
        text: match[4],
        reference: match[5]
    };
}

function firstLineIsInvalid(index, line) {
    return index === 0 && line !== ';';
}

function startsNewAccount(line) {
    return startAccountRegex.test(line);
}

function readAccount(line) {
    let name = startAccountRegex.exec(line)[1];
    let account = {name, transactions: []};
    return account;
}

function readTransaction(line) {
    let match = checkingTransactionRegex.exec(line);

    return {
        valueDate: parseDate(match[VALUE_DATE]),
        bookingDate: parseDate(match[BOOKING_DATE]),
        process: match[PROCESS],
        ...parseText(match[text]),
        value: parseNumber(match[VALUE])
    };
}

function isCheckingTransaction(line) {
    return checkingTransactionRegex.test(line);
}

function readAccounts(text) {
    let accounts = [];
    text = text.replace(/\r\n"neu";/g, "");
    let lines = text.split("\r\n");
    lines.forEach((line, index) => {
        if(firstLineIsInvalid(index, line)) {
            throw new Error("Unexpected file format");
        }
        if(startsNewAccount(line)){
            accounts.push(readAccount(line));
        } else if(isCheckingTransaction(line)) {
            accounts[accounts.length-1].transactions.push(readTransaction(line));
        }
    });
    return accounts;
}

function readFile(file) {
    return new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            resolve(readAccounts(fileReader.result));
        });
        fileReader.readAsText(file, "cp1252");
    });
}

export function read(files) {
    let fileReaders = [];
    for(let i = 0 ; i < files.length ; i++) {
        fileReaders.push(readFile(files[i]));
    }
    return Promise.all(fileReaders)
        .then(fileResults =>
            fileResults.reduce((allAccounts,filesAccounts) => [...allAccounts, ...filesAccounts], [])
        );
}