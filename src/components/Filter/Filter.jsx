"use client";

import React from 'react'
import styles from './Filter.module.scss';
import { useReactToPrint } from 'react-to-print';

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
                    <div>Total Questions</div>
                    <input type="number" value={filters.totalQuestion} onChange={(e) => setFilters((prev) => {
                        return {
                            ...prev,
                            totalQuestion: e.target.value > 1000 ? 1000 : e.target.value
                        }
                    })} />
                </div>
                <div className={styles.form_item}>
                    <div>Total Question in one column</div>
                    <input type="number" value={filters.totalQuestionInOneColumn} onChange={(e) => setFilters((prev) => {
                        return {
                            ...prev,
                            totalQuestionInOneColumn: e.target.value > 200 ? 200 : e.target.value
                        }
                    })} />
                </div>
                <div className={styles.form_item}>
                    <div>Total Question in one section</div>
                    <input type="number" value={filters.totalQuestionInOneSection} onChange={(e) => setFilters((prev) => {
                        return {
                            ...prev,
                            totalQuestionInOneSection: e.target.value > 200 ? 200 : e.target.value
                        }
                    })} />
                </div>
                <div className={styles.print}>
                    <button onClick={printOMR}>Print</button>
                </div>
            </div>
        </div>
    )
}

export default Filter