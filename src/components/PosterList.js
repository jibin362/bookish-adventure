import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PosterItem from './PosterItem';
import { fetchDataByPage } from '../redux/thunks/fetchData';
import { debounce } from 'lodash';

function PosterList() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.default.data);

  useEffect(() => {
    dispatch(fetchDataByPage());
  }, [dispatch]);

  window.onscroll = debounce(() => {
    const offset = 200;
    if (
      window.innerHeight + document.documentElement.scrollTop + offset >=
      document.documentElement.offsetHeight
    ) {
      dispatch(fetchDataByPage());
    }
  }, 100);

  return (
    <div className="px-30px pt-36px grid grid-cols-3 lg:grid-cols-6 gap-x-30px">
      {data.map((elem, index) => (
        <PosterItem key={index} data={elem} />
      ))}
    </div>
  );
}

export default PosterList;
