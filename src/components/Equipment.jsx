import CreateStashItemType from './CreateStashItemType';

export default function Equipment({ updatePickit, category, data }) {
    function updateStashItem(item, newValue) {
        data[item] = newValue;
        updatePickit(category, data);
    }

    console.log('Equipment', data);

    return (
        <div className="overflow-hidden border bg-secondary p-3 rounded-lg">
            {Object.keys(data).map((equipmentItem) => {
                return (
                    <div key={equipmentItem} className="mb-4">
                        <CreateStashItemType
                            itemDescription={equipmentItem}
                            stashItem={data[equipmentItem]}
                            updateStashItem={(newValue) =>
                                updateStashItem(equipmentItem, newValue)
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
}
