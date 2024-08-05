'use client';
import clsx from 'clsx';
import { orderBy } from 'lodash';
import { CURRENT_USER_ID } from '../lib/features/appStateSlice';
import { useAppUsers, useRoundInfo } from '../lib/hooks';
import { RankingIcon } from '../lib/svg-icon';

export function Ranking() {
    const users = useAppUsers();
    const roundInfo = useRoundInfo();

    return (
        <div className='w-full'>
            <div className='flex items-center mb-2'>
                <RankingIcon className='color-primary' />
                <span className='ms-2'> Ranking </span>
            </div>
            <table className='w-full border rounded-md border-gray-500 border-separate border-spacing-0'>
                <tbody>
                    <tr className='text-xs font-thin'>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    {orderBy((users || []), 'score', 'desc').map((player, idx: number) =>
                        <tr key={idx} className={clsx(
                            'text-center',
                            (idx % 2) ? 'bg-gray-800' : 'bg-gray-700',
                            {
                                '!bg-gray-600': CURRENT_USER_ID === player.id
                            }

                        )}>
                            <td className='border-0'>{idx + 1}</td>
                            <td className='border-0'>{roundInfo.roundNo > 1 ? player.name : '-'}</td>
                            <td className='border-0'>{roundInfo.roundNo > 1 ? player.score.toLocaleString() : '-'}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
