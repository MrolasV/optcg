import * as React from 'react';
import { useNavigate } from 'react-router';

import Button from '@cloudscape-design/components/button';

const AppTemp = (props: {buttonText: string, nextPage: string}): JSX.Element => {
  const { buttonText, nextPage } = props;
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate({ pathname: `/${nextPage}` })}>
        {buttonText}
      </Button>
    </div>
  );
}

export default AppTemp;
