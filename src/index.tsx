import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from 'home/main';
import { store } from 'store';
import { TooltipProvider } from 'react-tooltip';
import Tooltip from 'home/tooltip';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '@cloudscape-design/global-styles/index.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'modules/common/styles.scss';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <DndProvider backend={HTML5Backend}>
        <TooltipProvider>
          <App/>
          <Tooltip/>
        </TooltipProvider>
      </DndProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);