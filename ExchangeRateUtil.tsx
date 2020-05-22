export default class ExchangeRateUtil {
    /**
     *
     * @param amount  兑换金额
     * @param rate 汇率
     * @param srcCurrency 原货币种类
     * @param targetCurrency 目标货币种类
     * @param decimalsNum 换算结果要保留的小数位
     * @return 返回金额兑换前后的完整信息
     *    格式：例如， xxx日元 ≈ xxx人民币
     */

    static calculateAmount = (amount: number,
                               rate: number,
                               srcCurrency:string,
                               targetCurrency:string,
                               decimalsNum: number
    ) =>{

        //Intl.NumberFormat的options中，如果style选项指定为currency,那么currency选项必须指定，不能为''
        if(srcCurrency == '' || targetCurrency == ''){
            return;
        }

        let exponent = decimalsNum;

        if (exponent < 0 || exponent > 10) {
            exponent = 0;
        }

        //计算兑换结果
        let calculateResult = Math.floor((Math.abs(amount) * Math.abs(rate))*Math.pow(10,exponent));

        //格式化计算结果
        let resultFormatter = new Intl.NumberFormat(navigator.language, {
            style: 'currency',
            currency: targetCurrency,
            currencyDisplay:'name',
            minimumFractionDigits:exponent,
        });

        //格式化amount
        let amountFormatter = new Intl.NumberFormat(navigator.language, {
            style: 'currency',
            currency: srcCurrency,
            currencyDisplay:'name',
        });

        return amountFormatter.format(amount) +" ≈ "+resultFormatter.format(calculateResult);
    }
}

