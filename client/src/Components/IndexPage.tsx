import { trpc } from '../utils/trpc';

const katt = { name: 'KATT', id: '1' };
export default function IndexPage() {
    const hello = trpc.getCampuses.useQuery();
    console.log('hello', hello?.data)
    if (!hello?.data) return <div>Loading...</div>;
    return (
        <div>
            {/* <p>{hello?.data?.name}</p> */}
            <p>idk</p>
        </div>
    );
}