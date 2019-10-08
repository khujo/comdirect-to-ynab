import foreignTransactionParser from "./parser/foreignTransactionParser";
import ownTransactionParser from "./parser/ownTransactionParser";
import cardTransactionParser from "./parser/cardDisposalTransactionParser";
import creditCardPayoffParser from "./parser/creditCardPayoffParser";
import creditCardTransactionParser from "./parser/creditCardTransactionParser";
import creditCardForeignCurrencyFeeParser from "./parser/creditCardForeignCurrencyFeeParser";
import creditCartBillParser from "./parser/creditCartBillParser";
import creditCardCarryoverParser from "./parser/creditCardCarryoverParser";
import uuidv1 from 'uuid/v1';

const startAccountRegex = /"Umsätze (.+) ";"Zeitraum: ([\d])+ Tage";/;
const checkingTransactionRegex = /"([\d]{2}.[\d]{2}.[\d]{4})";"([\d]{2}.[\d]{2}.[\d]{4})";"([^"]*)";("([^"]*)";)?"([^"]*)";"(-?[\d.,]+)";/;
const dateRegex = /([\d]{2}).([\d]{2}).([\d]{4})/;

const YEAR = 3;
const MONTH = 2;
const DAY = 1;

const VALUE_DATE = 1;
const BOOKING_DATE = 2;
const PROCESS = 3;
const TEXT = 6;
const VALUE = 7;

function parseDate(dateString) {
    let match = dateRegex.exec(dateString);
    return new Date(match[YEAR], match[MONTH]-1, match[DAY], 12);
}

function parseNumber(numberString) {
    numberString = numberString.replace(/\./g, "");
    numberString = numberString.replace(",", ".");
    return parseFloat(numberString);
}

const parsers = [
    ownTransactionParser,
    foreignTransactionParser,
    cardTransactionParser,
    creditCardPayoffParser,
    creditCardTransactionParser,
    creditCardForeignCurrencyFeeParser,
    creditCartBillParser,
    creditCardCarryoverParser];

function parseText(text) {
    let parser = parsers.find(parser => parser.canParse(text));
    if (!parser) {
        throw new Error(`Cannot parse text ${text}`);
    }
    return parser.parse(text);
}

function firstLineIsInvalid(index, line) {
    return index === 0 && (line !== ';' && line.trim() !== '');
}

function startsNewAccount(line) {
    return startAccountRegex.test(line);
}

function readAccount(line) {
    let name = startAccountRegex.exec(line)[1];
    let account = {name, id: uuidv1(), transactions: []};
    return account;
}

function readTransaction(line) {
    let match = checkingTransactionRegex.exec(line);


    let transaction = {
        valueDate: parseDate(match[VALUE_DATE]),
        bookingDate: parseDate(match[BOOKING_DATE]),
        process: match[PROCESS],
        value: parseNumber(match[VALUE]),
        ...parseText(match[TEXT])
    };
    return transaction;
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
    return accounts.filter(account => account.transactions.length > 0);
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