import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent, incrementPage } from '../redux/contentSlice';

const ContentList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.content.items);
  const page = useSelector((state) => state.content.page);
  const hasMore = useSelector((state) => state.content.hasMore);
  const observer = useRef();
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Track initial load

  useEffect(() => {
    if (isFirstLoad) {
      // Fetch only on initial load
      dispatch(fetchContent(page));
      setIsFirstLoad(false);
    } else if (page > 1) {
      // Fetch on page increment
      dispatch(fetchContent(page));
    }
  }, [dispatch, page, isFirstLoad]);

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(incrementPage());
        }
      });
      if (node) observer.current.observe(node);
    },
    [dispatch, hasMore]
  );

  const styleObject = {
    "height" : "100px",
    "width" : "100%"
}

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Content List</h1>
      <ul className="list-disc pl-5">
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <li key={item.id} ref={lastItemRef} className="mb-2 bg-gray-200 p-2 rounded" style={styleObject}>
                {item.title}
              </li>
            );
          }
          return <li key={item.id} className="mb-2 bg-gray-200 p-2 rounded" style={styleObject}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default ContentList;