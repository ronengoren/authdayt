/* globals ErrorUtils __DEV__ */
import { Platform } from "react-native";
import StackTrace from "stacktrace-js";
import { Crashlytics } from "react-native-fabric";
import { assign } from "lodash";

const captureFatalExceptions = () => {
  if (__DEV__) {
    return;
  }

  const originalHandler = ErrorUtils.getGlobalHandler();

  const errorHandler = (e, isFatal) => {
    StackTrace.fromError(e, { offline: true }).then(x => {
      Crashlytics.recordCustomExceptionName(
        e.message,
        e.message,
        x.map(row =>
          assign({}, row, {
            fileName: `${row.fileName}:${row.lineNumber ||
              0}:${row.columnNumber || 0}`
          })
        )
      );
    });

    // And then re-throw the exception with the original handler
    if (originalHandler) {
      if (Platform.OS === "ios") {
        originalHandler(e, isFatal);
      } else {
        // On Android, throwing the original exception immediately results in the
        // recordCustomExceptionName() not finishing before the app crashes and therefore not logged
        // Add a delay to give it time to log the custom JS exception before crashing the app.
        // The user facing effect of this delay is that separate JS errors will appear as separate
        // issues in the Crashlytics dashboard.
        setTimeout(() => {
          originalHandler(e, isFatal);
        }, 5000);
      }
    }
  };

  ErrorUtils.setGlobalHandler(errorHandler);
};

captureFatalExceptions();
