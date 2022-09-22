import React from 'react';
import ReactDOM from 'react-dom';
import BreadCrumbs from '../BreadCrumbs';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<BreadCrumbs></BreadCrumbs>,div)
})

//
// test('initial render for component', ()=>{
//     render(<BreadCrumbs breadCrumbsActive={[{name: 'Home', href: '/home'}, {name: 'Tables', href: '/tables'}]} breadCrumbsItems={'Home'}/>);
//     screen.getByRole('');
// })
