import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, withState, lifecycle } from 'recompose';
import { Meteor } from 'meteor/meteor';

// import { withCreateTag } from './withCreateTag';
import { withDeleteTag } from './withDeleteTag';
import { Tag, TagsContainer, TagInput, TagsScrollContainer } from './styles';

// TODO: Make userId reactive
const enhance = compose(
  withState('userId', 'setUserId', Meteor.isClient ? Meteor.userId() : ''),
  withDeleteTag,
  lifecycle({
    componentDidMount() {
      const { setUserId } = this.props;
      if (Meteor.isClient) setUserId(Meteor.userId());
      console.log('mounted!', Meteor.userId());
    },
  })
);
const TagsPure = ({ tags, userId }) => (
  <TagsContainer>
    <TagsScrollContainer>
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          onDelete={userId ? () => {} : null}
          onClick={() => {}}
        />
      ))}
    </TagsScrollContainer>
    <TagInput hidden={userId ? 0 : 1} label="new tag" />
  </TagsContainer>
);
TagsPure.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
};

const Tags = enhance(TagsPure);

export { Tags };
export default Tags;
