import { Button } from './ui/button';
import { encrypt } from '@/helpers/crypto';
import { generateIPD } from '@/data/pickit';

export default function PickitButtons({ pickit }) {
    return (
        <>
            <Button
                className="btn btn-primary"
                onClick={() => {
                    navigator.clipboard.writeText(encrypt(pickit));
                }}
            >
                Copy Pickit Unique Code
            </Button>

            <Button
                className="btn btn-primary"
                onClick={() => {
                    navigator.clipboard.writeText(generateIPD(pickit));
                }}
            >
                Copy Pickit
            </Button>

            <Button
                className="btn btn-primary"
                onClick={() => {
                    const element = document.createElement('a');
                    const file = new Blob([generateIPD(pickit)], {
                        type: 'text/plain',
                    });
                    element.href = URL.createObjectURL(file);
                    element.download = 'pickit-create.ipd';
                    document.body.appendChild(element);
                    element.click();
                }}
            >
                Download Pickit
            </Button>
        </>
    );
}
