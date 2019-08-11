import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  searchMentions as querySearchMentions,
  clearSearchMentions,
  addNewMention
} from "src/redux/mentions/actions";
import { SearchResultsList } from "src/components";
import { get } from "src/infra/utils";

class SearchMentionsResultsList extends Component {
  render = () => {
    const {
      results,
      query,
      resultsNumberPages,
      isSearching
    } = this.props.searchMentions;
    const { emptyComponentStyle } = this.props;

    return (
      <SearchResultsList
        results={results}
        query={query}
        resultsNumberPages={resultsNumberPages}
        querySearch={this.querySearch}
        onSearchResultPress={this.handleSearchResultPress}
        isSearching={isSearching}
        dismissOnScroll={false}
        emptyComponentStyle={emptyComponentStyle}
      />
    );
  };

  querySearch = (query, page) => {
    const { communityId, querySearchMentions } = this.props;

    querySearchMentions(query, page, communityId);
  };

  handleSearchResultPress = result => {
    const { addNewMention, clearSearchMentions } = this.props;

    // We're only adding the new mention entity - without indexes at this point
    addNewMention({ entity: result });
    clearSearchMentions();
  };
}

SearchMentionsResultsList.propTypes = {
  communityId: PropTypes.string,
  searchMentions: PropTypes.shape({
    results: PropTypes.array,
    page: PropTypes.number,
    query: PropTypes.string,
    resultsNumberPages: PropTypes.number,
    resultsHits: PropTypes.number,
    isSearching: PropTypes.bool
  }),
  addNewMention: PropTypes.func,
  clearSearchMentions: PropTypes.func,
  querySearchMentions: PropTypes.func,
  emptyComponentStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

const mapStateToProps = state => ({
  searchMentions: state.mentions.searchMentions,
  communityId: get(state, "auth.user.community.id")
});

const mapDispatchToProps = {
  querySearchMentions,
  clearSearchMentions,
  addNewMention
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchMentionsResultsList);
