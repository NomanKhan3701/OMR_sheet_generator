"use client";

import React from 'react'
import styles from './Filter.module.scss';
import { useReactToPrint } from 'react-to-print';
import ColorsDropdown from '../UI/ColorsDropdown/ColorsDropdown';

const Filter = ({ filters, setFilters, OMRref }) => {
    const printOMR = useReactToPrint({
        content: () => OMRref.current,
        pageStyle: ` @page {
            size: A4;
            margin: 0;
        }`
    });

    return (
        <div className={styles.Filter}>
            <div className={styles.form}>
                <div className={styles.form_item}>
                    <div className={styles.group_types}>
                        <div className={styles.type + ` ${filters.type?.toLowerCase() == "omr" ? styles.active : ""}`} onClick={() => setFilters((prev) => {
                            return {
                                ...prev,
                                type: "OMR"
                            }
                        })}>
                            <div className={styles.type_name}>OMR</div>
                        </div>
                        <div className={styles.type + ` ${filters.type?.toLowerCase() == "last_page" ? styles.active : ""}`} onClick={() => setFilters((prev) => {
                            return {
                                ...prev,
                                type: "LAST_PAGE"
                            }
                        })}>
                            <div className={styles.type_name}>Last Page</div>
                        </div>
                    </div>
                </div>
                {
                    filters.type?.toLowerCase() == "omr" && <>
                        <div className={styles.form_item}>
                            <div className={styles.label}>Total Questions</div>
                            <input type="number" value={filters.totalQuestion} onChange={(e) => setFilters((prev) => {
                                return {
                                    ...prev,
                                    totalQuestion: e.target.value > 1000 ? 1000 : e.target.value
                                }
                            })} />
                        </div>
                        <div className={styles.form_item}>
                            <div className={styles.label}>Total Question in one column</div>
                            <input type="number" value={filters.totalQuestionInOneColumn} onChange={(e) => setFilters((prev) => {
                                return {
                                    ...prev,
                                    totalQuestionInOneColumn: e.target.value > 200 ? 200 : e.target.value
                                }
                            })} />
                        </div>
                        <div className={styles.form_item}>
                            <div className={styles.label}>Total Question in one section</div>
                            <input type="number" value={filters.totalQuestionInOneSection} onChange={(e) => setFilters((prev) => {
                                return {
                                    ...prev,
                                    totalQuestionInOneSection: e.target.value > 200 ? 200 : e.target.value
                                }
                            })} />
                        </div>
                    </>
                }
                <div className={styles.form_item}>
                    <div className={styles.label}>Color of the OMR sheet</div>
                    <ColorsDropdown value={filters.color} setValue={(item) => setFilters({
                        ...filters,
                        color: item
                    })} />
                </div>
                <div className={styles.print} onClick={printOMR}>
                    Print
                </div>
            </div>
        </div>
    )
}

export default Filter