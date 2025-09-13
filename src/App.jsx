import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

import { GoodList } from './components/GoodList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const SORT_BY_ALPHABETIC = 'alphabetically';
  const SORT_BY_LENGTH = 'length';
  const [sortField, setSortField] = useState('');

  let visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        case SORT_BY_ALPHABETIC:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  const [reversed, setReversed] = useState(false);

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', { 'is-light': sortField !== SORT_BY_ALPHABETIC })}
          onClick={() => setSortField(SORT_BY_ALPHABETIC)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={classNames('button is-success', { 'is-light': sortField !== SORT_BY_LENGTH })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(sortField !== '' || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
