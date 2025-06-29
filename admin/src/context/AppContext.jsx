// import { createContext } from "react";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {


//     const currency = '$'



//     const calculateAge = (dob) => {
//         const today = new Date();
//         const birthDate = new Date(dob);
//         let age = today.getFullYear() - birthDate.getFullYear();

//         return age;
//     };

//     const months = [
//         "",
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//     ];

//     const slotDateFormat = (slotDate) => {
//         const dateArray = slotDate.split("_");
//         return (
//             dateArray[0] +
//             " " +
//             months[Number(dateArray[1])] +
//             " " +
//             dateArray[2]
//         );
//     };


//     const value = {
//         calculateAge,
//         slotDateFormat,
//         currency,
//     };
//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     );
// };

// export default AppContextProvider;



import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currency = "$";

    const calculateAge = (dob) => {
        if (!dob) return "-";
        const today = new Date();
        const birthDate = new Date(dob);
        if (isNaN(birthDate)) return "-";
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const slotDateFormat = (slotDate) => {
        if (!slotDate || typeof slotDate !== "string") return "-";
        const dateArray = slotDate.split("_");
        if (dateArray.length !== 3) return slotDate; // رجوع القيمة الأصلية إذا غير متوقع
        const day = dateArray[0];
        const monthIndex = Number(dateArray[1]);
        const year = dateArray[2];

        if (monthIndex < 1 || monthIndex > 12) return slotDate;

        return `${day} ${months[monthIndex]} ${year}`;
    };

    const value = {
        calculateAge,
        slotDateFormat,
        currency,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
