import Handlebars = require('handlebars');

export default class NumberHelper {

    static register() {
        Handlebars.registerHelper("toMoneyFormat", (value: number): string => {
            if (value && !isNaN(value)) {
                return value.toFixed(2);
            }
            return "";
        });
    }
}