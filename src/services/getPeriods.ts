const API_URL = import.meta.env.PUBLIC_API_URL;

export const getPeriods = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}