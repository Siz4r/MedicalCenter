import { Research } from '../../store/Research/types'
import { TableView } from '../TableView'
import { ReactNode, useState } from 'react'
import {
  EuiBasicTableColumn,
  EuiButton,
  EuiButtonIcon,
  EuiDescriptionList,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiLoadingSpinner,
  EuiScreenReaderOnly,
  EuiTextArea,
  RIGHT_ALIGNMENT,
} from '@elastic/eui'
import { useAppDispatch } from '../../hooks/reduxHooks'
import useInput from '../../hooks/useInput'
import { correctTextInput } from '../Patients/PatientForm'
import { addResearch, deleteAllResearches, deleteResearch, updateResearch } from '../../store/Research/api'
import { useResearches } from '../../hooks/useResearches'
import { OrderResearchResultInput } from './OrderResearchResultInput'

export interface ExpandedRow {
  [id: string]: ReactNode
}

export const Researches = () => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    setValue: setName,
  } = useInput(correctTextInput, '')
  const {
    value: descValue,
    isValid: descIsValid,
    hasError: descHasError,
    valueChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
    setValue: setDesc,
  } = useInput(correctTextInput, '')

  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<ExpandedRow>({})
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedResourceId, setEditedResourceId] = useState<string>('')

  const { researches, isLoading: researchesLoading } = useResearches({ fetchOnMount: true })

  const dispatch = useAppDispatch()

  const toggleDetails = (item: Research) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap }
    if (itemIdToExpandedRowMapValues[item.id]) {
      delete itemIdToExpandedRowMapValues[item.id]
    } else {
      const listItems =
        item.orderResearches.length === 0
          ? [{ title: 'No orders', description: <div></div> }]
          : item.orderResearches.map(o => {
              return {
                title: o.orderName,
                description: (
                  <OrderResearchResultInput
                    initialValue={o.result}
                    name={o.orderName}
                    researchId={item.id}
                    orderResearchId={o.id}
                  />
                ),
              }
            })
      itemIdToExpandedRowMapValues[item.id] = <EuiDescriptionList listItems={listItems} />
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues)
  }

  const schema = {
    strict: true,
    fields: {
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      orderResearches: {
        type: 'array',
      },
    },
  }

  const columns: EuiBasicTableColumn<Research>[] = [
    {
      field: 'name',
      name: 'Name',
      truncateText: true,
      sortable: true,
      'data-test-subj': 'firstNameCell',
    },
    {
      field: 'description',
      name: 'Description',
      mobileOptions: {
        show: false,
      },
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Delete',
          description: 'Delete research',
          icon: 'trash',
          type: 'icon',
          onClick: ({ id }) => {
            dispatch(deleteResearch(id))
          },
        },
        {
          name: 'Edit',
          description: 'Edit research',
          icon: 'pencil',
          type: 'icon',
          onClick: (research: Research) => {
            setName(research.name)
            setDesc(research.description)
            setEditedResourceId(research.id)
            setIsEditing(true)
          },
        },
      ],
    },
    {
      align: RIGHT_ALIGNMENT,
      width: '40px',
      isExpander: true,
      name: (
        <EuiScreenReaderOnly>
          <span>Expand rows</span>
        </EuiScreenReaderOnly>
      ),
      render: (item: Research) => (
        <EuiButtonIcon
          onClick={() => toggleDetails(item)}
          aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
          iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
        />
      ),
    },
  ]

  const onAddHandler = () => {
    if (nameIsValid && descIsValid) {
      dispatch(addResearch({ name: nameValue, description: descValue }))
    }
  }

  const onEditHandler = () => {
    if (nameIsValid && descIsValid) {
      dispatch(updateResearch({ name: nameValue, description: descValue, id: editedResourceId }))
      setIsEditing(false)
    }
  }

  return researchesLoading ? (
    <EuiLoadingSpinner size={'l'} />
  ) : (
    <div>
      <TableView<Research>
        columns={columns}
        compare={(a, b) => a.name.localeCompare(b.name)}
        deleteAll={deleteAllResearches}
        nameOfRecord={'Research'}
        records={researches}
        schema={schema}
        isExpandable={true}
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        layout={'auto'}
      />
      <EuiForm>
        <EuiFormRow isInvalid={nameHasError} label={'Name'}>
          <EuiFieldText name={'name'} value={nameValue} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
        </EuiFormRow>
        <EuiFormRow isInvalid={descHasError} label={'Description'}>
          <EuiTextArea name={'desc'} value={descValue} onChange={descChangeHandler} onBlur={descBlurHandler} />
        </EuiFormRow>
        <EuiButton onClick={isEditing ? onEditHandler : onAddHandler} color={isEditing ? 'warning' : 'primary'}>
          {isEditing ? 'Edit' : 'Add'}
        </EuiButton>
      </EuiForm>
    </div>
  )
}
