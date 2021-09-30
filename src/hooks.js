import {useState, useEffect} from "react";
import axios from "axios";
import uuid from "uuid";

/** useFlip returns an array containing the current flip state of the card
 *    and a function that will toggle the flip state 
 */

const useFlip = () => {
  const [isUp, setIsUp] = useState(true);
  const toggleIsUp = () => {
    setIsUp(!isUp);
  }
  return [isUp, toggleIsUp];
};

/** useAxios takes a base_url parameter and a formatting function
 *  returns an array containing the data from previous AJAX requests
 *    and a function that will add new objects to the data array given an optional pathname
 */

const useAxios = (deck_name, base_url, format) => {
  // const [data, setData] = useState([]);
  const [data, setData] = useLocalStorage(deck_name,[]);

  const getData = async (pathName="") => {
    try {
      const resp = await axios.get(`${base_url}${pathName}`);
      const respData = format(resp);
      respData.id = uuid();
      setData(data => [...data, respData]);
    } catch (err) {
      console.log(err);
    }
  }
  const removeData = () => {
    setData([]);
  }

  return [data, getData, removeData];
}

/** useLocalStorage syncs to local storage after every state change
 * tries to read from local storage when the component renders
 */

const useLocalStorage = (key, initialVal) => {
  const value = JSON.parse(localStorage.getItem(key)) || initialVal;
  const [state, setState] = useState(value);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export {useFlip, useAxios, useLocalStorage};


