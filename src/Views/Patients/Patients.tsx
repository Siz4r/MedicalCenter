import {
  CriteriaWithPagination,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiSearchBar,
  EuiSearchBarOnChangeArgs,
  EuiSpacer,
  EuiTableSelectionType,
  EuiTableSortingType,
  EuiText,
  Query,
} from '@elastic/eui'
import { Action } from '@elastic/eui/src/components/basic_table/action_types'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Address, newPatient, Patient } from '../../store/Patient/types'
import { PatientForm } from './PatientForm'
import { AppDispatch, RootState } from '../../store/index'
import { deleteAllPatients, deletePatient, fetchPatients } from '../../store/Patient/api'

export const Patients = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [sortField, setSortField] = useState<keyof Patient>('firstName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [query, setQuery] = useState<Query>(EuiSearchBar.Query.MATCH_ALL)
  const [error, setError] = useState<string | undefined>(undefined)
  const [selectedItems, setSelectedItems] = useState<Patient[]>([])
  const [patientToEdit, setPatientToEdit] = useState<Patient>()
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const patients = useSelector<RootState>(({ patients }) => {
    return patients.patients
  }) as Patient[]

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchPatients())
  }, [])

  const onTableChange = ({ page, sort }: CriteriaWithPagination<Patient>) => {
    const { index: pageIndex, size: pageSize } = page

    if (sort) {
      setSortField(sort.field)
      setSortDirection(sort.direction)
    }

    setPageIndex(pageIndex)
    setPageSize(pageSize === 0 ? 99999 : pageSize)
  }

  const onSelectionChange = (selectedItems: Patient[]) => {
    setSelectedItems(selectedItems)
  }

  const onClickDelete = () => {
    dispatch(deleteAllPatients(selectedItems.map(p => p.id)))
    setSelectedItems([])
  }

  const queriedItems = EuiSearchBar.Query.execute(query, patients, {
    defaultFields: ['firstName', 'lastName', 'email', 'pesel'],
  })

  const pageOfItems = queriedItems
    .slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
    .sort((a, b) =>
      sortDirection === 'asc' ? a.firstName.localeCompare(b.firstName) : -a.firstName.localeCompare(b.firstName)
    )

  const totalItemCount = queriedItems.length

  const actions: Action<Patient>[] = [
    {
      name: 'Edit',
      description: 'Edit this person',
      icon: 'pencil',
      type: 'icon',
      onClick: (patient: Patient) => {
        setPatientToEdit(patient)
        setIsEditing(true)
      },
    },
    {
      name: 'Delete',
      description: 'Delete this person',
      icon: 'trash',
      type: 'icon',
      color: 'danger',
      onClick: (patient: Patient) => dispatch(deletePatient(patient.id)),
    },
  ]

  const columns: EuiBasicTableColumn<Patient>[] = [
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
      render: (address: Address) => (
        <EuiText>
          {`${address.city} ${address.postalCode}\n${address.street} ${address.buildingNumber} ${
            address.apartmentNumber ? address.apartmentNumber : ''
          }`}
        </EuiText>
      ),
    },
    {
      name: 'Actions',
      actions,
    },
  ]

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [0, 5, 10, 50],
  }

  const sorting: EuiTableSortingType<Patient> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  }

  const selection: EuiTableSelectionType<Patient> = {
    selectable: () => true,
    onSelectionChange: onSelectionChange,
    initialSelected: [],
  }

  const resultsCount =
    pageSize === 0 ? (
      <strong>All</strong>
    ) : (
      <>
        <strong>
          {pageSize * pageIndex + 1}-{pageSize * pageIndex + pageSize}
        </strong>{' '}
        of {totalItemCount}
      </>
    )

  const onChange = (args: EuiSearchBarOnChangeArgs) => {
    if (args.error) {
      setError(args.error.message)
    } else {
      setError(undefined)
      setQuery(args.query)
    }
  }

  const schema = {
    strict: true,
    fields: {
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      pesel: {
        type: 'string',
      },
      city: {
        type: 'string',
      },
    },
  }

  const renderDeleteButton = () => {
    if (selectedItems.length === 0) {
      return
    }

    return (
      <EuiButton color="danger" iconType="trash" onClick={onClickDelete}>
        Delete {selectedItems.length} Users
      </EuiButton>
    )
  }

  const onClickAdd = () => {
    setPatientToEdit(newPatient)
    setIsEditing(false)
  }

  const renderAddButton = () => {
    return (
      <EuiButton color="success" iconType="plus" onClick={onClickAdd}>
        Add new user
      </EuiButton>
    )
  }

  const deleteButton = renderDeleteButton()

  return error ? (
    <EuiText>{error}</EuiText>
  ) : (
    <div>
      <EuiFlexGroup>
        <EuiSearchBar
          defaultQuery={EuiSearchBar.Query.MATCH_ALL}
          query={query}
          box={{
            placeholder: 'Search',
            schema,
          }}
          onChange={onChange}
        />
        <EuiFlexItem />
        <EuiFlexItem>{deleteButton ? deleteButton : renderAddButton()}</EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      <EuiText size="xs">
        Showing {resultsCount} <strong>Users</strong>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiHorizontalRule margin="none" style={{ height: 2 }} />
      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable"
        items={pageOfItems}
        itemId="id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
        isSelectable={true}
        selection={selection}
      />
      <EuiSpacer size="s" />
      <PatientForm patientToEdit={patientToEdit} isEditing={isEditing} />
    </div>
  )
}
