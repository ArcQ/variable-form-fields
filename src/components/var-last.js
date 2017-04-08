import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { findEleWithPropAndModify } from 'utils/utils';

function getCreateVarAddHandler(addRowHandler) {
  return (ele) => {
    // remove varAdd as it won't be natively compatible with the input element
    // TODO can abstract out refactor!
    const { varAdd, ...restProps } = ele.props; // eslint-disable-line no-unused-vars
    // if no field.key, we just wont' track it, no err req
    // TODO should probably use React.cloneElement()
    // TODO what if ele.key has no key, it will throw error tho! because varInput sitll on element
    return update(ele, {
      props: {
        $set: {
          ...restProps,
          onClick: () => addRowHandler(),
        },
      },
    });
  };
}

const renderInputs = function (props) {
  const {
    addRowHandler,
    children: fieldObj,
  } = props;
  const modifierArr = [
    { propKey: 'varAdd', modifier: getCreateVarAddHandler(addRowHandler) },
  ];

  if (fieldObj.constructor !== Array) {
    return findEleWithPropAndModify(fieldObj, modifierArr);
  }
  return fieldObj.map(field =>
    findEleWithPropAndModify(field, modifierArr),
  );
};

export const VarLast = props =>
  <div> { renderInputs(props) } </div>;

VarLast.propTypes = {
  addRowHandler: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default VarLast;
