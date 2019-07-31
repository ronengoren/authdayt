import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import Moment from "moment";
import { TextInLine } from "src/components/basicComponents";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 10
  }
});

const DateSeparator = ({ message, formatDate, date }) => (
  <TextInLine
    style={styles.container}
    textSize={12}
    textColor={daytColors.b70}
    lineColor={daytColors.veryLightPink}
  >
    {formatDate
      ? formatDate(date)
      : Moment(message.date.toISOString()).calendar(null, {
          lastDay: "[Yesterday]",
          sameDay: "[Today]",
          nextDay: "[Tomorrow]",
          lastWeek: "[Last] dddd",
          nextWeek: "dddd",
          sameElse: "L"
        })}
  </TextInLine>
);

DateSeparator.propTypes = {
  message: PropTypes.object,
  formatDate: PropTypes.string,
  date: PropTypes.string
};

export default DateSeparator;
