import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  const [navigator, setNavigator] = useState(false);
  const [id, setId] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <MainContext.Provider
      value={{
        navigator, 
        setNavigator,
        id,
        setId,
        loading,
        setLoading
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
