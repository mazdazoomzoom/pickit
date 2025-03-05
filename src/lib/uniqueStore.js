import axios from 'axios';

class UniqueStore {
    constructor() {
        if (!UniqueStore.instance) {
            this.data = [];
            UniqueStore.instance = this;
        }
        return UniqueStore.instance;
    }

    async update() {
        async function fetchUnique(url) {
            try {
                console.log('Fetching Unique:', url);
                const response = await axios.get(url, {
                    withCredentials: false,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                return data.items || [];
            } catch (error) {
                console.error('Error fetching unique:', error);
                return [];
            }
        }

        const urls = [
            // process.env.NEXT_PUBLIC_UNIQUE_ACCESSORY_URL,
            // process.env.NEXT_PUBLIC_UNIQUE_ARMOUR_URL,
            process.env.NEXT_PUBLIC_UNIQUE_FLASK_URL,
            // process.env.NEXT_PUBLIC_UNIQUE_JEWEL_URL,
            // process.env.NEXT_PUBLIC_UNIQUE_SANCTUM_URL,
            // process.env.NEXT_PUBLIC_UNIQUE_WEAPON_URL,
        ];

        const results = await Promise.all(urls.map(fetchUnique));
        this.uniques = results.flat().filter(Boolean); // Remove undefined/null values
        console.log('Updated Unique Store:', this.data);
    }

    get() {
        return this.data;
    }
}

const instance = new UniqueStore();
export default instance;
