import { mapValues } from 'lodash'
import React, { useEffect, useState } from 'react'

import { Props, Variables } from '../../../common'
import {
  FontAwesomeIconButton,
  IFontAwesomeIconButtonProps
} from '../../Buttons/FontAwesomeIconButton/FontAwesomeIconButton'
import { GridLayout } from '../../Layouts/GridLayout'
import { TableRowVariant } from './services/colors'
import {
  getSelectAllTableCheckboxInputValue,
  getUpdatedAllSelectableRows,
  handleSelectionChanged
} from './services/helper'
import {
  StyledEmptyStateCell,
  StyledTHead,
  StyledTable,
  StyledTableWrapper
} from './services/style'
import { TableCheckboxInputValue } from './subcomponents/TableCheckboxInput'
import { TableHeader } from './subcomponents/TableHeader'
import { TableRow } from './subcomponents/TableRow'

enum ColumnSize {
  Auto = 'auto',
  Shrink = 'shrink'
}
enum ColumnSortDirection {
  Descending = 'descending',
  Ascending = 'ascending'
}

enum ColumnAlignment {
  Left = 'left',
  Right = 'right'
}

enum TableInteractionType {
  Hover = 'hover',
  Swipe = 'swipe'
}

interface ISelectedRows {
  [rowId: string]: boolean
}

interface IColumnSorts {
  [columnName: string]: ColumnSortDirection
}

interface ITableProps <T extends {}> {
  /** Rows of the table */
  rows: Array<IRowProps<T>>
  /** Columns of the table */
  columns: Array<IColumnProps<T>>
  /** Empty state of the table */
  emptyState: JSX.Element
  /** Sorting of the table and only allow one column sorting at once */
  sort?: IColumnSorts
  /** Called when the sorting is changed */
  onSortChange?: (sort: IColumnSorts) => void
  /** Called when the selection is changed */
  onSelectionChanged?: (selectedRowData: T[]) => void
  /** Icon Buttons group for bulkActions when the user selects some row */
  bulkActions?: IFontAwesomeIconButtonProps[]
  /** Called when some row is removed */
  onRowRemove?: (removedRowData: T) => void
  /** If yes the left action cells are displayed (checkbox and remove button) */
  hasLeftAction?: boolean
  /** If interaction type is Hover, it will display hover actions when hover. If interaction type is swipe, it will display swipe actions when tap or swipe. */
  interactionType?: TableInteractionType
  /** Margins around the table */
  margins?: Props.IMargins
  /** The component context */
  componentContext?: string
}

interface IRowProps <T> {
  id: string
  isSelectable?: boolean
  isRemovable?: boolean
  tooltipText?: string
  progress?: number
  variant?: TableRowVariant
  data: T
  contentOverride?: (rowData: T) => JSX.Element[] | JSX.Element
  onClick?: (rowData: T) => void
  swipeActions?: IFontAwesomeIconButtonProps[]
}

interface IColumnProps <T> {
  name: string
  title?: string
  size: ColumnSize
  headerSize?: ColumnSize
  content: (rowData: T) => JSX.Element
  alignment?: ColumnAlignment
  tooltipText?: (rowData: T) => string
  hoverActions?: (rowData: T) => IFontAwesomeIconButtonProps[]
}

const getActionsIconButtonGroup = (actions?: IFontAwesomeIconButtonProps[], name?: string, alignment?: ColumnAlignment) => {
  if (actions) {
    const horizontalAlignment = alignment === ColumnAlignment.Right ? GridLayout.HorizontalAlignment.Right : GridLayout.HorizontalAlignment.Left

    return (
      <GridLayout
        horizontalAlignment={horizontalAlignment}
        gutterMarginX={Variables.Spacing.sXSmall}
        verticalAlignment={GridLayout.VerticalAlignment.Middle}
        cells={
          actions.map((actionProps, index) => ({
            size:  ColumnSize.Shrink,
            content: <FontAwesomeIconButton key={`actions-${name}-${index}`} {...actionProps}/>
          }))
        }
      />
      )
  }

  return null
}

const Table = <T extends{}>(props: ITableProps<T>) => {
  const {
    onRowRemove,
    rows,
    sort,
    onSortChange,
    columns,
    onSelectionChanged,
    margins,
    componentContext,
    hasLeftAction = false,
    bulkActions,
    emptyState,
    interactionType = TableInteractionType.Hover
  } = props

  const [selectedAll, setSelectedAll] = useState<TableCheckboxInputValue>(TableCheckboxInputValue.False)
  const [selectedRows, setSelectedRows] = useState<ISelectedRows>(getUpdatedAllSelectableRows(rows, {}))

  useEffect(() => {
    setSelectedRows(getUpdatedAllSelectableRows<T>(rows, selectedRows))
  }, [rows])
  useEffect(() => {
    if (hasLeftAction) {
      setSelectedRows({})
    }
  }, [hasLeftAction])
  useEffect(() => {
    if (selectedAll === TableCheckboxInputValue.False ) {
      setSelectedRows(mapValues(selectedRows, () => false))
    }

    if (selectedAll === TableCheckboxInputValue.True ) {
      setSelectedRows(mapValues(selectedRows, () => true))
    }
  }, [selectedAll])

  useEffect(() => {
    if (!hasLeftAction) {
      const currentSelectedRows = Object.values(selectedRows)
      setSelectedAll(getSelectAllTableCheckboxInputValue(currentSelectedRows))
      if (onSelectionChanged) {
        handleSelectionChanged<T>(rows, selectedRows, onSelectionChanged)
      }
    }
  }, [selectedRows])

  const hasTableSwipeActions = interactionType === TableInteractionType.Swipe && rows.some((row) => !!row.swipeActions && row.swipeActions.length > 0)

  return (
    <StyledTableWrapper
      margins={margins}
      data-component-type={Props.ComponentType.Table}
      data-component-context={componentContext}
    >
      <StyledTable>
        <StyledTHead>
          <TableHeader
            sort={sort}
            onSortChange={onSortChange}
            columns={columns}
            selectedAll={selectedAll}
            setSelectedAll={setSelectedAll}
            hasLeftAction={hasLeftAction}
            bulkActions={bulkActions}
            hasTableSwipeActions={hasTableSwipeActions}
            hasBulkAction={selectedAll !== TableCheckboxInputValue.False}
            isEmpty={rows.length === 0}
          />
        </StyledTHead>
        <tbody>
        {
          rows.length === 0 ? (
            <tr><StyledEmptyStateCell colSpan={columns.length}>{emptyState}</StyledEmptyStateCell></tr>
          ) : rows.map((row: IRowProps<T>) => (
            <TableRow
              key={row.id}
              hasTableSwipeActions={hasTableSwipeActions}
              columns={columns}
              row={row}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              hasLeftAction={hasLeftAction}
              interactionType={interactionType}
              onRowRemove={onRowRemove}
            />
          ))
        }
        </tbody>
      </StyledTable>
    </StyledTableWrapper>
  )
}

export {
  Table,
  IRowProps,
  IColumnProps,
  ISelectedRows,
  ColumnSize,
  ColumnAlignment,
  ColumnSortDirection,
  IColumnSorts,
  TableInteractionType,
  getActionsIconButtonGroup
}
