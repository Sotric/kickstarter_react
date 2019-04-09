import ReactDOM from 'react-dom';

/* eslint-disable no-underscore-dangle */
const data = window.__DATA__;
const meta = window.__METADATA__;
/* eslint-enable */

const root = document.getElementById('content');

const ssr = root && root.firstChild;

// define render function for hydrate function
const render = component => {
  const element = component;

  if (ssr) {
    ReactDOM.hydrate(element, root);
  } else {
    ReactDOM.render(element, root);
  }
};

// get hydrate function and hydrate
// eslint-disable-next-line import/no-unresolved
const hydrate = require('appClientEntry').default;

hydrate(meta, { render, root }, data);

if (process.env.APP_MODE === 'development' && !ssr) {
  // eslint-disable-next-line no-console
  console.warn('React server side rendering is not in use.');
}
