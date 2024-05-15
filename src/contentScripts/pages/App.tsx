import IconCat from '~icons/arcticons/cats-and-soup';
import 'uno.css';

import { Button } from '~/shared/ui';

export const App = () => {
  return (
    <div>
      <div className="fixed right-0 bottom-0 m-5 z-99999 select-none">
        <Button className="rounded-full">
          <IconCat />
        </Button>
      </div>
    </div>
  );
};
