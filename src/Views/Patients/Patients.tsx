import { EuiBasicTable } from "@elastic/eui";
import { Patient } from "../../store/Patient/types"

const PATIENTS: Patient[] = [
    {
        id: "1",
        firstName: "Mariusz",
        lastName: "Pudzianowski",
        email: "fmsadfa@gmail.com",
        pesel: "24132142141",
        address: "Janow Sokolska 3"
    },
    {
        id: "2",
        firstName: "Janek",
        lastName: "Kowalski",
        email: "vczxcvxz@gmail.com",
        pesel: "24765845681",
        address: "Janow Sokolska 3"
    },
    {
        id: "3",
        firstName: "Maciek",
        lastName: "Mackowy",
        email: "kjhgkjk@gmail.com",
        pesel: "0957120935",
        address: "Janow Sokolska 3"
    }
]

export const Patients = () => {
    const columns = [
        {
            field: 'firstName',
            name: 'First Name',
            sortable: true,
            'data-test-subj': 'firstNameCell',
        },
        {
            field: 'lastName',
            name: 'Last Name',
            truncateText: true,
            mobileOptions: {
                show: false,
            },
        },
        {
            field: 'email',
            name: 'Email',
        },
        {
            field: 'pesel',
            name: 'Pesel',
        },
        {
            field: 'address',
            name: 'Address',
        },
    ];

    const getRowProps = (item: Patient) => {
        const { id } = item;
        return {
            'data-test-subj': `row-${id}`,
            className: 'customRowClass',
            onClick: () => { },
        };
    };

    const getCellProps = (item: Patient, column: any) => {
        const { id } = item;
        const { field } = column;
        return {
            className: 'customCellClass',
            'data-test-subj': `cell-${id}-${field}`,
            textOnly: true,
        };
    };

    return (
        <EuiBasicTable
            tableCaption="Demo of EuiBasicTable"
            items={PATIENTS}
            rowHeader="firstName"
            columns={columns}
            rowProps={getRowProps}
            cellProps={getCellProps}
        />
    );
}