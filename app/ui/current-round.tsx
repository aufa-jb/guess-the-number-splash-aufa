'use client';
import clsx from 'clsx';
import { CURRENT_USER_ID } from '../lib/features/appStateSlice';
import { useAppUsers, useRoundInfo, useUser } from '../lib/hooks';
import { RoundIcon } from '../lib/svg-icon';

export function CurrentRound() {
    const user = useUser();
    const users = useAppUsers();
    const roundInfo = useRoundInfo();

    return (
        <div className='w-full mb-4'>
            <div className='flex items-center mb-2'>
                <RoundIcon className='color-primary' />
                <span className='ms-2'> Current Round #{roundInfo.roundNo} </span>
            </div>
            <table className='w-full border rounded-md border-gray-500 border-separate border-spacing-0'>
                <tbody>
                    <tr className='text-xs font-thin'>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Multiplier</th>
                    </tr>
                    {(users || []).map((player, idx: number) =>
                        <tr key={idx} className={clsx(
                            'text-center',
                            (idx % 2) ? 'bg-gray-800' : 'bg-gray-700',
                            (roundInfo.roundNo <= 1 || roundInfo.started) ? ''
                                : (player.multiplier > roundInfo.targetMultiplier ? 'text-red-500' : 'text-green-500'),
                            {
                                '!bg-gray-600': user?.id === player.id
                            }

                        )}>
                            <td className='border-0 capitalize'>{(user?.id === player.id ? 'you' : player.name)}</td>
                            <td className='border-0'>{(roundInfo.roundNo <= 1 && !roundInfo.started) ? '-' : player.points.toLocaleString()}</td>
                            <td className='border-0'>{(roundInfo.roundNo <= 1 && !roundInfo.started) ? '-' : player.multiplier}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
