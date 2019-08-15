import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Platform, Keyboard } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { updateProfile, resetUsersAroundData } from "src/redux/profile/actions";
import { initSearchAddress } from "src/redux/searchAddress/actions";
import {
  View,
  Text,
  KeyboardAwareScrollView,
  TextArea,
  Separator,
  QueryCancelIcon
} from "src/components/basicComponents";
import {
  Screen,
  FormSection,
  FormTitle,
  FormInput,
  SimpleHeader
} from "src/components";
import { AwesomeIcon } from "src/assets/icons";
import {
  daytColors,
  daytFonts,
  daytFontWeights,
  uiConstants,
  commonStyles
} from "src/vars";
import { relationshipType, genderType, screenNames } from "src/vars/enums";
import { get } from "src/infra/utils";
import {
  translateDate,
  getBirthdateMinMax
} from "src/infra/utils/dateTimeUtils";
// import {
//   connect as connectInsta,
//   disconnect as disconnectInsta
// } from "src/infra/instagram";
import { navigationService } from "src/infra/navigation";
import { pluralTranslateWithZero } from "src/redux/utils/common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: daytColors.white,
    marginTop: uiConstants.NAVBAR_TOP_MARGIN
  },
  innerContainer: {
    flex: 1
  },
  horizontalElements: {
    flexDirection: "row"
  },
  leftInput: {
    marginRight: 10
  },
  rightInput: {
    marginLeft: 10
  },
  singleLineWrapper: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: daytColors.white
  },
  singleLineLeftText: {
    height: 22,
    fontFamily: daytFonts.medium,
    fontWeight: daytFontWeights.medium,
    fontSize: 15,
    lineHeight: 22,
    color: daytColors.black
  },
  singleLineRightText: {
    height: 22,
    fontSize: 15,
    lineHeight: 22.0,
    textAlign: "right",
    color: daytColors.black
  },
  singleLinePlaceholder: {
    height: 22,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "right",
    color: daytColors.buttonGrey
  },
  instagramRow: {
    paddingVertical: 18
  },
  instagramIcon: {
    marginRight: 10
  },
  journeyArrivalDateWrapper: {
    borderBottomWidth: 1,
    borderColor: daytColors.disabledGrey,
    paddingTop: 25,
    paddingBottom: 1,
    marginBottom: 10,
    flexGrow: 1
  },
  journeyArrivalDateLabel: {
    position: "absolute",
    left: Platform.select({ ios: 0, android: 4 }),
    color: daytColors.placeholderGrey,
    paddingBottom: 1,
    bottom: 8,
    fontSize: 16
  },
  journeyArrivalDateLabelWithValue: {
    bottom: 32,
    fontSize: 12
  },
  journeyArrivalDateText: {
    height: 35,
    lineHeight: 35,
    fontSize: 16,
    color: daytColors.black
  },
  bioWrapper: {
    height: 180,
    backgroundColor: daytColors.fillGrey,
    borderColor: daytColors.disabledGrey,
    borderWidth: 1,
    borderRadius: 5
  },
  bio: {
    height: "100%",
    fontSize: 15,
    lineHeight: 25,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    borderRadius: 5,
    backgroundColor: daytColors.fillGrey
  },
  cancelIcon: {
    top: 32
  }
});

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <SimpleHeader
          cancelAction={this.cancelEdit}
          doneAction={this.saveEdit}
          title="Edit Profile"
        />
        <KeyboardAwareScrollView
          style={styles.innerContainer}
          extraHeight={220}
          keyboardDismissMode={Platform.select({
            ios: "on-drag",
            android: "none"
          })}
        >
          <FormSection>
            <FormTitle>{I18n.t("profile.edit.basic_info")}</FormTitle>

            <View style={styles.horizontalElements}>
              <FormInput
                // value={form.firstName.value}
                // isValid={form.firstName.valid}
                // onChange={this.onChangeHandlerWrapper('firstName')}
                // errorText={form.firstName.errorText}
                // validations={[{ type: 'minLength', value: 2, errorText: I18n.t('common.form.min_chars', { minChars: 2 }) }]}
                label={I18n.t("profile.edit.first_name_placeholder")}
                style={styles.leftInput}
                // required
                // autoCorrect={false}
              />

              <FormInput
                // value={form.lastName.value}
                // isValid={form.lastName.valid}
                // onChange={this.onChangeHandlerWrapper('lastName')}
                // errorText={form.lastName.errorText}
                // validations={[{ type: 'minLength', value: 2, errorText: I18n.t('common.form.min_chars', { minChars: 2 }) }]}
                label={I18n.t("profile.edit.last_name_placeholder")}
                style={styles.rightInput}
                // required
                // autoCorrect={false}
              />
            </View>
          </FormSection>
          <Separator height={5} />
          {this.renderPersonalDetailsRow({
            onPressAction: this.navigateToEditBirthday,
            title: I18n.t("profile.edit.date_of_birth.title"),
            condition: "birthday",
            text1: "translateDate(birthday)",
            text2: I18n.t("profile.edit.date_of_birth.placeholder")
          })}
          <Separator height={5} />
          {this.renderPersonalDetailsRow({
            onPressAction: this.navigateToEditRelationship,
            title: I18n.t("profile.edit.relationship.title"),
            condition: "relationship !== relationshipType.UNKNOWN",
            text1: pluralTranslateWithZero(
              0 || 0,
              `profile.profile_relationship.${"relationship"}`,
              { count: 1 }
            ),
            text2: I18n.t("profile.edit.relationship.placeholder")
          })}
          <Separator height={5} />
          {this.renderPersonalDetailsRow({
            onPressAction: this.navigateToEditGender,
            title: I18n.t("profile.edit.gender.title"),
            condition: "gender !== genderType.UNKNOWN",
            text1: I18n.t(`profile.gender.${"gender"}`),
            text2: I18n.t("profile.edit.gender.placeholder")
          })}
          <Separator height={30} />
          {this.renderInstagramRow()}
          <Separator height={30} />
          <FormSection>
            <FormInput
              // value={form.workTitle.value}
              // isValid
              // onChange={this.onChangeHandlerWrapper('workTitle')}
              // errorText={''}
              // validations={[]}
              label={I18n.t("profile.edit.work.title_placeholder")}
              maxLength={40}
            />
            <FormInput
              // value={form.workPlace.value}
              // isValid
              // onChange={this.onChangeHandlerWrapper('workPlace')}
              // errorText={''}
              // validations={[]}
              label={I18n.t("profile.edit.work.place_placeholder")}
              maxLength={40}
              // isInitiallyFocused={focusField === "workplace"}
            />
          </FormSection>
          <Separator height={30} />
          <FormSection>
            <FormTitle>{I18n.t("profile.edit.my_journey.title")}</FormTitle>
            <TouchableOpacity
              // ref={this.setRef("origin")}
              onPress={this.onOriginPressed}
            >
              <View pointerEvents="none">
                <FormInput
                  // showLabelOnTop={!!form.origin.value}
                  // value={form.origin.value}
                  // isValid
                  // onChange={() => {}}
                  label={I18n.t("profile.edit.my_journey.origin_label")}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onCurrentlyLiveInPressed}>
              <View pointerEvents="none">
                <FormInput
                  // showLabelOnTop={!!form.currentlyLiveIn.value}
                  // value={form.currentlyLiveIn.value}
                  // isValid
                  // onChange={() => {}}
                  label={I18n.t("profile.edit.my_journey.current_label")}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.navigateToEditArrivalDate}
              style={styles.journeyArrivalDateWrapper}
            >
              <Text style={styles.journeyArrivalDateText}>
                translateDate(journeyArrivedDate)
              </Text>
              <Text
                style={[
                  styles.journeyArrivalDateLabel
                  // journeyArrivedDate && styles.journeyArrivalDateLabelWithValue
                ]}
              >
                {I18n.t("profile.edit.my_journey.arrival_date_header")}
              </Text>
            </TouchableOpacity>
          </FormSection>
          <Separator height={30} />
          <FormSection>
            <FormTitle>{I18n.t("profile.edit.bio.title")}</FormTitle>
            <View style={styles.bioWrapper}>
              <TextArea
                // ref={this.setRef('bio')}
                style={styles.bio}
                placeholder={I18n.t("profile.edit.bio.placeholder")}
                // onChange={(val) => this.setState({ bio: val })}
                // value={bio}
                maxLength={500}
                defaultHeight={Platform.select({ android: 180 })}
              />
            </View>
          </FormSection>
        </KeyboardAwareScrollView>
      </View>
    );
  }
  renderInstagramRow = () => {
    const { instagramToken } = this.props;
    // const isConnected = !!instagramToken;
    return (
      <TouchableOpacity
        style={[styles.singleLineWrapper, styles.instagramRow]}
        activeOpacity={1}
        // onPress={isConnected ? disconnectInsta : connectInsta}
      >
        <View style={commonStyles.flexDirectionRow}>
          <AwesomeIcon
            name="instagram"
            weight="brands"
            color={daytColors.darkGreyBlue}
            size={25}
            style={styles.instagramIcon}
          />
          <Text style={styles.singleLineLeftText}>
            {I18n.t("profile.edit.instagram.title")}
          </Text>
        </View>
        {/* {isConnected ? (
          <Text style={[styles.singleLineRightText, { color: daytColors.red }]}>{I18n.t('profile.edit.instagram.disconnect_btn')}</Text>
        ) : (
          <Text style={[styles.singleLineRightText, { color: daytColors.azure }]}>{I18n.t('profile.edit.instagram.connect_btn')}</Text>
        )} */}
      </TouchableOpacity>
    );
  };

  setRef = name => node => {
    this.fields[name] = node;
  };
  renderPersonalDetailsRow = ({
    onPressAction,
    title,
    condition,
    text1,
    text2,
    ref
  }) => (
    <TouchableOpacity
      style={styles.singleLineWrapper}
      activeOpacity={1}
      onPress={onPressAction}
      ref={ref}
    >
      <Text style={styles.singleLineLeftText}>{title}</Text>
      {condition ? (
        <Text style={styles.singleLineRightText}>{text1}</Text>
      ) : (
        <Text style={styles.singleLinePlaceholder}>{text2}</Text>
      )}
    </TouchableOpacity>
  );
  saveEdit = async () => {
    Keyboard.dismiss();
    const {
      data: {
        user: { id }
      },
      updateProfile,
      resetUsersAroundData
    } = this.props;
    const {
      form,
      journeyArrivedDate,
      birthday,
      showAge,
      relationship,
      numOfKids,
      showRelationship,
      gender,
      showGender,
      bio
    } = this.state;
    const {
      origin,
      currentlyLiveIn,
      firstName,
      lastName,
      workTitle,
      workPlace
    } = form;

    const canSubmitEdit = !Object.keys(form).some(
      key => form[key].isValid === false
    );
    if (!canSubmitEdit || this.donePressed) {
      return;
    }

    this.donePressed = true;
    const dataToSend = {
      user: {
        name: `${firstName.value} ${lastName.value}`,
        journey: {
          arrivedDate: journeyArrivedDate,
          originGoogleId: origin.googlePlaceId,
          origin: origin.value,
          currentlyLiveIn: currentlyLiveIn.value,
          currentlyLiveInId: currentlyLiveIn.id
        }
      },
      name: {
        firstName: firstName.value,
        lastName: lastName.value
      },
      workDetails: {
        title: workTitle.value,
        place: workPlace.value
      },
      birthday,
      relationship,
      numOfKids,
      gender,
      settings: {
        showAge,
        showRelationship,
        showGender
      },
      bio
    };

    updateProfile({ userId: id, delta: dataToSend });
    resetUsersAroundData({ userId: id });
    navigationService.goBack();
  };
  cancelEdit = () => {
    Keyboard.dismiss();
    navigationService.goBack();
  };
}
export default EditProfile;
