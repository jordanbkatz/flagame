import React from 'react';

interface Props {
    streak: number;
    highest: number;
}

const Stats: React.FC<Props> = ({ streak, highest }: Props) => {
    return (
        <div id="stats">
            <div>
                <p>streak</p>
                <p>{streak}</p>
            </div>
            <div>
                <p>highest</p>
                <p>{highest}</p>
            </div>
        </div>
    );
};

export default Stats;