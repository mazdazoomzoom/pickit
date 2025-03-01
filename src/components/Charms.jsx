import CreateStashItemType from './CreateStashItemType';

export default function Charms({ updatePickit, category, data }) {
    function updateStashItem(item, newValue) {
        data[item] = newValue;
        updatePickit(category, data);
    }

    return (
        <div className="overflow-hidden border bg-secondary p-3 rounded-lg">
            {Object.keys(data).map((charmItem) => {
                return (
                    <div key={charmItem} className="mb-4">
                        <CreateStashItemType
                            itemDescription={charmItem}
                            stashItem={data[charmItem]}
                            updateStashItem={(newValue) =>
                                updateStashItem(charmItem, newValue)
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
}
