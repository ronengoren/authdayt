import React from "react";
// import { denormalize, constructDenormalizedData } from '/redux/normalizer';
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Post } from "src/components";
// import { IntroductionPost } from "src/components/introduction";
import {
  entityTypes,
  suggestedItemTypes,
  feedEventTypes,
  originTypes,
  postTypes
} from "src/vars/enums";
// import { SuggestedItems } from "./suggestedItems";
// import { ListItemCtaPost } from "./listItemCtaPost";
// import { ActivationCtaPost } from "./activationCtaPost";

class FeedItem extends React.Component {
  render() {
    return (
      <View>
        <Text>feeditem</Text>
      </View>
    );
  }
}

export default FeedItem;
