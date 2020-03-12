import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function GridPlaceHolder({ repeatCount }) {
  const howMany = Array.from(Array(repeatCount).keys());

  return (
    <>
      {howMany.map(placeholder => (
        <li key={placeholder}>
          <figure>
            <Skeleton height={250} />
          </figure>
          <strong>
            <Skeleton width={220} />
            <Skeleton width={150} />
          </strong>
          <div>
            <span>
              <Skeleton width={100} />
            </span>

            <button type="button">
              <span
                style={{
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
              >
                <SkeletonTheme color="#997df5" highlightColor="#8a6cea">
                  <Skeleton width={90} />
                </SkeletonTheme>
              </span>
            </button>
          </div>
        </li>
      ))}
    </>
  );
}

GridPlaceHolder.propTypes = {
  repeatCount: PropTypes.number,
};

GridPlaceHolder.defaultProps = {
  repeatCount: 1,
};
