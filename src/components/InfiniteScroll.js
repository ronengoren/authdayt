import React from "react";
import PropTypes from "prop-types";
import { FlatList, StyleSheet, View, VirtualizedList } from "react-native";
import { connect } from "react-redux";
// import { fetchBottom, fetchTop } from '/redux/InfiniteScroll/actions';
import { get, isNil } from "src/infra/utils";
import { Spinner } from "src/components/basicComponents";
import { ScrollItemErrorBoundary } from "src/components";
import { stylesScheme } from "src/schemas";

const listTypes = {
  BASIC: "basic",
  FLAT: "flat"
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20
  },
  spinner: {
    marginTop: "20%" // TODO: temporary solution
  }
});

class InfiniteScroll extends React.Component {
  state = {
    throwError: null,
    isFirstDataLoaded: false
  };

  render() {
    const {
      listType = listTypes.BASIC,
      horizontal,
      keyExtractor,
      data,
      isFetchingTop,
      onRef,
      onLayout,
      numColumns,
      disableRefresh,
      extraData,
      addedData,
      getItemLayout,
      onScroll,
      ListHeaderComponent,
      stickyHeader,
      contentContainerStyle,
      keyboardDismissMode,
      viewabilityConfig,
      onViewableItemsChanged,
      extraTopComponent,
      showRefreshingSpinner,
      ListLoadingComponent
    } = this.props;
    const { isFirstDataLoaded } = this.state;

    let adjustedData = data
      ? [...data]
      : [{ component: this.renderListEmptyComponent(), nonListItem: true }];
    if (extraTopComponent && data) {
      adjustedData = [
        { component: extraTopComponent, nonListItem: true },
        ...adjustedData
      ];
    }
    if (addedData) {
      adjustedData = [...addedData, ...adjustedData];
    }
    if (stickyHeader) {
      adjustedData = [
        { component: stickyHeader, nonListItem: true },
        ...adjustedData
      ];
    }

    let stickyHeaderIndices;
    if (stickyHeader) {
      stickyHeaderIndices = ListHeaderComponent ? [1] : [0];
    }

    const allowSpinner = ListLoadingComponent ? !!isFirstDataLoaded : true;
    const refreshing =
      showRefreshingSpinner &&
      allowSpinner &&
      !!data &&
      !!data.length &&
      isFetchingTop;

    if (listType === listTypes.BASIC) {
      return (
        <VirtualizedList
          onLayout={onLayout}
          ref={this.handleFeedRef}
          data={adjustedData}
          renderItem={this.renderItem}
          keyExtractor={keyExtractor}
          // onRefresh={!disableRefresh && this.fetchTop}
          refreshing={refreshing}
          // onEndReached={this.fetchBottom}
          onEndReachedThreshold={2}
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={ListHeaderComponent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode={keyboardDismissMode}
          getItemCount={data => (data ? data.length : 0)}
          getItem={(data, index) => data[index]}
          ListEmptyComponent={this.renderListEmptyComponent()}
          extraData={extraData}
          onScroll={onScroll}
          scrollEventThrottle={50}
          horizontal={horizontal}
          stickyHeaderIndices={stickyHeaderIndices}
          contentContainerStyle={contentContainerStyle}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      );
    }

    return (
      <FlatList
        onLayout={onLayout}
        ref={onRef}
        data={data}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        // onRefresh={!disableRefresh && this.fetchTop}
        refreshing={refreshing}
        // onEndReached={this.fetchBottom}
        onEndReachedThreshold={2}
        ListFooterComponent={this.renderFooter}
        ListHeaderComponent={ListHeaderComponent}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode={keyboardDismissMode}
        numColumns={numColumns}
        ListEmptyComponent={this.renderListEmptyComponent()}
        extraData={extraData}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        onScroll={onScroll}
        scrollEventThrottle={50}
        contentContainerStyle={contentContainerStyle}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    );
  }

  // componentDidMount() {
  //   const { disableInitialFetch } = this.props;
  //   !disableInitialFetch && this.fetchTop({ isInitialFetch: true });
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.state.throwError) {
  //     throw this.state.throwError;
  //   }

  //   const { onUpdate, data } = this.props;
  //   if (typeof onUpdate === "function") {
  //     onUpdate(data);
  //   }

  //   if (
  //     JSON.stringify(this.props.apiQuery) !==
  //       JSON.stringify(prevProps.apiQuery) &&
  //     !data
  //   ) {
  //     this.fetchTop({ apiQueryChanged: true });
  //   }
  // }

  renderItem = ({ item, index }) => {
    const {
      stickyHeader,
      extraTopComponent,
      ListItemComponent,
      listItemProps = {}
    } = this.props;
    const hasStickyHeader = !!stickyHeader;
    const hasExtraTopComponent = !!extraTopComponent;
    if (item.nonListItem) {
      return item.component;
    }

    return (
      <ScrollItemErrorBoundary key="scrollItem" boundaryName="scrollItem">
        <ListItemComponent
          data={item}
          index={index}
          hasExtraTopComponent={hasExtraTopComponent}
          hasStickyHeader={hasStickyHeader}
          {...listItemProps}
        />
      </ScrollItemErrorBoundary>
    );
  };

  renderListEmptyComponent = () => {
    const { isListErrorShown } = this.state;
    const {
      data,
      ListEmptyComponent,
      ListLoadingComponent,
      ListErrorComponent,
      horizontal,
      totalCount
    } = this.props;

    if (isListErrorShown) {
      return ListErrorComponent;
    } else if (!ListLoadingComponent && !data) {
      if (horizontal) {
        return null;
      }
      return <Spinner style={styles.spinner} size="large" key="loader" />;
    } else if (
      (isNil(totalCount) || totalCount === 0) &&
      data &&
      data.length === 0
    ) {
      return ListEmptyComponent;
    } else {
      return ListLoadingComponent;
    }
  };

  //   renderFooter = () => {
  //     const {
  //       horizontal,
  //       isFetchingBottom,
  //       hasMore,
  //       ListFooterComponent
  //     } = this.props;
  //     if (!horizontal && isFetchingBottom && hasMore) {
  //       return (
  //         <View style={styles.footer}>
  //           <Spinner size="large" />
  //           {ListFooterComponent}
  //         </View>
  //       );
  //     }
  //     return ListFooterComponent;
  //   };

  //   fetchTop = async ({ isInitialFetch, apiQueryChanged } = {}) => {
  //     const {
  //       normalizedSchema,
  //       reducerStatePath,
  //       apiQuery,
  //       fetchTop,
  //       resetDataOnFetchTop,
  //       data,
  //       onTopFetchAction,
  //       ListErrorComponent
  //     } = this.props;
  //     const { isFirstDataLoaded } = this.state;

  //     this.setState({
  //       isListErrorShown: false,
  //       isFirstDataLoaded: apiQueryChanged ? false : isFirstDataLoaded
  //     });

  //     try {
  //       await fetchTop({
  //         normalizedSchema,
  //         reducerStatePath,
  //         query: apiQuery,
  //         resetData: resetDataOnFetchTop
  //       });
  //       if (isInitialFetch) {
  //         this.setState({ isFirstDataLoaded: true });
  //       }
  //       data && onTopFetchAction && onTopFetchAction({ isInitialFetch });
  //     } catch (err) {
  //       // In case we already have something in the list - don't fail the entire list
  //       if (!data || !data.length) {
  //         if (ListErrorComponent) {
  //           this.setState({ isListErrorShown: true });
  //         } else {
  //           this.setState({ throwError: err });
  //         }
  //       }
  //     }
  //   };

  // fetchBottom = () => {
  //   const {
  //     normalizedSchema,
  //     reducerStatePath,
  //     apiQuery,
  //     fetchBottom,
  //     isFetchingBottom,
  //     disableFetchBottom
  //   } = this.props;
  //   !isFetchingBottom &&
  //     !disableFetchBottom &&
  //     fetchBottom({ normalizedSchema, reducerStatePath, query: apiQuery });
  // };

  handleFeedRef = node => {
    setImmediate(() => {
      if (node) {
        this.listComponentRef = node;
        const { onRef } = this.props;
        onRef && onRef(node);
      }
    });
  };

  scrollToIndex = ({ index }) => {
    const { data } = this.props;
    if (index > -1 && data && data.length && this.listComponentRef) {
      this.listComponentRef.scrollToIndex({ index });
    }
  };

  scrollToOffset = ({ offset, force = false }) => {
    const { data } = this.props;
    ((data && data.length) || force) &&
      this.listComponentRef &&
      this.listComponentRef.scrollToOffset({ offset });
  };
}

InfiniteScroll.defaultProps = {
  numColumns: 1,
  ListHeaderComponent: null,
  ListLoadingComponent: null,
  ListEmptyComponent: null,
  ListFooterComponent: null,
  keyboardDismissMode: "on-drag",
  extraTopComponent: null,
  keyExtractor: (item, index) => item.entityId || item.id || index.toString(),
  showRefreshingSpinner: true,
  disableFetchBottom: false
};

InfiniteScroll.propTypes = {
  data: PropTypes.array,
  onUpdate: PropTypes.func,
  listType: PropTypes.string,
  reducerStatePath: PropTypes.string,
  normalizedSchema: PropTypes.string,
  apiQuery: PropTypes.object,
  resetDataOnFetchTop: PropTypes.bool,
  hasMore: PropTypes.bool,
  keyExtractor: PropTypes.func,
  ListHeaderComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  ListFooterComponent: PropTypes.node,
  ListErrorComponent: PropTypes.node,
  onRef: PropTypes.func,
  onLayout: PropTypes.func,
  numColumns: PropTypes.number,
  disableRefresh: PropTypes.bool,
  fetchBottom: PropTypes.func,
  fetchTop: PropTypes.func,
  isFetchingBottom: PropTypes.bool,
  isFetchingTop: PropTypes.bool,
  ListEmptyComponent: PropTypes.node,
  ListLoadingComponent: PropTypes.node,
  disableInitialFetch: PropTypes.bool,
  extraData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  addedData: PropTypes.array,
  getItemLayout: PropTypes.func,
  onScroll: PropTypes.func,
  horizontal: PropTypes.bool,
  onTopFetchAction: PropTypes.func,
  stickyHeader: PropTypes.node,
  contentContainerStyle: stylesScheme,
  keyboardDismissMode: PropTypes.string,
  ListItemComponent: PropTypes.func,
  listItemProps: PropTypes.object,
  viewabilityConfig: PropTypes.object,
  onViewableItemsChanged: PropTypes.func,
  extraTopComponent: PropTypes.node,
  showRefreshingSpinner: PropTypes.bool,
  disableFetchBottom: PropTypes.bool,
  totalCount: PropTypes.number
};

const mapStateToProps = (state, ownProps) => ({
  data: get(state, `${ownProps.reducerStatePath}.data`, null),
  totalCount: get(state, `${ownProps.reducerStatePath}.totalCount`, null),
  isFetchingTop: get(
    state,
    `${ownProps.reducerStatePath}.isFetchingTop`,
    false
  ),
  isFetchingBottom: get(
    state,
    `${ownProps.reducerStatePath}.isFetchingBottom`,
    false
  ),
  hasMore: get(state, `${ownProps.reducerStatePath}.hasMore`, false),
  v: get(state, `${ownProps.reducerStatePath}.v`)
});

// const mapDispatchToProps = { fetchTop, fetchBottom };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
//   null,
//   { withRef: true }
// )(InfiniteScroll);
export default InfiniteScroll;
