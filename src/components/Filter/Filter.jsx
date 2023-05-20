"use client";

import React from 'react'
import styles from './Filter.module.scss';

const Filter = ({ filters, setFilters }) => {

    return (
        <div className={styles.Filter}>
            <div className={styles.form}>
                <div className={styles.form_item}>
                    <div>Total Questions</div>
                    <input type="number" value={filters.totalQuestion} onChange={(e) => setFilters((prev) => {
                        return {
                            ...prev,
                            totalQuestion: e.target.value
                        }
                    })} min={2} max={1000} />
                </div>
                <div className={styles.form_item}>
                    <div>Total Question in one column</div>
                    <input type="number" value={filters.totalQuestionInOneColumn} onChange={(e) => setFilters((prev) => {
                        return {
                            ...prev,
                            totalQuestionInOneColumn: e.target.value || 1
                        }
                    })} min={1} max={200} />
                </div>
                <div className={styles.form_item}>
                    <div>Total Question in one section</div>
                    <input type="number" value={filters.totalQuestionInOneSection} onChange={(e) => setFilters((prev) => {
                        return {
                            ...prev,
                            totalQuestionInOneSection: e.target.value
                        }
                    })} min={1} max={200} />
                </div>

            </div>
        </div>
    )
}

export default Filter