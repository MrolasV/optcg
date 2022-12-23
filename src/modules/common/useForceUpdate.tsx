import * as React from 'react';
import { useState } from 'react';

const useForceUpdate = () => useState()[1];

export default useForceUpdate;