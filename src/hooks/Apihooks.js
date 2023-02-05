import { baseUrl } from "../utils/variables";

const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const useJourney = () => {
  const getAllJourneys = async () => {
    return await doFetch(baseUrl + "journey");
  };
  
  return { getAllJourneys };
};

const useStation = () => {
  const getAllStations = async () => {
    return await doFetch(baseUrl + "station");
  };

  const getStationById = async (id) => {
    return await doFetch(baseUrl + "station/" + id);
  };


  return { getAllStations, getStationById };
};

export { useJourney, useStation };
