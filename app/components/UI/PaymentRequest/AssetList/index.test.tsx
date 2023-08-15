import React from 'react';
import { shallow } from 'enzyme';
import AssetList from './';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import initialBackgroundState from '../../../../util/test/initial-background-state.json';

const mockStore = configureMockStore();
const initialState = {
  engine: {
    backgroundState: initialBackgroundState,
  },
};
const store = mockStore(initialState);

describe('AssetList', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <AssetList
          handleSelectAsset={() => null}
          emptyMessage={'Enpty Message'}
          searchResults={[]}
        />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
