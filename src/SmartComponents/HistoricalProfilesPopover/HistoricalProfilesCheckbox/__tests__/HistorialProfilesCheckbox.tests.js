import React from 'react';
import { shallow, mount } from 'enzyme';
//import { MemoryRouter } from 'react-router-dom';
//import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import { init } from '../../../../store';

import HistoricalProfilesCheckbox from '../HistoricalProfilesCheckbox';

/*eslint-disable camelcase*/
describe('HistoricalProfilesCheckbox', () => {
    let props;
    let { registry } = init();
    const store = registry.getStore();

    beforeEach(() => {
        props = {
            selectedHSPIds: [],
            profile: { id: '1234', captured_date: '03 May 2020, 18:20 UTC' }
        };
    });

    it('should render correctly', () => {
        const wrapper = shallow(
            <Provider store={ store }>
                <HistoricalProfilesCheckbox { ...props }/>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render mount correctly', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <HistoricalProfilesCheckbox { ...props }/>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

/*describe('ConnectedHistoricalProfilesCheckbox', () => {
    let initialState;
    let props;
    let mockStore;

    beforeEach(() => {
        mockStore = configureStore();
        initialState = {
            entities: {}
        };

        props = {
            profile: { id: '1234', captured_date: '03 May 2020, 18:20 UTC' },
            selectedHSPIds: []
        };
    });

    it('should render correctly', () => {
        const store = mockStore(initialState);
        const wrapper = mount(
            <MemoryRouter keyLength={ 0 }>
                <Provider store={ store }>
                    <ConnectedHistoricalProfilesCheckbox { ...props } />
                </Provider>
            </MemoryRouter>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});*/
/*eslint-enable camelcase*/
