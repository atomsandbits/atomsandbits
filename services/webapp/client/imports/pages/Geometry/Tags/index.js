import React from 'react';
import { compose } from 'recompose';

import { withCreateTag } from './withCreateTag';
import { withDeleteTag } from './withDeleteTag';
import { Tag, TagsContainer, TagInput, TagsScrollContainer } from './styles';

const TagsPure = ({ tags }) => (
  <TagsContainer>
    <TagsScrollContainer>
      {tags.map((tag) => (
        <Tag key={tag} label={tag} onDelete={() => {}} onClick={() => {}} />
      ))}
    </TagsScrollContainer>
    <TagInput label="new tag" />
  </TagsContainer>
);

const Tags = compose(withDeleteTag)(TagsPure);

export { Tags };
export default Tags;
