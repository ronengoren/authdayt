// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { StyleSheet, TouchableOpacity } from "react-native";
// import I18n from "src/infra/localization";
// import { connect } from "react-redux";
// import { PostHeader, ListSummary, ActorBar } from "/components";
// import { EntityAction } from "src/components/entity";
// import {
//   View,
//   Text,
//   LoadingBackground,
//   DashedBorder,
//   MapImage
// } from "/components/basicComponents";
// import { InHoodLink } from "/components/neighborhoods";
// import { AwesomeIcon } from "/assets/icons";
// import { daytColors } from "/vars";
// import {
//   postTypes,
//   postSubTypes,
//   entityTypes,
//   dateAndTimeFormats,
//   screenNamesByEntityType,
//   screenNames,
//   originTypes,
//   componentNamesForAnalytics,
//   passivePostSubTypes
// } from "/vars/enums";
// import { get } from "/infra/utils";
// import { toCurrency, isRTL } from "/infra/utils/stringUtils";
// import {
//   getFormattedDateAndTime,
//   getDayAndMonth,
//   getDaysDifference
// } from "/infra/utils/dateTimeUtils";
// import { navigationService } from "/infra/navigation";
// import { InstagramProvider } from "/components/instagram";

// import PostContentMedia, { IMAGE_HEIGHT } from "./PostContentMedia";
// import PostContentMeta from "./PostContentMeta";
// import PostContentText from "./PostContentText";
// import PostContentMapMeta from "./PostContentMapMeta";
// import PostContentLocation from "./PostContentLocation";
// import PostContentLinkRow from "./PostContentLinkRow";

// const styles = StyleSheet.create({
//   scheduledPostBorder: {
//     borderBottomLeftRadius: 15,
//     borderBottomRightRadius: 15
//   },
//   outerWrapper: {
//     backgroundColor: daytColors.white
//   },
//   sharedEntityOuterWrapper: {
//     borderRadius: 15
//   },
//   alternatePostViewWrapper: {
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15
//   },
//   contentContainer: {
//     paddingHorizontal: 15
//   },
//   unavailableShare: {
//     padding: 15
//   },
//   listSummary: {
//     margin: 0
//   },
//   marginTop3: {
//     marginTop: 3
//   },
//   titleMargin: {
//     marginBottom: 3
//   },
//   detailsRow: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center"
//   },
//   detailsRowText: {
//     flex: 1
//   },
//   iconCompany: {
//     marginLeft: 1,
//     marginRight: 9,
//     lineHeight: 26
//   },
//   icon: {
//     marginRight: 9,
//     lineHeight: 26
//   },
//   iconClock: {
//     marginRight: 10,
//     lineHeight: 26
//   },
//   sharedPost: {
//     backgroundColor: daytColors.white
//   },
//   sharedPostText: {
//     paddingHorizontal: 15
//   },
//   sharedContainer: {
//     marginHorizontal: 10,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: daytColors.b90
//   },
//   eventDateAddressWrapper: {
//     marginBottom: 5
//   },
//   mediasWrapperWithBorderRadius: {
//     overflow: "hidden",
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15
//   },
//   marginBottom5: {
//     marginBottom: 5
//   },
//   marginBottom10: {
//     marginBottom: 10
//   },
//   dashedBorder: {
//     marginVertical: 10
//   },
//   actorBarWrapper: {
//     flexDirection: "row",
//     alignItems: "flex-start"
//   }
// });

// class PostContent extends Component {
//   static entityActionPosition = {
//     TOP: "top",
//     BOTTOM: "bottom"
//   };

//   static renderPostText = ({
//     id,
//     text,
//     mentions,
//     isPostPage,
//     contentType,
//     context,
//     isWithTopBorder,
//     isWithMarginBottom,
//     isSharedPostEntity,
//     numberOfLines
//   }) => {
//     const isSmallerMargin =
//       isSharedPostEntity ||
//       [(postTypes.SHARE, postTypes.STATUS_UPDATE)].includes(contentType);

//     const onlyMarginBottomStyle = { marginBottom: 8 };

//     return (
//       <React.Fragment>
//         {isWithTopBorder && (
//           <DashedBorder
//             style={
//               !isSmallerMargin ? styles.dashedBorder : onlyMarginBottomStyle
//             }
//             resizeMode="cover"
//           />
//         )}
//         <PostContentText
//           id={id}
//           text={text}
//           mentions={mentions}
//           isPostPage={isPostPage}
//           contentType={contentType}
//           context={context}
//           isWithMarginBottom={isWithMarginBottom}
//           numberOfLines={numberOfLines}
//         />
//       </React.Fragment>
//     );
//   };

//   render() {
//     const {
//       post: { payload }
//     } = this.props;

//     if (payload.postType === postTypes.SHARE) {
//       return this.renderSharedContent();
//     } else {
//       return this.renderContent({ isSharedContent: false });
//     }
//   }

//   renderSharedContent = () => {
//     const {
//       post,
//       post: { payload, sharedEntity, scheduledDate },
//       isPostPage,
//       originType
//     } = this.props;
//     const { entity, entityType, entityId } = sharedEntity;

//     if (!entity) {
//       return (
//         <View style={styles.unavailableShare}>
//           <Text bold style={styles.marginBottom5}>
//             {I18n.t("posts.content.not_available_share.header")}
//           </Text>
//           <Text>{I18n.t("posts.content.not_available_share.text")}</Text>
//         </View>
//       );
//     }

//     let sharedComponent;
//     if (entityType === entityTypes.LIST) {
//       sharedComponent = (
//         <ListSummary
//           style={styles.listSummary}
//           data={entity.id}
//           isShared
//           renderSavers={!scheduledDate}
//           originType={originType}
//         />
//       );
//     } else {
//       sharedComponent = this.renderContent({ isSharedContent: true });
//     }
//     return (
//       <View style={styles.sharedPost}>
//         {!!payload.text && (
//           <View style={styles.sharedPostText}>
//             {PostContent.renderPostText({
//               id: post.id,
//               text: post.payload.text,
//               mentions: post.mentions,
//               contentType: postTypes.SHARE,
//               isPostPage,
//               isWithTopBorder: true,
//               isWithMarginBottom: true,
//               isSharedPostEntity: true
//             })}
//           </View>
//         )}
//         <TouchableOpacity
//           onPress={() =>
//             this.navigateToEntityInPost({ contentType: entityType, entityId })
//           }
//           style={entityType === entityTypes.POST && styles.sharedContainer}
//           activeOpacity={1}
//         >
//           {entityType === entityTypes.POST && (
//             <PostHeader
//               post={entity.post}
//               showMenuBtn={false}
//               isPostPage={isPostPage}
//             />
//           )}
//           {sharedComponent}
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   renderContent = ({ isSharedContent }) => {
//     const {
//       post,
//       isPostPage,
//       isAlternatePostView,
//       isWithShareEntityActionButton,
//       origin,
//       originType,
//       usersHoodId,
//       onAnswerPress,
//       alignLocale
//     } = this.props;
//     const { context, sharedEntity } = post;
//     let data;
//     let { link } = post;
//     let mediaGallery = [];
//     let totalMediaItems;
//     let contentType;
//     let entityType;
//     let postSubType;
//     let tags = [];
//     let templateData = {};
//     let text;
//     let title;
//     let actor;
//     let url;
//     let mentions;
//     let location;
//     let page;
//     let isSharedPostEntity = false;
//     let postType;

//     if (
//       !isSharedContent ||
//       (isSharedContent && sharedEntity.entityType === entityTypes.POST)
//     ) {
//       data = get(sharedEntity, "entity.post") || post;
//       postType = get(data, "payload.postType");
//       if (
//         [postTypes.PASSIVE_POST, postTypes.RECOMMENDATION].includes(postType)
//       ) {
//         url = get(data, "link.url");
//       }

//       if (postType === postTypes.PASSIVE_POST) {
//         const templateData = get(data, "payload.templateData");
//         contentType = get(templateData, "entityType");
//         postSubType = get(data, "payload.postSubType");
//         if (!contentType && !entityType) {
//           contentType = postTypes.PASSIVE_POST;
//           entityType = entityTypes.POST;
//         }
//         if (templateData) {
//           data = {
//             ...templateData.entity,
//             mapUrl: data.mapUrl
//           };
//         }

//         ({ media: mediaGallery = [], title, location, page } = data);
//         totalMediaItems = 1;
//       } else {
//         ({ mentions, tags, actor, link } = data);
//         ({
//           mediaGallery,
//           totalMediaItems,
//           postSubType,
//           title,
//           text,
//           postType: contentType,
//           location,
//           page
//         } = data.payload);
//         entityType = entityTypes.POST;
//         templateData = data.payload.templateData || {};
//       }
//       isSharedPostEntity = isSharedContent;
//     } else if (isSharedContent) {
//       data = {
//         ...(sharedEntity.entity[sharedEntity.entityType] ||
//           sharedEntity.entity),
//         scheduledDate: post.scheduledDate
//       };

//       mediaGallery = [data.media];
//       totalMediaItems = mediaGallery.length;
//       ({ location, page } = data);
//       contentType = sharedEntity.entityType;
//       if (sharedEntity.entityType === entityTypes.PAGE) {
//         data = { ...data, follows: sharedEntity.entity.follows };
//         title = sharedEntity.entity.page.name;
//       }
//       if (sharedEntity.entityType === entityTypes.GROUP) {
//         title = sharedEntity.entity.name;
//       }
//       if (sharedEntity.entityType === entityTypes.EVENT) {
//         title = sharedEntity.entity.name;
//       }
//       ({ tags } = data);
//     }

//     entityType = entityType || contentType;

//     if (contentType === entityTypes.PAGE) {
//       location = get(data, "address");
//       url = get(data, "website");
//     }

//     const {
//       id,
//       description,
//       about,
//       privacyType,
//       startTime,
//       address,
//       mapUrl,
//       scheduledDate
//     } = data;
//     const hasMedia = !!(
//       (mediaGallery.length && !!get(mediaGallery, "0.url")) ||
//       link
//     );
//     const { price, company, size, rooms, startDate, endDate } = templateData;
//     const companyName = postSubType === postSubTypes.OFFERING && company;
//     const postText = about || description || text;

//     const active = get(data, "payload.active", true);

//     const showMapWithMeta =
//       ![passivePostSubTypes.INSTAGRAM_CONNECT].includes(postSubType) &&
//       [
//         entityTypes.LIST_ITEM,
//         postTypes.PASSIVE_POST,
//         postTypes.RECOMMENDATION
//       ].includes(postType);
//     const isWithMapImage =
//       !!mapUrl && isPostPage && [postTypes.REAL_ESTATE].includes(contentType);
//     const isWithAnyMeta =
//       !!startDate ||
//       !!endDate ||
//       (!!location && (location.fullAddress || location.placeName)) ||
//       !!isInUserHood ||
//       !!url ||
//       !!companyName ||
//       !!(size && rooms) ||
//       (!!address && (address.fullAddress || address.placeName));
//     const isPassivePost = postType === postTypes.PASSIVE_POST;
//     const isWithTopBorder =
//       !isPassivePost &&
//       ![
//         postTypes.PROMOTION,
//         postTypes.TIP_REQUEST,
//         postTypes.RECOMMENDATION
//       ].includes(contentType);

//     const isInUserHood =
//       (!!usersHoodId &&
//         !!(
//           page &&
//           page.inHood &&
//           page.inHood.find(hood => hood.neighborhoodId === usersHoodId)
//         )) ||
//       !!(
//         data.inHood &&
//         data.inHood.find(hood => hood.neighborhoodId === usersHoodId)
//       );
//     const isClickable = !isPostPage && !scheduledDate && active;
//     const isInstagramConnected =
//       postType === postTypes.PASSIVE_POST &&
//       postSubType === passivePostSubTypes.INSTAGRAM_CONNECT;
//     const isPostWithTitle = ![
//       postTypes.STATUS_UPDATE,
//       postTypes.TIP_REQUEST
//     ].includes(contentType);
//     const isTextWithMarginBottom =
//       hasMedia && [postTypes.STATUS_UPDATE].includes(contentType);
//     const isMediasWithMarginBottom = [entityTypes.EVENT].includes(contentType);
//     const isRecommandationWithMap =
//       showMapWithMeta && contentType === postTypes.RECOMMENDATION;
//     const isPostWithoutTextPreview =
//       contentType === entityTypes.EVENT ||
//       (!isPostPage &&
//         !isSharedContent &&
//         [
//           entityTypes.EVENT,
//           postTypes.REAL_ESTATE,
//           postTypes.GIVE_TAKE
//         ].includes(contentType));
//     const isWithDefaultPlaceholderImage =
//       [postTypes.REAL_ESTATE].includes(postType) ||
//       ((isPostPage || [originTypes.POST_RESULT].includes(originType)) &&
//         [postTypes.GIVE_TAKE, postTypes.JOB, postTypes.GUIDE].includes(
//           postType
//         ));
//     const isActivePost = !scheduledDate && !!active;
//     const isRtl = alignLocale && isRTL(title);

//     const textComponent =
//       postText && !isPostWithoutTextPreview
//         ? PostContent.renderPostText({
//             id: data.id,
//             text: postText,
//             mentions,
//             isPostPage,
//             contentType,
//             context,
//             isWithTopBorder: !!isWithTopBorder,
//             isWithMarginBottom:
//               !isActivePost || isTextWithMarginBottom || isWithMapImage,
//             isSharedPostEntity
//           })
//         : null;

//     const entityActionPosition =
//       isPostPage &&
//       [postTypes.JOB, postTypes.REAL_ESTATE, postTypes.GIVE_TAKE].includes(
//         contentType
//       )
//         ? PostContent.entityActionPosition.TOP
//         : PostContent.entityActionPosition.BOTTOM;

//     const PostContentMediasComponent = isInstagramConnected ? (
//       <InstagramProvider
//         postId={post.id}
//         token={data.instagramToken}
//         LoadingComponent={
//           <LoadingBackground
//             backgroundColor={daytColors.white}
//             height={IMAGE_HEIGHT}
//           />
//         }
//       >
//         {({ gallery }) => (
//           <PostContentMedia
//             mediaGallery={gallery}
//             totalMediaItems={get(gallery, "length")}
//             contentType={contentType}
//             isPostPage={isPostPage}
//           />
//         )}
//       </InstagramProvider>
//     ) : (
//       <View
//         style={[
//           isAlternatePostView &&
//             !isPostPage &&
//             styles.mediasWrapperWithBorderRadius,
//           isMediasWithMarginBottom && styles.marginBottom10
//         ]}
//       >
//         <PostContentMedia
//           isWithDefaultPlaceholderImage={isWithDefaultPlaceholderImage}
//           mediaGallery={mediaGallery}
//           totalMediaItems={totalMediaItems}
//           link={link}
//           contentType={contentType}
//           isSharedPostEntity={isSharedPostEntity}
//           isPostPage={isPostPage}
//           postId={id}
//         />
//       </View>
//     );

//     const EntityActionComponent = isActivePost && (
//       <EntityAction
//         data={data}
//         actor={actor}
//         context={context}
//         contextPost={post}
//         isSharedPostEntity={isSharedPostEntity}
//         isPostPage={isPostPage}
//         contentType={contentType}
//         entityType={entityType}
//         size={EntityAction.sizes.BIG}
//         originType={originType}
//         componentName={componentNamesForAnalytics.FEED_ITEM}
//         isInUserHood={isInUserHood}
//         onAnswerPress={onAnswerPress}
//         isWithShareEntityActionButton={isWithShareEntityActionButton}
//       />
//     );

//     return (
//       <TouchableOpacity
//         onPress={
//           isClickable
//             ? () => this.navigateToEntityInPost({ contentType, entityId: id })
//             : null
//         }
//         activeOpacity={1}
//       >
//         <View
//           style={[
//             styles.outerWrapper,
//             isSharedPostEntity && styles.sharedEntityOuterWrapper,
//             isAlternatePostView && styles.alternatePostViewWrapper,
//             !!scheduledDate && styles.scheduledPostBorder
//           ]}
//         >
//           {contentType === postTypes.STATUS_UPDATE && (
//             <View style={styles.contentContainer}>{textComponent}</View>
//           )}
//           {PostContentMediasComponent}
//           <View>
//             <View style={isRecommandationWithMap && styles.marginBottom5}>
//               <PostContentMeta
//                 isRtl={isRtl}
//                 tags={tags}
//                 isPostPage={isPostPage}
//                 contentType={contentType}
//                 postSubType={postSubType}
//                 context={context}
//                 privacyType={privacyType}
//                 hasMedia={hasMedia}
//                 origin={origin}
//                 originType={originType}
//                 price={toCurrency(price, this.props.currency)}
//               />
//             </View>
//             {showMapWithMeta ? (
//               <View style={!!textComponent && styles.marginBottom10}>
//                 <PostContentMapMeta
//                   url={url}
//                   title={title}
//                   TitleComponent={this.renderTitle({
//                     title,
//                     isPostPage,
//                     isRtl: false
//                   })}
//                   location={location}
//                   mapUrl={mapUrl}
//                   isPostPage={isPostPage}
//                   contentType={contentType}
//                 />
//               </View>
//             ) : (
//               <View>
//                 {isPostWithTitle &&
//                   this.renderPostTitle({
//                     title,
//                     isAlternatePostView,
//                     isPostPage,
//                     post,
//                     isRtl
//                   })}
//                 {entityActionPosition ===
//                   PostContent.entityActionPosition.TOP &&
//                   this.renderEntityAction({
//                     EntityActionComponent,
//                     isPostPage,
//                     isWithShareEntityActionButton,
//                     isActivePost
//                   })}
//                 {this.renderPostContentDetails(
//                   {
//                     startDate,
//                     endDate,
//                     location,
//                     title,
//                     isInUserHood,
//                     url,
//                     companyName,
//                     size,
//                     rooms,
//                     startTime,
//                     address
//                   },
//                   isWithAnyMeta
//                 )}
//               </View>
//             )}
//             {contentType !== postTypes.STATUS_UPDATE && (
//               <View style={styles.contentContainer}>{textComponent}</View>
//             )}
//           </View>
//           {entityActionPosition === PostContent.entityActionPosition.BOTTOM &&
//             this.renderEntityAction({
//               EntityActionComponent,
//               isPostPage,
//               isWithShareEntityActionButton,
//               isActivePost
//             })}

//           {isWithMapImage && (
//             <MapImage
//               mapUrl={mapUrl}
//               location={address || location}
//               title={title}
//             />
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   renderPostTitle = ({
//     post,
//     title,
//     isAlternatePostView,
//     isPostPage,
//     isRtl
//   }) => (
//     <View style={styles.contentContainer}>
//       {!!title && this.renderTitle({ title, isPostPage, isRtl })}
//       {isAlternatePostView && (
//         <View style={[styles.marginTop3, styles.actorBarWrapper]}>
//           <ActorBar post={post} alignLocale />
//         </View>
//       )}
//     </View>
//   );

//   renderEntityAction = ({
//     EntityActionComponent,
//     isPostPage,
//     isWithShareEntityActionButton,
//     isActivePost
//   }) => (
//     <React.Fragment>
//       {isPostPage && isWithShareEntityActionButton && isActivePost && (
//         <View style={styles.contentContainer}>
//           <DashedBorder style={styles.dashedBorder} />
//         </View>
//       )}
//       {EntityActionComponent}
//     </React.Fragment>
//   );

//   renderTitle = ({ title, isPostPage, isRtl }) => (
//     <Text
//       size={isPostPage ? 22 : 20}
//       lineHeight={26}
//       color={daytColors.b30}
//       style={[isPostPage && styles.titleMargin]}
//       bold
//       numberOfLines={isPostPage ? 0 : 2}
//       alignLocale={isRtl}
//       forceLTR
//       testID={title}
//     >
//       {title}
//     </Text>
//   );

//   renderPostContentDetails = (postDetails, isWithAnyMeta) => {
//     const {
//       startDate,
//       endDate,
//       location,
//       title,
//       isInUserHood,
//       url,
//       companyName,
//       size,
//       rooms,
//       startTime,
//       address
//     } = postDetails;

//     return (
//       <View style={styles.contentContainer}>
//         {isWithAnyMeta && <DashedBorder style={styles.dashedBorder} />}
//         {!!startDate && !!endDate && this.renderDates({ startDate, endDate })}
//         {isInUserHood && <InHoodLink />}
//         {!!location && this.renderLocation({ location, title })}
//         {!!url && this.renderUrl({ url })}
//         {!!companyName && this.renderCompanyName({ companyName })}
//         {!!(size || rooms) && this.renderSizeAndRooms({ size, rooms })}
//         {!!startTime &&
//           this.renderDateAndLocation({ startTime, address, title })}
//       </View>
//     );
//   };

//   renderDates = ({ startDate, endDate }) => (
//     <View style={styles.detailsRow}>
//       <AwesomeIcon
//         name="calendar-check"
//         style={styles.icon}
//         color={daytColors.b70}
//         size={12}
//         weight="solid"
//       />
//       <Text
//         size={16}
//         lineHeight={26}
//         color={daytColors.b30}
//         numberOfLines={1}
//         forceLTR
//       >
//         {getDayAndMonth(startDate)} - {getDayAndMonth(endDate)}{" "}
//         <Text
//           size={16}
//           lineHeight={26}
//           color={daytColors.b60}
//           numberOfLines={1}
//           forceLTR
//         >
//           (
//           {I18n.t("posts.real_estate.number_of_nights", {
//             nights: getDaysDifference(startDate, endDate)
//           })}
//           )
//         </Text>
//       </Text>
//     </View>
//   );

//   renderLocation = ({ location, title }) => (
//     <PostContentLocation location={location} title={title} />
//   );

//   renderUrl = ({ url }) => <PostContentLinkRow url={url} />;

//   renderCompanyName = ({ companyName }) => (
//     <View style={styles.detailsRow}>
//       <AwesomeIcon
//         name="building"
//         style={styles.iconCompany}
//         color={daytColors.b70}
//         size={12}
//         weight="solid"
//       />
//       <Text
//         size={16}
//         lineHeight={26}
//         color={daytColors.b30}
//         numberOfLines={1}
//         forceLTR
//         style={styles.detailsRowText}
//       >
//         {companyName}
//       </Text>
//     </View>
//   );

//   renderSizeAndRooms = ({ size, rooms }) => (
//     <View style={styles.detailsRow}>
//       <AwesomeIcon
//         name="building"
//         style={styles.iconCompany}
//         color={daytColors.b70}
//         size={12}
//         weight="solid"
//       />
//       <Text size={16} lineHeight={26} numberOfLines={1} forceLTR>
//         {!!size && (
//           <Text size={16} lineHeight={26} color={daytColors.b30}>
//             {I18n.t("posts.real_estate.size", { size })}
//           </Text>
//         )}
//         {!!(size && rooms) && (
//           <Text size={16} lineHeight={26} color={daytColors.b30}>
//             {" · "}
//           </Text>
//         )}
//         {!!rooms && (
//           <Text size={16} lineHeight={26} color={daytColors.b30}>
//             {I18n.p(rooms, "posts.real_estate.rooms")}
//           </Text>
//         )}
//       </Text>
//     </View>
//   );

//   renderDateAndLocation = ({ startTime, address }) => (
//     <View style={styles.eventDateAddressWrapper}>
//       <View style={styles.detailsRow}>
//         <AwesomeIcon
//           name="clock"
//           style={styles.iconClock}
//           color={daytColors.b70}
//           size={12}
//           weight="solid"
//         />
//         <Text size={16} lineHeight={26} color={daytColors.b30}>
//           {getFormattedDateAndTime(
//             startTime,
//             dateAndTimeFormats.eventDayMonthTime
//           )}
//         </Text>
//       </View>
//       {address && this.renderLocation({ location: address })}
//     </View>
//   );

//   navigateToEntityInPost = ({ contentType, entityId }) => {
//     const {
//       post: {
//         payload: { pageId }
//       }
//     } = this.props;
//     const entityType = Object.values(entityTypes).includes(contentType)
//       ? contentType
//       : entityTypes.POST;
//     if (pageId) {
//       navigationService.navigate(screenNames.PageView, {
//         entityId: pageId,
//         reviewId: entityId
//       });
//     } else {
//       navigationService.navigate(screenNamesByEntityType[entityType], {
//         entityId
//       });
//     }
//   };
// }

// PostContent.propTypes = {
//   post: PropTypes.object,
//   isWithShareEntityActionButton: PropTypes.bool,
//   isAlternatePostView: PropTypes.bool,
//   isPostPage: PropTypes.bool,
//   alignLocale: PropTypes.bool,
//   origin: PropTypes.string,
//   originType: PropTypes.oneOf(Object.values(originTypes)),
//   onAnswerPress: PropTypes.func,
//   usersHoodId: PropTypes.string,
//   currency: PropTypes.string
// };

// const mapStateToProps = state => ({
//   usersHoodId: get(state, "auth.user.journey.neighborhood.id", ""),
//   currency: state.auth.user.community.destinationPricing.currencyCode
// });

// PostContent = connect(mapStateToProps)(PostContent);
// export default PostContent;
