'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    newState = { ...newState };

    switch (action.type) {
      case 'addProperties':
        addExtraData(newState, action.extraData);
        break;

      case 'removeProperties':
        removeData(newState, action.keysToRemove);
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(newState);
  }

  function addExtraData(curState, addAction) {
    return Object.assign(curState, addAction);
  }

  function removeData(curState, removeAction) {
    for (const key of removeAction) {
      delete curState[key];
    }
  }

  return stateHistory; // write code here
}

module.exports = transformStateWithClones;
