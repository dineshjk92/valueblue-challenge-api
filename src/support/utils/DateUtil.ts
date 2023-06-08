import moment from 'moment';

export default class DateUtil {
   /**
    * Generates date based on the input
    * @param format date format
    * @param days increment OR decrement the days
    * @param months increment OR decrement the months
    * @param years increment OR decrement the years
    * @returns returns the date
    */
   public static dateGenerator(format: string, days: number, months: number, years: number): string {
      const date = moment().add(days, 'd').add(months, 'M').add(years, 'y').format(format);
      return date;
   }
}
