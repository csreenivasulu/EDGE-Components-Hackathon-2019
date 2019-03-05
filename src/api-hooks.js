import { useState, useEffect } from 'react';

function useGetUserList(endPoint) {

    const [postsList, setPostsList] = useState([]);

    useEffect(() => {

        var xhr = new XMLHttpRequest();

        xhr.open('GET', endPoint, true);

        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4) {
                setPostsList(JSON.parse(xhr.responseText));
            }
        }

        xhr.send();

    }, []);

    return postsList;

}

export default useGetUserList;