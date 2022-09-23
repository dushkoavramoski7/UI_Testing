import React from 'react';
import ReactDOM from 'react-dom';
import BreadCrumbs from '../BreadCrumbs';
import {cleanup, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<BreadCrumbs></BreadCrumbs>,div)
})


test('Is active brand working properly', ()=>{
    render(<BreadCrumbs breadCrumbsItems={[{name: 'Home', href: '/home'}, {name: 'Tables', href: '/tables'}]} breadCrumbsActive={'Brand'}/>);
    expect(screen.getByTestId('activeBrand')).toHaveTextContent("Brand");
})

test('BreadCrumb props works properly', ()=>{
    render(<BreadCrumbs breadCrumbsItems={[{name: 'Home', href: '/home'}, {name: 'Tables', href: '/tables'}]} breadCrumbsActive={'Brand'}/>);
    const items = screen.getAllByRole('listitem');
    const breadCrombsItems = items.map(item => item.textContent)
    expect(breadCrombsItems).toMatchInlineSnapshot(`
      Array [
        "Home",
        "Tables",
        "Brand",
      ]
    `)
})