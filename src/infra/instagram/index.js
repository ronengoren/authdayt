import axios from "axios";
import { navigationService } from "src/infra/navigation";
import { get } from "src/infra/utils";
import { medias } from "src/infra/localStorage";
import { getQueriesFromUrl } from "src/infra/utils/stringUtils";
import { screenNames, mediaTypes, videoStatus } from "src/vars/enums";
import config from "src/config";
import { updatePostMediaGallery, hidePost } from "src/redux/feed/actions";
import {
  setInstagramToken,
  deleteInstagramToken
} from "src/redux/profile/actions";

const redirectUrl = "https://www.ronengoren.com/";
const instagramUrl = config.providers.instagram.url;

const axiosInstance = axios.create({ baseURL: instagramUrl });

function connect() {
  const url = `${instagramUrl}/oauth/authorize/?client_id=${
    config.providers.instagram.clientId
  }&redirect_uri=${redirectUrl}&response_type=token`;
  navigationService.navigate(screenNames.WebView, {
    url,
    onUrlChange: handleInstaLoginSuccess
  });
}

function handleInstaLoginSuccess(url) {
  if (url.startsWith(redirectUrl)) {
    const token = getQueriesFromUrl(url).access_token;
    if (token) {
      navigationService.goBack();
      global.store.dispatch(setInstagramToken({ token }));
    }
  }
}

function disconnect() {
  global.store.dispatch(deleteInstagramToken());
}

async function fetchGallery({ token }) {
  const cachedGalleries = await medias.getInstagramGalleries();
  const cachedGalleryByToken = get(cachedGalleries, token);

  if (cachedGalleryByToken) {
    const shouldRevokeGallery = await medias.shouldRevokeGallery(token);
    if (shouldRevokeGallery) {
      await medias.removeInstagramGalleryFromCache(token);
      await fetchGallery({ token });
    }
    return cachedGalleryByToken.gallery;
  } else {
    const response = await axiosInstance.get(
      `/v1/users/self/media/recent?access_token=${token}`
    );
    const gallery = response.data.data;
    if (gallery.length) {
      const postProcessedGallery = gallery
        .filter(filterUnsupportedMedias)
        .map(postProcessGalleryItem);
      await medias.addInstagramGalleryToCache({
        token,
        gallery: postProcessedGallery
      });
      return postProcessedGallery;
    }
  }
  return [];
}

async function getUserInfo(token) {
  try {
    const response = await axiosInstance.get(
      `/v1/users/self?access_token=${token}`
    );
    const userInfo = response.data.data;
    return userInfo;
  } catch (err) {
    return [];
  }
}

async function getGallery({
  token,
  onLoading,
  onSuccess,
  onError,
  withUserInfo,
  postId
}) {
  try {
    const promises = [fetchGallery({ token, postId })];

    if (withUserInfo) {
      promises.push(getUserInfo(token));
    }

    onLoading && onLoading();
    const [gallery, user] = await Promise.all(promises);

    if (postId) {
      global.store.dispatch(
        updatePostMediaGallery({ postId, mediaGallery: gallery })
      );
      if (!gallery.length) {
        global.store.dispatch(hidePost(postId));
      }
    }

    onSuccess && onSuccess({ gallery, user });
  } catch (err) {
    if (postId) {
      global.store.dispatch(hidePost(postId));
    }

    onError && onError(err);
  }
}

const filterUnsupportedMedias = item =>
  [mediaTypes.VIDEO, mediaTypes.IMAGE].includes(item.type);

const postProcessGalleryItem = item => {
  const thumbnail = get(item, "images.standard_resolution.url");
  const formatMedia = media => {
    const { url, width, height } = media;
    return { ...item, url, thumbnail, width, height, ratio: width / height };
  };
  if (item.type === mediaTypes.IMAGE) {
    return formatMedia(item.images.standard_resolution);
  }
  if (item.type === mediaTypes.VIDEO) {
    return {
      ...formatMedia(item.videos.standard_resolution),
      videoStatus: videoStatus.ENCODING_COMPLETED
    };
  }
  return item;
};

export { connect, disconnect, getGallery, getUserInfo };
