import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Keyboard } from "react-native";
import { connect } from "react-redux";
import {
  TextArea,
  SquareIconButton,
  View,
  TextButton,
  IconButton,
  Image,
  BadgeIcon,
  ProgressBar
} from "src/components/basicComponents";
// import { NativeMediaPicker } from '/infra/media';
import { upload, cancelUpload } from "src/redux/uploads/actions";
import { daytColors } from "src/vars";
import { mediaTypes, screenStateTypes } from "src/vars/enums";
import { getFilePathFromLocalUri } from "src/infra/utils";

const INITIAL_FORM_HEIGHT = 51;
const LINE_HEIGHT = 18.5;

const styles = StyleSheet.create({
  messageInputWrapper: {
    flex: 0,
    minHeight: INITIAL_FORM_HEIGHT,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 11,
    borderTopColor: daytColors.disabledGrey,
    borderTopWidth: 1,
    backgroundColor: daytColors.white
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    marginRight: 5,
    alignSelf: "center"
  },
  submitButton: {
    marginVertical: 5
  },
  submitTextButton: {
    marginVertical: 10,
    alignSelf: "flex-end"
  },
  icon: {
    marginRight: 15,
    marginBottom: 10,
    alignSelf: "flex-end"
  },
  previewImage: {
    alignSelf: "flex-end",
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: daytColors.greyB90,
    width: 50,
    height: 50
  }
});

class TextForm extends Component {
  constructor(props) {
    super(props);

    this.maxFormHeight = LINE_HEIGHT * props.maxLines;

    this.state = {
      activeUploadId: null,
      localUri: null,
      submitted: false,
      resetAutoCorrect: false, // eslint-disable-line react/no-unused-state
      autoCorrect: true,
      screenState: screenStateTypes.COMPOSE
    };
  }

  render() {
    const { activeUploadId, screenState } = this.state;
    const {
      form,
      placeholder,
      withMentions,
      withImage,
      autoFocus,
      uploads
    } = this.props;
    const { text } = form.state;
    const { localUri, autoCorrect } = this.state;
    const upload = uploads[activeUploadId];
    const isProgressBarShown =
      upload && screenState === screenStateTypes.UPLOAD;

    return (
      <View>
        {isProgressBarShown && (
          <ProgressBar progress={upload.progress} color={daytColors.green} />
        )}
        <View style={styles.messageInputWrapper}>
          {withImage &&
            (localUri ? (
              [
                <Image
                  key="previewImage"
                  source={{ uri: localUri }}
                  style={styles.previewImage}
                />,
                <BadgeIcon
                  key="previewImageBadge"
                  icon="close"
                  onPress={this.removeImage}
                />
              ]
            ) : (
              <IconButton
                iconSize={25}
                name="camera"
                style={styles.icon}
                onPress={this.handleCameraButtonPress}
              />
            ))}
          <TextArea
            style={styles.messageInput}
            onChange={this.onInputChanged}
            value={text}
            placeholder={placeholder}
            maxHeight={this.maxFormHeight}
            defaultHeight={25}
            ref={node => {
              this.textArea = node;
            }}
            spellCheck
            withMentions={withMentions}
            autoCorrect={autoCorrect}
            autoFocus={autoFocus}
          />
          {this.renderButton()}
        </View>
      </View>
    );
  }

  static getDerivedStateFromProps(props, state) {
    // Fixing a bug that happens on Android with autocorrect keyboard. Looks like
    // the keyboard is not being reset after the text is cleared. so switching the autocorrect off
    // and then back on does the trick: https://github.com/facebook/react-native/pull/12462#issuecomment-298812731
    if (!props.form.state.text && state.resetAutoCorrect) {
      return { autoCorrect: false, resetAutoCorrect: false };
    } else if (!state.autoCorrect) {
      return { autoCorrect: true };
    }
    return null;
  }

  componentDidMount() {
    const { updatedText, form } = this.props;

    if (updatedText && updatedText.length) {
      form.onChange({ text: updatedText });
    }
  }

  componentDidUpdate(prevProps) {
    const { form, text, updatedText } = this.props;
    if (prevProps.text !== text) {
      form.onChange({ text });
    }

    const isTextEmpty = !(prevProps.text && prevProps.text.length);
    if (isTextEmpty && prevProps.updatedText !== updatedText) {
      form.onChange({ text: updatedText });
    }
  }

  renderButton() {
    const { form, btnIconName, btnText, forceDisable } = this.props;
    const { text } = form.state;
    const { localUri, submitted } = this.state;
    const isSubmitButtonDisabled =
      forceDisable || ((!text || !text.length) && !localUri) || submitted;

    if (btnText) {
      return (
        <TextButton
          size="medium"
          disabled={isSubmitButtonDisabled}
          style={styles.submitTextButton}
          onPress={this.handleSubmit}
        >
          {btnText}
        </TextButton>
      );
    }

    return (
      <SquareIconButton
        iconName={btnIconName}
        size="large"
        disabled={isSubmitButtonDisabled}
        onPress={this.handleSubmit}
        style={styles.submitButton}
      />
    );
  }

  onInputChanged = text => {
    const { form, onChange } = this.props;

    form.onChange({ text });
    onChange && onChange(text);
  };

  handleCameraButtonPress = async () => {
    const { upload, onMediaChooseStart, onMediaChooseEnd } = this.props;
    onMediaChooseStart && onMediaChooseStart();
    const res = await NativeMediaPicker.show({ mediaType: mediaTypes.IMAGE });
    onMediaChooseEnd && onMediaChooseEnd();
    if (!res) return;

    const { localUri, fileName } = res;
    this.setState({ localUri });
    this.focus();

    const filePath = getFilePathFromLocalUri(localUri);
    const { url } = await upload({
      entityType: "comment",
      fileName,
      filePath,
      onStart: id => this.setState({ activeUploadId: id }),
      onFinish: () => this.setState({ activeUploadId: null })
    });

    if (url) {
      this.props.form.onChange({ mediaUrl: url });
      if (this.state.screenState === screenStateTypes.UPLOAD) {
        this.handleSubmit();
      }
    }
  };

  handleSubmit = async () => {
    const { activeUploadId, localUri } = this.state;
    const { onPress, form, dismissKeyboard, onChange } = this.props;

    if (activeUploadId) {
      this.setState({ screenState: screenStateTypes.UPLOAD, submitted: true });
    } else {
      this.setState({
        screenState: screenStateTypes.SUBMITTING,
        submitted: true
      });
      try {
        await onPress({ text: form.state.text, mediaUrl: form.state.mediaUrl });
        this.setState({ submitted: false, resetAutoCorrect: true }); // eslint-disable-line react/no-unused-state
        form.onReset();
        onChange && onChange("");
        if (localUri) {
          this.setState({ localUri: null });
        }
        dismissKeyboard && Keyboard.dismiss();
      } catch (e) {
        this.setState({ submitted: false });
      }
    }
  };

  reset() {
    this.props.form.onReset();
  }

  focus() {
    return this.textArea.getWrappedInstance().focus();
  }

  blur() {
    return this.textArea.getWrappedInstance().blur();
  }

  removeImage = () => {
    this.setState({
      localUri: null,
      screenState: screenStateTypes.COMPOSE,
      submitted: false
    });
    this.props.form.onChange({ mediaUrl: null });
    this.cancelUpload();
  };

  cancelUpload = () => {
    const { activeUploadId } = this.state;
    const { cancelUpload } = this.props;

    if (activeUploadId) {
      cancelUpload({ uploadId: activeUploadId });
    }
  };
}

TextForm.defaultProps = {
  btnIconName: "send",
  maxLines: 5,
  dismissKeyboard: true,
  autoFocus: false
};

TextForm.propTypes = {
  form: PropTypes.object,
  onChange: PropTypes.func,
  onPress: PropTypes.func.isRequired,
  btnIconName: PropTypes.string,
  btnText: PropTypes.string,
  placeholder: PropTypes.string,
  maxLines: PropTypes.number,
  text: PropTypes.string,
  updatedText: PropTypes.string,
  dismissKeyboard: PropTypes.bool,
  withMentions: PropTypes.bool,
  withImage: PropTypes.bool,
  autoFocus: PropTypes.bool,
  forceDisable: PropTypes.bool,
  cancelUpload: PropTypes.func,
  upload: PropTypes.func,
  uploads: PropTypes.object
};

// const mapStateToProps = state => ({
//   uploads: state.uploads
// });

// const mapDispatchToProps = {
//   upload,
//   cancelUpload
// };

// TextForm = connect(
//   mapStateToProps,
//   mapDispatchToProps,
//   null,
//   { withRef: true }
// )(TextForm);
export default TextForm;
