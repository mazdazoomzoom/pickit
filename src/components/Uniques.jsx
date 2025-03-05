import { useEffect, useState } from 'react';

import uniques from '@/lib/uniqueStore';

export default function Uniques({ updatePickit, category, data }) {
    const [filteredUniques, setFilteredUniques] = useState([]);

    useEffect(() => {
        async function fetchUniques() {
            let allUniques = uniques.get();

            if (allUniques.length === 0) {
                await uniques.update();
                allUniques = uniques.get();
            }

            console.log('All Uniques:', allUniques);

            setFilteredUniques([...allUniques]);
        }

        fetchUniques();
    }, []);

    console.log('Filtered Uniques:', filteredUniques);

    if (filteredUniques.length === 0) {
        return (
            <div className="overflow-hidden border bg-secondary p-3 rounded-lg">
                <p className="text-center text-lg">
                    Refreshing Uniques, please wait a moment.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden border bg-secondary p-3 rounded-lg"></div>
    );
}
