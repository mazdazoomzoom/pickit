class Uniques {
    uniques = [];
    initialized = false;

    constructor() {
        // this.update();
    }

    async get() {
        if (!this.initialized) {
            await this.update();
        }
        return this.uniques;
    }

    async update() {
        async function fetchUnique(url) {
            console.log('Fetching Unique:', url);
            const response = await fetch(url);
            const json = await response.json();
            return json;
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
        console.log('Results:', results);
        this.uniques = results.flat(); // Flatten array
        this.initialized = true; // Mark as ready
    }

    get() {}
}

const uniques = new Uniques();
export default uniques;
