import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "./reduxHooks";
import {getPatients} from "../store/Patient/api";

type UseProjectsConfig = {
    fetchOnMount?: boolean
}

export const usePatients = (config: UseProjectsConfig | undefined = undefined) => {
    const fetchOnMount = !(config && config.fetchOnMount === false)
    const [patientsLoading, setPatientsLoading] = useState(fetchOnMount)

    const dispatch = useAppDispatch()

    const patients = useAppSelector(({ patients }) => {
        return patients.patients
    })

    const fetchPatients = async () => {
        setPatientsLoading(true);
        await dispatch(getPatients());
        setPatientsLoading(false)
    }

    useEffect(() => {
        if (fetchOnMount) {
            try {
                fetchPatients()
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    return {
        patientsLoading,
        patients
    }
}