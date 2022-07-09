import React, { useId, useState } from 'react';
import BackImg from '../assets/Back.png';
import SearchIcon from '../assets/search.png';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { searchData } from '../redux/slices/defaultSlice';

function Header() {
  const id = useId();
  const dispatch = useDispatch();
  const title = useSelector((state) => state.default.title);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);

  const debouncedSearch = debounce((term) => dispatch(searchData(term), 300));

  const onFieldChange = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 flex px-30px py-3 bg-black z-10">
        <button>
          <img src={BackImg} width={20} height={20} alt="back-icon" />
        </button>
        <h3 className="flex-1 mx-3 text-white text-lg">{title}</h3>
        <button onClick={() => setShow(!show)}>
          <img src={SearchIcon} width={20} height={20} alt="back-icon" />
        </button>
      </header>

      {show && (
        <input
          type="text"
          className="w-full h-10 px-2"
          id={id}
          placeholder="type to search"
          value={search}
          onChange={onFieldChange}
        />
      )}
    </>
  );
}

export default Header;
