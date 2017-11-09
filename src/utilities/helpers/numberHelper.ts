import Handlebars = require('handlebars');

export default class NumberHelper {

    static register() {
        Handlebars.registerHelper("toMoneyFormat", (value: number): string => {
            if (!isNaN(value)) {
                return value.toFixed(2);
            }
            return "";
        });
    }
}