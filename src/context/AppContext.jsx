import { createContext } from "react";
import PropTypes from 'prop-types';
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();
const AppContextProvider = (props) => {
    //calculate age
    const calculateAge = (dob) => {
       const today = new Date();
       const birthDate = new Date(dob);
       let age = today.getFullYear()-birthDate.getFullYear();
       return age

    }

     // Format date
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };
  const currencySymbol = '$';
   const value ={
     calculateAge,
     slotDateFormat,
     currencySymbol
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  };