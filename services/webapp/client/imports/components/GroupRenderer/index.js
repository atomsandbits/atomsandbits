import React from 'react';

import xyzTools from '/both/imports/tools/xyz';
import SpeckRenderer from '/client/imports/components/SpeckRenderer';
import {
  GroupRendererContainer,
  TextAreasContainer,
  RendererContainer,
  TextAreaContainer,
  TextArea,
} from './styles';

const convertXyzToStructure = (xyzs) => {
  const xyzStrings = xyzs.map((xyz, index) => {
    const { collection } = xyzTools.convertToCollection({ xyzString: xyz });
    return (collection.map((xyzDocument) => {
      return `${xyzDocument.atom} ${xyzDocument.x + (index * 10 )} ${xyzDocument.y} ${
        xyzDocument.z
      }`;
    })).join('\n');
  });
  return xyzStrings.join('\n');
};

const GroupRenderer = ({ xyzs, setXyzs }) => (
  <GroupRendererContainer>
    <TextAreasContainer>
      {xyzs.map((xyz, index) => (
        <TextAreaContainer key={`textarea-${index}`}>
          <h3>Geometry {index + 1}</h3>
          <TextArea
            id={`textarea-${index}`}
            value={xyz}
            onChange={(event) => {
              const _xyzs = xyzs;
              _xyzs[index] = event.target.value;
              setXyzs(_xyzs);
            }}
          />
        </TextAreaContainer>
      ))}
      <TextAreaContainer key={`textarea-${xyzs.length}`}>
        <h3>Geometry {xyzs.length + 1}</h3>
        <TextArea
          value=""
          onChange={({ target }) => {
            const _xyzs = xyzs;
            _xyzs.push(target.value);
            setXyzs(_xyzs);
            setTimeout(() => {
              document.getElementById(`textarea-${xyzs.length - 1}`).focus();
            }, 0);
          }}
        />
      </TextAreaContainer>
    </TextAreasContainer>
    <RendererContainer>
      <SpeckRenderer
        xyz={xyzTools.normalize({ xyzString: convertXyzToStructure(xyzs) })}
        zoom={2}
      />
    </RendererContainer>
  </GroupRendererContainer>
);

export default GroupRenderer;
