import { useState, useEffect } from "react";
import api from "../api/axios"
const useApi = (endpoint, options = {}, deps = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        api(endpoint, options)
            .then((res) => {
                if (mounted) setData(res.data.data);
            })
            .catch((err) => {
                if (mounted) setError(err);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, deps);
    return { data, loading, error };
};
export default useApi; 

//how to use in a component? use like this.......
/*
import useApi from '../hooks/useApi';
const { data, loading, error } = useApi('/trips', {}, []);
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
return (
    <div>
        {data.map(trip => (
            <div key={trip.id}>{trip.name}</div>
        ))}
    </div>
);
*/