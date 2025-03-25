import { createClient, commandOptions } from 'redis'
import { downloadS3Folder } from './aws';
const subscriber = createClient();
subscriber.connect()
async function main() {
    while (1) {
        const response = await subscriber.brPop( //popping from right side
            commandOptions({ isolated: true }),
            'build-queue',
            0
        )
        // console.log(response)
        
        const id = response?.element
        await downloadS3Folder(`/output/${id}/frontend`)
    }
}
main();