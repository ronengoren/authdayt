import { DatePickerAndroid, TimePickerAndroid } from "react-native"; // eslint-disable-line react-native/split-platform-components
import { ErrorsLogger } from "/infra/reporting";

class NativeDateTimePickerAndroid {
  static async open({ onSelected, minDate, maxDate, date }) {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        minDate,
        maxDate,
        date
      });
      if (action === DatePickerAndroid.dismissedAction) {
        return;
      }

      const { hour = 0, minute = 0 } = await TimePickerAndroid.open({
        hour: minDate.getHours(),
        minute: minDate.getMinutes(),
        is24Hour: false
      });

      onSelected && onSelected({ year, month, day, hour, minute });
    } catch ({ code, message }) {
      ErrorsLogger.nativeDataTimePickerError(code, message);
      throw message;
    }
  }

  static async openDateOnly({ onSelected, minDate, maxDate, date }) {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        minDate,
        maxDate,
        date
      });
      if (action === DatePickerAndroid.dismissedAction) {
        return;
      }

      onSelected && onSelected({ year, month, day });
    } catch ({ code, message }) {
      ErrorsLogger.nativeDataTimePickerError(code, message);
      throw message;
    }
  }
}

export default NativeDateTimePickerAndroid;
