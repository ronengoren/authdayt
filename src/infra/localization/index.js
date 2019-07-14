import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import { en, he, fr, es } from "../../localization";
import { sharedEn, sharedHe, sharedFr } from "../../localization/shared";
import { user as userLocalStorage } from "../../infra/localStorage";
import { updateMomentLocale } from "../../infra/utils/dateTimeUtils";

class Localization {
  init() {
    I18n.fallbacks = true;
    const translations = {
      en: { ...en, shared: sharedEn },
      fr: { ...fr, shared: sharedFr },
      he: { ...he, shared: sharedHe },
      es
    };

    const defaultLanguage = "en";
    const { languageTag } = RNLocalize.findBestAvailableLanguage(
      Object.keys(translations)
    ) || { languageTag: defaultLanguage };

    I18n.translations = translations;
    I18n.locale = languageTag;
  }

  changeLocalization = ({ locale }) => {
    userLocalStorage.updateSettings({ language: locale });
    I18n.locale = locale || "en";
    updateMomentLocale();
  };

  t = I18n.t.bind(I18n);

  p = I18n.p.bind(I18n);

  setLocale = newLocale => {
    I18n.locale = newLocale;
  };

  getLocale = () => I18n.currentLocale();
}

export default new Localization();
