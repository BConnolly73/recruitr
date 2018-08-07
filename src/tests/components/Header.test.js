import { shallow } from 'enzyme';
import React from 'react';
import { Header } from '../../components/Header';
import { startLogout } from '../../actions/auth';

test('render header', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should call start logout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout}/>);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});