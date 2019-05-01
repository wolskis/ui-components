import classNames from 'classnames'
import {
  filter,
  get,
  isFunction,
  isString,
  lowerCase
} from 'lodash'
import React, { ChangeEvent } from 'react'
import ReactTable, { Filter, FilterFunction, TableProps } from 'react-table'

import { Props } from '../../../../common'
import { Callout } from '../../../Callouts'
import { TextInput } from '../../../Inputs'
import {
  AlignmentOption,
  IDataTableColumn,
  IDataTableProps,
  IDataTableState
} from '../types'
import { DataTablePagination, IDataTablePaginationProps } from '../DataTablePagination'
const style = require('../DataTable.scss')

class DataTable extends React.Component<IDataTableProps, IDataTableState> {
  public static defaultProps: Partial<IDataTableProps> = {
    sortable: false,
    showPagination: false,
    showSearchFilter: false,
    showVerticalLines: false,
    defaultSorted: [],
    tableId: 'datatable'
  }

  constructor (props: IDataTableProps) {
    super(props)

    this.state = {
      searchFilter: null
    }
  }

  public defaultFilterMethod = (
    columnFilter: Filter,
    row: any,
    column: IDataTableColumn
  ): boolean => {
    // We filter either by the global state filter or by the individual column filter if it exists
    let { searchFilter } = this.state
    if (columnFilter.value) {
      searchFilter = columnFilter.value
    }

    const needle = lowerCase(searchFilter || '')

    let columnValue = ''

    if (isString(column.accessor)) {
      columnValue = get(row, column.accessor, '')
    }

    if (isFunction(column.accessor)) {
      columnValue = column.accessor(row) || ''
    }

    columnValue = lowerCase(columnValue)

    return columnValue.includes(needle)
  }

  public shouldFilterRow = (row: any): boolean => {
    const { searchFilter } = this.state
    const { columns } = this.props

    for (const column of columns) {
      const currentFilter = {
        id: column.id || '',
        value: searchFilter
      }

      const filterMethod: FilterFunction = column.filterMethod || this.defaultFilterMethod

      if (filterMethod(currentFilter, row, column)) {
        return true
      }
    }

    return false
  }

  get filteredData (): any[] {
    const { data, showSearchFilter } = this.props
    const { searchFilter } = this.state

    if (!showSearchFilter || !searchFilter) {
      return data
    }

    return filter(data, this.shouldFilterRow)
  }

  get columns (): IDataTableColumn[] {
    const { columns } = this.props

    return columns.map((column) => {
      return {
        filterMethod: this.defaultFilterMethod,
        ...column,
        headerClassName: classNames(this.columnClassName(column.headerAlignment), column.headerClassName),
        className: classNames(this.columnClassName(column.columnAlignment), column.className)
      }
    })
  }

  public columnClassName (alignment: AlignmentOption | undefined): string | undefined {
    switch (alignment) {
      case Props.Position.Right:
        return 'content-right'
      case Props.Position.Center:
        return 'content-center'
    }
  }

  public updateSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchFilter: event.target.value
    })
  }

  get searchFilterComponent (): JSX.Element | undefined {
    const {
      showSearchFilter,
      tableId
    } = this.props

    if (showSearchFilter) {
      return (
        <span className='search-filter'>
          <label>Search:</label>
          <TextInput
            handleChange={this.updateSearchFilter}
            name={`${tableId}-search-filter`}
          />
        </span>
      )
    }
  }

  public noDataComponent = (props: any): JSX.Element => {
    const {
      noDataComponent
    } = this.props

    if (noDataComponent) { return noDataComponent }

    return (
      <Callout type='no-data' shouldFocus={false} >
        {props.children}
      </Callout>
    )
  }

  public paginationComponent = (props: any): JSX.Element => {
    return (
      <DataTablePagination
        key='pagination'
        totalCount={props.data.length}
        {...props}
        customComponent={this.searchFilterComponent}
      />
    )
  }

  get defaultReactTableProps (): Partial<TableProps> {
    return {
      resizable: false,
      minRows: 0,
      pageSizeOptions: [10, 25, 50, 100],
      showPaginationTop: true,
      showPaginationBottom: true,
      NoDataComponent: this.noDataComponent,
      PaginationComponent: this.paginationComponent
    }
  }

  get classNames (): string {
    const {
      tableId,
      showVerticalLines
    } = this.props

    return classNames(
      style.DataTable,
      `data-table-${tableId}`,
      {
        'show-vertical-lines': showVerticalLines
      }
    )
  }

  public render (): JSX.Element {
    const {
      showPagination,
      defaultPageSize,
      sortable,
      defaultSorted,
      reactTableOverrides
    } = this.props

    const filteredData = this.filteredData

    return (
      <ReactTable
        {...this.defaultReactTableProps}
        data={filteredData}
        columns={this.columns}
        className={this.classNames}
        showPagination={showPagination}
        showPaginationBottom={filteredData.length > 0}
        showPageSizeOptions={showPagination}
        defaultPageSize={defaultPageSize ? defaultPageSize : 25}
        pageSize={showPagination ? undefined : filteredData.length}
        sortable={sortable}
        defaultSorted={defaultSorted}
        {...reactTableOverrides}
      />
    )
  }
}

export {
  DataTable
}
