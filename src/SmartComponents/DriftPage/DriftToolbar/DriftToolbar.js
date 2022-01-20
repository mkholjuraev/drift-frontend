import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropdownItem, PaginationVariant, Toolbar, ToolbarGroup, ToolbarItem,
    ToolbarContent } from '@patternfly/react-core';

import ActionKebab from '../ActionKebab/ActionKebab';
import AddSystemButton from '../AddSystemButton/AddSystemButton';
import ExportCSVButton from '../../ExportCSVButton/ExportCSVButton';
import DriftFilter from './DriftFilter/DriftFilter';
import { TablePagination } from '../../Pagination/Pagination';

export class DriftToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actionKebabItems: [
                <DropdownItem
                    key="remove-systems"
                    component="button"
                    data-ouia-component-id='clear-all-comparisons-dropdown-item'
                    onClick={ this.clearComparison }>Clear all comparisons</DropdownItem>
            ],
            dropdownItems: [
                <DropdownItem
                    key='export-to-CSV'
                    component='button'
                    data-ouia-component-id='export-to-csv-dropdown-item-comparison'
                    onClick={ () => this.props.exportToCSV() }
                >
                    Export to CSV
                </DropdownItem>,
                <DropdownItem
                    key='export-to-JSON'
                    component='button'
                    data-ouia-component-id='export-to-json-dropdown-item-comparison'
                    onClick={ () => this.props.exportToJSON() }
                >
                    Export to JSON
                </DropdownItem>
            ],
            isEmpty: true,
            dropdownOpen: false
        };
    }

    clearAllStateChips = async () => {
        const { addStateFilter, stateFilters } = this.props;

        stateFilters.forEach(function(stateFilter) {
            stateFilter.selected = true;
            addStateFilter(stateFilter);
        });
    }

    resetFilters = async () => {
        const { resetComparisonFilters, setHistory } = this.props;

        await resetComparisonFilters();
        setHistory();
    }

    onToggle = () => {
        const { dropdownOpen } = this.state;

        this.setState({
            dropdownOpen: !dropdownOpen
        });
    }

    clearFilters = async () => {
        const { clearComparisonFilters, setHistory } = this.props;

        await clearComparisonFilters();
        setHistory();
    }

    clearComparison = async () => {
        const { clearAllSelections, clearComparison, clearSelectedBaselines, setHistory, setIsFirstReference, updateReferenceId } = this.props;

        await clearComparison();
        await clearSelectedBaselines('COMPARISON');
        await setIsFirstReference(true);
        await updateReferenceId();
        await clearAllSelections();
        setHistory();

    }

    removeChip = async (type = '', id = '') => {
        const { activeFactFilters, addStateFilter, clearAllFactFilters, handleFactFilter, filterByFact, setHistory, stateFilters } = this.props;
        if (type === 'State') {
            if (id === '') {
                this.clearAllStateChips();
            } else {
                stateFilters.forEach(async function(stateFilter) {
                    if (stateFilter.display === id) {
                        await addStateFilter(stateFilter);
                    }
                });
            }
        } else {
            if (id === '') {
                await clearAllFactFilters();
            } else if (activeFactFilters.includes(id)) {
                await handleFactFilter(id);
            } else {
                await filterByFact('');
            }
        }

        setHistory();
    }

    render() {
        const { activeFactFilters, factFilter, filterByFact, handleFactFilter, loading,
            page, perPage, setHistory, stateFilters, totalFacts, updatePagination } = this.props;
        const { actionKebabItems, dropdownItems, dropdownOpen } = this.state;

        return (
            <React.Fragment>
                <Toolbar className="drift-toolbar" clearAllFilters={ this.resetFilters } clearFiltersButtonText='Reset filters'>
                    <ToolbarContent>
                        <DriftFilter
                            activeFactFilters={ activeFactFilters }
                            factFilter={ factFilter }
                            filterByFact={ filterByFact }
                            handleFactFilter={ handleFactFilter }
                            removeChip={ this.removeChip }
                            setHistory={ setHistory }
                            stateFilters={ stateFilters }
                        />
                        <ToolbarGroup variant='button-group'>
                            <ToolbarItem>
                                <AddSystemButton loading={ loading } isToolbar={ true } />
                            </ToolbarItem>
                        </ToolbarGroup>
                        <ToolbarGroup variant='icon-button-group'>
                            <ToolbarItem>
                                <ExportCSVButton
                                    dropdownItems={ dropdownItems }
                                    ouiaId='export-dropdown-comparison'
                                    isOpen={ dropdownOpen }
                                    onToggle={ this.onToggle }
                                />
                            </ToolbarItem>
                            <ToolbarItem>
                                <ActionKebab
                                    ouiaId='clear-comparison-dropdown'
                                    dropdownItems={ actionKebabItems } />
                            </ToolbarItem>
                        </ToolbarGroup>
                        <ToolbarItem variant='pagination' align={{ default: 'alignRight' }}>
                            <TablePagination
                                page={ page }
                                perPage={ perPage }
                                total={ totalFacts }
                                isCompact={ true }
                                updatePagination={ updatePagination }
                                widgetId='drift-pagination-top'
                                ouiaId='comparison-pagination-top'
                                variant={ PaginationVariant.top }
                            />
                        </ToolbarItem>
                    </ToolbarContent>
                </Toolbar>
            </React.Fragment>
        );
    }
}

DriftToolbar.propTypes = {
    loading: PropTypes.bool,
    history: PropTypes.object,
    page: PropTypes.number,
    perPage: PropTypes.number,
    totalFacts: PropTypes.number,
    updatePagination: PropTypes.func,
    clearComparisonFilters: PropTypes.func,
    clearComparison: PropTypes.func,
    exportToCSV: PropTypes.func,
    exportToJSON: PropTypes.func,
    clearSelectedBaselines: PropTypes.func,
    setIsFirstReference: PropTypes.func,
    updateReferenceId: PropTypes.func,
    factFilter: PropTypes.string,
    filterByFact: PropTypes.func,
    stateFilters: PropTypes.array,
    addStateFilter: PropTypes.func,
    activeFactFilters: PropTypes.array,
    handleFactFilter: PropTypes.func,
    clearAllFactFilters: PropTypes.func,
    setHistory: PropTypes.func,
    resetComparisonFilters: PropTypes.func,
    clearAllSelections: PropTypes.func
};

export default DriftToolbar;
