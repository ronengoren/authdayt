import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { HTMLView } from "src/components/basicComponents";
import { daytFonts, daytFontWeights, daytColors } from "src/vars";
import { stylesScheme } from "src/schemas";

const styles = StyleSheet.create({
  boldText: {
    letterSpacing: 0.2,
    fontFamily: daytFonts.bold,
    fontWeight: daytFontWeights.bold,
    fontSize: 16,
    lineHeight: 20
  },
  text: {
    textAlign: "left",
    color: daytColors.black,
    letterSpacing: 0.2,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: daytFonts.regular,
    fontWeight: daytFontWeights.regular
  }
});

const BoldedText = ({ text, BoldedText = "", style }) => {
  const boldedWords = BoldedText.split(/ +/);
  let boldText = text || "";

  // Sorting the words from longest word to shortest. So that if we have 2 words: 'be' and 'ben
  // then after first loop we'll get "<b>be</b>n" and then we won't get the whole "ben" word bolded.
  // That's why arranging them by length will make sure wehave the larget word match in bold.
  const sortedWords = boldedWords.sort((a, b) => b.length - a.length);

  sortedWords.forEach(word => {
    if (word.length) {
      let regExp;
      if (word === "b") {
        regExp = new RegExp(`b(?!>)`, "ig"); // escape the "b>" tags
      } else {
        regExp = new RegExp(`\\b${word}`, "ig");
      }
      boldText = boldText.replace(regExp, "<b>$&</b>");
    }
  });

  boldText = `<p>${boldText}</p>`; // A hack to remove <b> tag spaces: https://github.com/jsdf/react-native-htmlview/issues/114

  return (
    <HTMLView
      nodeComponentProps={{
        lineHeight: 20,
        numberOfLines: 1,
        textStyle: [styles.text, style]
      }}
      rootComponentProps={{ numberOfLines: 1 }}
      textComponentProps={{ numberOfLines: 1 }}
      value={boldText}
      addLineBreaks={false}
      stylesheet={{
        b: [styles.boldText, style],
        p: [styles.text, style]
      }}
    />
  );
};

BoldedText.propTypes = {
  text: PropTypes.string,
  BoldedText: PropTypes.string,
  style: stylesScheme
};

export default BoldedText;
