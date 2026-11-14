// @vitest-environment jsdom
import React from 'react';
import {it,expect,vi,beforeAll} from 'vitest';
import {render,screen} from '@testing-library/react';
beforeAll(()=>{vi.stubGlobal('scrollTo',vi.fn());vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue(null);vi.stubGlobal('IntersectionObserver',class{observe(){} unobserve(){} disconnect(){}});});
it('shows verified content and the five scroll-revealed supports',async()=>{
 document.body.innerHTML='<div id="root"></div>';
 const {App}=await import('./main');
 render(<App/>);
 expect(screen.getAllByRole('link',{name:/Позвонить и записаться/})[0].getAttribute('href')).toBe('tel:+79187423820');
 expect(screen.getAllByRole('heading',{name:/Довериться/}).length).toBeGreaterThan(0);
 expect(screen.getAllByText('Надежда Михалкина').length).toBeGreaterThan(0);
});



