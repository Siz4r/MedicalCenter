import {
  CriteriaWithPagination,
  EuiBasicTableColumn,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSearchBar,
  EuiSearchBarOnChangeArgs,
  EuiSpacer,
  EuiTableSelectionType,
  EuiTableSortingType,
  EuiText,
  Query,
  EuiBasicTable,
  EuiHorizontalRule,
} from '@elastic/eui'
import { AsyncThunk } from '@reduxjs/toolkit'
import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { deleteAllPatients } from '../store/Patient/api'

type Props<T> = {
  records: any[]
  compare: (a: T, b: T) => number
  columns: EuiBasicTableColumn<any>[]
  schema: any
  deleteAll: AsyncThunk<void, string[], {}>
  delete: AsyncThunk<void, string, {}>
  initializingRecord: T
  setRecordToEdit: (record: T) => void
  nameOfRecord: string
}

export const TableView = <T extends { id: string }>(props: Props<T>) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [sortField, setSortField] = useState<keyof T>('id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [query, setQuery] = useState<Query>(EuiSearchBar.Query.MATCH_ALL)
  const [error, setError] = useState<string | undefined>(undefined)
  const [selectedItems, setSelectedItems] = useState<T[]>([])
  const [recordToEdit, setRecordToEdit] = useState<T>()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const onTableChange = ({ page, sort }: CriteriaWithPagination<T>) => {
    const { index: pageIndex, size: pageSize } = page

    if (sort) {
      setSortField(sort.field)
      setSortDirection(sort.direction)
    }

    setPageIndex(pageIndex)
    setPageSize(pageSize === 0 ? 99999 : pageSize)
  }

  const onSelectionChange = (selectedItems: T[]) => {
    setSelectedItems(selectedItems)
  }

  const onClickDelete = () => {
    dispatch(props.deleteAll(selectedItems.map(p => p.id)))
    setSelectedItems([])
  }

  const queriedItems = EuiSearchBar.Query.execute(query, props.records, {
    defaultFields: ['firstName', 'lastName', 'email', 'pesel'],
  })

  const pageOfItems = queriedItems
    .slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
    .sort((a, b) => (sortDirection === 'asc' ? props.compare(a, b) : -props.compare(a, b)))

  const totalItemCount = queriedItems.length

  const renderDeleteButton = () => {
    if (selectedItems.length === 0) {
      return
    }

    return (
      <EuiButton color="danger" iconType="trash" onClick={onClickDelete}>
        Delete {selectedItems.length} {props.nameOfRecord.toLowerCase() + 's'}
      </EuiButton>
    )
  }

  const onClickAdd = () => {
    props.setRecordToEdit(props.initializingRecord)
    setIsEditing(false)
  }

  const renderAddButton = () => {
    return (
      <EuiButton color="success" iconType="plus" onClick={onClickAdd}>
        Add new {props.nameOfRecord.toLowerCase()}
      </EuiButton>
    )
  }

  const deleteButton = renderDeleteButton()

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [0, 5, 10, 50],
  }

  const sorting: EuiTableSortingType<T> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  }

  const selection: EuiTableSelectionType<T> = {
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

  const schema = props.schema

  return (
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
        <EuiFlexItem>{deleteButton ? deleteButton : renderAddButton()}</EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      <EuiText size="xs">
        Showing {resultsCount} <strong>{props.nameOfRecord + 's'}</strong>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiHorizontalRule margin="none" style={{ height: 2 }} />
      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable"
        items={pageOfItems}
        itemId="id"
        columns={props.columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
        isSelectable={true}
        selection={selection}
      />
      <EuiSpacer size="s" />
    </div>
  )
}
