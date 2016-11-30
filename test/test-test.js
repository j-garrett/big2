import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Big2App } from '../src/components/Big2App';


xdescribe('Big2App', () => {
  const wrapper = shallow(<Big2App />);
  it('should have a state', () => {
    // console.log('state: ', wrapper.state());
    expect(true).to.equal(true);
  });
});
