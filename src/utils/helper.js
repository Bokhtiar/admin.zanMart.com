import { Toastify } from "../components/toastify";


export const getToken = () => {
    return localStorage.getItem("token");
}

/* set token */
export const setToken = (token) => {
    return localStorage.setItem("token", token);
}

/* remove token */
export const removeToken = () => {
    return localStorage.removeItem("token");
};

/* Global network error handeller */
export const networkErrorHandeller = (error) => {
    console.log("error", error);
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors
    ) {
        error.response.data.errors.map((item) => {
            return <span className="">{Toastify.Error(item[0])}</span>
        });
    } else {
        return Toastify.Error("Something going wrong, Try again.");
    }
};



/* Gender data */
export const genderList = [
    {
        label: "male",
        value: "male",
    },
    {
        label: "female",
        value: "female",
    },
    {
        label: "Both",
        value: "Both",
    },
];

/* Gender data */
export const circularStatus = [
    {
        label: "publish",
        value: "publish",
    },
    {
        label: "draft",
        value: "draft",
    },
];

/* Gender data */
export const userType = [
    {
        label: "user",
        value: "user",
    },
    {
        label: "admin",
        value: "admin",
    },
];


/* Gender data */
export const employeeStatus = [
    {
        label: "Full Time",
        value: "Full time",
    },
    {
        label: "Part Time",
        value: "Part Time",
    },
    {
        label: "Contractual",
        value: "Contractual",
    },
    {
        label: "Freelance",
        value: "Freelance",
    },
    {
        label: "Internship",
        value: "Internship",
    },
    {
        label: "Temporary",
        value: "Temporary",
    },
    {
        label: "Permanent",
        value: "Permanent",
    },
    {
        label: "Seasonal",
        value: "Seasonal",
    },
    {
        label: "Remote",
        value: "Remote",
    },
    {
        label: "Consultancy",
        value: "Consultancy",
    },
];

