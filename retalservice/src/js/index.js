import {matchesPolyfill, closestPolyfill, foreachPolyfill, scrollPolyfill} from './methods/ie11'
import 'babel-polyfill';

import burgerButton from './components/burgerButton'
import carousel from './components/carousel'
import {smooth_scroll} from './methods/smooth_scroll'
import {lazyLoad} from './methods/lazy_load'

import initHeader from './section/header'
import initMap from './section/map'

smooth_scroll()
lazyLoad()
carousel()

initHeader()
initMap()
