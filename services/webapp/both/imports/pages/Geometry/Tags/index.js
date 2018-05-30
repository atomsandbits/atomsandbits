import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { Meteor } from 'meteor/meteor';

// import { withCreateTag } from './withCreateTag';
import { withDeleteTag } from './withDeleteTag';
import { Tag, TagsContainer, TagInput, TagsScrollContainer } from './styles';

// TODO: Make userId reactive
const enhance = compose(
  withProps(() => ({ userId: Meteor.isClient ? Meteor.userId() : '' })),
  withDeleteTag
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
    {userId ? <TagInput label="new tag" /> : null}
  </TagsContainer>
);
TagsPure.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
};

const Tags = enhance(TagsPure);

export { Tags };
export default Tags;
