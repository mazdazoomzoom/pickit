import CreateStashItemType from './CreateStashItemType';

export default function Flasks({ updatePickit, category, data }) {
    function updateStashItem(item, newValue) {
        data[item] = newValue;
        updatePickit(category, data);
    }

    console.log('Flasks', data);

    return (
        <div className="overflow-hidden border bg-secondary p-3 rounded-lg">
            {Object.keys(data).map((flaskItem) => {
                return (
                    <div key={flaskItem} className="mb-4">
                        <CreateStashItemType
                            itemDescription={flaskItem}
                            stashItem={data[flaskItem]}
                            updateStashItem={(newValue) =>
                                updateStashItem(flaskItem, newValue)
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
}
