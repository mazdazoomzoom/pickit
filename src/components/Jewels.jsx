import CreateStashItemType from './CreateStashItemType';

export default function Jewels({ updatePickit, category, data }) {
    function updateStashItem(item, newValue) {
        data[item] = newValue;
        updatePickit(category, data);
    }

    return (
        <div className="overflow-hidden border bg-secondary p-3 rounded-lg">
            {Object.keys(data).map((JewelItem) => {
                return (
                    <div key={JewelItem} className="mb-4">
                        <CreateStashItemType
                            itemDescription={JewelItem}
                            stashItem={data[JewelItem]}
                            updateStashItem={(newValue) =>
                                updateStashItem(JewelItem, newValue)
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
}
