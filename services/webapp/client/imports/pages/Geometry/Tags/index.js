import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Meteor } from 'meteor/meteor';

// import { withCreateTag } from './withCreateTag';
import { withDeleteTag } from './withDeleteTag';
import { Tag, TagsContainer, TagInput, TagsScrollContainer } from './styles';

// TODO: Make userId reactive
const TagsPure = ({ tags }) => (
  <TagsContainer>
    <TagsScrollContainer>
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          onDelete={Meteor.userId() ? () => {} : null}
          onClick={() => {}}
        />
      ))}
    </TagsScrollContainer>
    {Meteor.userId() ? <TagInput label="new tag" /> : null}
  </TagsContainer>
);
TagsPure.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

const Tags = compose(withDeleteTag)(TagsPure);

export { Tags };
export default Tags;
