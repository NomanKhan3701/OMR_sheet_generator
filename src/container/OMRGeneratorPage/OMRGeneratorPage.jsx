"use client";

import React, { useState } from 'react'
import styles from './OMRGeneratorPage.module.scss';
import Filter from '@/components/Filter/Filter';
import OMRSheet from '@/components/OMRSheet/OMRSheet';

const OMRGeneratorPage = () => {
    const [filters, setFilters] = useState({
        totalQuestion: 38,
        totalQuestionInOneColumn: 20,
        totalQuestionInOneSection: 5,
    })

    return (
        <div>
            <Filter filters={filters} setFilters={setFilters} />
            <OMRSheet filters={filters} />
        </div>
    )
}

export default OMRGeneratorPage