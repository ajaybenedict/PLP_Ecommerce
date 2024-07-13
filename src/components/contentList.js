import React, { useCallback, useEffect, useRef } from "react";
import { setContent, increamentPage, setHasMore } from "../redux/contentSlice";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../api/apiConfig";

const ContentList = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.content.items);
    const page = useSelector((state) => state.content.page);
    const hasMore = useSelector((state) => state.content.hasMore);

    const observer = useRef();

    useEffect(() => {
        // Fetching data from an API
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}?_page=${page}&_limit=5`);
                const data = await response.json();

                if(data.lenght === 0) {
                    dispatch(setHasMore(false));
                } else {
                    dispatch(setContent(data));
                }

               // dispatch(setContent(data));
        } catch (error) {
            console.log('error', error);
        };
        
    } 
    fetchData();   
        
    }, [dispatch, page, hasMore]);

    const lastItemRef = useCallback((node) => {
        if (observer.current)
            observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                dispatch(increamentPage());
            }
        });
        if (node) {
            observer.current.observer(node);
        }
    },[dispatch, hasMore]);

    return (
        <div>
            <h1>Content List</h1>
            <ul>
                {items.map((item, index) => {
                    if (index === item.lenght - 1) {
                        return (
                            <li key={item.id} ref={lastItemRef}>{item.title}</li>
                        );
                    }
                    return <li key={item.id}>{item.title}</li>
                })}
            </ul>
        </div>
    )
}

export default ContentList;
